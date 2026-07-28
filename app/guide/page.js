import Link from 'next/link'
import Breadcrumbs from '../../components/Breadcrumbs'
import Script from 'next/script'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Sri Lanka Train Travel Guide 2026 — Everything You Need to Know',
  description: 'The complete guide to train travel in Sri Lanka. Find information on booking tickets, choosing classes, exploring scenic routes, and navigating the railway network.',
  alternates: {
    canonical: 'https://sri-lanka-train-timetable.vercel.app/guide'
  },
  openGraph: {
    title: 'Sri Lanka Train Travel Guide 2026',
    description: 'The complete guide to train travel in Sri Lanka.',
    url: 'https://sri-lanka-train-timetable.vercel.app/guide',
    siteName: 'Sri Lanka Train Timetable',
    images: [
      {
        url: 'https://sri-lanka-train-timetable.vercel.app/og-image.jpg',
        width: 1200,
        height: 630,
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sri Lanka Train Travel Guide 2026',
    description: 'The complete guide to train travel in Sri Lanka.',
  }
}

function getLineData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'scenic-data.json')
  if (!fs.existsSync(filePath)) return {}
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data).lineData || {}
}

export default function GuideIndexPage() {
  const lineData = getLineData()
  const lines = Object.entries(lineData).map(([slug, data]) => ({ slug, ...data }))

  const breadcrumbItems = [
    { label: 'Guide', href: '/guide' }
  ]

  const jsonLdBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': [
      {
        '@type': 'ListItem',
        'position': 1,
        'name': 'Home',
        'item': 'https://sri-lanka-train-timetable.vercel.app'
      },
      {
        '@type': 'ListItem',
        'position': 2,
        'name': 'Guide',
        'item': 'https://sri-lanka-train-timetable.vercel.app/guide'
      }
    ]
  }

  const jsonLdArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    'headline': 'The Complete Guide to Train Travel in Sri Lanka',
    'datePublished': '2026-07-28T00:00:00+00:00',
    'dateModified': '2026-07-28T00:00:00+00:00',
    'author': [{
      '@type': 'Person',
      'name': 'Sri Lanka Train Timetable'
    }]
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <Script id="article-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-teal-500">
            The Complete Guide to Train Travel in Sri Lanka
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Sri Lanka's railway network spans over 1,500km of track, traversing misty mountains, pristine coastlines, and ancient cities. Built in 1858 during the British colonial era, the railway was initially designed to transport coffee and tea from the hill country to Colombo. Today, it offers some of the most spectacular train journeys in the world. Whether you are seeking the world-famous Kandy to Ella route, a coastal ride along the Indian Ocean, or navigating everyday transit, this guide covers everything you need to know about navigating Sri Lanka by train in 2026.
          </p>
          <p className="mt-4 text-sm text-gray-400">Last updated: July 2026</p>
        </header>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Essential Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link href="/guide/how-to-book-train-tickets" className="block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all group">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-blue-600 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">How to Book Tickets</h3>
              <p className="text-gray-600">Step-by-step guide to reserving seats online, advance booking windows, and station counters.</p>
            </Link>
            
            <Link href="/guide/train-classes-comparison" className="block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all group">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4 text-purple-600 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">Train Classes Comparison</h3>
              <p className="text-gray-600">Difference between 1st, 2nd, and 3rd class, Observation Saloons, and AC coaches.</p>
            </Link>

            <Link href="/guide/scenic-train-rides" className="block bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:border-blue-400 transition-all group">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4 text-green-600 group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" /></svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">Top Scenic Rides</h3>
              <p className="text-gray-600">Discover the most breathtaking train routes, which side to sit on, and highlight spots.</p>
            </Link>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Top 5 Most Popular Routes</h2>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <ul className="divide-y divide-gray-200">
              <li className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div>
                  <Link href="/route/kandy-to-ella" className="text-lg font-bold text-blue-600 hover:underline">Kandy to Ella</Link>
                  <p className="text-sm text-gray-500">The world-famous scenic route through the tea country.</p>
                </div>
              </li>
              <li className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div>
                  <Link href="/route/colombo-fort-to-kandy" className="text-lg font-bold text-blue-600 hover:underline">Colombo to Kandy</Link>
                  <p className="text-sm text-gray-500">The classic journey from the commercial capital to the cultural heart.</p>
                </div>
              </li>
              <li className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div>
                  <Link href="/route/colombo-fort-to-galle" className="text-lg font-bold text-blue-600 hover:underline">Colombo to Galle</Link>
                  <p className="text-sm text-gray-500">Coastal ride along the southwestern shore.</p>
                </div>
              </li>
              <li className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div>
                  <Link href="/route/colombo-fort-to-badulla" className="text-lg font-bold text-blue-600 hover:underline">Colombo to Badulla</Link>
                  <p className="text-sm text-gray-500">The complete hill country expedition spanning the entire Main Line.</p>
                </div>
              </li>
              <li className="p-4 hover:bg-gray-50 transition-colors flex items-center justify-between">
                <div>
                  <Link href="/route/colombo-fort-to-jaffna" className="text-lg font-bold text-blue-600 hover:underline">Colombo to Jaffna</Link>
                  <p className="text-sm text-gray-500">The northern journey to the cultural capital of the north.</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">Essential Logistics for Travelers</h2>
          <div className="prose prose-blue max-w-none text-gray-700">
            <p>
              Traveling by train in Sri Lanka is both an adventure and a practical necessity. Before embarking on your journey, it's critical to understand the nuances of the system. 
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Ticket Classes</h3>
            <p>
              Sri Lankan trains typically offer three classes. First class offers reserved seating, air conditioning, and often better facilities. Second class offers comfortable seating, often with reserved options, but relies on fans and open windows. Third class is the most affordable and often the most crowded, featuring bench seating and open windows. <Link href="/guide/train-classes-comparison" className="text-blue-600 hover:underline">Read our detailed class comparison</Link>.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Booking Mechanics</h3>
            <p>
              Reservations for reserved carriages typically open 30 days in advance. Popular routes like Kandy to Ella sell out extremely quickly. You can book at major stations, via certain mobile networks like Mobitel, or online through the official government portal. <Link href="/guide/how-to-book-train-tickets" className="text-blue-600 hover:underline">See our step-by-step booking guide</Link>.
            </p>
            <h3 className="text-xl font-semibold mt-6 mb-3">Baggage & Food</h3>
            <p>
              There are no strict luggage allowances, but you must carry and store your own bags, typically on overhead racks or at the ends of carriages. During the journey, local vendors board the trains selling snacks like wade (lentil fritters), peanuts, and cut fruit. First-class carriages sometimes prohibit outside vendors, so bringing your own snacks is advisable for longer trips.
            </p>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 border-b pb-2">The Railway Network Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {lines.map(line => (
              <div key={line.slug} className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{line.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{line.description}</p>
                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  {line.totalDistance} km
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </main>
  )
}
