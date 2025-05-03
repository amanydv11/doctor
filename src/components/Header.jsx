'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search, UserCircle } from 'lucide-react';
import { Separator } from './ui/separator';

export default function Header() {
  return (
    <div className="mt-1 border-b-2 border-gray-300">
      <header className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 ">
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center">
              <Image
                src="https://storage.googleapis.com/a1aa/image/63e59f67-5e7d-4d88-b559-06d9477f9fc5.jpg"
                alt="Apollo 24/7 Logo"
                width={60}
                height={30}
              />
            </Link>
            <div className="flex items-center space-x-1 text-gray-700 text-sm select-none">
              <MapPin className="w-4 h-4" />
              <div>
                <div className="text-xs font-normal">Select Location</div>
                <button
                  type="button"
                  className="font-semibold text-black flex items-center space-x-1 focus:outline-none"
                >
                  <span>Select Address</span>
                  <svg
                    className="w-3 h-3"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M19 9l-7 7-7-7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div className="flex-1 max-w-lg mx-6 relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
              <Search className="w-4 h-4" />
            </span>
            <Input
              type="search"
              placeholder="Search Doctors, Specialities, Conditions etc."
              className="pl-10"
            />
          </div>

          <div>
            <Link href='/add_doctor' className="hidden md:flex items-center space-x-2 text-[#0f4c5c] hover:text-[#0f4c5c]">
            <Button variant="outline" className="flex items-center space-x-2 text-[#0f4c5c] border-[#0f4c5c] hover:bg-[#0f4c5c] hover:text-white">
            <UserCircle className="w-5 h-5" />
              <span>Add doctor</span>
            </Button>
            </Link>
          </div>
        </div>
        <Separator/>
        <nav className="flex  justify-center space-x-8 py-3 text-sm font-semibold text-gray-900 select-none">
          {[
            'Buy Medicines',
            'Find Doctors',
            'Lab Tests',
            'Circle Membership',
            'Health Records',
            'Diabetes Reversal',
          ].map((item) => (
            <Link key={item} href="#" className="hover:underline">
              {item}
            </Link>
          ))}

          <Link href="#" className="flex items-center space-x-1 hover:underline">
            <span>Buy Insurance</span>
            <span className="text-xs font-normal text-[#0f4c5c] bg-[#d9f0f6] rounded px-1.5 py-0.5">
              New
            </span>
          </Link>
        </nav>
      </header>
    </div>
  );
}

