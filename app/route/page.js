import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import Breadcrumbs from '../../components/Breadcrumbs'
import Script from 'next/script'

export const metadata = {
  title: 'All Train Routes Sri Lanka 2026 | Complete Route Directory',
  description: 'Browse all available train routes in Sri Lanka. Complete 2026 directory of train schedules, prices, and timetable information across Sri Lanka Railways.',
  alternates: {
    canonical: 'https://sri-lanka-train-timetable.vercel.app/route'
  }
}

function getTrains() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'trains.json')
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

export default function RouteIndexPage() {
  const trains = getTrains()
  const routeSet = new Set()
  
  trains.forEach(t => {
    routeSet.add(`${t.from}:${t.to}`)
  })
  
  const routes = Array.from(routeSet).map(route => {
    const [from, to] = route.split(':')
    const slug = `${from.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-to-${to.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
    return { from, to, slug }
  }).sort((a, b) => a.from.localeCompare(b.from) || a.to.localeCompare(b.to))

  const breadcrumbItems = [
    { label: 'Routes', href: '/route' }
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
        'name': 'Routes',
        'item': 'https://sri-lanka-train-timetable.vercel.app/route'
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
            All Train Routes in Sri Lanka
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Browse our complete directory of train routes for 2026. Select a route to view schedules, prices, and travel durations.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {routes.map((route, idx) => (
            <Link 
              key={idx} 
              href={`/route/${route.slug}`}
              className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{route.from}</span>
                <svg className="w-5 h-5 text-gray-400 group-hover:text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
              <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">{route.to}</div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
