import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order.model';
import UserModel from '@/models/User.model';
import { getAuthenticatedUser } from '@/lib/auth-utils';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

export async function POST(req: Request) {
  try {
    // 1. Authenticate user first
    const authenticatedUser = await getAuthenticatedUser();
    
    if (!authenticatedUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required. Please verify your email first.' 
      }, { status: 401 });
    }

    console.log('Authenticated user:', authenticatedUser.email);

    // 2. Parse request body
    const body = await req.json();
    const {
      productId,
      productName,
      quantity,
      selectedVariant,
      customerInfo,
      totalAmount,
      appliedDiscount
    } = body;

    // 3. Validate required fields
    if (!productId || !quantity || !selectedVariant || !customerInfo || !totalAmount) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing required order data' 
      }, { status: 400 });
    }

    // 4. Connect to database
    await connectDB();

    // 5. Update user information with latest delivery details
    await UserModel.findByIdAndUpdate(
      authenticatedUser.userId,
      {
        firstName: customerInfo.firstName || authenticatedUser.firstName,
        lastName: customerInfo.lastName || authenticatedUser.lastName,
        phone: customerInfo.phone,
        addressLineOne: customerInfo.address,
        addressLineTwo: customerInfo.apartment,
        city: customerInfo.city,
        state: customerInfo.state,
        pin: customerInfo.pincode,
        gstNo: customerInfo.gstin,
        country: 'India'
      },
      { upsert: false }
    );

    // 6. Generate custom order ID
    const customOrderId = `HEL${Date.now()}${Math.floor(Math.random() * 1000)}`;

    // 7. Calculate pricing breakdown
    const subtotal = selectedVariant.sellingPrice * quantity;
    const originalTotal = selectedVariant.MRP * quantity;
    const discount = originalTotal - subtotal;
    const appliedDiscountAmount = Math.round(subtotal * (appliedDiscount / 100));
    const discountedPrice = subtotal - appliedDiscountAmount;
    const taxes = Math.round(discountedPrice * 0.18); // 18% GST
    const finalAmount = discountedPrice + taxes;

    // 8. Create Razorpay order
    const razorpayOrderOptions = {
      amount: Math.round(finalAmount * 100), // Amount in paise
      currency: 'INR',
      receipt: customOrderId,
      notes: {
        productId,
        customerEmail: authenticatedUser.email,
        customOrderId,
        userId: authenticatedUser.userId
      }
    };

    const razorpayOrder = await razorpay.orders.create(razorpayOrderOptions);

    // 9. Save order to database with user reference
    const orderData = {
      orderId: customOrderId,
      razorpayOrderId: razorpayOrder.id,
      userId: authenticatedUser.userId, // 🔗 Link order to user
      
      // Product details
      productId,
      productName: productName || 'Helium Air Conditioner',
      selectedVariant: {
        color: selectedVariant.color,
        tonnage: selectedVariant.tonnage,
        star: selectedVariant.star,
        MRP: selectedVariant.MRP,
        sellingPrice: selectedVariant.sellingPrice,
        tag: selectedVariant.tag,
      },
      quantity,
      
      // Pricing
      subtotal,
      discount,
      appliedDiscountAmount,
      taxes,
      totalAmount: finalAmount,
      
      // Customer info
      customerEmail: authenticatedUser.email,
      customerInfo: {
        firstName: customerInfo.firstName,
        lastName: customerInfo.lastName,
        phone: customerInfo.phone,
        address: customerInfo.address,
        apartment: customerInfo.apartment,
        city: customerInfo.city,
        state: customerInfo.state,
        pincode: customerInfo.pincode,
        gstin: customerInfo.gstin,
      },
      
      status: 'pending',
      paymentStatus: 'pending'
    };

    const savedOrder = await OrderModel.create(orderData);

    console.log('Order created for user:', authenticatedUser.userId, 'Order:', customOrderId);

    return NextResponse.json({
      success: true,
      orderId: customOrderId,
      razorpayOrderId: razorpayOrder.id,
      amount: finalAmount,
      currency: 'INR',
      user: {
        email: authenticatedUser.email,
        name: `${authenticatedUser.firstName} ${authenticatedUser.lastName}`
      }
    });

  } catch (error) {
    console.error('Create order error:', error);
    
    if (error instanceof Error && error.message === 'Authentication required') {
      return NextResponse.json({ 
        success: false, 
        error: 'Please verify your email first' 
      }, { status: 401 });
    }
    
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to create order' 
    }, { status: 500 });
  }
}
