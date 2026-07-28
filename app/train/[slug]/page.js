import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import Breadcrumbs from '../../../components/Breadcrumbs'

const trainDirectory = {
  'ella-odyssey': { match: (name) => name && (name.includes('Odyssey') || name.includes('Dunhinda')), displayName: 'Ella Odyssey', description: 'Experience the beautiful hill country on the special tourist train.' },
  'podi-menike': { match: (name) => name === 'Podi Menike', displayName: 'Podi Menike', description: 'The famous Little Maiden train traveling through the scenic hills.' },
  'udarata-menike': { match: (name) => name === 'Udarata Menike', displayName: 'Udarata Menike', description: 'The Upcountry Maiden offering spectacular views of tea plantations.' },
  'yal-devi': { match: (name) => name === 'Yal Devi', displayName: 'Yal Devi', description: 'The iconic train connecting Colombo to the Northern Peninsula.' },
  'ruhunu-kumari': { match: (name) => name === 'Ruhunu Kumari', displayName: 'Ruhunu Kumari', description: 'The Princess of the South coastal train journey.' },
  'rajarata-rajina': { match: (name) => name === 'Rajarata Rajina' || name === 'Rajarata Rejini', displayName: 'Rajarata Rajina', description: 'The Queen of the King\'s Land running across the country.' },
}

export const dynamicParams = false

function getTrainsData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'trains.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function getScenicData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'scenic-data.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

function getFaresData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'fares.json')
  return JSON.parse(fs.readFileSync(filePath, 'utf8'))
}

export function generateStaticParams() {
  return Object.keys(trainDirectory).map(slug => ({ slug }))
}

export function generateMetadata({ params }) {
  const { slug } = params
  const info = trainDirectory[slug]
  if (!info) return {}

  return {
    title: `${info.displayName} Train Schedule 2026 | Timetable & Ticket Prices`,
    description: info.description,
    openGraph: {
      type: 'website',
      title: `${info.displayName} Train Schedule 2026 | Timetable & Ticket Prices`,
      description: info.description,
      url: `https://sri-lanka-train-timetable.vercel.app/train/${slug}`,
      siteName: 'Sri Lanka Train Timetable',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${info.displayName} Train Schedule 2026`,
      description: info.description,
    }
  }
}

export default function TrainSpotlightPage({ params }) {
  const { slug } = params
  const info = trainDirectory[slug]
  if (!info) notFound()

  const allTrains = getTrainsData()
  const matchingTrains = allTrains.filter(t => info.match(t.name))
  if (matchingTrains.length === 0) notFound()
  
  // Sort by departure time
  matchingTrains.sort((a, b) => {
    const timeA = parseInt(a.departure.substring(1, 3), 10) * 60 + parseInt(a.departure.substring(4, 6), 10)
    const timeB = parseInt(b.departure.substring(1, 3), 10) * 60 + parseInt(b.departure.substring(4, 6), 10)
    return timeA - timeB
  })

  const firstTrain = matchingTrains[0]
  
  // Get route slug for scenic data
  const routeSlug = `${firstTrain.from.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-to-${firstTrain.to.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
  const scenicData = getScenicData().routes[routeSlug]
  
  const distance = firstTrain.distance_km
  const faresData = getFaresData()
  const fareBand = distance ? faresData.fareTable.find(f => distance >= f.minKm && distance <= f.maxKm) : null

  // Collect all unique classes
  const allClasses = new Set()
  matchingTrains.forEach(t => t.classes?.forEach(c => allClasses.add(c)))
  
  const tripJsonLd = {
    "@context": "https://schema.org",
    "@type": "TrainTrip",
    "trainNumber": firstTrain.number,
    "trainName": firstTrain.name,
    "departureStation": { "@type": "TrainStation", "name": firstTrain.from },
    "arrivalStation": { "@type": "TrainStation", "name": firstTrain.to },
    "departureTime": firstTrain.departure,
    "arrivalTime": firstTrain.arrival,
    "provider": { "@type": "Organization", "name": "Sri Lanka Railways" }
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sri-lanka-train-timetable.vercel.app/" },
      { "@type": "ListItem", "position": 2, "name": "Trains", "item": "https://sri-lanka-train-timetable.vercel.app/train" },
      { "@type": "ListItem", "position": 3, "name": info.displayName, "item": `https://sri-lanka-train-timetable.vercel.app/train/${slug}` }
    ]
  }

  const breadcrumbItems = [
    { label: 'Trains', href: '/train' },
    { label: info.displayName, href: `/train/${slug}` }
  ]

  return (
    <main className="min-h-screen bg-gray-50/50 pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(tripJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10 bg-blue-900 text-white rounded-3xl p-8 md:p-12 text-center shadow-lg">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {info.displayName}
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto mt-4 text-lg">
            {info.description}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <span className="bg-blue-800 text-blue-100 px-4 py-2 rounded-full font-medium border border-blue-700">
              Route: {firstTrain.from} ↔ {firstTrain.to}
            </span>
            <span className="bg-blue-800 text-blue-100 px-4 py-2 rounded-full font-medium border border-blue-700">
              Classes: {Array.from(allClasses).join(', ')}
            </span>
          </div>
        </header>

        {scenicData && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200 p-6 mb-10">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-2xl">📸</span>
              <h3 className="text-lg font-bold text-green-900">Scenic View Tips</h3>
            </div>
            <p className="text-green-800 mb-4">{scenicData.viewSide}</p>
            <div className="flex flex-wrap gap-2">
              {scenicData.highlights.map((h, i) => (
                <span key={i} className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                  {h}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-10 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Schedule</h2>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 rounded-tl-lg">Train No.</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Route</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Departs</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Arrives</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Duration</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 rounded-tr-lg">Days</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {matchingTrains.map((train, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3 px-4 font-medium text-gray-900">#{train.number}</td>
                  <td className="py-3 px-4">{train.from} to {train.to}</td>
                  <td className="py-3 px-4">{train.departure.substring(1, 6)}</td>
                  <td className="py-3 px-4">{train.arrival.substring(1, 6)}</td>
                  <td className="py-3 px-4">{Math.floor(train.duration_minutes / 60)}h {train.duration_minutes % 60}m</td>
                  <td className="py-3 px-4 text-sm capitalize">{train.daysOfWeek ? train.daysOfWeek.join(', ') : 'Daily'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-10">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Intermediate Stops (Example: #{firstTrain.number})</h2>
          {firstTrain.stops && firstTrain.stops.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3 px-4 font-semibold text-gray-700">Station</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Arrival</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Departure</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {firstTrain.stops.map((stop, idx) => (
                    <tr key={idx} className="hover:bg-gray-50/50">
                      <td className="py-3 px-4 font-medium text-gray-900">{stop.station}</td>
                      <td className="py-3 px-4">{stop.arrival ? stop.arrival.substring(1, 6) : '-'}</td>
                      <td className="py-3 px-4">{stop.departure ? stop.departure.substring(1, 6) : '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600">No intermediate stops data available.</p>
          )}
        </div>

        {fareBand && (
          <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-10 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Estimated Ticket Prices (Full Journey)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="py-3 px-4 font-semibold text-gray-700">Class</th>
                    <th className="py-3 px-4 font-semibold text-gray-700">Approx. Fare</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="py-3 px-4">3rd Class</td>
                    <td className="py-3 px-4 font-medium">LKR {fareBand['3rdClass']}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">2nd Class</td>
                    <td className="py-3 px-4 font-medium">LKR {fareBand['2ndClass']}</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4">1st Class</td>
                    <td className="py-3 px-4 font-medium">LKR {fareBand['1stClass']}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Related Links</h2>
          <div className="flex flex-col gap-3">
            <Link href={`/route/${routeSlug}`} className="text-blue-600 hover:underline font-medium flex items-center gap-2">
              <span>🛤️</span> View all trains for {firstTrain.from} to {firstTrain.to}
            </Link>
          </div>
        </div>

      </div>
    </main>
  )
}
