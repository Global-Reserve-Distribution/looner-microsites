import { Fragment, useState } from 'react';
import { Dialog, Popover, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon, ShoppingBagIcon, UserIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import { fetchProducts } from '../../../lib/shopify/server-actions';

// Product categories structure matching BREZ layout
const navigation = {
  categories: [
    {
      id: 'shop',
      name: 'Shop',
      sections: [
        {
          id: 'infused',
          name: 'INFUSED',
          items: [
            { name: 'OG', href: '#', imageSrc: '/placeholder-product.jpg' },
            { name: 'Amplify', href: '#', imageSrc: '/placeholder-product.jpg' },
            { name: 'Drift', href: '#', imageSrc: '/placeholder-product.jpg' },
            { name: 'Infused Variety Pack', href: '#', imageSrc: '/placeholder-product.jpg' },
            { name: 'Spirit', href: '#', imageSrc: '/placeholder-product.jpg' },
            { name: 'Shots', href: '#', imageSrc: '/placeholder-product.jpg' },
          ],
        },
        {
          id: 'thc-free',
          name: 'THC-FREE',
          items: [
            { name: 'Flow', href: '#', imageSrc: '/placeholder-product.jpg' },
            { name: 'Elevate', href: '#', imageSrc: '/placeholder-product.jpg' },
            { name: 'Dream', href: '#', imageSrc: '/placeholder-product.jpg' },
          ],
        },
      ],
      shopAll: {
        name: 'SHOP ALL',
        href: '/shop',
      },
      bundleAndSave: {
        name: 'BUNDLE & SAVE',
        href: '/bundles',
      },
      giftCard: {
        name: 'GIFT CARD',
        href: '/gift-cards',
      },
    },
  ],
  pages: [
    { name: 'Bundle & Save', href: '/bundles' },
    { name: 'Store Locator', href: '/store-locator' },
  ],
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

export default function BrezStyleNavbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
      {/* Promotional banner */}
      <div className="bg-yellow-300 px-4 py-3 text-center text-sm font-medium text-black">
        FOUR NEW EXPERIENCES + FREE SHIPPING $100+ →
      </div>

      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                {/* Mobile menu header */}
                <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200">
                  <div className="bg-yellow-300 px-3 py-1 rounded text-xs font-medium text-black">
                    FOUR NEW EXPERIENCES + FREE SHIPPING $100+ →
                  </div>
                  <button
                    type="button"
                    className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>

                {/* Mobile menu content */}
                <div className="px-4 py-6">
                  {/* Logo centered */}
                  <div className="text-center mb-6">
                    <Link href="/" className="text-2xl font-bold text-black">
                      LOONER
                    </Link>
                  </div>

                  {/* Category tabs */}
                  <div className="mb-6">
                    <div className="flex border-b border-gray-200">
                      <button className="flex-1 py-2 px-4 text-center text-sm font-medium text-black bg-white border-b-2 border-black">
                        INFUSED
                      </button>
                      <button className="flex-1 py-2 px-4 text-center text-sm font-medium text-gray-500 bg-gray-50">
                        THC-FREE
                      </button>
                    </div>
                  </div>

                  {/* Product grid */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {navigation.categories[0].sections[0].items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="group flex flex-col items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100"
                      >
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-blue-300 rounded-2xl mb-2 flex items-center justify-center">
                          <div className="w-12 h-12 bg-white rounded-lg opacity-80" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      </Link>
                    ))}
                  </div>

                  {/* Shop all button */}
                  <Link
                    href="/shop"
                    className="block w-full text-center py-3 px-4 bg-gray-100 text-gray-600 font-medium rounded-lg hover:bg-gray-200"
                  >
                    SHOP ALL
                  </Link>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop navigation */}
      <header className="relative bg-white">
        <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Logo (desktop) */}
            <div className="flex lg:ml-0">
              <Link href="/" className="text-2xl font-bold text-black">
                LOONER
              </Link>
            </div>

            {/* Flyout menus (desktop) */}
            <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
              <div className="flex h-full space-x-8">
                {navigation.categories.map((category) => (
                  <Popover key={category.name} className="flex">
                    {({ open }) => (
                      <>
                        <div className="relative flex">
                          <Popover.Button
                            className={classNames(
                              open
                                ? 'border-indigo-600 text-indigo-600'
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
                          <Popover.Panel className="absolute inset-x-0 top-full z-20 text-sm text-gray-500">
                            <div className="absolute inset-0 top-1/2 bg-white shadow" aria-hidden="true" />

                            <div className="relative bg-white">
                              <div className="mx-auto max-w-7xl px-8">
                                <div className="grid grid-cols-1 gap-x-8 gap-y-10 py-16">
                                  {/* Top navigation row */}
                                  <div className="flex justify-between border-b border-gray-200 pb-8">
                                    <button className="text-sm font-medium text-black bg-white px-4 py-2 border-b-2 border-black">
                                      SHOP ALL
                                    </button>
                                    <button className="text-sm font-medium text-gray-500 px-4 py-2">
                                      BUNDLE & SAVE
                                    </button>
                                    <button className="text-sm font-medium text-gray-500 px-4 py-2">
                                      GIFT CARD
                                    </button>
                                  </div>

                                  {/* Category sections */}
                                  <div className="grid grid-cols-2 gap-x-8">
                                    {category.sections.map((section) => (
                                      <div key={section.name}>
                                        <p className="font-medium text-gray-900 mb-6">{section.name}</p>
                                        <div className="grid grid-cols-2 gap-4">
                                          {section.items.map((item) => (
                                            <Link
                                              key={item.name}
                                              href={item.href}
                                              className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50"
                                            >
                                              <div className="w-16 h-16 bg-gradient-to-br from-purple-300 to-blue-300 rounded-2xl mb-3 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white rounded-lg opacity-80" />
                                              </div>
                                              <span className="text-sm font-medium text-gray-900 text-center">
                                                {item.name}
                                              </span>
                                            </Link>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
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

            {/* Right side icons */}
            <div className="flex items-center">
              <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                <Link href="/account" className="text-sm font-medium text-gray-700 hover:text-gray-800">
                  <UserIcon className="h-6 w-6" />
                </Link>
                <Link href="/cart" className="group -m-2 flex items-center p-2">
                  <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" />
                  <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                </Link>
              </div>

              {/* Mobile menu button */}
              <div className="flex lg:hidden">
                <button
                  type="button"
                  className="-ml-2 rounded-md bg-white p-2 text-gray-400"
                  onClick={() => setOpen(true)}
                >
                  <span className="sr-only">Open menu</span>
                  <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}