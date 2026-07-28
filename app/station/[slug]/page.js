import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import TrainCard from '../../../components/TrainCard'
import VerificationBadge from '../../../components/VerificationBadge'

const stationTranslations = {
  'Colombo Fort': { si: 'කොළඹ කොටුව', ta: 'கொழும்பு கோட்டை' },
  'Kandy': { si: 'මහනුවර', ta: 'கண்டி' },
  'Galle': { si: 'ගාල්ල', ta: 'காலி' },
  'Matara': { si: 'මාතර', ta: 'மாத்தறை' },
  'Jaffna': { si: 'යාපනය', ta: 'யாழ்ப்பாணம்' },
  'Badulla': { si: 'බදුල්ල', ta: 'பதுளை' },
  'Anuradhapura': { si: 'අනුරාධපුරය', ta: 'அனுராதபுரம்' },
  'Ella': { si: 'ඇල්ල', ta: 'எல்லா' },
  'Nanu Oya': { si: 'නානුඔය', ta: 'நானு ஓயா' },
  'Trincomalee': { si: 'ත්‍රිකුණාමලය', ta: 'திருகோணமலை' },
  'Batticaloa': { si: 'මඩකලපුව', ta: 'மட்டக்களப்பு' },
  'Hikkaduwa': { si: 'හික්කඩුව', ta: 'ஹிக்கடுவ' },
  'Negombo': { si: 'මීගමුව', ta: 'நீர்கொழும்பு' },
  'Kurunegala': { si: 'කුරුණෑගල', ta: 'குருநாகல்' },
  'Vavuniya': { si: 'වවුනියාව', ta: 'வவுனியா' },
}

export const dynamicParams = false

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
  return Array.from(stationNames)
}

function stationToSlug(station) {
  return station.toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

export function generateStaticParams() {
  const trains = getTrains()
  const stations = getAllStations(trains)
  
  return stations.map(station => ({
    slug: stationToSlug(station)
  }))
}

export function generateMetadata({ params }) {
  const trains = getTrains()
  const stations = getAllStations(trains)
  const { slug } = params
  
  const stationName = stations.find(s => stationToSlug(s) === slug)
  
  if (!stationName) return {}
  
  return {
    title: `${stationName} Railway Station | Train Times & Departures 2026`,
    description: `Find all train departures, arrivals, and schedules for ${stationName} railway station. View the complete 2026 timetable for trains stopping at ${stationName}.`,
    alternates: {
      canonical: `https://sri-lanka-train-timetable.vercel.app/station/${slug}`
    },
    openGraph: {
      type: 'website',
      title: `${stationName} Railway Station | Train Times & Departures 2026`,
      description: `Find all train departures, arrivals, and schedules for ${stationName} railway station. View the complete 2026 timetable for trains stopping at ${stationName}.`,
      url: `https://sri-lanka-train-timetable.vercel.app/station/${slug}`,
      siteName: 'Sri Lanka Train Timetable',
      images: [{ url: 'https://sri-lanka-train-timetable.vercel.app/images/hero2.jpg', width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${stationName} Railway Station | Train Times & Departures 2026`,
      description: `Find all train departures, arrivals, and schedules for ${stationName} railway station. View the complete 2026 timetable for trains stopping at ${stationName}.`,
      images: ['https://sri-lanka-train-timetable.vercel.app/images/hero2.jpg'],
    }
  }
}

export default function StationPage({ params }) {
  const trains = getTrains()
  const stations = getAllStations(trains)
  const { slug } = params
  
  const stationName = stations.find(s => stationToSlug(s) === slug)
  
  if (!stationName) {
    notFound()
  }

  // Find all trains that stop at or originate from this station
  const stationTrains = trains.filter(t => {
    if (t.from === stationName || t.to === stationName) return true
    if (t.stops && t.stops.some(s => s.station === stationName)) return true
    return false
  })

  // Sort by departure time
  stationTrains.sort((a, b) => {
    const timeA = parseInt(a.departure.substring(1, 3), 10) * 60 + parseInt(a.departure.substring(4, 6), 10)
    const timeB = parseInt(b.departure.substring(1, 3), 10) * 60 + parseInt(b.departure.substring(4, 6), 10)
    return timeA - timeB
  })
  
  const stationJsonLd = {
    "@context": "https://schema.org",
    "@type": "TrainStation",
    "name": stationName,
    "url": `https://sri-lanka-train-timetable.vercel.app/station/${slug}`
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
        "name": "Stations",
        "item": "https://sri-lanka-train-timetable.vercel.app/#stations"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": stationName,
        "item": `https://sri-lanka-train-timetable.vercel.app/station/${slug}`
      }
    ]
  }

  const breadcrumbItems = [
    { label: 'Stations', href: '/#stations' },
    { label: stationName, href: `/station/${slug}` }
  ]

  return (
    <main className="min-h-screen bg-gray-50/50 pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(stationJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {stationName} Train Schedule
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View all departures and arrivals for {stationName} railway station based on the 2026 Sri Lanka Railways timetable.
          </p>
        </header>

        {/* Featured Snippet Table */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm mb-10 overflow-x-auto">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Departures from {stationName}</h2>
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 rounded-tl-lg">Train</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Origin</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Destination</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50">Time</th>
                <th className="py-3 px-4 font-semibold text-gray-700 bg-gray-50 rounded-tr-lg">Classes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {stationTrains.map((train, idx) => {
                // If the train originates here, time is departure.
                // If it ends here, time is arrival.
                const formatTime = (t) => t ? t.substring(1, 6) : 'N/A'
                let displayTime = formatTime(train.departure)
                if (train.to === stationName) {
                  displayTime = formatTime(train.arrival) + ' (Arrival)'
                } else if (train.from !== stationName) {
                  const stop = train.stops?.find(s => s.station === stationName)
                  if (stop) displayTime = formatTime(stop.departure || stop.arrival)
                }

                return (
                  <tr key={train.id || idx} className="hover:bg-gray-50/50">
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-900">{train.name}</span>
                      <span className="text-xs text-gray-500 block">#{train.number}</span>
                    </td>
                    <td className="py-3 px-4">{train.from}</td>
                    <td className="py-3 px-4">{train.to}</td>
                    <td className="py-3 px-4 font-medium">{displayTime}</td>
                    <td className="py-3 px-4 text-sm">{train.classes?.join(', ') || '-'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div className="mt-4 text-xs text-gray-500 text-right">
            Timetable last updated: June 2026 — Sourced from Sri Lanka Railways.
          </div>
        </div>

        {stationTranslations[stationName] && (
          <div className="mb-10 text-center text-sm text-gray-500">
            Also known as: <span className="font-medium text-gray-700">{stationTranslations[stationName].si}</span> (Sinhala) / <span className="font-medium text-gray-700">{stationTranslations[stationName].ta}</span> (Tamil)
          </div>
        )}

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Train Details</h2>
          {stationTrains.map((train, idx) => (
            <TrainCard key={train.id || idx} train={train} index={idx} />
          ))}
        </div>
        
        <div className="mt-12">
          <VerificationBadge />
        </div>
      </div>
    </main>
  )
}
