import '../styles/globals.css'
import { Inter } from 'next/font/google'
import PremiumFooter from './PremiumFooter'
import GoogleAnalytics from '../components/GoogleAnalytics'
import Providers from './providers'
import { WebVitals } from '../components/WebVitals'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = 'https://sri-lanka-train-timetable.vercel.app'

export const metadata = {
  // ── Base URL ─────────────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),

  // ── Favicon & Icons ──────────────────────────────────────────────────
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },

  // ── Web App Manifest ─────────────────────────────────────────────────
  manifest: '/manifest.json',

  // ── Primary Meta Tags ────────────────────────────────────────────────
  title: {
    default: 'Sri Lanka Train Timetable 2026 | Railway Schedule & Times',
    template: '%s | Sri Lanka Train Timetable 2026',
  },
  description:
    'Search the 2026 Sri Lanka railway timetable. Find train schedules and departure times for Colombo Fort → Kandy, Galle, Badulla, Jaffna and 100+ stations. Updated daily.',
  
  // ── Core keywords (kept minimal — Google ignores meta keywords) ──
  keywords: [
    'sri lanka train timetable',
    'sri lanka railway time table',
    'train schedule sri lanka',
    'railway schedule 2026',
    'colombo train schedule',
  ],

  // ── Canonical URL ────────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph ───────────────────────────────────────────────────────
  openGraph: {
    type: 'website',
    locale: 'en_LK',
    url: BASE_URL,
    siteName: 'Sri Lanka Train Timetable',
    title: 'Sri Lanka Train Timetable 2026 | Railway Schedule & Times',
    description:
      'Search Sri Lanka Railways train schedules. Find departure times, routes, and timetables for Colombo Fort, Kandy, Galle, Badulla, Jaffna, and all stations across Sri Lanka.',
    images: [
      {
        url: `${BASE_URL}/images/hero2.jpg`,
        width: 1200,
        height: 630,
        alt: 'Sri Lanka Train Timetable — Railway Schedule Search',
        type: 'image/jpeg',
      },
    ],
  },

  // ── Twitter Card ─────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Lanka Train Timetable 2026 | Railway Schedule & Times',
    description:
      'Find Sri Lanka railway timetables, train schedules & departure times. Search trains from Colombo to Kandy, Galle, Jaffna & all stations.',
    images: [`${BASE_URL}/images/hero2.jpg`],
  },

  // ── Robots ───────────────────────────────────────────────────────────
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // ── Verification ─────────────────────────────────────────────────────
  verification: {
    google: '-V0RKnDbdKZRh-fAsPHmz3mZXuzZtEjYbXh0m-s5NOk',
  },

  // ── Additional Meta ──────────────────────────────────────────────────
  applicationName: 'Sri Lanka Train Timetable',
  category: 'Travel',
  creator: 'Pubudu Tharanga',
  publisher: 'Sri Lanka Train Timetable',
  formatDetection: {
    telephone: false,
    date: false,
  },
  other: {
    'geo.region': 'LK',
    'geo.placename': 'Sri Lanka',
    'geo.position': '7.8731;80.7718',
    'ICBM': '7.8731, 80.7718',
    'revisit-after': '1 day',
    'rating': 'general',
    'distribution': 'global',
    'language': 'English',
    'content-language': 'en',
  },
}

// ── JSON-LD Structured Data ──────────────────────────────────────────────

function WebSiteJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sri Lanka Train Timetable',
    alternateName: [
      'Sri Lanka Railway Time Table',
      'SL Train Schedule',
      'Sri Lanka Railways Timetable',
      'Railway Time Table Sri Lanka',
    ],
    url: BASE_URL,
    description:
      'Search Sri Lanka railway time table and train schedules. Find departure times, routes and timetables for all Sri Lanka Railways trains.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://sri-lanka-train-timetable.vercel.app/search?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
    inLanguage: 'en',
    publisher: {
      '@type': 'Organization',
      name: 'Sri Lanka Train Timetable',
      url: BASE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${BASE_URL}/images/logof.jpg`,
      },
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

function OrganizationJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Sri Lanka Train Timetable',
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    description:
      'Free online search tool for Sri Lanka Railways train schedules and timetables.',
    sameAs: [
      'https://www.linkedin.com/in/pubudutharanga',
      'https://github.com/pubudutharanga',
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

// FAQPage JSON-LD is now rendered at the page level, not in the root layout

function BreadcrumbJsonLd() {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Train Schedule Search',
        item: `${BASE_URL}/#search`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  )
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* JSON-LD Structured Data */}
        <WebSiteJsonLd />
        <OrganizationJsonLd />
        <BreadcrumbJsonLd />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hreflang for geo-targeting */}
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
        
        {/* Popunder Advertisement */}
        <script async src="https://pl29817610.effectivecpmnetwork.com/e9/69/00/e969005cc95db274d9d23bb09b3d8ee3.js"></script>
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <WebVitals />
        <GoogleAnalytics />
        <Providers>
          {children}
        </Providers>
        <PremiumFooter />
      </body>
    </html>
  )
}
