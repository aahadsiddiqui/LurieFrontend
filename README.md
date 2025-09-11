# Lurie Frontend

A modern Next.js 14 application with Microsoft Entra ID SSO integration, built with TypeScript, Tailwind CSS, and shadcn/ui components.

## Features

- 🔐 **Microsoft Entra ID SSO** - Secure authentication with MSAL
- 🎨 **Modern UI** - Clean, responsive design with dark mode support
- ⚡ **Next.js 14** - App Router with TypeScript
- 🎭 **Framer Motion** - Smooth animations and transitions
- 🎯 **shadcn/ui** - Beautiful, accessible components
- 🔒 **JWT Verification** - Server-side token validation with jose

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Authentication**: MSAL (Microsoft Authentication Library)
- **Icons**: Lucide React
- **Animations**: Framer Motion
- **JWT**: jose library

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Microsoft Entra ID tenant with app registrations

## Setup

### 1. Clone and Install

```bash
npm install
```

### 2. Environment Configuration

Copy the example environment file and configure your Azure settings:

```bash
cp env.example .env.local
```

Update `.env.local` with your Azure Entra ID configuration:

```env
# Azure Entra ID Configuration
NEXT_PUBLIC_AZURE_TENANT_ID=your-tenant-id-here
NEXT_PUBLIC_AZURE_CLIENT_ID=your-frontend-app-id-here
AZURE_API_CLIENT_ID=your-api-app-id-here
NEXT_PUBLIC_AZURE_AUTHORITY=https://login.microsoftonline.com/your-tenant-id-here
NEXT_PUBLIC_REDIRECT_URI=http://localhost:3000
NEXT_PUBLIC_AZURE_API_SCOPE=api://your-api-app-id-here/access_as_user
```

### 3. Azure Entra ID Setup

1. **Create App Registrations**:
   - Frontend app (SPA) - for the Next.js application
   - API app - for backend authentication

2. **Configure Redirect URIs**:
   - Add `http://localhost:3000` for development
   - Add your production domain for deployment

3. **API Permissions**:
   - Grant the frontend app permission to access your API
   - Configure the API scope: `api://{api-client-id}/access_as_user`

4. **Token Configuration**:
   - Enable ID tokens
   - Configure optional claims (name, roles, etc.)

### 4. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
├── app/
│   ├── (public)/           # Public routes
│   │   └── page.tsx        # Landing page
│   ├── (protected)/        # Protected routes
│   │   ├── layout.tsx      # Protected layout wrapper
│   │   ├── episodes/       # Episodes page
│   │   └── analyst/        # Analyst page
│   ├── api/                # API routes
│   │   ├── _lib/           # Auth utilities
│   │   └── me/             # User info endpoint
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── providers.tsx       # MSAL provider
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── layout/             # Layout components
│   └── LoginGate.tsx       # Authentication wrapper
├── hooks/
│   └── useApi.ts           # API hook with auth
├── lib/
│   ├── ui/                 # UI utilities
│   └── msal.ts             # MSAL configuration
└── styles/
    └── globals.css         # Tailwind styles
```

## Key Components

### Authentication Flow

1. **LoginGate**: Wraps protected routes, handles login redirect
2. **useApi**: Custom hook for authenticated API calls
3. **JWT Verification**: Server-side token validation in `/api/_lib/auth.ts`

### UI Components

- **AppShell**: Main layout with navbar and sidebar
- **shadcn/ui**: Pre-built accessible components
- **Dark Mode**: System preference + manual toggle support

### Pages

- **Landing Page**: Public page with sign-in button
- **Episodes**: Protected page showing user info and roles
- **Analyst**: Protected page with role-based access

## API Endpoints

- `GET /api/me` - Returns authenticated user information
  - Requires: `Authorization: Bearer <token>`
  - Returns: `{ ok: true, name: string, roles: string[], oid: string }`

## Security Features

- JWT token verification using Microsoft's JWKS
- Server-side authentication middleware
- Role-based access control
- Secure token storage (sessionStorage)
- CSRF protection via SameSite cookies

## Development Notes

- All environment variables are prefixed appropriately
- No hardcoded secrets in the codebase
- TypeScript strict mode enabled
- ESLint configuration included
- Responsive design with mobile-first approach

## Troubleshooting

### Common Issues

1. **"Cannot find module 'react'"**: Run `npm install` to ensure all dependencies are installed
2. **Authentication errors**: Verify your Azure app registration configuration
3. **Token validation fails**: Check that your API client ID matches the token audience
4. **Redirect URI mismatch**: Ensure the redirect URI in Azure matches your environment variable

### Debug Mode

Enable MSAL debug logging by adding to your browser console:
```javascript
localStorage.setItem('msal.debug', 'true');
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.
