import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Breadcrumbs from '../../components/Breadcrumbs'
import Script from 'next/script'

export const metadata = {
  title: 'Sri Lanka Railway Lines — Complete Network Guide 2026',
  description: 'Explore the 7 railway lines of Sri Lanka. Comprehensive guide to the Main Line, Coastal Line, Northern Line, and more with 2026 train schedules.',
  alternates: {
    canonical: 'https://sri-lanka-train-timetable.vercel.app/line'
  }
}

function getLineData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'scenic-data.json')
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data).lineData
}

export default function LineIndexPage() {
  const lineData = getLineData()
  const lines = Object.entries(lineData).map(([slug, data]) => ({ slug, ...data }))

  const breadcrumbItems = [
    { label: 'Railway Lines', href: '/line' }
  ]

  const jsonLd = {
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
        'name': 'Railway Lines',
        'item': 'https://sri-lanka-train-timetable.vercel.app/line'
      }
    ]
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Sri Lanka Railway Lines
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore the 7 beautiful railway lines of Sri Lanka. View train schedules, station guides, and route information for 2026.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {lines.map((line, idx) => (
            <Link 
              key={idx} 
              href={`/line/${line.slug}`}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-lg hover:border-blue-400 transition-all group flex flex-col h-full"
            >
              <div className="mb-4">
                <div className="inline-block p-3 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 text-blue-600 mb-4 group-hover:from-blue-600 group-hover:to-blue-700 group-hover:text-white transition-all duration-300">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">
                  {line.name}
                </h2>
                <p className="text-gray-600 line-clamp-3">
                  {line.description}
                </p>
              </div>
              <div className="mt-auto pt-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                  <span>{line.totalDistance} km</span>
                </div>
                <div className="flex items-center space-x-1">
                  <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>{line.stations.length} Stations</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
