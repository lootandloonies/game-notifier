# Free Games Bot - Replit Configuration

## Overview

This is a full-stack web application that aggregates and displays free games from various gaming platforms like Epic Games Store, Steam, GOG, and Ubisoft Connect. The application features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data storage and Drizzle ORM for database operations.

**Status**: Successfully deployed and fully functional as of July 24, 2025. All core features are working including game display, filtering, search, and platform-specific browsing.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Framework**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with a dark gaming theme
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Management**: Express sessions with PostgreSQL store (connect-pg-simple)

### Database Schema
The application uses a single main table for games with the following structure:
- **games table**: Stores game information including title, description, platform, rating, genre, pricing, claim URLs, and timestamps
- **Primary Key**: Auto-incrementing serial ID
- **Key Fields**: Title, platform, rating, genre, claim URL, end date, and free status

## Key Components

### Frontend Components
1. **Header**: Navigation bar with branding and notification system
2. **FilterSidebar**: Advanced filtering by platform, genre, rating, and search
3. **GameCard**: Individual game display with rating, platform badges, and claim buttons
4. **Footer**: Site links and social media integration
5. **UI Components**: Complete shadcn/ui component library for consistent design

### Backend Services
1. **GameService**: Business logic for game CRUD operations and filtering
2. **Storage Layer**: Abstracted storage interface with in-memory implementation for development
3. **Route Handlers**: Express routes for game API endpoints
4. **Vite Integration**: Development server setup with HMR support

### Database Integration
- **Drizzle Kit**: Database migration and schema management
- **Neon Database**: PostgreSQL serverless database integration
- **Schema Validation**: Zod schemas for runtime type checking and validation

## Data Flow

1. **Client Request**: Frontend makes API calls using TanStack Query
2. **API Layer**: Express routes handle requests and validate input
3. **Service Layer**: GameService processes business logic
4. **Storage Layer**: Drizzle ORM interacts with PostgreSQL database
5. **Response**: Data flows back through the stack to update the UI

### Key API Endpoints
- `GET /api/games`: Fetch games with optional filtering
- `GET /api/games/:id`: Fetch specific game by ID
- `POST /api/games`: Create new game entry (admin functionality)

## External Dependencies

### Database
- **Neon Database**: PostgreSQL serverless database for production
- **Drizzle ORM**: Type-safe database operations
- **connect-pg-simple**: PostgreSQL session store

### UI/UX Libraries
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library
- **React Icons**: Additional icon sets

### Development Tools
- **Vite**: Fast build tool and development server
- **TypeScript**: Type safety across the application
- **ESBuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Command**: `npm run dev` - Runs both frontend and backend in development mode
- **Hot Reload**: Vite HMR for frontend, tsx for backend auto-restart
- **Database**: Uses DATABASE_URL environment variable for connection

### Production Build
- **Frontend Build**: `vite build` compiles React app to static assets
- **Backend Build**: `esbuild` bundles server code for Node.js deployment
- **Output**: Frontend assets in `dist/public`, server bundle in `dist/index.js`
- **Start Command**: `npm start` runs the production server

### Environment Configuration
- **DATABASE_URL**: PostgreSQL connection string (required)
- **NODE_ENV**: Environment mode (development/production)
- **REPL_ID**: Replit-specific configuration for development tools

### Key Architectural Decisions

1. **Monorepo Structure**: Single repository with client, server, and shared code for easier development and deployment
2. **Shared Schema**: TypeScript types and Zod schemas shared between frontend and backend for consistency
3. **In-Memory Storage**: Development storage implementation with seed data for quick testing
4. **Gaming Theme**: Dark UI theme optimized for gaming content with custom CSS variables
5. **Real-time Updates**: 5-minute refresh interval for game data to keep information current
6. **Platform Agnostic**: Designed to easily integrate with multiple gaming platform APIs

## Recent Changes (July 24, 2025)

### Completed Implementation
✓ **Gaming-themed UI**: Dark purple and teal color scheme with hover effects
✓ **Game Cards**: Display with ratings, platform badges, and claim buttons  
✓ **Advanced Filtering**: Platform checkboxes, genre dropdown, rating filters
✓ **Search Functionality**: Real-time search through game titles and descriptions
✓ **Sorting Options**: Latest, rating, name, and end date sorting
✓ **Responsive Design**: Grid/list view toggle and pagination
✓ **API Integration**: Fixed query parameter parsing and URL construction
✓ **Error Handling**: Proper error states for failed API calls
✓ **TypeScript Issues**: Resolved all compilation and type errors

### Technical Fixes Applied
- Fixed Tailwind CSS compilation errors with hover opacity
- Corrected SelectItem components to use valid value props  
- Enhanced backend API parameter parsing for platform arrays
- Implemented custom queryFn for proper frontend-backend communication
- Added comprehensive error handling for API validation failures

### Current Functionality
The application successfully displays 6 sample games from Epic Games and Steam platforms with working filters, search, and interactive UI elements. All core features are operational and user-tested.