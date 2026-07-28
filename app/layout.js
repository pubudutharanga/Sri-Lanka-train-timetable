import '../styles/globals.css'
import { Inter } from 'next/font/google'
import PremiumFooter from './PremiumFooter'
import GoogleAnalytics from '../components/GoogleAnalytics'
import AdLoader from '../components/AdLoader'
import Providers from './providers'
import { WebVitals } from '../components/WebVitals'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = 'https://sri-lanka-train-timetable.vercel.app'

// ══════════════════════════════════════════════════════════════════════
//  METADATA — Optimized for exact-match keyword ranking
//  Primary targets: "train schedule" (11.5K imp), "train time table" (2.3K),
//  "railway time table" (1.8K), "train schedule sri lanka" (418)
// ══════════════════════════════════════════════════════════════════════

export const metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Favicon & Icons ──────────────────────────────────────────────────
  icons: {
    icon: '/logo.png',
    shortcut: '/logo.png',
    apple: '/logo.png',
  },

  manifest: '/manifest.json',

  // ── Title — EXACT-MATCH for top 4 keywords ─────────────────────────
  // "train schedule" (11,499 imp) + "sri lanka" + "railway time table" (1,814)
  // + "train timetable" (134) + "train time table" (2,317)
  title: {
    default: '🚂 Train Schedule Sri Lanka 2026 — Railway Time Table & Train Timetable Today',
    template: '%s | ⚡ Train Schedule Sri Lanka 2026',
  },

  // ── Description — CTR-optimized (target 6%+ from current 1.9%) ─────
  // Contains exact phrases: "train schedule", "railway time table",
  // "train time table", "train timetable", "train schedule today"
  description:
    '🚂 Search train schedule Sri Lanka 2026. Find railway time table, train time table & timetable for Colombo Fort, Kandy, Galle, Badulla, Jaffna & 100+ stations. Free train schedule today & tomorrow — updated daily.',

  // ── Core keywords ──────────────────────────────────────────────────
  keywords: [
    'train schedule',
    'train schedule sri lanka',
    'railway time table',
    'train time table',
    'train timetable',
    'sri lanka railway time table',
    'train schedule today',
    'sri lanka train timetable 2026',
    'railway time table 2026',
    'train time table 2026',
    'sri lanka railway time table today',
    'sri lanka railway time table tomorrow',
    'colombo train schedule',
    'train shedule',
    'search train',
    'sl train schedule',
    'trains schedule',
    'sri lanka train schedule',
    'railway schedule',
    'train times',
  ],

  // ── Canonical URL ──────────────────────────────────────────────────
  alternates: {
    canonical: BASE_URL,
  },

  // ── Open Graph — exact-match title for social sharing ──────────────
  openGraph: {
    type: 'website',
    locale: 'en_LK',
    url: BASE_URL,
    siteName: 'Sri Lanka Train Timetable',
    title: 'Train Schedule Sri Lanka 2026 — Railway Time Table & Timetable Today',
    description:
      'Search train schedule for Sri Lanka Railways. Find railway time table, departure times & train timetable for Colombo, Kandy, Galle, Badulla, Jaffna and all stations.',
    images: [
      {
        url: `${BASE_URL}/images/hero2.jpg`,
        width: 1200,
        height: 630,
        alt: 'Train Schedule Sri Lanka — Railway Time Table Search',
        type: 'image/jpeg',
      },
    ],
  },

  // ── Twitter Card ─────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: 'Train Schedule Sri Lanka 2026 — Railway Time Table Today',
    description:
      'Search train schedule & railway time table for Sri Lanka. Find train timetable for Colombo to Kandy, Galle, Jaffna & all stations.',
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
  applicationName: 'Train Schedule Sri Lanka',
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

// ══════════════════════════════════════════════════════════════════════
//  JSON-LD STRUCTURED DATA — Server-rendered for Googlebot
// ══════════════════════════════════════════════════════════════════════

function WebSiteJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Train Schedule Sri Lanka',
    alternateName: [
      'Sri Lanka Train Timetable',
      'Sri Lanka Railway Time Table',
      'SL Train Schedule',
      'Sri Lanka Railways Timetable',
      'Railway Time Table Sri Lanka',
      'Train Time Table Sri Lanka',
    ],
    url: BASE_URL,
    description:
      'Search train schedule and railway time table for Sri Lanka. Find train timetable, departure times, routes for all Sri Lanka Railways trains.',
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${BASE_URL}/search?q={search_term_string}`,
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
        url: `${BASE_URL}/logo.png`,
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
      'Free online train schedule search tool for Sri Lanka Railways — railway time table and train timetable.',
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


// ══════════════════════════════════════════════════════════════════════
//  ROOT LAYOUT
//  - Ad scripts REMOVED from <head> — loaded via AdLoader at bottom
//  - FAQPage JSON-LD server-rendered in <head>
// ══════════════════════════════════════════════════════════════════════

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* JSON-LD Structured Data — server-rendered for Googlebot */}
        <WebSiteJsonLd />
        <OrganizationJsonLd />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hreflang for geo-targeting */}
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />

        {/* NO ad scripts in <head> — they are loaded via AdLoader after 5s delay */}
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <WebVitals />
        <GoogleAnalytics />
        <Providers>
          {children}
        </Providers>
        <PremiumFooter />
        {/* Ad scripts deferred — loads 5 seconds after page load */}
        <AdLoader />
      </body>
    </html>
  )
}
