# 📚 Book Store FE

This project is a modern React application for a Book Store, refactored into an **Enterprise-level Feature-Driven Architecture (FDD)**. It follows industry best practices for scalability, type safety, and optimal rendering performance.

## 🚀 Tech Stack

- **Core Framework**: React 18, Vite, TypeScript
- **Styling**: [Vanilla Extract](https://vanilla-extract.style/) (Zero-runtime CSS) + `styled-components` (Legacy continuity)
- **State Management**:
  - **Server-State**: [@tanstack/react-query](https://tanstack.com/query/latest)
  - **Client-State**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Forms & Validation**: React Hook Form + [Zod](https://zod.dev/)
- **UI & Animations**: Radix UI (Primitives), Framer Motion
- **Networking**: Axios (with custom interceptors)

## 🏗️ Architecture: Feature-Driven Design

The codebase is organized by business domains (`features`) rather than technical roles. This prevents deeply nested spaghetti code and makes each feature highly modular and independent.

```text
src/
├── apis/            # Global API instances and clients (Axios, QueryClient)
├── assets/          # Static assets (images, icons)
├── components/      # Global shared UI components (Button, Modal, Input, etc.)
├── constants/       # Global constants
├── contexts/        # Global React Contexts (e.g., ThemeContext)
├── features/        # Core business domains (Feature-driven boundaries)
│   ├── auth/        # Authentication & Registration
│   ├── basket/      # Shopping Cart operations
│   ├── book/        # Individual book details and reviews
│   ├── books/       # Book listing, pagination, and filters
│   ├── main/        # Landing page and curated lists
│   └── order/       # Checkout and payment flows
├── hooks/           # Global custom hooks
├── mocks/           # Local mock data and structures
├── models/          # Global types and interfaces
├── pages/           # Route-level Page components
├── stores/          # Global Zustand state stores
├── styles/          # Design tokens and Vanilla Extract theme contracts
└── utils/           # Pure utility and formatting functions
```

## 🛠️ Key Conventions & Highlights

### 1. Unified Theme Strategy (Vanilla Extract)
All modern styling is written using **Vanilla Extract** (`*.css.ts`), which provides zero-runtime CSS. To ensure absolute backwards compatibility during the migration phase, the global `ThemeContext` seamlessly provides both `Vanilla Extract` class names and legacy `styled-components` objects to the component tree. 

### 2. Safe & Controlled State 
- Server state mutations and caching are completely delegated to **React Query**.
- UI constraints, modals, and globally accessible toggles are managed tightly by **Zustand**.

### 3. Absolute Path Imports
All imports utilize aliased absolute paths (`@/`) to avoid messy and brittle `../../../` directory climbing. 
_Example:_ `import { Button } from '@/components/commons/Button'`

## 💻 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- `npm` or `yarn`

### Installation & Run

```bash
# 1. Install project dependencies
npm install

# 2. Start the Vite development server
npm run dev

# 3. Build for production (Emits to /dist)
npm run build
```
