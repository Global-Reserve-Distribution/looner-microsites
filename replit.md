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
- Server compilation completed, application running successfully
- **NEW**: Created comprehensive Olipop-inspired development specification
  - Detailed component architecture for FlavorSelectorGrid and StickyProductPanel
  - Cannabis-themed design system with THC content badges
  - Mobile-first responsive design patterns
  - Shopify metafield structure for cannabis products
- **IMPLEMENTED**: Core Olipop-inspired components (Phase 1)
  - FlavorSelectorGrid: Grid-based product discovery with THC content display
  - StickyProductPanel: Fixed purchase panel with dosage info and subscription options
  - THCContentBadge: Cannabis-specific dosage badges with compliance tooltips
  - ProductHeroSection: Large format product imagery with thumbnail gallery
  - OlipopProductPage: Complete page layout combining all components
  - Updated Tailwind config with cannabis color palette variables
- **MAJOR FIX** (July 23, 2025): Resolved Next.js 15 server/client component separation errors
  - Complete refactor of Shopify integration to resolve "use cache" runtime errors
  - Created comprehensive server actions architecture (lib/shopify/server-actions.ts)
  - Separated server-only code into dedicated cache and fetch modules
  - Updated 20+ files to use new server action pattern instead of direct Shopify imports
  - Successfully eliminated all client/server component boundary violations
  - Application now runs without compilation errors on localhost:3000
- **SHOP PAGE IMPLEMENTATION** (July 23, 2025): Created complete shop page with Shopify integration
  - Nostalgic soda-inspired hero section with beach theme and floating characters holding THC beverages  
  - Real Shopify product integration fetching from 'thc-sodas' and 'edibles' collections
  - Three unique product display variants with different layouts and styles
  - THC content extraction from product titles/descriptions with fallback logic
  - Navigation between home and shop pages with fixed header
  - Cannabis-themed color palette integration throughout shop experience
- **PRODUCT PAGE WITH INTERACTIVE FLAVOR SELECTOR** (July 23, 2025): Built Olipop-inspired product landing
  - Created comprehensive product page at /product with interactive components
  - **Flavor Selector Evolution**: Initial design criticized as "shit" and "childish" - completely redesigned 3 times
  - Final design features hero-level flavor selector as focal point with:
    - Full-width gradient background section commanding attention
    - 4x4 grid of large flavor cards with vibrant gradient backgrounds
    - 24x32px product visualizations (3x larger than initial design)
    - Interactive hover states revealing flavor descriptions
    - Glass-morphism effects with backdrop blur
    - Premium selection detail panel with large preview
  - Product hero images section with thumbnail navigation
  - Features section (Lab Tested, Non-GMO, Less Sugar)
  - Purchase panel with subscription options and 15% savings
  - Successfully integrated real Shopify products with THC content extraction

## Next Steps
1. ✅ Configure Shopify environment variables - COMPLETED
2. ✅ Start development server - COMPLETED (manual start working)
3. ✅ Test Shopify API connectivity - WORKING (server accessible)
4. ✅ Customize for LOONER THC beverages brand - COMPLETED
5. ✅ Create Olipop-inspired development specification - COMPLETED
6. ✅ Implement FlavorSelectorGrid component - COMPLETED
7. ✅ Build StickyProductPanel with THC content - COMPLETED  
8. ✅ Implement cannabis-themed design system - COMPLETED
9. ✅ Fix Next.js 15 server/client component errors - COMPLETED
10. ✅ Create one-page landing site with top-to-bottom scroll - COMPLETED
11. ✅ Build shop page with nostalgic soda hero and real Shopify products - COMPLETED
12. Add cannabis-specific features (dosage calculator, compliance notices, age verification)
13. Optimize for mobile and performance testing

## Run Configuration
The application uses:
- Command: `pnpm run dev` (starts Next.js with Turbopack)
- Port: 3000 (configured in .replit)
- Server accessible at http://localhost:3000
- Manual start works, workflow configuration needed for run button

## User Preferences
- Focus on functionality over inventory/stock concerns
- Prioritize working features and user experience

## Development Notes
- Uses pnpm as package manager
- Next.js development server runs with Turbopack
- Supports both light and dark themes
- Implements advanced caching with Next.js unstable_cache