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
- **USER-PROVIDED FLAVOR PAGE IMPLEMENTATION** (July 23, 2025): Created new product page with user's exact code
  - Implemented new product page at /product/flavor using user-provided component architecture
  - Created four modular components: FlavorHero, LifestyleImageGrid, FlavorPickerTabs, PurchaseOptions
  - Dynamic background colors that change based on selected flavor
  - Two-column layout with product imagery on left, selection interface on right
  - 5x4 flavor grid with mini LOONER can visualizations
  - Variety packs section with curated THC dosage options
  - Purchase options supporting one-time and subscription models with 15% savings
  - Added missing Tailwind color classes (lime, cyan, brown) for flavor backgrounds
- **SHOPIFY INTEGRATION UPDATE** (July 23, 2025): Enhanced flavor page with real Shopify data
  - Integrated real Shopify product fetching via fetchProducts server action
  - Added dynamic flavor transformation from Shopify products to component format  
  - Implemented loading states and error handling for flavor data
  - Added URL parameter support for specific flavor selection
  - Enhanced SEO with dynamic meta tags for individual flavors
  - Added variety pack support with Shopify tag filtering
  - Automatic THC content extraction from product descriptions
- **FLAVOR PICKER CLEANUP** (July 23, 2025): Removed fake flavors and added product images
  - Removed all mock/fake flavors from flavor picker grid
  - Now displays only real Shopify products in flavor selection
  - Added product images to flavor picker cards when available
  - Fallback to branded LOONER can design when no image exists
  - Automatic THC content display from real product data
- **TAG DESIGN UPDATE** (July 23, 2025): Replaced pill-style tags with horizontal badge design
  - Updated FlavorHero component to use horizontal badge layout instead of pill tags
  - Tags now display as centered text with emoji above and underline below
  - Grid layout (2 cols on mobile, 4 cols on desktop) for better organization
  - Enhanced emoji mapping for cannabis-specific terms and quality indicators
- **SHOPIFY TAGS INTEGRATION** (July 23, 2025): Now pulling tags directly from Shopify products
  - Updated transformProductsToFlavors to use product.tags from Shopify instead of hardcoded tags
  - Fallback to default tags if no Shopify tags are available
  - Real product tags now display in flavor picker and product pages
  - Case-insensitive THC content detection for variety pack displays
- **OLIPOP LAYOUT REDESIGN** (July 23, 2025): Restructured page to match Olipop layout exactly
  - Large product image takes full left column with bigger padding and max-width constraints
  - Product tags moved below main image in horizontal badge style
  - Lifestyle images positioned below tags in left column
  - Right column now contains product title, description, flavor selector, and purchase options
  - Increased spacing and typography sizing to match reference design
  - Simplified FlavorHero component to focus on product image display only
- **DECORATIVE FOOTER BAR** (July 23, 2025): Added simple wavy footer section
  - Single-color SVG-based wavy pattern in teal (#4ECDC4)
  - Clean, minimal design without decorative elements
  - Fixed TypeScript errors for tag parameter typing and LifestyleImageGrid undefined values
- **PRODUCT INFORMATION SECTION** (July 23, 2025): Added teal section with wavy borders
  - Product description, nutrition facts, and feature icons in 3-column layout
  - Wavy SVG borders at top and bottom of teal background section
  - Mock nutrition data and feature highlights matching cannabis product focus
  - Positioned as middle section between main product selection and footer
- **JSX SYNTAX FIX** (July 23, 2025): Resolved JSX parsing errors
  - Fixed missing closing div tags in product information section
  - Corrected div nesting structure for proper React component compilation
  - Removed incompatible Head component usage from client component
  - Application now compiles without JSX syntax errors

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