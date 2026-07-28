import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import TrainCard from '../../../components/TrainCard'

export const dynamicParams = false // only build known routes

function getTrains() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'trains.json')
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

export function generateStaticParams() {
  const trains = getTrains()
  const routeSet = new Set()
  
  trains.forEach(t => {
    routeSet.add(`${t.from}:${t.to}`)
  })
  
  return Array.from(routeSet).map(route => {
    const [from, to] = route.split(':')
    const slug = `${from.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-to-${to.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    return { slug }
  })
}

export function generateMetadata({ params }) {
  const trains = getTrains()
  const { slug } = params
  
  const matchingTrains = trains.filter(t => {
    const tSlug = `${t.from.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-to-${t.to.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    return tSlug === slug
  })
  
  if (matchingTrains.length === 0) return {}
  
  const from = matchingTrains[0].from
  const to = matchingTrains[0].to
  const routeName = `${from} to ${to}`
  
  return {
    title: `${routeName} Train Schedule 2026 | Timetable & Ticket Prices`,
    description: `Find the 2026 train schedule from ${from} to ${to}. Check departure times, arrival times, durations, and classes for all Sri Lanka Railways trains on this route.`,
    alternates: {
      canonical: `https://sri-lanka-train-timetable.vercel.app/route/${slug}`
    },
    openGraph: {
      type: 'website',
      title: `${routeName} Train Schedule 2026 | Timetable & Ticket Prices`,
      description: `Find the 2026 train schedule from ${from} to ${to}. Check departure times, arrival times, durations, and classes for all Sri Lanka Railways trains on this route.`,
      url: `https://sri-lanka-train-timetable.vercel.app/route/${slug}`,
      siteName: 'Sri Lanka Train Timetable',
      images: [{ url: 'https://sri-lanka-train-timetable.vercel.app/images/hero2.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${routeName} Train Schedule 2026`,
      description: `Find the 2026 train schedule from ${from} to ${to}. Check departure times, arrival times, durations, and classes for all Sri Lanka Railways trains on this route.`,
      images: ['https://sri-lanka-train-timetable.vercel.app/images/hero2.jpg'],
    }
  }
}

export default function RoutePage({ params }) {
  const trains = getTrains()
  const { slug } = params
  
  const matchingTrains = trains.filter(t => {
    const tSlug = `${t.from.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-to-${t.to.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    return tSlug === slug
  })
  
  if (matchingTrains.length === 0) {
    notFound()
  }

  // Sort by departure time
  matchingTrains.sort((a, b) => {
    const timeA = parseInt(a.departure.substring(1, 3), 10) * 60 + parseInt(a.departure.substring(4, 6), 10)
    const timeB = parseInt(b.departure.substring(1, 3), 10) * 60 + parseInt(b.departure.substring(4, 6), 10)
    return timeA - timeB
  })
  
  const from = matchingTrains[0].from
  const to = matchingTrains[0].to
  const distance = matchingTrains[0].distance_km
  
  const minDurTrain = matchingTrains.reduce((prev, curr) => prev.duration_minutes < curr.duration_minutes ? prev : curr)
  const maxDurTrain = matchingTrains.reduce((prev, curr) => prev.duration_minutes > curr.duration_minutes ? prev : curr)
  const formatDuration = (mins) => `${Math.floor(mins/60)}h ${mins%60}m`
  const minDuration = formatDuration(minDurTrain.duration_minutes)
  const maxDuration = formatDuration(maxDurTrain.duration_minutes)
  
  const allClasses = new Set()
  matchingTrains.forEach(t => t.classes?.forEach(c => allClasses.add(c)))
  const classesAvailable = Array.from(allClasses).join(', ') || 'various classes'

  const firstTrain = matchingTrains[0]
  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TrainTrip",
    "trainNumber": firstTrain.number,
    "trainName": firstTrain.name,
    "departureStation": {
      "@type": "TrainStation",
      "name": firstTrain.from
    },
    "arrivalStation": {
      "@type": "TrainStation",
      "name": firstTrain.to
    },
    "departureTime": firstTrain.departure,
    "arrivalTime": firstTrain.arrival,
    "provider": {
      "@type": "Organization",
      "name": "Sri Lanka Railways"
    }
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sri-lanka-train-timetable.vercel.app/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Routes",
        "item": "https://sri-lanka-train-timetable.vercel.app/route"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `${from} to ${to}`,
        "item": `https://sri-lanka-train-timetable.vercel.app/route/${slug}`
      }
    ]
  }

  const breadcrumbItems = [
    { label: 'Routes', href: '/#popular-routes' }, // Optional: link to a general routes list
    { label: `${from} to ${to}`, href: `/route/${slug}` }
  ]

  return (
    <main className="min-h-screen bg-gray-50/50 pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {from} to {to} Train Schedule
          </h1>
          <p className="text-base text-gray-700 max-w-2xl mx-auto mt-4 leading-relaxed">
            The train from <strong>{from}</strong> to <strong>{to}</strong> takes approximately <strong>{minDuration === maxDuration ? minDuration : `${minDuration}–${maxDuration}`}</strong>. There are <strong>{matchingTrains.length} daily trains</strong> on this route. {distance ? `The distance is ${distance} km.` : ''} Tickets are available in {classesAvailable}.
          </p>
        </header>

        {/* Featured Snippet Table (Hidden visually on small screens, optimized for Googlebot) */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-10 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Timetable Summary</h2>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 rounded-tl-lg">Train</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Departs ({from})</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Arrives ({to})</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Duration</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 rounded-tr-lg">Classes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {matchingTrains.map((train, idx) => (
                <tr key={train.id || idx} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4">
                    <span className="font-medium text-gray-900">{train.name}</span>
                    <span className="text-xs text-gray-500 block">#{train.number}</span>
                  </td>
                  <td className="py-3 px-4">{train.departure.substring(1, 6)}</td>
                  <td className="py-3 px-4">{train.arrival.substring(1, 6)}</td>
                  <td className="py-3 px-4">{Math.floor(train.duration_minutes / 60)}h {train.duration_minutes % 60}m</td>
                  <td className="py-3 px-4 text-sm">{train.classes?.join(', ') || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="mt-4 text-xs text-gray-500 text-right">
            Timetable last updated: June 2026 — Sourced from Sri Lanka Railways official schedule.
          </div>
        </div>

        {/* Visual Train Cards for Mobile/UX */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Detailed Train Information</h2>
          {matchingTrains.map((train, idx) => (
            <TrainCard key={train.id || idx} train={train} index={idx} />
          ))}
        </div>
      </div>
    </main>
  )
}
