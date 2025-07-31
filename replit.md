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

- **OLIPOP-STYLE SHOP PAGE** (July 30, 2025): Implemented comprehensive shop page based on Figma specifications
  - Created new /shop route with Olipop-inspired design system featuring cream background (#fff7e5)
  - Built ShopGrid component with product filtering by collection (Beverages, Gummies)  
  - Designed ShopProductCard components with dynamic background colors matching Olipop aesthetic
  - Added hero section with gradient background and wave dividers for visual consistency
  - Integrated real Shopify product data with THC content badges and star ratings
  - Implemented proper routing to product-specific pages based on product tags and THC content
  - Added collection filtering with product counts and responsive grid layouts
  - Shop page serves as comprehensive product catalog complementing existing product-specific pages