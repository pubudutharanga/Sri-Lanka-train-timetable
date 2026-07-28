import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Script from 'next/script'


export function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'scenic-data.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8')).lineData
  return Object.keys(data).map((slug) => ({
    slug: slug,
  }))
}

function getLineData(slug) {
  const filePath = path.join(process.cwd(), 'public', 'data', 'scenic-data.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8')).lineData
  return data[slug] || null
}

function getTrains() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'trains.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function generateMetadata({ params }) {
  const line = getLineData(params.slug)
  if (!line) return {}

  const title = `${line.name} Train Schedule & Stations Sri Lanka 2026`
  const description = `Complete 2026 guide to the ${line.name}. View all train schedules, stations, ticket prices, and travel information for this ${line.totalDistance}km route.`
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://sri-lanka-train-timetable.vercel.app/line/${params.slug}`
    },
    openGraph: {
      title,
      description,
      url: `https://sri-lanka-train-timetable.vercel.app/line/${params.slug}`,
      siteName: 'Sri Lanka Train Timetable',
      type: 'website'
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    }
  }
}

export default function LinePage({ params }) {
  const line = getLineData(params.slug)
  if (!line) notFound()

  const allTrains = getTrains()
  
  // A train belongs to a line if EITHER its from OR to station appears in the line's stations array
  const lineTrains = allTrains.filter(t => 
    line.stations.includes(t.from) || line.stations.includes(t.to)
  )

  // Popular routes on this line
  // Let's create some common route pairs based on the first, middle, and last stations
  const popularRoutes = []
  if (line.stations.length >= 2) {
    const first = line.stations[0]
    const last = line.stations[line.stations.length - 1]
    const mid = line.stations[Math.floor(line.stations.length / 2)]
    
    popularRoutes.push({ from: first, to: last })
    if (mid !== first && mid !== last) {
      popularRoutes.push({ from: first, to: mid })
      popularRoutes.push({ from: mid, to: last })
    }
  }

  const breadcrumbItems = [
    { label: 'Railway Lines', href: '/line' },
    { label: line.name, href: `/line/${params.slug}` }
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
        'name': 'Railway Lines',
        'item': 'https://sri-lanka-train-timetable.vercel.app/line'
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': line.name,
        'item': `https://sri-lanka-train-timetable.vercel.app/line/${params.slug}`
      }
    ]
  }

  const jsonLdItemList = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    'itemListElement': line.stations.map((station, idx) => ({
      '@type': 'ListItem',
      'position': idx + 1,
      'url': `https://sri-lanka-train-timetable.vercel.app/station/${station.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    }))
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <Script id="itemlist-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdItemList) }} />
      
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* a) Hero section */}
        <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-200 mb-10 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full blur-3xl opacity-50 -mr-10 -mt-10 pointer-events-none"></div>
          <div className="relative z-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm mb-6">
              Railway Line Guide 2026
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 tracking-tight">
              {line.name}
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl leading-relaxed">
              {line.description}
            </p>
          </div>
        </div>

        {/* b) Key statistics box */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Total Distance</div>
              <div className="text-2xl font-bold text-gray-900">{line.totalDistance} km</div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Stations</div>
              <div className="text-2xl font-bold text-gray-900">{line.stations.length}</div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex items-center space-x-4">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <div className="text-sm font-medium text-gray-500 uppercase tracking-wider">Daily Trains</div>
              <div className="text-2xl font-bold text-gray-900">{lineTrains.length}+</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* Main Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* c) Station-by-station list */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>
                Stations on this Line
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-gray-200">
                  {line.stations.map((station, idx) => {
                    const stationSlug = station.toLowerCase().replace(/[^a-z0-9]+/g, '-')
                    return (
                      <Link 
                        key={idx} 
                        href={`/station/${stationSlug}`}
                        className="bg-white p-4 hover:bg-blue-50 transition-colors group flex flex-col justify-center"
                      >
                        <div className="text-xs text-gray-400 mb-1">Station {idx + 1}</div>
                        <div className="font-semibold text-gray-900 group-hover:text-blue-700 transition-colors">
                          {station}
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </section>

            {/* d) Train schedule table */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-6 h-6 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                Trains on the {line.name}
              </h2>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Train</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Departure</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Arrival</th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Frequency</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {lineTrains.slice(0, 15).map((train, idx) => (
                        <tr key={idx} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{train.name}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.from}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.to}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{train.departureTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.arrivalTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{train.frequency}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {lineTrains.length > 15 && (
                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 text-center text-sm text-gray-500">
                      Showing 15 of {lineTrains.length} trains. Use the route search to see specific schedules.
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            
            {/* e) Key named trains section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Key Named Trains</h3>
              <ul className="space-y-3">
                {line.keyTrains.map((trainName, idx) => (
                  <li key={idx} className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    <span className="text-gray-700 font-medium">{trainName}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* f) Popular routes on this line */}
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 shadow-lg text-white">
              <h3 className="text-lg font-bold mb-4 border-b border-white/20 pb-2">Popular Routes</h3>
              <div className="space-y-3">
                {popularRoutes.map((route, idx) => {
                  const slug = `${route.from.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-to-${route.to.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
                  return (
                    <Link 
                      key={idx} 
                      href={`/route/${slug}`}
                      className="block bg-white/10 hover:bg-white/20 rounded-xl p-3 transition-colors group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white truncate pr-2">{route.from}</span>
                        <svg className="w-4 h-4 text-white/70 group-hover:text-white flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                      </div>
                      <div className="font-semibold text-white truncate mt-1">{route.to}</div>
                    </Link>
                  )
                })}
              </div>
            </div>
            
          </div>
        </div>

      </div>
    </main>
  )
}
