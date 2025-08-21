# Overview

This is a full-stack web application built with Express.js backend and React frontend. The project appears to be a text conversion application that transforms user input into "Jadoo Bits" format. It uses a modern tech stack with TypeScript, shadcn/ui components, TailwindCSS for styling, and Drizzle ORM for database operations. The application is structured as a monorepo with shared types and schemas between client and server.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **React with TypeScript**: Main UI framework using functional components and hooks
- **Vite**: Build tool and development server for fast development experience
- **shadcn/ui + Radix UI**: Comprehensive component library providing accessible, pre-styled components
- **TailwindCSS**: Utility-first CSS framework for styling with custom design tokens
- **Wouter**: Lightweight client-side routing library for navigation
- **TanStack Query**: Data fetching and caching library for API state management
- **React Hook Form**: Form handling with validation support

## Backend Architecture
- **Express.js**: Web framework handling HTTP requests and API routes
- **TypeScript**: Type safety across the entire backend codebase
- **Memory Storage**: In-memory data storage implementation with interface for future database migration
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **RESTful API**: Standard REST endpoints with `/api` prefix for client-server communication

## Data Layer
- **Drizzle ORM**: Type-safe database toolkit with PostgreSQL dialect
- **PostgreSQL**: Production database (configured via DATABASE_URL environment variable)
- **Zod Integration**: Runtime type validation using drizzle-zod for schema validation
- **Shared Schema**: Common type definitions between client and server in `/shared` directory

## Development Tools
- **Hot Module Replacement**: Vite HMR for instant frontend updates during development
- **TypeScript Compilation**: Strict type checking across the entire codebase
- **ESBuild**: Fast bundling for production server builds
- **Path Aliases**: Clean import paths using TypeScript path mapping

## Project Structure
- `/client`: React frontend application with components, pages, and utilities
- `/server`: Express backend with routes, storage layer, and server configuration
- `/shared`: Common schemas and types shared between frontend and backend
- Component organization follows atomic design with `/components/ui` for reusable UI elements

# External Dependencies

## Database Services
- **Neon Database**: Serverless PostgreSQL provider (@neondatabase/serverless)
- **PostgreSQL**: Primary database for production data storage

## UI Component Libraries
- **Radix UI**: Headless, accessible component primitives for complex UI elements
- **shadcn/ui**: Pre-built component system built on top of Radix UI
- **Lucide React**: Icon library providing consistent iconography

## Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **Date Handling**: date-fns library for date manipulation and formatting
- **Class Management**: clsx and tailwind-merge for conditional CSS classes

## Build and Development
- **Vite Ecosystem**: React plugin, runtime error overlay, and development tools
- **PostCSS**: CSS processing with TailwindCSS and Autoprefixer plugins
- **ESM Modules**: Modern JavaScript module system throughout the application

## Form and Validation
- **React Hook Form**: Form state management and validation
- **Hookform Resolvers**: Integration between React Hook Form and validation libraries
- **Zod**: Schema validation library integrated with Drizzle ORM