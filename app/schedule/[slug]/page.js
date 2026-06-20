import fs from 'fs'
import path from 'path'
import { notFound } from 'next/navigation'
import Breadcrumbs from '../../../components/Breadcrumbs'
import TrainCard from '../../../components/TrainCard'

export const dynamicParams = false

const validDayTypes = ['today', 'tomorrow', 'saturday', 'sunday', 'weekday', 'weekend']

function getTrains() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'trains.json')
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data)
}

export function generateStaticParams() {
  return validDayTypes.map(dayType => ({ slug: dayType }))
}

export function generateMetadata({ params }) {
  const { slug } = params
  
  if (!validDayTypes.includes(slug)) return {}
  
  const titleMap = {
    today: "Today's Train Schedule Sri Lanka | Live Timetable",
    tomorrow: "Tomorrow's Train Time Table Sri Lanka",
    saturday: "Saturday Railway Time Table | Weekend Trains",
    sunday: "Sunday Train Timetable Sri Lanka",
    weekday: "Weekday Train Schedule Sri Lanka",
    weekend: "Weekend Train Timetable Sri Lanka"
  }
  
  const formattedSlug = slug.charAt(0).toUpperCase() + slug.slice(1)
  
  return {
    title: `${titleMap[slug]} - 2026`,
    description: `Search the Sri Lanka railway time table for ${formattedSlug}. Find all departures, routes, and schedules operating on ${formattedSlug}.`,
    alternates: {
      canonical: `https://sri-lanka-train-timetable.vercel.app/schedule/${slug}`
    }
  }
}

export default function SchedulePage({ params }) {
  const trains = getTrains()
  const { slug } = params
  
  if (!validDayTypes.includes(slug)) {
    notFound()
  }

  const breadcrumbItems = [
    { label: 'Schedule', href: '/#search' },
    { label: slug.charAt(0).toUpperCase() + slug.slice(1), href: `/schedule/${slug}` }
  ]

  // In a static build, "today" and "tomorrow" are tricky without client-side hydration or edge rendering.
  // We will treat them dynamically or filter by a generic "daily" for static render, but ideally this would be SSR.
  // For 'today' and 'tomorrow', we'll just show all trains (since many are daily) and perhaps add a client-side filter later.
  // For saturday, sunday, weekday, weekend we can filter statically.
  
  let filteredTrains = trains
  
  if (slug === 'saturday') {
    filteredTrains = trains.filter(t => t.daysOfWeek?.includes('saturday'))
  } else if (slug === 'sunday') {
    filteredTrains = trains.filter(t => t.daysOfWeek?.includes('sunday'))
  } else if (slug === 'weekend') {
    filteredTrains = trains.filter(t => t.daysOfWeek?.includes('saturday') || t.daysOfWeek?.includes('sunday'))
  } else if (slug === 'weekday') {
    filteredTrains = trains.filter(t => {
      if (!t.daysOfWeek) return false
      const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
      return t.daysOfWeek.some(day => weekdays.includes(day))
    })
  }

  // Sort by departure
  filteredTrains.sort((a, b) => {
    const timeA = parseInt(a.departure.substring(1, 3), 10) * 60 + parseInt(a.departure.substring(4, 6), 10)
    const timeB = parseInt(b.departure.substring(1, 3), 10) * 60 + parseInt(b.departure.substring(4, 6), 10)
    return timeA - timeB
  })

  // To avoid overwhelming the page with 400 trains, we'll slice the top 50 or show a specific UI.
  // The goal is to provide a good landing page.
  const displayTrains = filteredTrains.slice(0, 50)

  const formattedTitle = slug.charAt(0).toUpperCase() + slug.slice(1)

  return (
    <main className="min-h-screen bg-gray-50/50 pt-16">
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {formattedTitle} Train Schedule
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {slug === 'today' || slug === 'tomorrow' 
              ? `View the Sri Lanka train timetable for ${slug}. Please note exact times may vary on holidays.`
              : `View all Sri Lanka Railways trains operating on ${formattedTitle}s.`}
          </p>
        </header>

        <div className="space-y-4">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Scheduled Trains ({filteredTrains.length} total)</h2>
          {displayTrains.map((train, idx) => (
            <TrainCard key={train.id || idx} train={train} index={idx} />
          ))}
          {filteredTrains.length > 50 && (
            <div className="text-center p-6 bg-white rounded-xl border border-gray-200">
              <p className="text-gray-600">Showing 50 of {filteredTrains.length} trains. Please use the search tool on the homepage to find specific routes.</p>
              <a href="/#search" className="inline-block mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                Search Specific Route
              </a>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}
