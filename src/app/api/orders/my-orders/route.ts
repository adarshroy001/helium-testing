import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import OrderModel from '@/models/Order.model';
import { getAuthenticatedUser } from '@/lib/auth-utils';

export async function GET(req: Request) {
  try {
    // 1. Authenticate user
    const authenticatedUser = await getAuthenticatedUser();
    
    if (!authenticatedUser) {
      return NextResponse.json({ 
        success: false, 
        error: 'Authentication required' 
      }, { status: 401 });
    }

    // 2. Parse query parameters
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const status = url.searchParams.get('status'); // Filter by status

    // 3. Connect to database
    await connectDB();

    // 4. Build query
    const query: any = { userId: authenticatedUser.userId };
    if (status) {
      query.status = status;
    }

    // 5. Get user's orders with pagination
    const skip = (page - 1) * limit;
    
    const [orders, totalOrders] = await Promise.all([
      OrderModel.find(query)
        .sort({ createdAt: -1 }) // Latest orders first
        .skip(skip)
        .limit(limit)
        .lean(),
      OrderModel.countDocuments(query)
    ]);

    const totalPages = Math.ceil(totalOrders / limit);

    console.log(`Retrieved ${orders.length} orders for user:`, authenticatedUser.userId);

    return NextResponse.json({
      success: true,
      orders: orders.map(order => ({
        orderId: order.orderId,
        productName: order.productName,
        selectedVariant: order.selectedVariant,
        quantity: order.quantity,
        totalAmount: order.totalAmount,
        status: order.status,
        paymentStatus: order.paymentStatus,
        createdAt: order.createdAt,
        paidAt: order.paidAt
      })),
      pagination: {
        currentPage: page,
        totalPages,
        totalOrders,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });

  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to retrieve orders' 
    }, { status: 500 });
  }
}
