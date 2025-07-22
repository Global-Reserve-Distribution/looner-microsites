# Next.js Commerce Template for LOONER THC Beverages

## Project Overview
A Next.js commerce template integrated with Shopify for building a comprehensive e-commerce platform. This template provides a modern, high-performance storefront with React Server Components, Server Actions, and advanced caching strategies.

**Current Status**: Template setup and configuration in progress
**Last Updated**: July 22, 2025

## Key Features
- **Next.js 15** with App Router and React 19
- **Shopify Storefront API** integration via GraphQL
- **Server Components** for optimal performance
- **Tailwind CSS** for responsive design
- **TypeScript** for type safety
- **Image optimization** with Next.js Image component
- **SEO optimization** with metadata and Open Graph support

## Technology Stack
- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS v4, HeadlessUI
- **Data Fetching**: Shopify Storefront API (GraphQL)
- **Icons**: Heroicons
- **Fonts**: Geist Sans
- **Notifications**: Sonner (toast notifications)

## Project Architecture
```
app/
├── [page]/           # Dynamic pages from Shopify
├── product/[handle]/ # Product detail pages
├── search/           # Search functionality
├── api/              # API routes
└── layout.tsx        # Root layout with cart context

components/
├── cart/            # Shopping cart components
├── grid/            # Product grid components
├── layout/          # Navigation and layout
└── product/         # Product display components

lib/
├── shopify/         # Shopify integration
│   ├── queries/     # GraphQL queries
│   ├── mutations/   # GraphQL mutations
│   └── fragments/   # GraphQL fragments
└── utils.ts         # Utility functions
```

## Shopify Integration
The template uses Shopify's Storefront API with comprehensive GraphQL operations:
- **Products**: Fetch, search, recommendations
- **Collections**: Category management
- **Cart**: Add, update, remove items
- **Pages**: Dynamic content pages
- **Menus**: Navigation structure

## Environment Variables Required
```
COMPANY_NAME="Your Company Name"
SITE_NAME="Your Site Name"
SHOPIFY_REVALIDATION_SECRET=""
SHOPIFY_STOREFRONT_ACCESS_TOKEN=""
SHOPIFY_STORE_DOMAIN="[your-store].myshopify.com"
```

## Recent Changes
- July 22, 2025: Initial project setup and dependency installation
- Installed Node.js 20 and all project dependencies via pnpm  
- Analyzed project structure and Shopify integration setup
- Configured Shopify environment variables (store domain, access token, revalidation secret)
- Customized branding for LOONER THC Beverages:
  - Updated site name and metadata descriptions
  - Created cannabis-themed logo with leaf icon
  - Added brand color palette (cannabis green, beverage blue, accent orange)
  - Updated welcome toast and selection colors for green theme
- Server compilation in progress with Turbopack enabled

## Next Steps
1. ✅ Configure Shopify environment variables - COMPLETED
2. ✅ Start development server - IN PROGRESS (Turbopack compilation)
3. Test Shopify API connectivity once server is ready
4. ✅ Customize for LOONER THC beverages brand - COMPLETED
5. Set up product collections and test cart functionality
6. Optimize for mobile and performance testing

## User Preferences
*No specific user preferences recorded yet*

## Development Notes
- Uses pnpm as package manager
- Next.js development server runs with Turbopack
- Supports both light and dark themes
- Implements advanced caching with Next.js unstable_cache