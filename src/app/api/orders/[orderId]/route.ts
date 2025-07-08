import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order.model';
import { getAuthenticatedUser } from '@/lib/auth-utils';

export async function GET(
  req: Request,
  { params }: { params: { orderId: string } }
) {
  try {
    // 1. Authenticate user
    const authenticatedUser = await getAuthenticatedUser();
    
    if (!authenticatedUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required' 
      }, { status: 401 });
    }

    // 2. Connect to database
    await connectDB();

    // 3. Get order (only if it belongs to the authenticated user)
    const order = await OrderModel.findOne({
      orderId: params.orderId,
      userId: authenticatedUser.userId // 🔒 Ensure user owns this order
    });

    if (!order) {
      return NextResponse.json({ 
        success: false, 
        error: 'Order not found' 
      }, { status: 404 });
    }

    console.log('Retrieved order details for user:', authenticatedUser.userId);

    return NextResponse.json({
      success: true,
      order: {
        orderId: order.orderId,
        razorpayOrderId: order.razorpayOrderId,
        razorpayPaymentId: order.razorpayPaymentId,
        productId: order.productId,
        productName: order.productName,
        selectedVariant: order.selectedVariant,
        quantity: order.quantity,
        subtotal: order.subtotal,
        discount: order.discount,
        appliedDiscountAmount: order.appliedDiscountAmount,
        taxes: order.taxes,
        totalAmount: order.totalAmount,
        customerInfo: order.customerInfo,
        status: order.status,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        paidAt: order.paidAt
      }
    });

  } catch (error) {
    console.error('Get order error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve order' 
    }, { status: 500 });
  }
}
