import Link from 'next/link'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Script from 'next/script'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'Top 7 Most Scenic Train Rides in Sri Lanka (2026 Guide)',
  description: 'Discover the most breathtaking train routes in Sri Lanka. Find out which side to sit on, duration, and scenic ratings.',
  alternates: {
    canonical: 'https://sri-lanka-train-timetable.vercel.app/guide/scenic-train-rides'
  },
  openGraph: {
    title: 'Top 7 Most Scenic Train Rides in Sri Lanka (2026 Guide)',
    description: 'Discover the most breathtaking train routes in Sri Lanka.',
    url: 'https://sri-lanka-train-timetable.vercel.app/guide/scenic-train-rides',
    type: 'article',
  }
}

function getScenicData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'scenic-data.json')
  if (!fs.existsSync(filePath)) return {}
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data).routes || {}
}

const TOP_ROUTES = [
  { slug: 'kandy-to-ella', title: 'Kandy to Ella', duration: '6-7 Hours' },
  { slug: 'colombo-fort-to-galle', title: 'Colombo to Galle Coast', duration: '2-3 Hours' },
  { slug: 'colombo-fort-to-badulla', title: 'Colombo to Badulla', duration: '10-12 Hours' },
  { slug: 'nanu-oya-to-ella', title: 'Nanu Oya to Ella', duration: '3-4 Hours' },
  { slug: 'galle-to-matara', title: 'Galle to Matara', duration: '1 Hour' },
  { slug: 'colombo-fort-to-jaffna', title: 'Colombo to Jaffna', duration: '7-8 Hours' },
  { slug: 'colombo-fort-to-hikkaduwa', title: 'Colombo to Hikkaduwa', duration: '2 Hours' }
]

export default function ScenicRidesPage() {
  const allRoutes = getScenicData()
  const topRoutes = TOP_ROUTES.map((tr, index) => ({
    ...tr,
    rank: index + 1,
    data: allRoutes[tr.slug] || {}
  }))

  const breadcrumbItems = [
    { label: 'Guide', href: '/guide' },
    { label: 'Scenic Train Rides', href: '/guide/scenic-train-rides' }
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
      },
      {
        '@type': 'ListItem',
        'position': 3,
        'name': 'Scenic Train Rides',
        'item': 'https://sri-lanka-train-timetable.vercel.app/guide/scenic-train-rides'
      }
    ]
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            Top 7 Most Scenic Train Rides in Sri Lanka (2026 Guide)
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From misty tea plantations to sun-drenched coastlines, discover the most spectacular rail journeys on the island. Last updated: July 2026.
          </p>
        </header>

        <div className="space-y-8">
          {topRoutes.map(route => (
            <div key={route.slug} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="bg-blue-600 text-white font-bold w-8 h-8 rounded-full flex items-center justify-center text-sm">#{route.rank}</span>
                    <h2 className="text-2xl font-bold text-gray-900">{route.title}</h2>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      {route.duration}
                    </span>
                    <span className="flex items-center text-yellow-500 font-bold">
                      {route.data.scenicRating ? '★'.repeat(route.data.scenicRating) : ''}
                      <span className="text-gray-500 ml-1 font-normal">({route.data.scenicRating}/5 Rating)</span>
                    </span>
                  </div>
                </div>
                <Link href={`/route/${route.slug}`} className="hidden sm:inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  View Timetable
                </Link>
              </div>

              <div className="mt-4 bg-gray-50 rounded-xl p-4 border border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-1 flex items-center">
                  <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  Which side to sit:
                </h4>
                <p className="text-gray-700 text-sm">{route.data.viewSide || 'Both sides offer great views.'}</p>
              </div>

              <div className="mt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Photo Highlights:</h4>
                <div className="flex flex-wrap gap-2">
                  {(route.data.highlights || []).map((highlight, i) => (
                    <span key={i} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 sm:hidden">
                <Link href={`/route/${route.slug}`} className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                  View Timetable
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
