"use client"

import { useState, useRef, useEffect } from 'react'
import { ArrowRight, CheckCircle } from 'lucide-react'

const cn = (...classes: (string | undefined | null | boolean)[]) => classes.filter(Boolean).join(' ');

const WaitlistSection = () => {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  
  const sectionRef = useRef<HTMLElement>(null)

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setIsSubmitting(true)
    
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
      setEmail('')
      
      setTimeout(() => {
        setIsSuccess(false)
      }, 4000)
    }, 1500)
  }

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section 
      ref={sectionRef}
      className="w-full py-24 px-6 bg-[#033129]"
      id="waitlist"
    >
      <div 
        className={cn(
          "max-w-2xl mx-auto text-center transition-all duration-700 ease-out",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}
      >
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
          Be The First To Experience{' '}
          <span className="text-[#f3942c] border-b-2 border-[#f3942c]">Helium</span>

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
              className={cn(
                "flex-grow h-12 px-4 rounded-full transition-all duration-300",
                "bg-white text-[#033129] placeholder-gray-500",
                "border-2 border-transparent focus:border-[#f3942c] focus:outline-none",
                "hover:shadow-lg focus:shadow-lg"
              )}
            />
            
            <button 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={cn(
                "h-12 px-8 rounded-full font-semibold transition-all duration-300",
                "bg-[#f3942c] text-white hover:bg-[#f3942c]/90",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "flex items-center justify-center hover:shadow-lg",
                "whitespace-nowrap"
              )}
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
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