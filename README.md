<div align='center'>
  <img src='https://github.com/user-attachments/assets/69ec2124-3852-4ef1-a62b-1b81d9385a5a' width='300px'>
</div>

# CarePortal MVP

A Next.js-based healthcare facility matching platform that helps patients find appropriate care facilities based on their needs and location.

## Project Overview

CarePortal MVP is a web application designed to streamline the process of matching patients with healthcare facilities. The platform offers:

- Multi-language support (English, German, Spanish, French)
- Multi-step patient registration form
- Intelligent facility matching based on care type and location
- Real-time form validation and state management
- GDPR-compliant data handling

### Core Features

- **Smart Facility Matching**: Matches patients with facilities based on:

  - Care type (Stationary, Ambulatory, Day Care)
  - Geographic location (ZIP code-based matching)
  - Facility capacity and availability

- **Progressive Form Flow**:

  - Terms acceptance
  - Personal information collection
  - Care type selection
  - Location information
  - Results presentation

- **Internationalization**: Full i18n support with locale-specific routing and content

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- Supabase account (for database)

### Installation

1. Clone the repository

```bash
git clone https://github.com/David-Lazaro-Fernandez/caremates-coding-challenge.git
cd caremates-coding-challenge
```

2. Install dependencies

```bash
npm install
# or
yarn install
```

3. Set up environment variables

```bash
cp .env.example .env.local
```

Required environment variables:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Usage

### Development Mode

```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:3000`

### Production Build

```bash
npm run build
npm run start
# or
yarn build
yarn start
```

## Architecture & Design

### Technology Stack

- **Frontend**: Next.js 15.2.1 with App Router
- **Styling**: Tailwind CSS
- **Form Management**: React Hook Form with Zod validation
- **State Management**: Context API
- **Database**: Supabase
- **Internationalization**: next-intl
- **UI Components**: Radix UI primitives

### Key Components

1. **Form Context System**

```1:31:src/context/form-context.tsx
"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  useEffect,
} from "react";

export interface SurveyFormData {
  id?: string;
 termsAccepted?: boolean;
  firstName?: string;
  middleName?: string;
  lastName?: string;
  careType?: "stationary" | "ambulatory" | "daycare";
  zipCode?: string;
}

type FormStep = "terms" | "personalInfo" | "careType" | "location" | "results";

interface FormContextType {
  formData: SurveyFormData;
  completedSteps: FormStep[];
  currentStep: FormStep;
 updateFormData: (data: Partial<SurveyFormData>) => void;
  setStepCompleted: (step: FormStep) => void;
  isStepCompleted: (step: FormStep) => boolean;
  resetForm: () => void;
}
```

2. **Facility Matching Logic**

```61:99:src/services/facility-service.ts
export function findMatchingFacilities(
  careType: string,
  zipCode: string,
): FacilityMatchResult {
  if (careType === "daycare") {
    return { matched: false, facilities: [] };
  }

  const patientZip = Number.parseInt(zipCode, 10);

  const matchingFacilities = facilities.filter((facility) => {
    if (
      careType === "stationary" &&
      (facility.careType === "Stationary" ||
        facility.careType === "Stationary & Ambulatory")
    ) {
      return true;
    }
    if (
      careType === "ambulatory" &&
      (facility.careType === "Ambulatory" ||
        facility.careType === "Stationary & Ambulatory")
    ) {
      return true;
    }
    return false;
  });

  const servingFacilities = matchingFacilities.filter(
    (facility) =>
      patientZip >= facility.zipCodeStart && patientZip <= facility.zipCodeEnd,
  );

  if (servingFacilities.length === 0) {
    return { matched: false, facilities: [] };
  }

  return { matched: true, facilities: servingFacilities };
}
```

3. **Multi-language Support**

```1:19:src/middleware.ts
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Enable a redirect to a matching locale at the root
    "/",

    // Set a cookie to remember the previous locale for
    // all requests that have a locale prefix
    "/(de|en|fr|es)/:path*",

    // Enable redirects that add missing locales
    // (e.g. `/pathnames` -> `/en/pathnames`)
    "/((?!_next|_vercel|.*\\..*).*)",
  ],
};
```

## Code Organization

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── context/            # React Context providers
├── services/           # Business logic and API services
├── lib/                # Utility functions and helpers
├── types/              # TypeScript type definitions
└── i18n/               # Internationalization config
```

## Deployment

The application is configured for deployment on Vercel:

1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy using Vercel's automatic deployment pipeline

## Testing

```bash
npm run test
# or
yarn test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request

## Known Issues & Future Work

### Current Limitations

- Day Care facility matching needs enhancement
- Limited facility data validation
- No real-time facility availability updates

### Planned Improvements

- Advanced search filters
- Real-time facility capacity updates
- Patient appointment scheduling
- Administrative dashboard
- Enhanced analytics and reporting

## License

MIT License - See LICENSE file for details

## Contact

For support or queries, please open an issue in the repository or contact the maintainers.

---

This project uses various open-source packages - see `package.json` for the full list:

```1:39:package.json
{
  "name": "caremates",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "@hookform/resolvers": "^4.1.3",
    "@radix-ui/react-label": "^2.1.2",
    "@radix-ui/react-radio-group": "^1.2.3",
    "@radix-ui/react-slot": "^1.1.2",
    "@supabase/supabase-js": "^2.49.1",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "lucide-react": "^0.477.0",
    "next": "15.2.1",
    "next-intl": "^3.26.5",
    "react": "^19.0.0",
    "react-confetti": "^6.4.0",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.54.2",
    "tailwind-merge": "^3.0.2",
    "tailwindcss-animate": "^1.0.7",
    "zod": "^3.24.2"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "prettier": "3.5.3",
    "tailwindcss": "^4",
    "typescript": "^5"
  }

```
