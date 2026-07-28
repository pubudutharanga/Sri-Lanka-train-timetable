import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Breadcrumbs from '../../components/Breadcrumbs'
import Script from 'next/script'

export const metadata = {
  title: 'All Railway Stations Sri Lanka 2026 | Station Directory',
  description: 'Complete directory of all railway stations in Sri Lanka. View timetables, departures, and arrivals for any station in 2026.',
  alternates: {
    canonical: 'https://sri-lanka-train-timetable.vercel.app/station'
  }
}

function getTrains() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'trains.json')
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

function getAllStations(trains) {
  const stationNames = new Set()
  trains.forEach(t => {
    stationNames.add(t.from)
    stationNames.add(t.to)
    if (t.stops) {
      t.stops.forEach(s => stationNames.add(s.station))
    }
  })
  return Array.from(stationNames).sort()
}

export default function StationIndexPage() {
  const trains = getTrains()
  const stations = getAllStations(trains).map(station => ({
    name: station,
    slug: station.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  }))

  const breadcrumbItems = [
    { label: 'Stations', href: '/station' }
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
        'name': 'Stations',
        'item': 'https://sri-lanka-train-timetable.vercel.app/station'
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
            All Railway Stations in Sri Lanka
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our complete directory of railway stations. Select a station to view live departures, arrivals, and complete schedules.
          </p>
        </header>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {stations.map((station, idx) => (
            <Link 
              key={idx} 
              href={`/station/${station.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group flex items-center space-x-3"
            >
              <div className="bg-blue-50 text-blue-600 p-2 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <span className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors truncate">
                {station.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
