# SavySnap

This is a website which accpets people giving pictures of their payment, this website saves and calculate all their payment.

1. Directory Structure
   src/
   ├── app/ # Next.js App Router pages
   │ ├── (auth)/ # Route group: login, register (no sidebar)
   │ │ └── login/
   │ │ ├── components/ # Components specific to login page
   │ │ ├── styles/ # CSS modules specific to login page
   │ │ └── page.tsx
   │ ├── (dashboard)/ # Route group: admin pages (with sidebar + header)
   │ │ └── admin/
   │ │ ├── machines/
   │ │ │ ├── \_components/ # Components specific to machines feature
   │ │ │ └── page.tsx
   │ │ ├── categories/
   │ │ │ ├── machineType/
   │ │ │ │ ├── \_components/
   │ │ │ │ └── page.tsx
   │ │ │ └── zone/
   │ │ │ ├── \_components/
   │ │ │ └── page.tsx
   │ │ └── ...
   │ ├── layout.tsx # Root layout
   │ └── page.tsx # Home page (redirect)
   ├── components/ # Shared components
   │ ├── shared/ # Reusable UI components
   │ │ ├── FormModal/ # Generic form modal
   │ │ ├── header/ # Header, PageHeader
   │ │ ├── notification/ # Notification components
   │ │ └── SearchInput/
   │ ├── layouts/ # Layout components (AntdLayout)
   │ ├── config/ # Config providers (AntdConfigProvider)
   │ └── icons/ # Custom icon components
   ├── hooks/ # Custom React hooks
   ├── services/ # API service classes
   ├── stores/ # State management (Redux + Zustand)
   ├── types/ # TypeScript type definitions
   ├── configs/ # App configurations (permissions, navigation)
   ├── contexts/ # React Context providers
   ├── locales/ # i18n translation files
   ├── utils/ # Utility functions
   ├── styles/ # Global CSS files
   └── middleware.ts # Next.js middleware
