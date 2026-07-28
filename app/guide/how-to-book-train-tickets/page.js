import Link from 'next/link'
import Breadcrumbs from '../../../components/Breadcrumbs'
import Script from 'next/script'
import fs from 'fs'
import path from 'path'

export const metadata = {
  title: 'How to Book Sri Lanka Train Tickets Online — Step-by-Step Guide (2026)',
  description: 'Learn how to book Sri Lanka train tickets online, at the station, or via phone. Detailed step-by-step guide with 2026 pricing and tips.',
  alternates: {
    canonical: 'https://sri-lanka-train-timetable.vercel.app/guide/how-to-book-train-tickets'
  },
  openGraph: {
    title: 'How to Book Sri Lanka Train Tickets Online',
    description: 'Learn how to book Sri Lanka train tickets online, at the station, or via phone.',
    url: 'https://sri-lanka-train-timetable.vercel.app/guide/how-to-book-train-tickets',
    type: 'article',
  }
}

function getFareData() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'fares.json')
  if (!fs.existsSync(filePath)) return []
  const data = fs.readFileSync(filePath, 'utf8')
  return JSON.parse(data).fareTable || []
}

export default function BookingGuidePage() {
  const fares = getFareData()

  const breadcrumbItems = [
    { label: 'Guide', href: '/guide' },
    { label: 'How to Book Train Tickets', href: '/guide/how-to-book-train-tickets' }
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
        'name': 'How to Book Train Tickets',
        'item': 'https://sri-lanka-train-timetable.vercel.app/guide/how-to-book-train-tickets'
      }
    ]
  }

  const jsonLdFaq = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': 'How far in advance can I book Sri Lanka train tickets?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'You can book reserved tickets up to 30 days in advance of your travel date.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can foreigners book tickets online?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Yes, foreigners can book online using the official seatreservation.railway.gov.lk portal. You will need your passport number.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Can I get a refund for my train ticket?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'Refunds are generally not available for online bookings or mobile reservations. Station-bought tickets may have limited refundability depending on the time of cancellation.'
        }
      },
      {
        '@type': 'Question',
        'name': 'What happens if the train is fully booked online?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'If reserved seats are sold out, you can still buy unreserved 2nd or 3rd class tickets at the station on the day of departure.'
        }
      },
      {
        '@type': 'Question',
        'name': 'Do I need to print my online ticket?',
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': 'You must typically exchange your booking reference for a physical ticket at the departure station before boarding.'
        }
      }
    ]
  }

  return (
    <main className="min-h-screen bg-gray-50 pt-16">
      <Script id="breadcrumb-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }} />
      <Script id="faq-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }} />
      <Breadcrumbs items={breadcrumbItems} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <header className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
            How to Book Sri Lanka Train Tickets Online — Step-by-Step Guide (2026)
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know about securing a seat on Sri Lanka's spectacular railway routes. Last updated: July 2026.
          </p>
        </header>

        <section className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Step-by-step: Booking Online</h2>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Visit the Official Portal</h3>
                <p className="text-gray-600 mt-1">Go to <a href="https://seatreservation.railway.gov.lk" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">seatreservation.railway.gov.lk</a>.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Search for your Route</h3>
                <p className="text-gray-600 mt-1">Enter your starting station, destination, and travel date. Remember, you can only book exactly 30 days in advance (at 10:00 AM local time for highly sought routes).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Select Train & Class</h3>
                <p className="text-gray-600 mt-1">Choose an available train and your preferred class (1st Class, 2nd Class, etc.).</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Enter Passenger Details</h3>
                <p className="text-gray-600 mt-1">Fill in names, passport numbers (for foreigners) or NIC numbers (for locals). Ensure these match exactly with your ID documents.</p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Payment & Ticket Collection</h3>
                <p className="text-gray-600 mt-1">Pay via credit/debit card. You will receive an SMS/email reference. You MUST present this reference and your passport/ID at the station to collect the physical ticket before boarding.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Booking Methods Comparison</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Method</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pros</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cons</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Online (Official Portal)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Accessible anywhere, secure payment, visual interface.</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Can be glitchy, still requires picking up physical ticket.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Station Counter</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Instant ticket issue, good for unreserved seats.</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Long lines, reserved seats likely sold out.</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Phone (Mobitel 365)</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Convenient if you have a local SIM card.</td>
                  <td className="px-6 py-4 text-sm text-gray-500">Requires local SIM and sufficient mobile balance.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Class-wise Fare Breakdown (Estimates based on distance)</h2>
          <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">Distance (km)</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">3rd Class (LKR)</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">2nd Class (LKR)</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-500">1st Class (LKR)</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fares.map((f, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900">{f.minKm} - {f.maxKm}</td>
                    <td className="px-6 py-4 text-gray-600">{f['3rdClass']}</td>
                    <td className="px-6 py-4 text-gray-600">{f['2ndClass']}</td>
                    <td className="px-6 py-4 text-gray-600">{f['1stClass']}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">How far in advance can I book Sri Lanka train tickets?</h3>
              <p className="text-gray-700">You can book reserved tickets up to 30 days in advance of your travel date.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can foreigners book tickets online?</h3>
              <p className="text-gray-700">Yes, foreigners can book online using the official seatreservation.railway.gov.lk portal. You will need your passport number.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I get a refund for my train ticket?</h3>
              <p className="text-gray-700">Refunds are generally not available for online bookings or mobile reservations. Station-bought tickets may have limited refundability depending on the time of cancellation.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What happens if the train is fully booked online?</h3>
              <p className="text-gray-700">If reserved seats are sold out, you can still buy unreserved 2nd or 3rd class tickets at the station on the day of departure.</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Do I need to print my online ticket?</h3>
              <p className="text-gray-700">You must typically exchange your booking reference for a physical ticket at the departure station before boarding. Do this at the designated counter.</p>
            </div>
          </div>
        </section>

      </div>
    </main>
  )
}
