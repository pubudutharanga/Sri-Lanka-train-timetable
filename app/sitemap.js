export default async function sitemap() {
  const baseUrl = 'https://pubudutharanga.github.io/Sri-Lanka-train-timetable'

  const staticPages = [
    '',
    '/about'
  ]

  return staticPages.map(path => ({
    url: baseUrl + path,
    lastModified: new Date().toISOString(),
  }))
}
