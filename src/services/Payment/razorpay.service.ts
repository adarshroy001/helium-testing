import { RazorpayOptions, PaymentHandlerCallbacks } from './payment.types';
import { verifyPayment } from './payment.api.call';

/**
 * Dynamically loads Razorpay SDK if not already loaded
 * @returns Promise that resolves when Razorpay is available
 */
function loadRazorpaySDK(): Promise<boolean> {
  return new Promise((resolve, reject) => {
    // Check if running in browser
    if (typeof window === 'undefined') {
      reject(false);
      return;
    }

    // Check if Razorpay is already loaded
    if ((window as any).Razorpay) {
      console.log('✅ Razorpay SDK already loaded');
      resolve(true);
      return;
    }

    // Check if script already exists in DOM
    const existingScript = document.querySelector('script[src*="checkout.razorpay.com"]');
    if (existingScript) {
      existingScript.addEventListener('load', () => {
        console.log('✅ Razorpay SDK loaded from existing script');
        resolve(true);
      });
      existingScript.addEventListener('error', () => {
        console.error('❌ Failed to load Razorpay SDK from existing script');
        reject(false);
      });
      return;
    }

    // Create and load script
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    
    script.onload = () => {
      console.log('✅ Razorpay SDK loaded successfully');
      resolve(true);
    };
    
    script.onerror = () => {
      console.error('❌ Failed to load Razorpay SDK');
      reject(false);
    };
    
    document.head.appendChild(script);
  });
}

/**
 * Opens Razorpay checkout modal
 * @param options - Razorpay configuration options
 * @returns Razorpay instance
 */
export async function openRazorpayCheckout(options: RazorpayOptions): Promise<any> {
  // Ensure SDK is loaded before opening checkout
  await loadRazorpaySDK();

  if (!(window as any).Razorpay) {
    throw new Error('Razorpay SDK failed to load');
  }

  const rzp = new (window as any).Razorpay(options);
  rzp.open();
  
  // Add error handler
  rzp.on('payment.failed', function(response: any) {
    console.error('❌ Razorpay payment failed:', response.error);
  });

  return rzp;
}

/**
 * Creates Razorpay options with success and error handlers
 * @param orderResult - Order creation response
 * @param customerPhone - Customer phone number
 * @param callbacks - Success, error, and dismiss callbacks
 * @returns Configured Razorpay options
 */
export function createRazorpayOptions(
  orderResult: any,
  customerPhone: string,
  callbacks: PaymentHandlerCallbacks
): RazorpayOptions {
  return {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!,
    amount: Math.round(orderResult.amount * 100), // Convert to paise
    currency: 'INR',
    name: 'Helium',
    description: `Air Conditioner Purchase`,
    order_id: orderResult.razorpayOrderId,
    
    prefill: {
      name: orderResult.user.name,
      email: orderResult.user.email,
      contact: customerPhone
    },
    
    theme: {
      color: '#f3942c'
    },
    
    handler: async function(response: any) {
      console.log('💳 Payment successful:', response);
      
      try {
        // Verify payment
        const verifyResult = await verifyPayment({
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          orderId: orderResult.orderId
        });

        if (verifyResult.success) {
          console.log('✅ Payment verified successfully');
          callbacks.onSuccess(
            orderResult.orderId, 
            response.razorpay_payment_id, 
            orderResult.amount
          );
        } else {
          throw new Error('Payment verification failed');
        }
      } catch (verificationError) {
        console.error('❌ Payment verification error:', verificationError);
        callbacks.onError('Payment successful but verification failed. Please contact support.');
      }
    },
    
    modal: {
      ondismiss: callbacks.onDismiss
    }
  };
}

/**
 * Validates Razorpay environment configuration
 * @returns Promise<boolean> indicating if Razorpay is properly configured
 */
export async function validateRazorpayConfig(): Promise<boolean> {
  if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID) {
    console.error('❌ NEXT_PUBLIC_RAZORPAY_KEY_ID not found in environment variables');
    return false;
  }

  try {
    await loadRazorpaySDK();
    
    if (!(window as any).Razorpay) {
      console.error('❌ Razorpay SDK still not available after loading');
      return false;
    }
    
    return true;
  } catch {
    console.error('❌ Failed to load Razorpay SDK');
    return false;
  }
}
