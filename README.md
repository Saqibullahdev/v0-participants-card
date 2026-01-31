# v0 IRL Event Landing Template

A customizable landing page template for hosting v0 IRL events around the world. This template was originally created for the "Prompt to Production" events and includes an interactive 3D lanyard generator, event agenda, sponsor showcase, and registration CTAs.

[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=nextdotjs)](https://nextjs.org)

---

## Table of Contents

- [Features](#features)
- [Quick Start](#quick-start)
- [Customization Guide](#customization-guide)
  - [1. Event Information](#1-event-information)
  - [2. Lanyard Customization](#2-lanyard-customization)
  - [3. Sponsors and Partners](#3-sponsors-and-partners)
  - [4. Agenda](#4-agenda)
  - [5. Metadata and SEO](#5-metadata-and-seo)
  - [6. Footer Links](#6-footer-links)
- [Creating Custom Lanyard Textures](#creating-custom-lanyard-textures)
- [Project Structure](#project-structure)
- [Deployment](#deployment)
- [Credits](#credits)

---

## Features

- Interactive 3D lanyard with physics simulation (React Three Fiber + Rapier)
- Personalized badge generator with dark/light variants
- Export badge as PNG
- Shareable lanyard URLs with encryption
- Animated text effects and transitions
- Responsive design (mobile-first)
- Dithered animated background
- Sponsor/partner logo carousel

---

## Quick Start

### Option 1: Fork on GitHub

1. Fork this repository
2. Clone your fork locally
3. Install dependencies: `npm install` or `pnpm install`
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000)

### Option 2: Use with v0

1. Go to [v0.app](https://v0.app)
2. Import this repository or start a new chat
3. Make changes using natural language prompts
4. Deploy directly to Vercel

---

## Customization Guide

### 1. Event Information

#### Hero Section (`components/hero-section.tsx`)

Update the main event details:

```tsx
// Line ~35-38: Event date and location
<DecryptedText
    text="Thursday February 5th, 2026 - New York City"  // <-- Change this
    ...
/>

// Lines ~40-50: Event title (currently "Prompt to Production")
<TextEffect ...>
    Prompt           // <-- Change line 1
</TextEffect>
<TextEffect ...>
    to Production    // <-- Change line 2
</TextEffect>

// Lines ~52-57: Event description
<TextEffect ...>
    v0 is getting ready to launch its biggest product update yet...  // <-- Change this
</TextEffect>

// Lines ~66-82: CTA buttons
<Button ...>
    <Link href="#link">  // <-- Update registration link
        Register Now
    </Link>
</Button>
<Button ...>
    <Link href="#link">  // <-- Update contact link
        Contact Host
    </Link>
</Button>
```

### 2. Lanyard Customization

#### Changing City and Date on the Lanyard

The lanyard displays dynamic city and date text. Update these in `components/lanyard-with-controls.tsx`:

```tsx
// Lines 189-190 in the CardTemplate component
<CardTemplate
    ref={cardTemplateRef}
    userName={inputValue}
    variant={cardVariant}
    onTextureReady={handleTextureReady}
    city='guadalajara'    // <-- Change to your city
    date='05.02.2026'     // <-- Change to your event date (DD.MM.YYYY format)
/>
```

#### Social Share Message (`components/lanyard-with-controls.tsx`)

Update the share message for social media (around line 113):

```tsx
const shareMessage = appliedName
    ? `I'll be at @v0 Prompt to Production Guadalajara! Check out my personalized lanyard`  // <-- Change this
    : `Check out v0 IRL Guadalajara! Create your personalized event lanyard`;  // <-- And this
```

#### Export Filename (`components/card-template.tsx`)

Update the downloaded file name (around line 159):

```tsx
link.download = `v0-guadalajara-${userName || "card"}.png`;  // <-- Change "guadalajara" to your city
```

### 3. Sponsors and Partners

#### Logo Carousel (`components/hero-section.tsx`)

Add or modify sponsor logos in the InfiniteSlider (around line 92):

```tsx
<InfiniteSlider speedOnHover={20} speed={40} gap={112}>
    <div className="flex items-center">
        <V0Icon size={35} ... />
    </div>
    <div className="flex items-center">
        <VercelWordmarkIcon size={20} ... />
    </div>
    <div className="flex items-center">
        <GlobantLogoIcon size={20} ... />  // <-- Add/remove sponsor icons
    </div>
    // Add more sponsors here
</InfiniteSlider>
```

To add a new sponsor icon:
1. Create the icon component in `components/icons/`
2. Import it in `hero-section.tsx`
3. Add it to the InfiniteSlider

### 4. Agenda

#### Event Schedule (`components/agenda.tsx`)

Modify the agenda items (around line 35):

```tsx
<div className="pb-6">
    <div className="font-medium space-x-2">
        <span className='text-muted-foreground font-mono'>11:00</span>  // <-- Time
        <span>Welcome Video</span>  // <-- Title
    </div>
    <p className="text-muted-foreground mt-4">
        A special welcome from the v0 Team  // <-- Description
    </p>
</div>
// Repeat for each agenda item
```

### 5. Metadata and SEO

#### Page Metadata (`app/layout.tsx`)

Update the site metadata (around line 14):

```tsx
export const metadata: Metadata = {
    title: 'v0 IRL — Prompt to Production | NYC February 5th, 2026',  // <-- Page title
    description: 'v0 is launching its biggest product update yet...',  // <-- Meta description
    generator: 'v0.app',
}
```

### 6. Footer Links

#### Footer Navigation (`components/footer.tsx`)

Update the footer links array (around line 5):

```tsx
const links = [
    { title: 'Vercel', href: 'https://vercel.com/' },
    { title: 'v0', href: 'https://v0.dev/' },
    { title: 'Meetup SDK', href: 'https://meetup-sdk.vercel.com/' },
    { title: 'v0 IRL', href: 'https://v0.app/irl' },
    // Add your own links here
]
```

---

## Creating Custom Lanyard Textures

The lanyard uses base texture images located in the public folder:

- `/card-base-dark.png` - Dark variant background
- `/card-base-light.png` - Light variant background

### Using the Existing Textures

The current textures include the "Prompt to Production" branding. To customize for your event while keeping this aesthetic:

1. Update city and date via the `city` and `date` props in `lanyard-with-controls.tsx` (lines 189-190)
2. The text is rendered dynamically on the canvas

### Creating Your Own Textures

<!-- 
TODO: Add your custom texture creation guide here

Options to consider:
1. Design requirements (1376x1376px recommended)
2. Design tools (Figma, Photoshop, etc.)
3. Template files location (if providing)
4. Safe zones for dynamic text placement
5. Color considerations for dark/light variants

Example section:

### Texture Specifications

- **Dimensions:** 1376 x 1376 pixels
- **Format:** PNG with transparency support
- **Files to replace:**
  - `/public/card-base-dark.png`
  - `/public/card-base-light.png`

### Design Guidelines

1. Keep the bottom ~400px area clear for the user's name
2. Keep the top ~150px area clear for city/date text
3. Ensure good contrast for text readability
4. Test both dark and light variants

### Template Files

[Link to Figma template or download]

-->

**Note:** If you need help creating custom textures, you can:
- Use design tools like Figma, Canva, or Photoshop
- Ensure dimensions are 1376x1376 pixels
- Save as PNG format
- Replace the files in the public folder

---

## Project Structure

```
/
├── app/
│   ├── layout.tsx          # Root layout, metadata, fonts
│   ├── page.tsx            # Home page composition
│   ├── globals.css         # Global styles and theme tokens
│   └── lanyard/
│       └── page.tsx        # Shareable lanyard page
├── components/
│   ├── hero-section.tsx    # Main hero with event info
│   ├── features-3.tsx      # Event highlights cards
│   ├── agenda.tsx          # Event schedule
│   ├── call-to-action.tsx  # Registration CTA section
│   ├── footer.tsx          # Footer with links
│   ├── header.tsx          # Navigation header
│   ├── lanyard-with-controls.tsx  # Lanyard + customization UI
│   ├── card-template.tsx   # Badge texture generator
│   ├── Dither.tsx          # Animated background effect
│   ├── DecryptedText.tsx   # Animated text reveal
│   ├── ui/
│   │   └── lanyard.tsx     # 3D lanyard component (R3F)
│   ├── icons/              # SVG icon components
│   └── motion-primitives/  # Animation components
├── lib/
│   └── utils.ts            # Utility functions
├── types/                  # TypeScript definitions
└── public/
    ├── card-base-dark.png  # Dark lanyard texture
    ├── card-base-light.png # Light lanyard texture
    └── *.png               # Favicon and other assets
```

---

## Deployment

### Deploy to Vercel

The easiest way to deploy is with Vercel:

1. Push your customized code to GitHub
2. Import the repository on [Vercel](https://vercel.com/new)
3. Vercel will automatically detect Next.js and configure the build

### Environment Variables

No environment variables are required for the base template.

---

## Credits

Built with:
- [v0.app](https://v0.app) - AI-powered development
- [Next.js](https://nextjs.org) - React framework
- [Tailwind CSS](https://tailwindcss.com) - Styling
- [React Three Fiber](https://r3f.docs.pmnd.rs/) - 3D rendering
- [Rapier](https://rapier.rs/) - Physics simulation
- [Tailark](https://tailark.com/) - UI components
- [React Bits](https://reactbits.dev/) - Animation primitives
- [shadcn/ui](https://ui.shadcn.com/) - UI components

---

## License

Feel free to use this template for your v0 IRL events. Attribution appreciated but not required.

---

**Questions?** Open an issue or reach out to the v0 community.
