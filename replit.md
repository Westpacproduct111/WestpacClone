# Westpac Homepage Clone

## Overview

This project is a pixel-perfect clone of the Westpac Australia corporate banking homepage. It's a full-stack web application built with React on the frontend and Express on the backend, focusing on replicating the exact visual design, spacing, typography, and layout of the original Westpac website.

The application emphasizes corporate, trustworthy, and professional design with Westpac's signature red (#DA1710) as the primary brand color. The interface includes a comprehensive header with navigation, a hero section with promotional content, product sections, and article grids.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript, using Vite as the build tool and development server.

**UI Component System**: The application uses shadcn/ui, a collection of pre-built, accessible React components built on top of Radix UI primitives. This provides a comprehensive set of over 40 UI components (buttons, cards, dialogs, forms, navigation menus, etc.) that are customizable and follow consistent design patterns.

**Styling Approach**: Tailwind CSS with a custom configuration that defines Westpac-specific brand colors and design tokens. The design system uses CSS variables for theming, allowing for consistent color schemes across light/dark modes. Custom spacing units (2, 4, 6, 8, 12) ensure visual consistency throughout the application.

**State Management**: TanStack Query (React Query) v5 for server state management, providing caching, background updates, and request deduplication. Client-side state is managed through React hooks.

**Routing**: Wouter for lightweight client-side routing, currently implementing two routes: home page and a 404 not found page.

**Design System**: The project follows a strict design guidelines document that specifies exact replication requirements, including typography hierarchy, layout system (max-width containers, grid structures), and component specifications for headers, hero sections, and navigation elements.

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript, using ES modules.

**Development Mode**: In development, the server integrates with Vite's middleware mode for hot module replacement (HMR) and serves the React application through Vite's dev server.

**Production Mode**: The build process uses Vite to bundle the frontend and esbuild to bundle the backend into a single optimized output in the `dist` directory.

**Storage Layer**: The application uses an in-memory storage implementation (`MemStorage` class) that implements an `IStorage` interface. This is designed to be easily swappable with a database-backed implementation. Currently implements basic user CRUD operations (getUser, getUserByUsername, createUser).

**API Structure**: RESTful API endpoints prefixed with `/api`. The routes are registered through a centralized `registerRoutes` function that returns an HTTP server instance.

**Request Logging**: Custom middleware logs all API requests with method, path, status code, duration, and response body (truncated to 80 characters).

### Data Storage

**ORM**: Drizzle ORM configured for PostgreSQL, though currently using in-memory storage in the implementation.

**Schema Definition**: Database schema defined in `shared/schema.ts` with a users table containing id (UUID), username, and password fields. The schema uses Drizzle's type-safe query builder and Zod for runtime validation.

**Migration Strategy**: Drizzle Kit is configured to manage database migrations in the `migrations` directory. The `db:push` script allows pushing schema changes directly to the database.

**Database Connection**: Configured to use Neon serverless PostgreSQL driver (`@neondatabase/serverless`), expecting a `DATABASE_URL` environment variable.

### External Dependencies

**UI Component Libraries**:
- Radix UI (comprehensive collection of unstyled, accessible components)
- shadcn/ui (pre-styled components built on Radix UI)
- Embla Carousel for image carousels
- cmdk for command palette/search functionality
- Lucide React for iconography

**Form Handling**:
- React Hook Form for form state management
- Hookform Resolvers for validation schema integration
- Zod for schema validation

**Database & ORM**:
- Drizzle ORM for type-safe database queries
- Drizzle Zod for generating Zod schemas from Drizzle tables
- @neondatabase/serverless for PostgreSQL connections
- Drizzle Kit for migration management

**Session Management**: 
- connect-pg-simple for PostgreSQL-backed session storage (configured but not yet implemented)

**Build Tools**:
- Vite for frontend bundling and development server
- esbuild for backend bundling
- TypeScript compiler for type checking
- Tailwind CSS with PostCSS for styling

**Development Tools**:
- @replit/vite-plugin-runtime-error-modal for enhanced error overlays
- @replit/vite-plugin-cartographer for code navigation (Replit-specific)
- @replit/vite-plugin-dev-banner for development environment indicators

**Utility Libraries**:
- date-fns for date manipulation
- clsx and tailwind-merge (via cn utility) for conditional className handling
- class-variance-authority for variant-based component styling
- nanoid for generating unique IDs

**Path Aliases**: The project uses TypeScript path mapping with three main aliases:
- `@/*` → `client/src/*` (frontend components and utilities)
- `@shared/*` → `shared/*` (shared types and schemas)
- `@assets/*` → `attached_assets/*` (static assets like images)