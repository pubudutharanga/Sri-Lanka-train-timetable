import '../styles/globals.css'
import { Inter } from 'next/font/google'
import PremiumFooter from './PremiumFooter'
import GoogleAnalytics from '../components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

const BASE_URL = 'https://sri-lanka-train-timetable.vercel.app'

export const metadata = {
  // ── Base URL ─────────────────────────────────────────────────────────
  metadataBase: new URL(BASE_URL),

  // ── Favicon & Icons ──────────────────────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      { rel: 'icon', url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { rel: 'icon', url: '/favicon-144x144.png', sizes: '144x144', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
      { rel: 'icon', url: '/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
  },

  // ── Web App Manifest ─────────────────────────────────────────────────
  manifest: '/manifest.json',

  // ── Primary Meta Tags ────────────────────────────────────────────────
  title: {
    default: 'Sri Lanka Train Timetable 2026 — Railway Time Table & Schedule Today',
    template: '%s | Sri Lanka Railway Timetable',
  },
  description:
    'Search Sri Lanka railway time table 2026. Find train schedules, departure times, routes from Colombo Fort to Kandy, Galle, Badulla, Jaffna & more. Updated daily train timetable for Sri Lanka Railways.',
  
  // ── Keyword-rich metadata ────────────────────────────────────────────
  keywords: [
    // ── P0: Highest volume (4,000+ impressions) ──
    'train schedule',
    'train schedule sri lanka',
    'railway time table',
    'train time table',
    'sri lanka railway time table',
    'train timetable',

    // ── P1: High volume (50–655 impressions) ──
    'train schedule in sri lanka',
    'sri lanka railway time table today',
    'train time table sri lanka',
    'www railway gov lk time table',
    'srilanka train time table',
    'sri lanka train time',
    'railway schedule',
    'train schedules sri lanka',
    'sri lanka railway train schedule',
    'train shedule sri lanka',
    '2026 train time table',
    'sri lanka trains schedule',
    'train schedule sri lanka railway',
    'today train time table',

    // ── P2: Route-specific keywords ──
    'colombo train time table',
    'fort to anuradhapura train time table',
    'galle to trincomalee train time table',
    'jaffna train time table',
    'kalutara to galle train time table',
    'moratuwa to anuradhapura train time table',
    'moratuwa to maradana train time table',
    'talaimannar to colombo train time table',
    'train schedule colombo',
    'train schedule colombo to negombo',
    'train schedule negombo colombo fort early morning',
    'train schedule galle',
    'train schedule mirigama',
    'train from colombo to jaffna',
    'india to sri lanka train time table',
    'sri lanka train schedule vavuniya colombo 2026',
    'rabukkana railway station time table 2026',
    'today train time table sri lanka to colombo',
    'sri lanka railway time table today colombo',
    'sri lanka railway time table today colombo fort',

    // ── P3: Sri Lanka variations ──
    'sri lanka train schedule',
    'sri lanka train time table',
    'sri lanka train times',
    'sri lanka train timetable',
    'sri lanka train timetable 2026',
    'sri lanka train timetables',
    'sri lanka train schedules',
    'sri lanka train shedule',
    'sri lanka train status',
    'sri lanka railways schedule',
    'sri lanka railways timetable',
    'sri lanka railways train schedule',
    'sri lanka railways time table',
    'sri lanka railways official website timetable',
    'sri lanka railway schedule',
    'sri lanka railway time',
    'sri lanka railway timetable',
    'sri lanka railway time table 2026',
    'sri lanka railway time table tomorrow',
    'sri lanka railway time table tomorrow morning',
    'sri lanka railway time table today pdf',
    'sri lanka railway time table today pdf download',
    'sri lanka railway time table tomorrow pdf',
    'sri lanka railway time table 2022',
    'sri lanka schedule',
    'sri lanka timetable',
    'sri lanka train',
    'sri lanka train schedule today',
    'sri lanka train schedule tomorrow',
    'sri lanka train time table today',
    'sri lanka trains timetable',

    // ── P4: SL / Lankan variations ──
    'sl railway schedule',
    'sl railway time table',
    'sl train schedule',
    'sl train time table',
    'slr time table',
    'sri lankan railway schedule',
    'sri lankan railway time table',
    'sri lankan railways timetable',
    'sri lankan train schedule',
    'sri lankan train time table',
    'sri lankan train times',
    'srilanka train schedule',
    'srilankan train time table',
    'lanka train schedule',

    // ── P5: Railway variations ──
    'railway time table sri lanka',
    'railway time table 2026',
    'railway time table today',
    'railway time today',
    'railway times',
    'railway timetable',
    'railway timetable sri lanka',
    'railway timing',
    'railway train schedule',
    'railway schedule sri lanka',
    'railway schedule time',
    'railway schedule today',
    'railway sri lanka schedule',
    'railway sri lanka time table',
    'railway station time',
    'railway station time table',
    'railway new time table 2026',
    'railway shedule',
    'railway.gov.lk schedule',
    'railways schedule',
    'railways time table',
    'railwaytimetable',

    // ── P6: Rail / time variations ──
    'rail schedule',
    'rail time',
    'rail time table',
    'rail times',
    'rail timetable',
    'rail timetables',

    // ── P7: Action & search queries ──
    'search train',
    'search train schedule',
    'search train sri lanka',
    'search train time',
    'find train schedule',
    'how to find train time',
    'how to find train time table',
    'how to find train timings',
    'how to see train time table',
    'online train schedule',
    'live train schedule',
    'live train schedule sri lanka',
    'train search',

    // ── P8: Schedule variations ──
    'schedule of train',
    'schedule train',
    'schedule train sri lanka',
    'train schedule today',
    'train schedule tomorrow',
    'train schedule sunday',
    'train schedule for today',
    'train schedule for tomorrow',
    'train schedule time',
    'train schedule time table',
    'train schedule srilanka',
    'train schedule new',
    'train schedule.lk',
    'train scheduled',
    'train schedules',
    'train schedules sri lanka march 2026',

    // ── P9: Time table variations ──
    'time schedule of train',
    'time schedule train',
    'time table of railway',
    'time table of train',
    'time table railway',
    'time table railway 2026',
    'time table railway station',
    'time table sri lanka railway',
    'time table train',
    'time table train sri lanka',
    'time train',
    'time train time',
    'timetable for train',
    'timetable train',
    'timetable train sri lanka',

    // ── P10: Today / tomorrow / day queries ──
    'today railway time table',
    'today time table train',
    'today train schedule',
    'today train time',
    'today train time table sri lanka',
    'today trains schedule',
    'tomorrow train schedule',
    'tomorrow train time table',
    'now train time',
    'daily train',
    'sunday train time table',
    'sunday train times',
    'sunday train timetable',
    'saturday railway time table',
    'thursday train time',
    'to day train',
    'to day train time table',

    // ── P11: Misspelling coverage ──
    'train shedule sri lanka',
    'train scedule',
    'train scheduel',
    'train scheduke',
    'train schedula',
    'train scheule',
    'train sechdule',
    'railway shedule',
    'tarin schedule',
    'tarain time',
    'trai time',
    'etrain schedule',
    'relwe time table',

    // ── P12: Other languages ──
    'horaires train sri lanka',
    'කොටුව දුම්රිය කාලසටහන 2026',

    // ── P13: Remaining long-tail ──
    'sri lanka railways timetable revised effective december 2 2025',
    'colombo to kandy train schedule',
    'colombo to galle train time',
    'colombo to badulla train',
    'colombo to jaffna train',
    'train sc',
    'train sched',
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
    title: 'Sri Lanka Train Timetable 2026 — Railway Schedule & Time Table Today',
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
    title: 'Sri Lanka Train Timetable 2026 — Railway Time Table & Schedule',
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
    telephone: true,
    date: true,
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
        urlTemplate: `${BASE_URL}/#search?route={search_term_string}`,
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

function WebApplicationJsonLd() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Sri Lanka Train Timetable',
    url: BASE_URL,
    applicationCategory: 'TravelApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires JavaScript',
    description:
      'Free online Sri Lanka railway timetable search tool. Find train schedules, departure and arrival times for all Sri Lanka Railways routes including Colombo Fort, Kandy, Galle, Badulla, Jaffna, Batticaloa, Matara and more.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'LKR',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
    author: {
      '@type': 'Person',
      name: 'Pubudu Tharanga',
      url: 'https://www.linkedin.com/in/pubudutharanga',
    },
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

function FAQJsonLd() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find the train schedule in Sri Lanka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can search for Sri Lanka train schedules on our website by selecting your departure and arrival stations. We provide updated timetables for all Sri Lanka Railways routes including Colombo Fort to Kandy, Galle, Badulla, Jaffna, Anuradhapura, Batticaloa, Negombo, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Sri Lanka railway time table for today?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Our website shows the current Sri Lanka railway timetable updated daily. Select your route and filter by day type (weekday, Saturday, Sunday) to see today's train schedule with departure times, arrival times, duration, and all intermediate stops.",
        },
      },
      {
        '@type': 'Question',
        name: 'How can I check the Colombo Fort train time table?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select Colombo Fort as your departure station. You can find trains to Kandy, Badulla (via Ella), Galle, Matara, Jaffna, Kankesanthurai, Batticaloa, Anuradhapura, and Negombo. Express trains like Podi Menike, Udarata Menike, and Yal Devi depart from Colombo Fort.',
        },
      },
      {
        '@type': 'Question',
        name: 'What trains run on Saturday and Sunday in Sri Lanka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Sri Lanka Railways trains operate on weekends. Use the Day Type filter to see Saturday railway time table, Sunday train timetable, or weekend-only schedules. Express trains like Podi Menike and Udarata Menike run daily including Saturday and Sunday.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find the railway time table for 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our website provides the latest 2026 Sri Lanka railway timetable with updated train times, routes, and operating days. The railway new time table 2026 reflects the most current schedule as published by Sri Lanka Railways.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the popular train routes in Sri Lanka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Popular routes include Colombo Fort to Kandy (~3hrs), Colombo to Galle/Matara (coastal, ~2-3hrs), Colombo to Badulla via Ella (~9hrs), Colombo to Jaffna (~7hrs), Fort to Anuradhapura, Kalutara to Galle, Moratuwa to Maradana, Colombo to Negombo, and Colombo to Batticaloa (~8hrs).',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a train from Colombo to Jaffna?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, the Yal Devi and Uttara Devi express trains run from Colombo Fort to Jaffna and Kankesanthurai daily. The journey takes 6-7 hours via Anuradhapura, Vavuniya, Kilinochchi, and Pallai with 1st, 2nd, and 3rd class available.',
        },
      },
      {
        '@type': 'Question',
        name: "How to find tomorrow's train time table?",
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Select your route and use the Day Type filter matching tomorrow's day (weekday/Saturday/Sunday). The Sri Lanka railway time table tomorrow shows all scheduled trains. Plan morning or evening journeys in advance.",
        },
      },
      {
        '@type': 'Question',
        name: 'Can I download the Sri Lanka railway time table PDF?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use your browser print function (Ctrl+P) to save search results as PDF. For the official railway time table PDF download, visit railway.gov.lk. Our online train schedule is faster to search and always up-to-date.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Fort to Anuradhapura train time table?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Several trains run from Colombo Fort to Anuradhapura on the Northern line. The Yal Devi express covers this route in 4-5 hours. The Rajarata Rajina also serves this route. 1st, 2nd, and 3rd class seats are available.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is the official Sri Lanka Railways website?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The official Sri Lanka Railways website is www.railway.gov.lk with timetable information. Book tickets at seatreservation.railway.gov.lk. Our site provides a fast, mobile-friendly alternative for searching the railway schedule.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Colombo to Negombo train schedule?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Colombo Fort to Negombo route is on the Puttalam line with multiple daily trains including early morning services. The journey takes about 1-1.5 hours. Search Panadura to Chilaw routes that pass through Negombo.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Kalutara to Galle train time table?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The Kalutara to Galle route is on the Coastal line. Multiple trains pass through Kalutara South heading to Galle daily. The journey takes 1.5-2 hours via Bentota, Ambalangoda, and Hikkaduwa.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is there a live train schedule for Sri Lanka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our website provides the latest scheduled timetable for all Sri Lanka Railways routes. The online train schedule is regularly updated. For real-time train status, contact Sri Lanka Railways. Our search tool offers the most current daily train schedules.',
        },
      },
      {
        '@type': 'Question',
        name: 'කොටුව දුම්රිය කාලසටහන 2026 — Colombo Fort train schedule?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'කොටුව (Colombo Fort) station serves all major routes across Sri Lanka. Search our timetable for 2026 train schedules from Colombo Fort to Kandy, Badulla, Galle, Matara, Jaffna, Batticaloa, and Anuradhapura.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}

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
        <WebApplicationJsonLd />
        <FAQJsonLd />
        <BreadcrumbJsonLd />

        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Hreflang for geo-targeting */}
        <link rel="alternate" hrefLang="en" href={BASE_URL} />
        <link rel="alternate" hrefLang="x-default" href={BASE_URL} />
      </head>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <GoogleAnalytics />
        {children}
        <PremiumFooter />
      </body>
    </html>
  )
}
