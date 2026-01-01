'use client';

import { useAuth } from '@/context/auth-context';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import LoginButton from './LoginButton';

export default function Header() {
  const { user, signOut, isLoading } = useAuth();
  const pathname = usePathname();
  
  // Don't show dashboard link on share pages
  const showDashboardLink = pathname && !pathname.startsWith('/share');

  return (
    <header className="w-full py-4 px-6 bg-gradient-to-r from-amber-50 to-orange-50 shadow-sm border-b border-amber-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <Image 
            src="/e-removebg-preview.png" 
            alt="Encryptz Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <span className="text-2xl font-bold text-amber-800 font-serif">Encryptz</span>
        </Link>
        <div className="flex items-center space-x-4">
          <Link href="/privacy" className="text-sm text-amber-700 hover:text-amber-900 hidden md:block font-medium">
            Privacy
          </Link>
          <Link href="/terms" className="text-sm text-amber-700 hover:text-amber-900 hidden md:block font-medium">
            Terms
          </Link>
          <Link href="/disclaimer" className="text-sm text-amber-700 hover:text-amber-900 hidden md:block font-medium">
            Disclaimer
          </Link>
          
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-700 hidden sm:block">
                Welcome, {user.user_metadata?.full_name || user.email}
              </span>
              <button
                onClick={() => signOut()}
                className="bg-amber-200 hover:bg-amber-300 text-amber-900 py-2 px-4 rounded-lg transition"
              >
                Sign Out
              </button>
              {showDashboardLink && (
                <Link 
                  href="/dashboard" 
                  className="btn-primary text-white py-2 px-4 rounded-lg transition"
                >
                  Dashboard
                </Link>
              )}
            </div>
          ) : (
            !isLoading && (
              <div className="flex items-center space-x-3">
                <div className="btn-primary text-white py-2 px-4 rounded-lg transition">
                  <LoginButton />
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </header>
  );
}