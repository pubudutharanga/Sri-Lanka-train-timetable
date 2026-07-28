import Link from 'next/link'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Script from 'next/script'

export const metadata = {
  title: '1st Class vs 2nd Class vs 3rd Class — Sri Lanka Train Seating Guide',
  description: 'Detailed comparison of Sri Lanka train classes. Find out whether you should book 1st Class, 2nd Class, or 3rd Class for your journey.',
  alternates: {
    canonical: 'https://sri-lanka-train-timetable.vercel.app/guide/train-classes-comparison'
  },
  openGraph: {
    title: '1st Class vs 2nd Class vs 3rd Class — Sri Lanka Train Seating Guide',
    description: 'Detailed comparison of Sri Lanka train classes.',
    url: 'https://sri-lanka-train-timetable.vercel.app/guide/train-classes-comparison',
    type: 'article',
  }
}

export default function TrainClassesPage() {
  const breadcrumbItems = [
    { label: 'Guide', href: '/guide' },
    { label: 'Train Classes Comparison', href: '/guide/train-classes-comparison' }
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
        'name': 'Train Classes Comparison',
        'item': 'https://sri-lanka-train-timetable.vercel.app/guide/train-classes-comparison'
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
            1st Class vs 2nd Class vs 3rd Class — Sri Lanka Train Seating Guide
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Choosing the right class is crucial for an enjoyable train ride in Sri Lanka. Here's a complete comparison. Last updated: July 2026.
          </p>
        </header>

        <section className="mb-10">
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">Feature</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">1st Class</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">2nd Class</th>
                  <th className="px-6 py-4 text-left font-semibold text-gray-700">3rd Class</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Seat Type</td>
                  <td className="px-6 py-4 text-gray-600">Padded, reclining individual seats</td>
                  <td className="px-6 py-4 text-gray-600">Padded seats, sometimes shared</td>
                  <td className="px-6 py-4 text-gray-600">Basic bench seating, crowded</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Air Conditioning</td>
                  <td className="px-6 py-4 text-gray-600">Yes (usually means windows are locked)</td>
                  <td className="px-6 py-4 text-gray-600">No (fans & open windows)</td>
                  <td className="px-6 py-4 text-gray-600">No (fans & open windows)</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Price Range</td>
                  <td className="px-6 py-4 text-gray-600">Highest</td>
                  <td className="px-6 py-4 text-gray-600">Moderate</td>
                  <td className="px-6 py-4 text-gray-600">Very Cheap</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Reservation</td>
                  <td className="px-6 py-4 text-gray-600">Always Required</td>
                  <td className="px-6 py-4 text-gray-600">Reserved or Unreserved</td>
                  <td className="px-6 py-4 text-gray-600">Reserved or Unreserved</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 font-medium text-gray-900">Comfort Rating</td>
                  <td className="px-6 py-4 text-yellow-500 font-bold">5/5 ★</td>
                  <td className="px-6 py-4 text-yellow-500 font-bold">4/5 ★</td>
                  <td className="px-6 py-4 text-yellow-500 font-bold">2/5 ★</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">1st Class</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              First-class carriages are the most comfortable way to travel by train in Sri Lanka. The seats are well-padded and can recline, and the carriage is air-conditioned. Because of the AC, the windows are sealed shut, meaning you cannot hang out the windows for photos (a popular activity on Sri Lankan trains). First-class seats must be reserved in advance, and standing passengers are not allowed in these carriages, ensuring a peaceful journey. Bathrooms are typically cleaner than in lower classes.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">2nd Class</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Second class is the sweet spot for many travelers. The seats are padded and reasonably comfortable for long journeys. Carriages have fans and open windows, which is perfect for taking photographs and enjoying the breeze. You can book "reserved 2nd class" (guaranteed seat) or buy an "unreserved 2nd class" ticket on the day of travel (which means you might have to stand if it's crowded). The open windows allow for the quintessential Sri Lankan train experience.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">3rd Class</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Third class is the most affordable way to travel, heavily utilized by locals. Seating consists of hard benches that can get very crowded. While there are reserved 3rd class carriages on some trains, most are unreserved, meaning they operate on a first-come, first-served basis. It can be a vibrant, chaotic, and authentic cultural experience, but it is not recommended for long journeys unless you have a high tolerance for discomfort.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Observation Saloon & Expo Rail</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Certain trains on the Main Line (to Kandy/Badulla) feature an Observation Saloon. This is a special carriage attached to the very rear of the train with a large glass window facing backwards, offering panoramic views of the retreating track. Seats face backward. Expo Rail and Rajadhani Express were private, luxury, air-conditioned carriages attached to regular trains, offering meals and Wi-Fi, though their availability frequently changes.
            </p>
          </div>

          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
            <h2 className="text-2xl font-bold text-blue-900 mb-3">Which class is right for you?</h2>
            <p className="text-blue-800 leading-relaxed">
              <strong>For Photography & Authentic Experience:</strong> Reserved 2nd Class is highly recommended. You get a guaranteed seat but still have open windows and doors for taking the best photos. <br/><br/>
              <strong>For Ultimate Comfort:</strong> 1st Class is best if you mind the heat and want a guaranteed quiet, cool space to relax.<br/><br/>
              <strong>For the Budget Traveler:</strong> 3rd Class is an adventure, but try to get a reserved 3rd class seat if possible to ensure you don't spend hours standing.
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}
