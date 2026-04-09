'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Show, UserButton, useUser } from '@clerk/nextjs';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();


  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'About Us', href: '/about' },
    { label: 'Worker', href: '/worker' },

  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/">
            <div className="text-3xl font-bold ">
              Logo
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="navbar-link"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center gap-4">
            <Show when={"signed-out"}>
              <div className="hidden sm:flex items-center gap-3">
                <Link
                  href="/sign-in"
                  className="btn-secondary"
                >
                  Login
                </Link>
                <Link
                  href="/sign-up"
                  className="btn-primary"
                >
                  Sign Up
                </Link>
              </div>

              {/* Mobile Auth Menu */}
              <div className="sm:hidden flex items-center gap-2">
                <Link
                  href="/sign-in"
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Login
                </Link>
              </div>
            </Show>

            <Show when={"signed-in"}>
              <div className="hidden sm:flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    {user?.firstName || 'User'}
                  </p>
                  <p className="text-xs text-gray-500">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors shadow-sm hover:shadow-md">
                  <UserButton
              
                  />
                </div>
              </div>

              {/* Mobile User Menu */}
              <div className="sm:hidden">
                <div className="h-10 w-10 rounded-full overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors">
                  <UserButton
                
                  />
                </div>
              </div>
            </Show>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-gray-900 transition-colors"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-gray-200/50 animate-slide-down">
            <div className="flex flex-col gap-2 pt-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              <Show when={"signed-out"}>
                <div className="pt-2 border-t border-gray-200 flex flex-col gap-2">
                  <Link
                    href="/sign-in"
                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    href="/sign-up"
                    className="px-4 py-2 text-sm font-medium text-white bg-linear-to-r from-sky-500 to-blue-600 rounded-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign Up
                  </Link>
                </div>
              </Show>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}



