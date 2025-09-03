# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
LinkUp is a Next.js website for legal local adult services. The platform connects service providers with clients through a professional interface.

## Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui (New York style, Neutral theme)
- **Icons**: Lucide React
- **Package Manager**: pnpm

## Development Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production with Turbopack  
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## Architecture
The application follows Next.js App Router conventions:
- `src/app/` - Main application pages and layouts
- `src/components/` - Reusable React components
- `src/components/ui/` - shadcn/ui components
- `src/lib/` - Utility functions and shared logic
- `src/hooks/` - Custom React hooks

## Pages Structure
- `/` - Home page (introduce the platform)
- `/about` - About us and why choose LinkUp
- `/gallery` - Service provider gallery
- `/social` - Social media links
- `/apply` - Become a service provider application
- `/request` - Request service from providers

## shadcn/ui Configuration
- Style: New York
- Base color: Neutral
- CSS variables enabled
- Components path: `@/components/ui`
- Utils path: `@/lib/utils`

## Import Aliases
- `@/components` - Components directory
- `@/lib` - Library utilities
- `@/hooks` - Custom hooks
- `@/` - src/ directory root