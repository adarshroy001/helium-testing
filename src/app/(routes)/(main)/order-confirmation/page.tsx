"use client"

import { useEffect, useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, Download, ArrowLeft, Package, Clock, Truck, Phone, Mail, Home } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Logo from "@/components/ui/Logo"

interface OrderConfirmationData {
  orderId: string
  paymentId: string
  amount: number
  status: string
}

function OrderConfirmationContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderData, setOrderData] = useState<OrderConfirmationData | null>(null)
  const [loading, setLoading] = useState(true)

  // Extract query parameters
  useEffect(() => {
    const orderId = searchParams.get('orderId')
    const paymentId = searchParams.get('paymentId')
    const amount = searchParams.get('amount')
    const status = searchParams.get('status')

    if (orderId && paymentId && amount && status) {
      setOrderData({
        orderId,
        paymentId,
        amount: parseFloat(amount),
        status
      })
    }
    setLoading(false)
  }, [searchParams])

  // Handle download invoice
  const handleDownloadInvoice = () => {
    // TODO: Implement invoice download logic
    alert('Invoice download will be available shortly via email.')
  }

  // Handle track order
  const handleTrackOrder = () => {
    // TODO: Implement order tracking page
    router.push(`/track-order?orderId=${orderData?.orderId}`)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f3942c] mx-auto mb-4"></div>
          <p>Loading order confirmation...</p>
        </div>
      </div>
    )
  }

  if (!orderData) {
    return (
      <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="text-gray-400 mb-6">Unable to load order confirmation details.</p>
          <Button
            onClick={() => router.push('/shop')}
            className="bg-[#f3942c] hover:bg-[#e8832a] text-black"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white px-4 md:px-20 py-28 md:py-28">
      <div className="container mx-auto max-w-4xl">
        {/* Success Animation & Message */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#f3942c] rounded-full animate-bounce"></div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-green-400 mb-4">
            Order Confirmed! 🎉
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Thank you for choosing Helium! Your premium air conditioner order has been successfully placed and payment confirmed.
          </p>
        </div>

        {/* Order Summary Card */}
        <Card className="bg-[#1a1a1a] border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold flex items-center gap-3">
              <Package className="w-6 h-6 text-[#f3942c]" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Order Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Order ID</p>
                  <p className="font-mono text-lg font-semibold text-[#f3942c]">
                    {orderData.orderId}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Payment ID</p>
                  <p className="font-mono text-sm text-gray-300">
                    {orderData.paymentId}
                  </p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-gray-400 text-sm mb-1">Total Amount</p>
                  <p className="text-3xl font-bold text-[#f3942c]">
                    ₹{orderData.amount.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm mb-1">Payment Status</p>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-green-400 font-semibold">Paid Successfully</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator className="bg-gray-700" />

            {/* Order Date & Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400 text-sm">Order placed on</span>
              </div>
              <span className="font-medium">
                {new Date().toLocaleDateString('en-IN', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* What Happens Next */}
        <Card className="bg-[#1a1a1a] border-gray-800 mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">What happens next?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#f3942c] text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Mail className="w-5 h-5 text-[#f3942c]" />
                    Order Confirmation Email
                  </h3>
                  <p className="text-gray-400">
                    A detailed order confirmation with invoice will be sent to your email within <span className="text-[#f3942c] font-medium">5 minutes</span>.
                  </p>
                </div>
              </div>
              
              {/* Step 2 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#f3942c] text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-[#f3942c]" />
                    Installation Scheduling
                  </h3>
                  <p className="text-gray-400">
                    Our expert installation team will contact you within <span className="text-[#f3942c] font-medium">24 hours</span> to schedule a convenient installation time.
                  </p>
                </div>
              </div>
              
              {/* Step 3 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#f3942c] text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Truck className="w-5 h-5 text-[#f3942c]" />
                    Delivery & Installation
                  </h3>
                  <p className="text-gray-400">
                    Free professional delivery and installation within <span className="text-[#f3942c] font-medium">3-7 business days</span> at your preferred time slot.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 bg-[#f3942c] text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg mb-2 flex items-center gap-2">
                    <Home className="w-5 h-5 text-[#f3942c]" />
                    Enjoy Cool Comfort
                  </h3>
                  <p className="text-gray-400">
                    Experience premium cooling with your new Helium air conditioner. Includes <span className="text-[#f3942c] font-medium">5-year comprehensive warranty</span>.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
          <Button
            onClick={() => router.push('/shop')}
            variant="outline"
            className="border-gray-700 text-white hover:bg-[#2a2a2a] flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Button>
          
          <Button
            onClick={handleDownloadInvoice}
            className="bg-[#f3942c] hover:bg-[#e8832a] text-black flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Download Invoice
          </Button>

          <Button
            onClick={handleTrackOrder}
            variant="outline"
            className="border-[#f3942c] text-[#f3942c] hover:bg-[#f3942c] hover:text-black flex items-center gap-2"
          >
            <Package className="w-4 h-4" />
            Track Order
          </Button>
        </div>

        {/* Support Information */}
        <Card className="bg-[#1a1a1a] border-gray-800">
          <CardContent className="p-6">
            <div className="text-center">
              <h3 className="text-xl font-semibold mb-4">Need Help? We're Here for You!</h3>
              <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
                For any questions about your order, installation, or our products, our support team is ready to assist you.
              </p>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-4 bg-[#2a2a2a] rounded-lg">
                  <Phone className="w-8 h-8 text-[#f3942c] mb-3" />
                  <h4 className="font-semibold mb-2">Call Us</h4>
                  <p className="text-sm text-gray-400 mb-2">Customer Support</p>
                  <p className="text-[#f3942c] font-medium">1800-XXX-XXXX</p>
                  <p className="text-xs text-gray-500 mt-1">Mon-Sat: 9 AM - 8 PM</p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-[#2a2a2a] rounded-lg">
                  <Mail className="w-8 h-8 text-[#f3942c] mb-3" />
                  <h4 className="font-semibold mb-2">Email Us</h4>
                  <p className="text-sm text-gray-400 mb-2">Quick Response</p>
                  <p className="text-[#f3942c] font-medium">support@helium.com</p>
                  <p className="text-xs text-gray-500 mt-1">Reply within 2 hours</p>
                </div>
                
                <div className="flex flex-col items-center p-4 bg-[#2a2a2a] rounded-lg">
                  <Package className="w-8 h-8 text-[#f3942c] mb-3" />
                  <h4 className="font-semibold mb-2">Order Status</h4>
                  <p className="text-sm text-gray-400 mb-2">Real-time Updates</p>
                  <Button
                    onClick={handleTrackOrder}
                    size="sm"
                    className="bg-[#f3942c] hover:bg-[#e8832a] text-black"
                  >
                    Track Your Order
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="text-center mt-8 p-6 bg-gradient-to-r from-[#f3942c]/10 to-[#f3942c]/5 rounded-lg border border-[#f3942c]/20">
          <h3 className="text-lg font-semibold mb-2 text-[#f3942c]">Thank You for Choosing Helium!</h3>
          <p className="text-gray-400 text-sm">
            You've made an excellent choice for premium cooling solutions. We're committed to delivering the best experience from purchase to installation and beyond.
          </p>
        </div>
      </div>
    </div>
  )
}

// Loading fallback component
function OrderConfirmationFallback() {
  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f3942c] mx-auto mb-4"></div>
        <p>Loading order confirmation...</p>
      </div>
    </div>
  )
}

// Main component wrapped with Suspense
export default function OrderConfirmationPage() {
  return (
    <Suspense fallback={<OrderConfirmationFallback />}>
      <OrderConfirmationContent />
    </Suspense>
  )
}
