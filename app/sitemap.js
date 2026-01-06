export default async function sitemap() {
  const baseUrl = 'https://example.com'
  const staticPages = ['', '/about']
  const routes = staticPages.map(path => ({
    url: baseUrl + path,
    lastModified: new Date().toISOString()
  }))
  return routes
}
