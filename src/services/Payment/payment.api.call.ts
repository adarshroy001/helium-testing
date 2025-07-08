import { 
  OrderData, 
  CreateOrderResponse, 
  PaymentVerificationData, 
  PaymentVerificationResponse 
} from './payment.types';

/**
 * Creates an order by calling the backend API
 * @param orderData - Order details and customer information
 * @returns Promise with order creation response
 */
export async function createOrder(orderData: OrderData): Promise<CreateOrderResponse> {
  try {
    console.log('🛒 Creating order via API...');
    
    const response = await fetch('/api/orders/create', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(orderData),
      credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP Error: ${response.status}`);
    }

    const result: CreateOrderResponse = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Failed to create order');
    }

    console.log('Order created successfully:', result.orderId);
    return result;

  } catch (error) {
    console.error('Create order API error:', error);
    throw error;
  }
}

/**
 * Verifies payment by calling the backend API
 * @param paymentData - Razorpay payment verification data
 * @returns Promise with payment verification response
 */
export async function verifyPayment(paymentData: PaymentVerificationData): Promise<PaymentVerificationResponse> {
  try {
    console.log('Verifying payment via API...');
    
    const response = await fetch('/api/orders/verify-payment', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify(paymentData),
      credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP Error: ${response.status}`);
    }

    const result: PaymentVerificationResponse = await response.json();

    if (!result.success) {
      throw new Error(result.error || 'Payment verification failed');
    }

    console.log('Payment verified successfully');
    return result;

  } catch (error) {
    console.error('Payment verification API error:', error);
    throw error;
  }
}

/**
 * Generic API error handler
 * @param error - Error object
 * @returns User-friendly error message
 */
export function handleApiError(error: any): string {
  if (error instanceof Error) {
    if (error.message.includes('Authentication required')) {
      return 'Your session has expired. Please verify your email again.';
    }
    if (error.message.includes('Failed to create order')) {
      return 'Unable to create order. Please try again.';
    }
    if (error.message.includes('Payment verification failed')) {
      return 'Payment verification failed. Please contact support.';
    }
    return error.message;
  }
  return 'An unexpected error occurred. Please try again.';
}
