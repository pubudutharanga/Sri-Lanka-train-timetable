import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '../../../components/Breadcrumbs'
import TrainCard from '../../../components/TrainCard'
import VerificationBadge from '../../../components/VerificationBadge'

export const dynamicParams = false // only build known routes

function getTrains() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'trains.json')
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

function getScenicData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'scenic-data.json')
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

function getFaresData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'fares.json')
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

function getRouteData() {
  const trains = getTrains()
  const routeMap = new Map() // maps slug -> { from, to, trains: [] }

  trains.forEach(t => {
    const allStops = [{ station: t.from, time: t.departure }]
    if (t.stops) {
      t.stops.forEach(s => allStops.push({ station: s.station, time: s.departure || s.arrival }))
    }
    allStops.push({ station: t.to, time: t.arrival })
    
    // Deduplicate consecutive identical stations
    const uniqueStops = allStops.filter((item, pos, arr) => pos === 0 || item.station !== arr[pos-1].station)

    for (let i = 0; i < uniqueStops.length; i++) {
      for (let j = i + 1; j < uniqueStops.length; j++) {
        const fromStation = uniqueStops[i].station
        const toStation = uniqueStops[j].station
        
        const slug = `${fromStation.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-to-${toStation.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
        
        if (!routeMap.has(slug)) {
          routeMap.set(slug, { from: fromStation, to: toStation, trains: [] })
        }
        
        const depTime = uniqueStops[i].time || "T00:00:00"
        const arrTime = uniqueStops[j].time || "T00:00:00"
        
        // Calculate intermediate duration
        const depMins = parseInt(depTime.substring(1, 3), 10) * 60 + parseInt(depTime.substring(4, 6), 10)
        const arrMins = parseInt(arrTime.substring(1, 3), 10) * 60 + parseInt(arrTime.substring(4, 6), 10)
        let durationMins = arrMins - depMins
        if (durationMins < 0) durationMins += 24 * 60
        
        // Push train with custom from/to times and duration based on stops
        routeMap.get(slug).trains.push({
          ...t,
          from: fromStation,
          to: toStation,
          departure: depTime,
          arrival: arrTime,
          duration_minutes: durationMins,
          originalFrom: t.from,
          originalTo: t.to
        })
      }
    }
  })

  return routeMap
}

export function generateStaticParams() {
  const routeMap = getRouteData()
  return Array.from(routeMap.keys()).map(slug => ({ slug }))
}

export function generateMetadata({ params }) {
  const routeMap = getRouteData()
  const { slug } = params
  
  const routeInfo = routeMap.get(slug)
  if (!routeInfo) return {}
  
  const { from, to } = routeInfo
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
  const routeMap = getRouteData()
  const { slug } = params
  
  const routeInfo = routeMap.get(slug)
  if (!routeInfo) {
    notFound()
  }

  const { from, to, trains: matchingTrains } = routeInfo

  // Sort by departure time
  matchingTrains.sort((a, b) => {
    const timeA = parseInt(a.departure.substring(1, 3), 10) * 60 + parseInt(a.departure.substring(4, 6), 10)
    const timeB = parseInt(b.departure.substring(1, 3), 10) * 60 + parseInt(b.departure.substring(4, 6), 10)
    return timeA - timeB
  })
  
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

  const scenicData = getScenicData()
  const scenicInfo = scenicData.routes[slug]
  
  const faresData = getFaresData()
  const fareBand = distance ? faresData.fareTable.find(f => distance >= f.minKm && distance <= f.maxKm) : null;
  
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `How long is the train from ${from} to ${to}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The train journey from ${from} to ${to} takes approximately ${minDuration === maxDuration ? minDuration : `${minDuration} to ${maxDuration}`}. There are ${matchingTrains.length} daily trains on this route.`
        }
      },
      {
        "@type": "Question",
        "name": `What is the first and last train from ${from} to ${to}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `The first train departs at ${matchingTrains[0].departure.substring(1, 6)} and the last train departs at ${matchingTrains[matchingTrains.length - 1].departure.substring(1, 6)}.`
        }
      },
      {
        "@type": "Question",
        "name": `How much does a train ticket from ${from} to ${to} cost?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": fareBand ? `Estimated fares are LKR ${fareBand['3rdClass']} for 3rd Class, LKR ${fareBand['2ndClass']} for 2nd Class, and LKR ${fareBand['1stClass']} for 1st Class.` : `Ticket prices vary by class and train type.`
        }
      }
    ]
  }

  const allRoutes = Array.from(routeMap.entries())
  const fromRoutes = allRoutes.filter(([s, r]) => r.from === from && s !== slug).slice(0, 3)
  const toRoutes = allRoutes.filter(([s, r]) => r.to === to && s !== slug).slice(0, 3)
  const reverseSlug = `${to.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-to-${from.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const hasReverse = routeMap.has(reverseSlug)

  return (
    <main className="min-h-screen bg-gray-50/50 pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
        
        <div className="mt-12">
          <VerificationBadge />
        </div>

        {scenicInfo && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📸</span>
              <h3 className="text-lg font-bold text-green-900">Scenic View Tips</h3>
              <div className="flex text-yellow-500">
                {'★'.repeat(scenicInfo.scenicRating)}{'☆'.repeat(5 - scenicInfo.scenicRating)}
              </div>
            </div>
            <p className="text-green-800 mb-4">{scenicInfo.viewSide}</p>
            <div className="flex flex-wrap gap-2">
              {scenicInfo.highlights.map((h, i) => (
                <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        {fareBand && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-10 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Estimated Ticket Prices</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3 px-4 font-semibold text-gray-700">Class</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Approx. Fare</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Reservation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4">3rd Class</td>
                    <td className="py-3 px-4 font-medium">LKR {fareBand['3rdClass']}</td>
                    <td className="py-3 px-4 text-gray-500">Not required</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">2nd Class</td>
                    <td className="py-3 px-4 font-medium">LKR {fareBand['2ndClass']}</td>
                    <td className="py-3 px-4 text-gray-500">Optional</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">1st Class</td>
                    <td className="py-3 px-4 font-medium">LKR {fareBand['1stClass']}</td>
                    <td className="py-3 px-4 text-gray-500">Required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-10 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How long is the train from {from} to {to}?</h4>
              <p className="text-gray-700">The train journey from {from} to {to} takes approximately {minDuration === maxDuration ? minDuration : `${minDuration} to ${maxDuration}`}. There are {matchingTrains.length} daily trains on this route.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">What is the first and last train from {from} to {to}?</h4>
              <p className="text-gray-700">The first train departs at {matchingTrains[0].departure.substring(1, 6)} and the last train departs at {matchingTrains[matchingTrains.length - 1].departure.substring(1, 6)}.</p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">How much does a train ticket from {from} to {to} cost?</h4>
              <p className="text-gray-700">{fareBand ? `Estimated fares are LKR ${fareBand['3rdClass']} for 3rd Class, LKR ${fareBand['2ndClass']} for 2nd Class, and LKR ${fareBand['1stClass']} for 1st Class.` : `Ticket prices vary by class and train type.`}</p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Related Routes</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {hasReverse && (
              <div className="md:col-span-2 mb-2">
                <span className="text-lg mr-2">🔄</span> 
                <span className="font-semibold text-gray-700">Reverse journey: </span>
                <Link href={`/route/${reverseSlug}`} className="text-blue-600 hover:underline font-medium">
                  {to} to {from}
                </Link>
              </div>
            )}
            
            {fromRoutes.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span>📍</span> More trains from {from}
                </h4>
                <ul className="space-y-2">
                  {fromRoutes.map(([s, r]) => (
                    <li key={s}>
                      <Link href={`/route/${s}`} className="text-blue-600 hover:underline">
                        {r.from} to {r.to}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {toRoutes.length > 0 && (
              <div>
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center gap-2">
                  <span>🎯</span> More trains to {to}
                </h4>
                <ul className="space-y-2">
                  {toRoutes.map(([s, r]) => (
                    <li key={s}>
                      <Link href={`/route/${s}`} className="text-blue-600 hover:underline">
                        {r.from} to {r.to}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
