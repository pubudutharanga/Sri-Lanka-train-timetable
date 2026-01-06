// This server-side route exports simple JSON-LD for structured data if needed.
// You may adapt as required.
export async function GET(){
  return new Response(JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Sri Lanka Train Timetable',
    'url': 'https://example.com'
  }), {
    headers: { 'Content-Type': 'application/ld+json' }
  })
}
