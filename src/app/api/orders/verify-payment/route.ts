import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order.model';
import { getAuthenticatedUser } from '@/lib/auth-utils';

export async function POST(req: Request) {
  try {
    // 1. Authenticate user
    const authenticatedUser = await getAuthenticatedUser();
    
    if (!authenticatedUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required' 
      }, { status: 401 });
    }

    // 2. Parse request body
    const body = await req.json();
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderId 
    } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !orderId) {
      return NextResponse.json({ 
        success: false, 
        error: 'Missing payment verification data' 
      }, { status: 400 });
    }

    // 3. Verify signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (expectedSignature !== razorpay_signature) {
      console.error('Payment signature verification failed');
      return NextResponse.json({ 
        success: false, 
        error: 'Payment verification failed' 
      }, { status: 400 });
    }

    // 4. Connect to database
    await connectDB();

    // 5. Update order with payment details (only for the authenticated user)
    const updatedOrder = await OrderModel.findOneAndUpdate(
      { 
        orderId: orderId,
        razorpayOrderId: razorpay_order_id,
        userId: authenticatedUser.userId //  Ensure user owns this order
      },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'paid',
        paymentStatus: 'success',
        paidAt: new Date()
      },
      { new: true }
    );

    if (!updatedOrder) {
      return NextResponse.json({ 
        success: false, 
        error: 'Order not found or unauthorized' 
      }, { status: 404 });
    }

    console.log('Payment verified for user:', authenticatedUser.userId, 'Order:', orderId);

    // TODO: Send order confirmation email
    // TODO: Update product inventory
    // TODO: Trigger fulfillment process

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully',
      order: {
        orderId: updatedOrder.orderId,
        status: updatedOrder.status,
        totalAmount: updatedOrder.totalAmount,
        paidAt: updatedOrder.paidAt
      }
    });

  } catch (error) {
    console.error('Payment verification error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Payment verification failed' 
    }, { status: 500 });
  }
}
