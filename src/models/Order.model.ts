import { model, models, Schema } from "mongoose";

export interface Order {
  _id?: string;
  orderId: string; // Your custom order ID (HEL123456)
  razorpayOrderId: string; // Razorpay order ID
  razorpayPaymentId?: string; // Payment ID after successful payment
  razorpaySignature?: string; // Payment signature for verification
  
  // User Reference - NEW FIELD
  userId: any; // Reference to User model
  
  // Product Details
  productId: string;
  productName: string;
  selectedVariant: {
    color: string;
    tonnage: number;
    star: number;
    MRP: number;
    sellingPrice: number;
    tag: string;
  };
  quantity: number;
  
  // Pricing
  subtotal: number;
  discount: number;
  appliedDiscountAmount: number;
  taxes: number;
  totalAmount: number;
  
  // Customer Info (kept for convenience, but user is the primary reference)
  customerEmail: string;
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
  
  // Order Status
  status: 'pending' | 'paid' | 'failed' | 'cancelled';
  paymentStatus: 'pending' | 'success' | 'failed';
  
  // Timestamps
  createdAt: Date;
  paidAt?: Date;
}

const OrderSchema = new Schema<Order>(
  {
    orderId: { type: String, required: true, unique: true },
    razorpayOrderId: { type: String, required: true },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    
    // User Reference - REQUIRED FIELD
    userId: { 
      type: Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },
    
    // Product Details
    productId: { type: String, required: true },
    productName: { type: String, required: true },
    selectedVariant: {
      color: { type: String, required: true },
      tonnage: { type: Number, required: true },
      star: { type: Number, required: true },
      MRP: { type: Number, required: true },
      sellingPrice: { type: Number, required: true },
      tag: { type: String, required: true },
    },
    quantity: { type: Number, required: true, min: 1 },
    
    // Pricing
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    appliedDiscountAmount: { type: Number, default: 0 },
    taxes: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    
    // Customer Info
    customerEmail: { type: String, required: true },
    customerInfo: {
      firstName: { type: String, required: true },
      lastName: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
      apartment: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String, required: true },
      gstin: { type: String },
    },
    
    // Status
    status: { 
      type: String, 
      enum: ['pending', 'paid', 'failed', 'cancelled'], 
      default: 'pending' 
    },
    paymentStatus: { 
      type: String, 
      enum: ['pending', 'success', 'failed'], 
      default: 'pending' 
    },
    
    // Timestamps
    paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Add indexes for better query performance
OrderSchema.index({ userId: 1, createdAt: -1 }); // For user's order history
OrderSchema.index({ orderId: 1 }); // For order lookup
OrderSchema.index({ razorpayOrderId: 1 }); // For payment verification

const OrderModel = models.Order || model<Order>("Order", OrderSchema);
export default OrderModel;
