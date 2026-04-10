# Upwork Closer — Frontend

Next.js dashboard for **AI-powered Upwork proposal optimization**. Connects to the backend API to analyze job postings, generate winning proposals, build proof-of-competence ideas, score proposals, and generate win strategies.

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript 5
- **UI:** Tailwind CSS 4, shadcn/ui (base-nova style), @base-ui/react
- **Icons:** @iconify/react (hugeicons set)
- **State:** Zustand (auth), TanStack React Query (server state)
- **Forms:** React Hook Form + Zod validation
- **HTTP:** Axios with auth interceptor + response envelope unwrapping
- **Animations:** Motion (Framer Motion)

## Project Structure

```
src/
├── app/
│   ├── globals.css              # Tailwind config, brand colors, theme tokens
│   ├── layout.tsx               # Root layout (dark mode, fonts, providers)
│   ├── (auth)/                  # Auth pages (no sidebar)
│   │   ├── login/
│   │   ├── register/
│   │   ├── verify/
│   │   ├── forgot-password/
│   │   └── reset-password/
│   └── (dashboard)/             # Dashboard pages (with sidebar)
│       ├── page.tsx             # / — Home dashboard
│       ├── jobs/
│       │   ├── page.tsx         # /jobs — Job list
│       │   └── [id]/page.tsx    # /jobs/:id — Job detail (5 AI tabs)
│       ├── proposals/
│       │   ├── page.tsx         # /proposals
│       │   └── [id]/page.tsx    # /proposals/:id
│       ├── projects/page.tsx    # /projects
│       └── settings/page.tsx    # /settings — Profile & preferences
├── components/
│   ├── dashboard/               # Sidebar, topbar, stats grid
│   ├── guards/                  # AuthGuard, GuestGuard
│   ├── jobs/                    # Job list, job detail, 5 AI tab components
│   ├── settings/                # Profile, preferences, danger zone
│   ├── shared/                  # Notifications
│   └── ui/                      # shadcn primitives (button, input, dropdown, sidebar, etc.)
├── hooks/
│   ├── use-auth.ts              # Auth redirect logic
│   ├── use-job-detail.ts        # Job, analysis, proposal, proof, scoring, strategy queries/mutations
│   ├── use-jobs.ts              # Dashboard stats, job list, create job
│   ├── use-mobile.ts            # Mobile breakpoint detection
│   └── use-settings.ts          # User profile & preferences queries/mutations
├── lib/
│   ├── api.ts                   # Axios instance with auth + response interceptors
│   ├── utils.ts                 # cn() helper
│   └── validations/             # Zod schemas
├── providers/
│   ├── app-providers.tsx        # Composes QueryProvider + TooltipProvider + Notifications
│   └── query-provider.tsx       # TanStack Query client (30s stale time, devtools)
└── store/
    └── auth-store.ts            # Zustand auth store (sessionStorage-backed JWT)
```

## Getting Started

### Prerequisites

- Node.js 20+
- Backend API running (see [backend README](../backend/README.md))

### 1. Install

```bash
cd frontend
npm install
```

### 2. Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL |

### 3. Start Development Server

```bash
npm run dev
```

Opens at `http://localhost:3000`.

## Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve production build |
| `npm run lint` | Run ESLint |

## Pages

### Auth (no sidebar)

| Route | Page |
|---|---|
| `/login` | Email + password login |
| `/register` | Create account |
| `/verify` | OTP email verification |
| `/forgot-password` | Request password reset |
| `/reset-password` | Set new password |

### Dashboard (with sidebar)

| Route | Page |
|---|---|
| `/` | Home — stats grid, recent jobs, quick job creation |
| `/jobs` | All jobs list with proposal counts and scores |
| `/jobs/:id` | Job detail with 5 AI-powered tabs |
| `/settings` | Profile, preferences, and account management |

### Job Detail Tabs (`/jobs/:id`)

1. **Analysis** — Auto-generates on first visit. Shows client intent, key requirements, hidden expectations, budget signal, urgency, win strategy
2. **Proposal** — Generate AI proposals with tone selection (Formal/Confident/Friendly). Editable textarea with copy-to-clipboard and regenerate
3. **Proof Builder** — AI-suggested portfolio project ideas with "Why This Helps" and "Demo Suggestion" sections
4. **Score** — Pick a proposal to score. Shows 0–100 gauge, feedback, weaknesses, and improvement suggestions
5. **Strategy** — Positioning angle, how to win, what to emphasize, what to avoid

## Architecture

### Auth Flow

1. User registers/logs in → backend returns JWT
2. Token stored in Zustand (sessionStorage-backed)
3. Axios request interceptor attaches `Bearer <token>` to every request
4. `AuthGuard` redirects unauthenticated users to `/login`
5. `GuestGuard` redirects authenticated users to `/`

### API Integration

- Axios instance in `src/lib/api.ts` with:
  - **Request interceptor:** Attaches JWT from auth store
  - **Response interceptor:** Auto-unwraps backend's `{ success: true, data: {...} }` envelope
- All API calls go through TanStack React Query hooks in `src/hooks/`
- Queries have 30s stale time, no refetch-on-focus

### Styling

- **Tailwind CSS v4** with CSS-based configuration (no `tailwind.config.js`)
- **Dark mode only** — `dark` class on `<html>`
- **Brand color:** Teal/cyan palette (`#15d5c3` primary)
- **Font:** Miranda Sans
- **shadcn/ui** components use `base-nova` style with `@base-ui/react` primitives (uses `render` prop, not `asChild`)

## Production

```bash
npm run build
npm start
```
