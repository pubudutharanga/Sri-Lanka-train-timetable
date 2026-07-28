import fs from 'fs'
import path from 'path'

export default async function sitemap() {
  const baseUrl = 'https://sri-lanka-train-timetable.vercel.app'
  const now = '2026-07-28' // Deterministic freshness signal
  
  // Base URLs
  const routes = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/route`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/station`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ]

  // Dynamic Route Pages
  try {
    const filePath = path.join(process.cwd(), 'public', 'data', 'trains.json')
    const data = fs.readFileSync(filePath, 'utf8')
    const trains = JSON.parse(data)
    
    // Route Pages
    const routeSet = new Set()
    trains.forEach(t => routeSet.add(`${t.from}:${t.to}`))
    
    const routePages = Array.from(routeSet).map(route => {
      const [from, to] = route.split(':')
      const slug = `${from.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-to-${to.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`
      return {
        url: `${baseUrl}/route/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      }
    })
    
    routes.push(...routePages)

    // Station Pages
    const stationNames = new Set()
    trains.forEach(t => {
      stationNames.add(t.from)
      stationNames.add(t.to)
      if (t.stops) {
        t.stops.forEach(s => stationNames.add(s.station))
      }
    })
    
    const stationPages = Array.from(stationNames).map(station => {
      const slug = station.toLowerCase().replace(/[^a-z0-9]+/g, '-')
      return {
        url: `${baseUrl}/station/${slug}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.7,
      }
    })
    
    routes.push(...stationPages)

    // Schedule Pages
    const validDayTypes = ['today', 'tomorrow', 'saturday', 'sunday', 'weekday', 'weekend']
    const schedulePages = validDayTypes.map(dayType => ({
      url: `${baseUrl}/schedule/${dayType}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.9,
    }))

    routes.push(...schedulePages)

    // Static Guide & SEO Pages
    const staticPages = [
      { url: `${baseUrl}/guide`, lastModified: '2026-07-28', priority: 0.9 },
      { url: `${baseUrl}/guide/how-to-book-train-tickets`, lastModified: '2026-07-28', priority: 0.8 },
      { url: `${baseUrl}/guide/train-classes-comparison`, lastModified: '2026-07-28', priority: 0.8 },
      { url: `${baseUrl}/guide/scenic-train-rides`, lastModified: '2026-07-28', priority: 0.8 },
      { url: `${baseUrl}/line`, lastModified: '2026-07-28', priority: 0.8 },
      { url: `${baseUrl}/line/main-line`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/line/coastal-line`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/line/northern-line`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/line/batticaloa-line`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/line/puttalam-line`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/line/kelani-valley-line`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/line/matale-line`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/train`, lastModified: '2026-07-28', priority: 0.8 },
      { url: `${baseUrl}/train/ella-odyssey`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/train/podi-menike`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/train/udarata-menike`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/train/yal-devi`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/train/ruhunu-kumari`, lastModified: '2026-07-28', priority: 0.7 },
      { url: `${baseUrl}/train/rajarata-rajina`, lastModified: '2026-07-28', priority: 0.7 },
    ]
    routes.push(...staticPages)
  } catch (e) {
    console.error('Failed to generate sitemap routes', e)
  }

  return routes
}
