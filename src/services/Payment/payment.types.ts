export interface OrderData {
  productId: any;
  productName: string;
  quantity: number;
  selectedVariant: {
    color: string;
    tonnage: number;
    star: number;
    MRP: number;
    sellingPrice: number;
    tag: string;
  };
  customerInfo: {
    firstName: string;
    lastName: string;
    phone: string;
    address: string;
    apartment?: string;
    city: string;
    state: string;
    pincode: string;
    gstin?: string;
  };
  totalAmount: number;
  appliedDiscount: number;
}

export interface CreateOrderResponse {
  success: boolean;
  orderId: string;
  razorpayOrderId: string;
  amount: number;
  currency: string;
  user: {
    email: string;
    name: string;
  };
  error?: string;
}

export interface PaymentVerificationData {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  orderId: string;
}

export interface PaymentVerificationResponse {
  success: boolean;
  message: string;
  order?: {
    orderId: string;
    status: string;
    totalAmount: number;
    paidAt: Date;
  };
  error?: string;
}

export interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: {
    color: string;
  };
  handler: (response: any) => void;
  modal: {
    ondismiss: () => void;
  };
}

export interface PaymentHandlerCallbacks {
  onSuccess: (orderId: string, paymentId: string, amount: number) => void;
  onError: (error: string) => void;
  onDismiss: () => void;
  onAuthError: () => void;
}
