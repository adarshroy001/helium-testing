"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import Logo from '../ui/Logo'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed top-4 left-4 right-4 z-50 transition-all duration-300 ease-in-out",
      )}
    >
      <div className="bg-[#e2e8e6]/30 backdrop-blur-lg rounded-md  shadow-2xl max-w-4xl mx-auto">
        <div className="px-6 lg:px-8 py-3 sm:py-4 hidden  sm:block">
          <nav className="flex items-center justify-between space-x-0  sm:space-x-8">
            <Logo />
            <Link href="#why-helium" className='text-xl'>Why Helium</Link>
            <Link href="#shop" className='bg-[#f5b841] py-1.5 px-5  text-xl rounded-4xl text-[#1e2a28]'>Shop</Link>
          </nav>
        </div>
        <div className="block sm:hidden px-6 lg:px-8 py-3">
          <nav className="flex items-center justify-between space-x-0  sm:space-x-8">
            <Logo />
            <div className='gap-3.5 flex justify-center items-center'>
              <Link href="#why-helium" className='tracking-tighter text-base font-body'>Why Helium</Link>
              <Link href="#shop" className='bg-[#f5b841] py-1 px-4 rounded-2xl text-center text-[#1e2a28] '>Shop</Link>
            </div>

          </nav>
        </div>
      </div>
    </header>
  )
}


export default Navbar