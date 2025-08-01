# Next.js Commerce Template for LOONER THC Beverages

## Overview
This project is a high-performance Next.js e-commerce storefront integrated with Shopify, designed specifically for LOONER THC Beverages. It leverages modern Next.js 15 features like the App Router, React Server Components, and Server Actions to deliver a fast, dynamic, and SEO-optimized shopping experience. The platform aims to provide a comprehensive solution for showcasing LOONER's cannabis-infused beverage and edibles products, with a focus on an intuitive user interface and robust Shopify integration. The project includes a unique Olipop-inspired design system tailored for cannabis products, featuring interactive flavor selectors, THC content displays, and a seamless purchase flow.

## User Preferences
- Focus on functionality over inventory/stock concerns
- Prioritize working features and user experience

## System Architecture
The application is built on Next.js 15 (App Router, React 19, TypeScript) and styled with Tailwind CSS v4. Data fetching is primarily handled via Shopify Storefront API (GraphQL), with specific use of the Admin API for enhanced category access.

**Core Architectural Decisions:**
- **Server Components & Server Actions:** Utilized extensively for performance optimization and efficient data fetching from Shopify, minimizing client-side JavaScript.
- **Modular Component Design:** The codebase is structured around reusable components (e.g., `FlavorSelectorGrid`, `StickyProductPanel`, `AddToCartButton`) to ensure maintainability and scalability.
- **Olipop-Inspired Design System:** A distinct UI/UX approach featuring:
    - **Branding:** LOONER-specific cannabis-themed logo, brand color palette (cannabis green, beverage blue, accent orange), and custom typography (Geist Sans).
    - **Interactive Elements:** Hero-level flavor selectors with vibrant gradient backgrounds, glass-morphism effects, and interactive hover states.
    - **Product Display:** Prominent product imagery, THC content badges with compliance tooltips, and dynamic background colors based on selected flavors using `framer-motion` for smooth transitions.
    - **Layouts:** Olipop-exact page layouts, including product information sections with wavy SVG borders, and responsive grid patterns.
- **Responsive Design:** Mobile-first approach ensuring optimal viewing and interaction across various devices, including a dedicated mobile carousel for product display and a BREZ-style animated mobile navigation menu.
- **Shopify Metafield Integration:** Extensive use of Shopify metafields (`custom.primary_color`, `custom.secondary_color`, `custom.display_name`, `custom.short_description`, `custom.show_best_seller_tag`) for dynamic content, theming, and product enrichment.
- **Hierarchical Product Routing:** A structured `/products` route system (`/products/sodas/10mg`, `/products/sodas/50mg`, `/products/gummies`) enables specialized pages for different product categories, each driven by a reusable `ProductPage` component and configuration system.
- **Cart Management:** Comprehensive shopping cart functionality integrated with Shopify Storefront API for real-time updates, including a sticky cart footer and shared `AddToCartButton` components.
- **Navigation:** BREZ cannabis brand-inspired header and flyout menu design, featuring real Shopify product images, automatic THC content detection, and categorized product sections (BEVERAGE, EDIBLES).

## External Dependencies
- **Shopify:**
    - **Storefront API (GraphQL):** Primary API for product fetching, collection management, cart operations (add, update, remove items), and dynamic page content.
    - **Admin API (GraphQL):** Used for advanced product categorization and data access requiring elevated permissions.
- **Next.js 15:** Core framework for the application.
- **React 19:** Frontend library.
- **Tailwind CSS v4:** Utility-first CSS framework for styling.
- **TypeScript:** For type safety throughout the codebase.
- **HeadlessUI:** Unstyled, accessible UI components.
- **Heroicons:** For SVG icons.
- **Geist Sans:** Custom font.
- **Sonner:** For toast notifications.
- **framer-motion:** For advanced animations, particularly dynamic background color transitions.
- **lucide-react:** For consistent iconography in the header.

## Recent Changes

- **FIGMA PRODUCT GRID IMPLEMENTATION** (August 1, 2025): Updated product grid to match exact Figma specifications
  - Rebuilt OlipopStyleGrid component following precise Figma design structure and proportions
  - Fixed layout using responsive grid system with proper aspect ratios (square cards, 622:353 video)
  - Implemented proper spacing and proportions between all sections to match Figma design
  - Added feature badges with proper styling: 10mg THC, Made with Cane Sugar, Gluten Free
  - Used exact Figma colors: #ffbd4e for main product background, #faa81e for badges
  - Preserved mobile carousel functionality while upgrading desktop layout to match design
  - Fixed grid proportions to properly scale and match reference image layout
  - Updated layout order: large product with badges at top, video in middle, two product images at bottom
  - Fixed background colors to use selected product's secondary color dynamically across all sections
  - Resolved overlapping layout issues with proper spacing and min-height constraints
  - Fixed hardcoded orange colors to use dynamic flavor-specific colors (grape now shows purple)
  - Updated flavor picker to display 4 items per row matching Figma specifications
  - Adjusted image sizes and spacing for optimal 4-column layout presentation
  - Added ProductHeader component with star ratings (4.3/5), review count (249), and "Single Flavor" badge
  - Applied proper typography using Poppins font for product name and Inter font for other elements
  - Updated product name color to use dynamic primaryColor from Shopify product metafields (like image grid)
  - Applied Futura Bold font and #2C2C2C color to subtitle text matching Figma typography specs
  - Made subtitle configurable per page type (10mg Soda, 50mg Soda, Cannabis Edibles)
  - Fixed gap between image grid and flavor picker to exactly 78px as specified in Figma code
  - Created PurchaseOptionsNew component matching exact Figma purchase options design
  - Applied exact styling: radio buttons, "Most Popular" badge, "Save 15%" corner badge, benefit icons
  - Used precise Inter font typography, border radius (10px), and Figma colors (#14433d, #fdda79)
  - Made component easily switchable with original PurchaseOptions for comparison
  - Used exact Figma colors: dynamic primaryColor for product title, #2C2C2C for subtitle, #14433d for badges, #003a5d for borders

- **MOBILE RESPONSIVE OPTIMIZATION** (August 1, 2025): Made all new components fully mobile responsive
  - Updated IconicFlavorsBadges with flexible wrapping and smaller mobile badge sizes
  - Enhanced WaterHeroSection with aspect ratio scaling and responsive dimensions
  - Optimized NutritionLabel with mobile-friendly grid layouts and smaller feature badges
  - Reduced padding and improved touch targets throughout all sections
  - Components now perfectly match mobile design patterns as shown in user mockups
  - Fixed mobile layout order so product grid appears above flavor picker

- **WATER HERO SECTION INTEGRATION** (August 1, 2025): Added water hero section with floating LOONER can
  - Created WaterHeroSection component using exact Figma specifications (1425x453px)
  - Added Rectangle 26 background image showing turquoise water with floating LOONER can
  - Positioned section between IconicFlavorsBadges and NutritionLabel components
  - Component uses precise dimensions matching Frame_2 CSS module structure
  - Implements authentic product imagery from user-provided Figma assets
  - Fully responsive design with aspect ratio scaling for mobile devices

- **ICONIC FLAVORS BADGES IMPLEMENTATION** (August 1, 2025): Built exact badge section using user-provided images
  - Created IconicFlavorsBadges component with 6 badge images (Rectangle 12-17)
  - Used exact badge assets: Iconic Flavors, Made in Minnesota, Cannabis Infused, Made with Cane Sugar, Plant Derived
  - Simple white rectangle layout with evenly spaced images matching Figma reference
  - Replaced text-based badges with authentic design assets from Figma

- **NUTRITION LABEL COMPONENT** (August 1, 2025): Built comprehensive nutrition facts panel
  - Created NutritionLabel component with product info and nutrition facts
  - Dynamic content based on selected product flavor and description
  - Includes feature badges (Plant-Derived THC, Cane Sugar, Vegan, Gluten-Free, Filtered Water)
  - Professional nutrition facts table with proper Daily Value percentages

- **LAKE BACKGROUND INTEGRATION** (August 1, 2025): Applied beautiful lake background from Figma design to product page
  - Added lake-background.png to public folder from user-provided Figma asset
  - Updated ProductPage component main container with lake background image styling
  - Applied subtle white overlay (bg-white/20) for better content readability
  - Maintained all existing functionality while enhancing visual design to match Figma specifications
  - Lake background covers full viewport with responsive background-size: cover

- **FIGMA BUILD PLAN INTEGRATION** (August 1, 2025): Successfully integrated all 7 Figma-based components into existing product page
  - Enhanced /products/sodas/10mg with ProductImageGallery, IngredientIcons, ReviewsSummary, BrandStorySection, LocalSourcingSection, and RelatedFlavors
  - Preserved existing functional components (flavor selector, purchase options, nutrition facts)
  - Created comprehensive component showcase at /component-demo for development review
  - Fixed FlavorPickerVariants component error with undefined title handling
  - All components follow Figma specifications with proper Tailwind styling and Next.js Image optimization

- **FIGMA PRODUCT PAGE REDESIGN** (August 1, 2025): Implemented comprehensive Olipop-style product page redesign
  - Created NewProductPage component based on exact Figma specifications from design team
  - Implemented product gallery with main images, video section, and dynamic color variant backgrounds
  - Added comprehensive ingredients section with blue background (#b2fffb) featuring nutrition facts panel
  - Built interactive flavor selector with 6 color variants (Half & Half, Peach Lemonade, Classic Lemonade, Pink Lemonade, Mule Mocktail, Cherry Cola)
  - Integrated purchase options with one-time purchase vs subscription pricing models
  - Added product features grid (10mg THC, Made with Cane Sugar, Gluten Free badges)
  - Implemented "You May Also Like" recommendations section
  - Updated /products/sodas/10mg and /products/sodas/50mg routes to use new design
  - Maintained real Shopify product data integration with proper error handling

- **OLIPOP-STYLE SHOP PAGE** (July 30, 2025): Implemented comprehensive shop page based on Figma specifications
  - Created new /shop route with Olipop-inspired design system featuring cream background (#fff7e5)
  - Built ShopGrid component with product filtering by collection (Beverages, Gummies)  
  - Designed ShopProductCard components with dynamic background colors matching Olipop aesthetic
  - Added hero section with gradient background and wave dividers for visual consistency
  - Integrated real Shopify product data with THC content badges and star ratings
  - Implemented proper routing to product-specific pages based on product tags and THC content
  - Added collection filtering with product counts and responsive grid layouts
  - Shop page serves as comprehensive product catalog complementing existing product-specific pages