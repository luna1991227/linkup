# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
多伦多微社区 (Toronto Micro Community) is a Next.js website for adult services in Toronto. The platform connects verified service providers with clients through a professional Chinese-language interface.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style, Neutral theme)
- **Icons**: Lucide React + custom PNG icons
- **Database**: Vercel Postgres (Neon)
- **Storage**: Vercel Blob for media files
- **Package Manager**: pnpm

## Development Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Architecture Overview
The application follows Next.js App Router conventions with a centralized layout system:

### Core Structure
- `src/app/layout.tsx` - Root layout with navbar and Chinese metadata
- `src/components/navbar.tsx` - Mobile-responsive navbar with logo
- `src/components/contact-methods.tsx` - Reusable contact component with custom icons
- `src/lib/db.ts` - Database schema and operations for service providers
- `src/lib/blob.ts` - Vercel blob storage utilities for media upload
- `src/lib/contacts.ts` - Contact information constants

### Pages (3 main pages)
- `/` - Home page with about, mission, and contact sections
- `/gallery` - Service provider gallery with photo/video support
- `/apply` - Application page for service providers

### Key Components
- `ProviderCard` - Gallery card component for service providers
- `ProviderModal` - Detailed modal with photo/video carousel
- `ContactMethods` - Multi-variant contact component (default/compact/vertical)

## Database Schema
Service providers table includes:
- Basic info: name, description, age, location
- Media: photos[] and videos[] arrays (Vercel blob URLs)
- Tags: flexible tagging system (replaced services/rate fields)
- Timestamps: created_at, updated_at

## Media Management
- Photos and videos stored in Vercel Blob storage
- Automatic file type detection and organization
- Upload API at `/api/upload` for handling multiple file types
- Public folder contains custom icons: phoneIcon.png, telegramIcon.png, xIcon.png, rednoteIcon.png, home.png

## Language & Localization
- **Primary Language**: Chinese (Simplified)
- **HTML Lang**: zh-CN
- **Brand Name**: 多伦多微社区 (public-facing), "linkup" (internal/technical)
- All UI text, navigation, and content in Chinese
- Contact info includes Toronto-specific social media handles (@torontovsociety)

## Contact Integration
Contact methods integrated throughout site:
- Phone: 4376003231
- Telegram: @torontovsociety
- Twitter/X: @torontovsociety  
- RedNote: 多伦多微社区
- Uses custom PNG icons with consistent styling

## shadcn/ui Configuration
- Style: New York
- Base color: Neutral
- CSS variables enabled
- Components path: `@/components/ui`
- Utils path: `@/lib/utils`

## Import Aliases
- `@/components` - Components directory
- `@/lib` - Library utilities
- `@/hooks` - Custom hooks (if added)
- `@/` - src/ directory root