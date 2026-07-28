import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Breadcrumbs from '../../components/Breadcrumbs'

function getUniqueTrains() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'trains.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'))
  const namedTrains = data.filter(t => t.name && !t.name.toLowerCase().includes('express') && !t.name.toLowerCase().includes('mixed'))
  
  // Deduplicate by name
  const uniqueNames = new Set()
  const uniqueTrains = []
  
  namedTrains.forEach(t => {
    if (!uniqueNames.has(t.name)) {
      uniqueNames.add(t.name)
      uniqueTrains.push(t)
    }
  })
  
  return uniqueTrains
}

const trainDirectory = {
  'ella-odyssey': { match: (name) => name.includes('Odyssey') || name.includes('Dunhinda'), displayName: 'Ella Odyssey (Dunhinda Odyssey)' },
  'podi-menike': { match: (name) => name === 'Podi Menike', displayName: 'Podi Menike' },
  'udarata-menike': { match: (name) => name === 'Udarata Menike', displayName: 'Udarata Menike' },
  'yal-devi': { match: (name) => name === 'Yal Devi', displayName: 'Yal Devi' },
  'ruhunu-kumari': { match: (name) => name === 'Ruhunu Kumari', displayName: 'Ruhunu Kumari' },
  'rajarata-rajina': { match: (name) => name === 'Rajarata Rajina' || name === 'Rajarata Rejini', displayName: 'Rajarata Rajina' },
}

export const metadata = {
  title: 'Famous Sri Lanka Trains — Iconic Railway Services Guide 2026',
  description: 'Explore famous named trains in Sri Lanka including Ella Odyssey, Podi Menike, Yal Devi and more. Find schedules, routes and ticket information.',
}

export default function TrainsIndex() {
  const trains = getUniqueTrains()
  
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://sri-lanka-train-timetable.vercel.app/" },
      { "@type": "ListItem", "position": 2, "name": "Trains", "item": "https://sri-lanka-train-timetable.vercel.app/train" }
    ]
  }

  const breadcrumbItems = [
    { label: 'Trains', href: '/train' }
  ]

  // Find slugs for unique trains if they match our spotlight list
  const getSlugForTrain = (trainName) => {
    for (const [slug, info] of Object.entries(trainDirectory)) {
      if (info.match(trainName)) return slug
    }
    return null
  }

  return (
    <main className="min-h-screen bg-gray-50/50 pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Famous Sri Lanka Trains
          </h1>
          <p className="text-base text-gray-700 max-w-2xl mx-auto mt-4 leading-relaxed">
            Iconic Railway Services Guide 2026
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trains.map((train, idx) => {
            const slug = getSlugForTrain(train.name)
            return (
              <div key={idx} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-gray-900">{train.name}</h2>
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded font-medium">#{train.number}</span>
                </div>
                <div className="text-sm text-gray-600 mb-4 flex-grow">
                  <p><strong>Route:</strong> {train.from} to {train.to}</p>
                </div>
                {slug && (
                  <Link href={`/train/${slug}`} className="mt-auto block text-center w-full bg-blue-600 text-white font-medium py-2 rounded-lg hover:bg-blue-700 transition">
                    View Train Details
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </main>
  )
}
