"use client"

import { Button } from "@/components/ui/button"
import { Menu, DollarSign } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useState } from "react"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="flex items-center justify-between px-6 py-4 backdrop-blur-sm border-b border-white/10"
    >
      <Link href="/" className="flex items-center space-x-2">
        <DollarSign className="w-8 h-8 text-green-500" />
        <span className="text-white font-medium text-xl">$MUNNY PROXY$</span>
      </Link>

      <div className="hidden md:flex items-center space-x-8">
        <NavLink href="#games">Games</NavLink>
        <NavLink href="#apps">Apps</NavLink>
        <NavLink href="#proxy">Proxy</NavLink>
        <NavLink href="#settings">Settings</NavLink>
      </div>

      <div className="md:hidden relative">
        <Button variant="ghost" size="icon" className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <Menu className="w-6 h-6" />
        </Button>

        {mobileMenuOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-black border border-white/10 rounded-md shadow-lg z-50">
            <div className="py-2">
              <MobileNavLink href="#games" onClick={() => setMobileMenuOpen(false)}>
                Games
              </MobileNavLink>
              <MobileNavLink href="#apps" onClick={() => setMobileMenuOpen(false)}>
                Apps
              </MobileNavLink>
              <MobileNavLink href="#proxy" onClick={() => setMobileMenuOpen(false)}>
                Proxy
              </MobileNavLink>
              <MobileNavLink href="#settings" onClick={() => setMobileMenuOpen(false)}>
                Settings
              </MobileNavLink>
            </div>
          </div>
        )}
      </div>
    </motion.nav>
  )
}

function NavLink({ href, children }) {
  return (
    <Link href={href} className="text-gray-300 hover:text-white transition-colors relative group">
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-green-500 transition-all group-hover:w-full" />
    </Link>
  )
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link href={href} className="block px-4 py-2 text-gray-300 hover:text-white hover:bg-white/5" onClick={onClick}>
      {children}
    </Link>
  )
}
