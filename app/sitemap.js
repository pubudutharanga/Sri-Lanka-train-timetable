export default async function sitemap() {
  const baseUrl = 'https://sri-lanka-train-timetable.vercel.app'

  // Core pages with SEO-optimized priorities and change frequencies
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
  ]

  return routes
}
