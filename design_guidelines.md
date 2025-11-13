# Westpac Homepage Clone - Design Guidelines

## Design Approach
**Exact Replication Strategy**: This is a pixel-perfect clone of the Westpac Australia corporate banking homepage. Every visual element, spacing, typography, and layout must match the original site precisely with no creative interpretation.

## Brand Identity
**Primary Brand Color**: Westpac Red (#DA1710)
**Design Personality**: Corporate, trustworthy, professional, accessible
**Visual Style**: Clean, structured, information-dense financial services design

## Typography Hierarchy
**Font Family**: Use Westpac's corporate fonts (fallback to similar system fonts if proprietary)
- Primary: Sans-serif, clean and professional
- Hierarchy: Large bold headings for sections, medium weight for navigation, regular for body text
- Navigation Links: Medium weight, neutral color with red underline on hover
- Hero Headline: Bold, large (approximately 32-36px), high contrast
- Section Headings: Bold, medium-large (24-28px)
- Article Titles: Bold, smaller (18-20px)
- Body Text: Regular weight, readable size (14-16px)

## Layout System
**Spacing Units**: Use Tailwind units of 2, 4, 6, 8, and 12 for consistent spacing
**Container Strategy**: 
- Maximum width container for main content (max-w-7xl)
- Full-width header and hero sections
- Centered content with consistent horizontal padding

**Grid Structure**:
- Header: Logo left, navigation center, Sign In right
- Hero: Full-width background image with overlay text and CTA
- Product Sections: Two-column layout (3 columns of links + 1 sidebar on desktop)
- Article Tiles: 2x2 grid on desktop, stack on mobile
- Footer: Full-width with centered content

## Component Library

### Header
- Fixed navigation bar with white background
- Westpac logo (top left)
- Horizontal navigation menu: Locate us, Contact us, Register (top right utility links)
- Main navigation: Personal, Business, Corporate (center)
- "Sign in to Mobile Banking" button (red background, white text)

### Hero Section
- Full-width background image (home/key lock visual)
- Dark overlay for text readability
- Bold white headline in caps: "LOCK IN A DISCOUNTED RATE FOR THE LIFE OF YOUR HOME LOAN PACKAGE"
- Descriptive text below headline
- Red CTA button: "Find out more" with arrow

### Product Navigation Sections
**Personal Section**:
- White background
- "Personal" heading
- 9 vertical links in 3 columns (Bank accounts, Home loans, Credit cards, Personal loans, Share Trading, Investments, Insurance, International & Travel, Superannuation)
- Each link styled with red text on hover

**Business Section**: 
- Light gray background for visual separation
- Same structure as Personal with 10 business product links

### Article Tiles Section
- "Latest articles for you" heading
- 4 tiles in 2x2 grid
- Each tile: Image (16:9 ratio), bold title, descriptive text
- First two tiles have larger images (432x325, 445x228)
- Bottom two tiles text-only with no images
- "More articles" link at bottom

### Sidebar Widgets
- 4 stacked utility boxes with white backgrounds
- Branches & ATMs: Search input field
- Overseas ATMs: Link to Global ATM finder
- Have your say: Feedback call-to-action
- Westpac Assist: Financial hardship support link

### Footer
- Light background
- Indigenous acknowledgment with decorative weave pattern image
- "Westpac acknowledges Traditional Owners..." text
- Link to Indigenous Hub

## Images

**Hero Image**: 
- Large background image showing key/lock imagery (1240x390 ratio)
- Located: `wbc-fbc_key-lock_1240x390.jpg`
- Dark overlay for text contrast

**Article Tile Images**:
1. Investment property strategies (432x325) - `wbc_sol_h_invest-prop-strat_432x325.jpg`
2. Calculating rental yield (445x228) - `wbc_sol_h_rental-yeild_445x228.jpg`
3. Business finance guide (445x228) - `wbc_sol_business-loans-and-finance-guide_445x228.jpg`
4. Business banking 101 (432x325) - `wbc_sol_h_setting-up-a-business_432x325.jpg`

**Footer Image**: Westpac weave pattern (356x130) - `wbc-AoC_westpac-weave_356x130.png`

**Logo**: Westpac wordmark in red

## Visual Treatments
- Buttons: Red background (#DA1710), white text, subtle border-radius, blur background when over images
- Links: Default dark gray, red on hover with underline
- Sections: Alternating white and light gray backgrounds for visual hierarchy
- Cards/Tiles: White background, subtle shadow, clean borders
- Input Fields: White background, gray border, rounded corners

## Responsive Behavior
- Desktop: Multi-column layouts for navigation and articles
- Tablet: 2-column navigation, 2-column article grid
- Mobile: Stack all elements vertically, hamburger menu for navigation

## Accessibility
- High contrast text on backgrounds
- Clear focus states for keyboard navigation
- Descriptive link text
- Proper heading hierarchy
- Alt text for all images