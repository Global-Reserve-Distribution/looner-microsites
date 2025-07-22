# LOONER THC Beverages - Olipop-Inspired Development Specification

## Overview

This specification outlines building a modern e-commerce website for LOONER THC Beverages, inspired by Olipop's design patterns and user experience. The site will maintain the existing Next.js + Shopify Storefront API integration while implementing Olipop's visual design system and interaction patterns.

## Design Philosophy

**Key Design Elements from Olipop:**
- Clean, minimal product pages with large hero imagery
- Grid-based flavor/product selection with visual product cards
- Sticky product information panel for easy purchasing
- Vibrant, organic color schemes with natural textures
- Emphasis on health benefits and ingredient transparency
- Mobile-first responsive design with smooth animations

**LOONER Brand Adaptation:**
- Cannabis-themed color palette (greens, earth tones)
- THC beverage messaging and benefits
- Cannabis leaf iconography
- Relaxation and wellness positioning

---

## Core Reusable Components

### 1. `FlavorSelectorGrid` (Priority: High)

**Purpose**: Primary product discovery component allowing users to browse and select THC beverage flavors.

**Features**:
- Grid layout (3-4 columns desktop, 2 mobile)
- Product image thumbnails with hover effects
- Flavor name and THC content display
- Active state highlighting for current product
- Quick navigation between product pages

**Data Structure**:
```typescript
interface FlavorGridItem {
  handle: string;
  title: string;
  featuredImage: string;
  thcContent: string;
  price: string;
  available: boolean;
}
```

**GraphQL Integration**:
```graphql
query FlavorGrid($collectionHandle: String!) {
  collectionByHandle(handle: $collectionHandle) {
    products(first: 20) {
      edges {
        node {
          id
          title
          handle
          availableForSale
          priceRange {
            minVariantPrice {
              amount
              currencyCode
            }
          }
          featuredImage {
            url
            altText
          }
          metafields(first: 5) {
            edges {
              node {
                namespace
                key
                value
              }
            }
          }
        }
      }
    }
  }
}
```

### 2. `StickyProductPanel` (Priority: High)

**Purpose**: Fixed sidebar/bottom panel containing essential purchase information and actions.

**Features**:
- Product title and pricing
- THC content and dosage information
- Quantity selector with +/- buttons
- Add to cart button with loading states
- Subscription options toggle
- Store locator integration
- Nutritional highlights

**Responsive Behavior**:
- Desktop: Fixed right sidebar
- Mobile: Sticky bottom panel with slide-up details

### 3. `THCContentBadge` (Priority: Medium)

**Purpose**: Consistent display of THC content with regulatory compliance.

**Features**:
- THC mg amount prominently displayed
- Cannabis leaf icon
- Color-coded potency levels (low/medium/high)
- Hover tooltip with dosage guidance
- Compliance disclaimer

### 4. `BenefitsIconGrid` (Priority: Medium)

**Purpose**: Visual display of product benefits and features.

**Icon Categories**:
- Cannabis benefits (Relaxation, Focus, Sleep)
- Health features (Organic, Non-GMO, Sugar-Free)
- Lifestyle (Vegan, Gluten-Free, Natural)

**Data Source**: Shopify product tags and metafields

### 5. `ProductHeroSection` (Priority: High)

**Purpose**: Large format product imagery with overlay content.

**Features**:
- High-resolution product photography
- Gradient overlays for text readability
- Animated entrance effects
- Mobile-optimized aspect ratios
- Lazy loading for performance

### 6. `NutritionPanel` (Priority: Medium)

**Purpose**: Detailed nutritional information display.

**Features**:
- Expandable/collapsible sections
- Tabbed interface (Nutrition Facts, Ingredients, Benefits)
- Cannabis-specific information (THC, CBD, terpenes)
- Allergen and dietary restriction indicators

### 7. `ReviewsSection` (Priority: Medium)

**Purpose**: Customer feedback and rating display.

**Features**:
- Star rating visualization
- Filtered review display (by rating, date, verified purchase)
- Review helpfulness voting
- Photo reviews integration
- Cannabis-specific review categories (effects, taste, onset time)

### 8. `RelatedProductsCarousel` (Priority: Low)

**Purpose**: Cross-selling and product discovery.

**Features**:
- Horizontal scrolling product cards
- "You May Also Like" recommendations
- Category-based suggestions
- Add to cart from carousel

---

## Page Layout Structure

### Product Detail Page (`/products/[handle]`)

```
┌─────────────────────────────────────────────────┐
│ Navigation Header                               │
├─────────────────────────────────────────────────┤
│ ProductHeroSection                              │
│ ┌─────────────────┐ ┌───────────────────────────┐│
│ │                 │ │ StickyProductPanel        ││
│ │ Product Image   │ │ - Title & Price           ││
│ │                 │ │ - THC Content Badge       ││
│ │                 │ │ - Quantity Selector       ││
│ │                 │ │ - Add to Cart             ││
│ └─────────────────┘ │ - Benefits Icons          ││
│                     └───────────────────────────┘│
├─────────────────────────────────────────────────┤
│ FlavorSelectorGrid                              │
│ ┌───┐ ┌───┐ ┌───┐ ┌───┐                        │
│ │ A │ │ B │ │ C │ │ D │                        │
│ └───┘ └───┘ └───┘ └───┘                        │
├─────────────────────────────────────────────────┤
│ Product Description & Story                     │
├─────────────────────────────────────────────────┤
│ NutritionPanel (Tabs)                          │
├─────────────────────────────────────────────────┤
│ ReviewsSection                                  │
├─────────────────────────────────────────────────┤
│ RelatedProductsCarousel                         │
├─────────────────────────────────────────────────┤
│ Footer                                          │
└─────────────────────────────────────────────────┘
```

---

## Shopify Data Integration

### Required Metafields

**Product Metafields**:
```
namespace: "cannabis"
- thc_content (number): THC content in mg
- cbd_content (number): CBD content in mg
- onset_time (string): Effect onset time
- duration (string): Effect duration
- strain_type (string): Indica/Sativa/Hybrid

namespace: "nutrition"
- calories (number)
- sugar_content (number)
- organic (boolean)
- vegan (boolean)
- gluten_free (boolean)

namespace: "benefits"
- relaxation (boolean)
- focus (boolean)
- sleep (boolean)
- energy (boolean)
```

**Collection Structure**:
- `thc-beverages` (main collection)
- `low-dose` (0-5mg THC)
- `medium-dose` (5-15mg THC)
- `high-dose` (15mg+ THC)
- `flavor-categories` (citrus, berry, tropical, etc.)

### GraphQL Queries

**Main Product Query**:
```graphql
query Product($handle: String!) {
  productByHandle(handle: $handle) {
    id
    title
    description
    handle
    availableForSale
    tags
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    images(first: 10) {
      edges {
        node {
          url
          altText
          width
          height
        }
      }
    }
    variants(first: 10) {
      edges {
        node {
          id
          title
          availableForSale
          selectedOptions {
            name
            value
          }
          priceV2 {
            amount
            currencyCode
          }
        }
      }
    }
    metafields(first: 20) {
      edges {
        node {
          namespace
          key
          value
        }
      }
    }
  }
}
```

---

## Component File Structure

```
components/
├── product/
│   ├── FlavorSelectorGrid.tsx
│   ├── StickyProductPanel.tsx
│   ├── ProductHeroSection.tsx
│   ├── THCContentBadge.tsx
│   ├── BenefitsIconGrid.tsx
│   ├── NutritionPanel.tsx
│   └── RelatedProductsCarousel.tsx
├── ui/
│   ├── Button.tsx
│   ├── Badge.tsx
│   ├── Card.tsx
│   ├── Tabs.tsx
│   └── Modal.tsx
├── layout/
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── Navigation.tsx
└── cart/
    ├── CartDrawer.tsx
    ├── CartItem.tsx
    └── CartSummary.tsx
```

---

## Styling Guidelines

### Color Palette (Cannabis Theme)

```css
:root {
  /* Primary Cannabis Greens */
  --cannabis-primary: #2D5831;
  --cannabis-light: #4A7C59;
  --cannabis-accent: #8FBC8F;
  
  /* THC Indicator Colors */
  --thc-low: #90EE90;      /* Light Green */
  --thc-medium: #32CD32;   /* Lime Green */
  --thc-high: #228B22;     /* Forest Green */
  
  /* Supporting Colors */
  --earth-brown: #8B4513;
  --natural-cream: #F5F5DC;
  --warning-orange: #FF8C00;
  
  /* Neutrals */
  --text-primary: #2C3E50;
  --text-secondary: #7F8C8D;
  --background: #FFFFFF;
  --surface: #F8F9FA;
}
```

### Typography

```css
/* Headings */
.heading-xl { font-size: 3rem; font-weight: 700; }
.heading-lg { font-size: 2.25rem; font-weight: 600; }
.heading-md { font-size: 1.5rem; font-weight: 600; }

/* Body Text */
.body-lg { font-size: 1.125rem; line-height: 1.6; }
.body-md { font-size: 1rem; line-height: 1.5; }
.body-sm { font-size: 0.875rem; line-height: 1.4; }

/* Special */
.thc-badge { font-weight: 700; font-size: 1.25rem; }
.price-display { font-size: 1.5rem; font-weight: 600; }
```

---

## Animation & Interaction Patterns

### Micro-Interactions

1. **Flavor Grid Hover**: Scale transform (1.05x) with subtle shadow
2. **Add to Cart**: Button loading state with spinner
3. **THC Badge**: Pulse animation for attention
4. **Image Gallery**: Smooth transitions between images
5. **Panel Slides**: Smooth slide-in animations for mobile panels

### Loading States

- Skeleton loaders for product grids
- Shimmer effects for images
- Progress indicators for cart actions
- Smooth state transitions

---

## Performance Considerations

### Image Optimization
- Next.js Image component with priority loading
- WebP format with fallbacks
- Lazy loading for below-fold content
- Responsive image sizes

### Data Fetching
- Static generation for product pages
- Incremental Static Regeneration (ISR)
- Client-side caching with SWR
- Optimistic updates for cart actions

---

## Mobile Optimization

### Responsive Breakpoints
```css
/* Mobile First */
.mobile-first { max-width: 640px; }
.tablet { min-width: 641px; max-width: 1024px; }
.desktop { min-width: 1025px; }
```

### Mobile-Specific Components
- `MobileFlavorGrid`: 2-column layout
- `BottomSheetPanel`: Slide-up product details
- `MobileNavigation`: Hamburger menu with slide-out
- `TouchFriendlySelectors`: Larger touch targets

---

## Accessibility Requirements

### WCAG 2.1 AA Compliance
- Semantic HTML structure
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Color contrast ratios 4.5:1 minimum

### Cannabis-Specific Accessibility
- Clear THC content labeling
- Dosage guidance tooltips
- Age verification modals
- Regulatory compliance text

---

## Implementation Priority

### Phase 1: Core Components (Week 1-2)
1. FlavorSelectorGrid
2. StickyProductPanel
3. ProductHeroSection
4. THCContentBadge

### Phase 2: Enhanced Features (Week 3-4)
1. NutritionPanel
2. BenefitsIconGrid
3. ReviewsSection
4. Mobile optimizations

### Phase 3: Advanced Features (Week 5-6)
1. RelatedProductsCarousel
2. Advanced animations
3. Performance optimizations
4. Analytics integration

---

## Testing Strategy

### Component Testing
- Unit tests for each reusable component
- Mock Shopify API responses
- Accessibility testing with axe-core
- Cross-browser compatibility testing

### User Experience Testing
- Mobile device testing on real devices
- Cart flow testing
- Performance testing (Core Web Vitals)
- Cannabis industry compliance review

---

This specification provides a comprehensive roadmap for building an Olipop-inspired LOONER THC Beverages website while maintaining the existing Shopify integration and focusing on reusable, scalable components.