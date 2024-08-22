import Razorpay from "razorpay";

// Initialize Razorpay instance with your credentials
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_SECRET_KEY!,
});
