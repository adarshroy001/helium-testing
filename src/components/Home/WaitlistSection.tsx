"use client"

import { useState } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const WaitlistSection = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    
    // Simulate a network request
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail('')
      
      // Reset success message after a delay
      setTimeout(() => {
        setIsSuccess(false)
      }, 4000)
    }, 1500)
  }

  return (
    <section 
      className="w-full py-28 px-6"
      id="waitlist"
      style={{
                backgroundImage: `url('/assets/bg/flipbg2.jpg')`,
                backgroundSize: 'cover',
                // backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
              }}
    >
      <div className="max-w-2xl mx-auto text-center">
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Be The First To Experience <span className="text-[#f5b841] border-b-1 sm:border-b-2 border-[#f5b841]">Helium</span>
        </h2>
        
        <p className="text-lg text-[#e4e8e2] mb-12 leading-relaxed">
          Join our waitlist for early access and exclusive launch discounts.
        </p>
        
        {/* Form */}
        <div className="max-w-md mx-auto">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)}
              className="flex-grow h-12 px-4 rounded-full bg-white text-[#033129] placeholder-gray-500 border-2 border-transparent focus:border-[#f3942c] focus:outline-none"
            />
            
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-12 px-8 rounded-full font-semibold bg-[#f5b841] text-white disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full mr-2"></div>
                  Joining...
                </>
              ) : (
                <>
                  Join 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </button>
          </div>
          
          {/* Messages */}
          {error && (
            <p className="mt-4 text-red-300 text-sm bg-red-500/20 px-4 py-2 rounded-full">
              {error}
            </p>
          )}
          
          {isSuccess && (
            <div className="mt-4 flex items-center justify-center text-green-300 text-sm bg-green-500/20 px-4 py-2 rounded-full">
              <CheckCircle className="w-4 h-4 mr-2" />
              You're on the list!
            </div>
          )}
        </div>
        
        {/* Privacy Note */}
        <p className="mt-8 text-sm text-[#e4e8e2]/70 max-w-md mx-auto">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </section>
  )
}

export default WaitlistSection