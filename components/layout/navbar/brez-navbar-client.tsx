'use client';

import { Fragment, useState, useEffect } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ShoppingBagIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '../../cart/cart-context';
import LogoSquare from '../../logo-square';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

interface NavigationItem {
  name: string;
  href: string;
  imageSrc: string;
  thcContent?: string;
}

interface NavigationSection {
  id: string;
  name: string;
  items: NavigationItem[];
}

interface NavigationCategory {
  id: string;
  name: string;
  sections: NavigationSection[];
}

interface NavigationData {
  categories: NavigationCategory[];
  pages: { name: string; href: string }[];
}

interface BrezNavbarClientProps {
  navigation: NavigationData;
}

export default function BrezNavbarClient({ navigation }: BrezNavbarClientProps) {
  const [open, setOpen] = useState(false);
  const { cart } = useCart();

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [open]);



  return (
    <div className="bg-white">
      {/* Promotional banner */}
      <div className="bg-yellow-300 px-4 py-3 text-center text-sm font-medium text-black">
        LOONER THC BEVERAGES + FREE SHIPPING $100+ →
      </div>

      {/* Mobile menu drawer - slides in from left, positioned below header */}
      <div 
        className={classNames(
          "fixed left-0 w-80 max-w-sm bg-white shadow-xl z-40 lg:hidden transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      style={{ 
        top: '100px', // Start below the promotional banner (40px) + header (60px)
        height: 'calc(100vh - 100px)' // Take remaining viewport height
      }}>
        {/* Mobile menu content */}
        <div className="flex flex-col h-full">
          <div className="flex-1 px-4 py-6 overflow-y-auto">
          {/* Mobile two-column layout matching desktop */}
          <div className="grid grid-cols-2 gap-x-8">
            {navigation.categories[0]?.sections.map((section) => (
              <div key={section.id}>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
                  {section.name === 'INFUSED' ? 'BEVERAGE' : 'EDIBLES'}
                </h3>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="group flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                      onClick={() => setOpen(false)}
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-12 bg-white rounded-lg flex items-center justify-center overflow-hidden border border-gray-200">
                          {item.imageSrc && item.imageSrc !== '/placeholder-product.jpg' ? (
                            <Image
                              src={item.imageSrc}
                              alt={item.name}
                              width={40}
                              height={48}
                              className="object-contain w-full h-full"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-cannabis-300 to-cannabis-500 rounded-lg flex items-center justify-center">
                              {section.name === 'EDIBLES' ? (
                                <span className="text-xs font-bold text-white">🍯</span>
                              ) : (
                                <span className="text-xs font-bold text-white">L</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 group-hover:text-gray-700 leading-tight">
                          {item.name}
                        </p>
                        {item.thcContent && (
                          <span className="text-xs text-gray-500">{item.thcContent}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom navigation links - Mobile */}
          <div className="mt-8 pt-6 border-t border-gray-200 space-y-4">
            <Link
              href="/shop"
              className="block text-base font-medium text-gray-900 hover:text-gray-700"
              onClick={() => setOpen(false)}
            >
              Shop All
            </Link>
            <Link
              href="/testing"
              className="block text-base font-medium text-gray-900 hover:text-gray-700"
              onClick={() => setOpen(false)}
            >
              Testing and COAs
            </Link>
            <Link
              href="/contact"
              className="block text-base font-medium text-gray-900 hover:text-gray-700"
              onClick={() => setOpen(false)}
            >
              Contact Us
            </Link>
          </div>
          </div>
        </div>
      </div>

      {/* Desktop navigation */}
      <header className="relative bg-white z-50">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="flex h-16 items-center">
            {/* Mobile layout */}
            <div className="flex w-full items-center justify-between lg:hidden">
              {/* Hamburger/X menu button - left side */}
              <button
                type="button"
                className="-ml-2 rounded-md bg-white p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                onClick={() => setOpen(!open)}
              >
                <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
                {open ? (
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                )}
              </button>

              {/* Logo centered */}
              <Link href="/" className="flex items-center">
                <LogoSquare />
              </Link>

              {/* Cart icon - right side */}
              <Link href="/cart" className="group -m-2 flex items-center p-2">
                <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                <span className="ml-1 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                  {cart?.totalQuantity || 0}
                </span>
              </Link>
            </div>

            {/* Desktop layout */}
            <div className="hidden lg:flex lg:w-full lg:items-center lg:justify-between lg:relative">
              {/* Left side - Flyout menus (desktop) */}
              <Popover.Group className="flex h-16 self-stretch">
                <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    {({ open }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? 'border-cannabis-600 text-cannabis-600'
                                : 'border-transparent text-gray-700 hover:text-gray-800',
                              'relative z-10 -mb-px flex items-center border-b-2 pt-px text-sm font-medium transition-colors duration-200 ease-out'
                            )}
                          >
                            {category.name}
                          </Popover.Button>
                        </div>

                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0"
                          enterTo="opacity-100"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Popover.Panel className="absolute left-0 top-full z-20 mt-2">
                            <div className="bg-white border border-gray-200 rounded-lg shadow-lg" style={{ width: '600px' }}>
                              <div className="looner-menu-panel-b7z9 looner-menu-panel--desktop p-6">
                                <div className="looner-product-columns">
                                  {/* Two-column layout matching reference */}
                                  <div className="grid grid-cols-2 gap-8">
                                    {category.sections.map((section) => (
                                      <div key={section.name} className="looner-column">
                                        <h3 className="looner-column-title text-sm font-semibold text-gray-800 uppercase tracking-wider mb-4 pb-2 border-b border-gray-200">
                                          {section.name === 'INFUSED' ? 'BEVERAGE' : 'EDIBLES'}
                                        </h3>
                                        <ul className="looner-product-list space-y-3">
                                          {section.items.map((item) => (
                                            <li key={item.name}>
                                              <Link
                                                href={item.href}
                                                className="group flex items-center space-x-3 py-2 hover:bg-gray-50 rounded transition-colors"
                                              >
                                                <div className="flex-shrink-0">
                                                  <div className="w-10 h-12 bg-white rounded flex items-center justify-center overflow-hidden border border-gray-200">
                                                    {item.imageSrc && item.imageSrc !== '/placeholder-product.jpg' ? (
                                                      <Image
                                                        src={item.imageSrc}
                                                        alt={item.name}
                                                        width={40}
                                                        height={48}
                                                        className="object-contain w-full h-full"
                                                      />
                                                    ) : (
                                                      <div className="w-full h-full bg-gradient-to-br from-cannabis-300 to-cannabis-500 rounded flex items-center justify-center">
                                                        {section.name === 'EDIBLES' ? (
                                                          <span className="text-xs font-bold text-white">🍯</span>
                                                        ) : (
                                                          <span className="text-xs font-bold text-white">L</span>
                                                        )}
                                                      </div>
                                                    )}
                                                  </div>
                                                </div>
                                                <span className="text-sm font-medium text-gray-900 group-hover:text-gray-700">
                                                  {item.name}
                                                </span>
                                              </Link>
                                            </li>
                                          ))}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                
                                {/* Footer links exactly as in reference */}
                                <div className="looner-footer-links mt-6 pt-4 border-t border-gray-200">
                                  <div className="flex justify-center space-x-8">
                                    <Link
                                      href="/shop"
                                      className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                      Shop All
                                    </Link>
                                    <Link
                                      href="/testing"
                                      className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                      Testing and COAs
                                    </Link>
                                    <Link
                                      href="/contact"
                                      className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                                    >
                                      Contact Us
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                ))}

                {navigation.pages.map((page) => (
                  <Link
                    key={page.name}
                    href={page.href}
                    className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
                  >
                    {page.name}
                  </Link>
                ))}
                </div>
              </Popover.Group>

              {/* Logo - centered on desktop */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link href="/" className="flex items-center">
                  <LogoSquare />
                </Link>
              </div>

              {/* Right side icons - desktop */}
              <div className="flex items-center space-x-6">
                <Link href="/account" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  <UserIcon className="h-6 w-6" />
                </Link>
                <Link href="/cart" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {cart?.totalQuantity || 0}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}