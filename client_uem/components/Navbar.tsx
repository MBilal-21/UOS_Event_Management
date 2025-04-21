"use client";
import {  useEffect, useState } from 'react';
import { Home, Calendar, Ticket, LogIn, User, LogOut } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from "@/utils/auth";
import { useRouter, usePathname } from 'next/navigation';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user,logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");
useEffect(() => {

   
  }, [router, user]);
  
  return (
    <>
    {!isAdminRoute &&
    <> <nav className="fixed top-0 left-0 right-0 z-50 bg-[#1A1F2C]/90 backdrop-blur-sm" style={{ zIndex: 100 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="font-playfair text-2xl font-bold text-[#9b87f5]">IT Event Society</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors">
              <Home size={18} />
              <span>Home</span>
            </Link>
            {/* <Link href="/events" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors">
              <Calendar size={18} />
              <span>Events</span>
            </Link> */}
            <Link href="/tickets" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors">
              <Ticket size={18} />
              <span>Tickets</span>
            </Link>
            {!user ? <Link href="/login" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors">
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            :<>
              <Link href="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors">
                <User size={18} />
                <span>Profile</span>
              </Link>
              <Link href="#" onClick={logout} className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors">
                <LogOut size={18} />
                <span>Logout</span>
              </Link></>}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1A1F2C]/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link href="/" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors block px-3 py-2">
              <Home size={18} />
              <span>Home</span>
            </Link>
            {/* <Link href="/events" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors block px-3 py-2">
              <Calendar size={18} />
              <span>Events</span>
            </Link> */}
            <Link href="/tickets" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors block px-3 py-2">
              <Ticket size={18} />
              <span>Tickets</span>
            </Link>
           
            {!user ? <Link href="/login" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors block px-3 py-2">
              <LogIn size={18} />
              <span>Login</span>
            </Link>
            :<>
              <Link href="/profile" className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors block px-3 py-2">
                <User size={18} />
                <span>Profile</span>
              </Link>
              <Link href="#" onClick={logout} className="flex items-center space-x-2 text-gray-300 hover:text-[#9b87f5] transition-colors block px-3 py-2">
                <LogOut size={18} />
                <span>Logout</span>
              </Link></>}
          </div>
        </div>
      )}
    </nav>
    <div className="h-0" style={{marginTop:"64px"}}></div>
    </>}
    </>
  );
};

export default Navbar;