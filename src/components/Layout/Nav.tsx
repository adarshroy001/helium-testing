"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'
import Logo from '../ui/Logo'
import { Button } from '../ui/button'

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
      <div className="bg-[#033129]/30 backdrop-blur-lg rounded-md  shadow-2xl max-w-4xl mx-auto">
        <div className="px-6 lg:px-8 py-3">
            <nav className="flex items-center justify-between space-x-8">
              <Logo />          
              <NavLink href="#products">Why Helium</NavLink>
              <NavLink href="#investors">Shop</NavLink>
            </nav>
        </div>
      </div>
    </header>
  )
}

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <Link
    href={href}
    className="text-[#e4e8e2] hover:text-[#f3942c] font-medium transition-all duration-200 px-4 py-2 "
  >
    {children}
  </Link>
)


export default Navbar