'use client'
import { useState } from 'react'
import { ChevronDown, HelpCircle } from 'lucide-react'

const faqItems = [
  {
    question: 'How do I find the train schedule in Sri Lanka?',
    answer:
      'You can search for Sri Lanka train schedules on our website by selecting your departure and arrival stations from the route selector above. We provide updated timetables for all Sri Lanka Railways routes including Colombo Fort to Kandy, Galle, Badulla, Jaffna, Anuradhapura, Batticaloa, and more. Simply choose your route, select the day type, and optionally filter by departure time to find your train schedule.',
  },
  {
    question: 'What is the Sri Lanka railway time table for today?',
    answer:
      "Our website shows the current Sri Lanka railway timetable updated daily. Select your route and filter by day type (weekday, Saturday, Sunday) to see today's train schedule with departure times, arrival times, duration, distance, available classes, and all intermediate stops along the route. The today train time table shows all trains running on the current day.",
  },
  {
    question: 'How can I check the Colombo Fort train time table?',
    answer:
      'Select Colombo Fort as your departure station in the route selector. You can find trains from Colombo Fort to Kandy (scenic hill country line), Badulla (via Nanu Oya and Ella), Galle and Matara (coastal line), Jaffna and Kankesanthurai (northern line), Batticaloa (eastern line), Anuradhapura, and Negombo. The Colombo train time table includes all express and slow trains.',
  },
  {
    question: 'What trains run on weekends — Saturday and Sunday train timetable?',
    answer:
      'Many Sri Lanka Railways trains operate on weekends including Saturday and Sunday. Use the "Day Type" filter on our timetable search to see Saturday-only, Sunday-only, or weekend train schedules for your chosen route. Express trains like Podi Menike and Udarata Menike run daily including weekends. The Saturday railway time table and Sunday train time table may differ from weekday schedules.',
  },
  {
    question: 'Where can I find the railway time table for 2026?',
    answer:
      'Our website provides the latest 2026 Sri Lanka railway timetable. The railway new time table 2026 schedules are regularly updated to reflect the most current train times, routes, and operating days. You can search for any route to see the updated 2026 train time table including the revised timetable effective from the latest schedule changes.',
  },
  {
    question: 'What are the most popular train routes in Sri Lanka?',
    answer:
      'Popular Sri Lanka train routes include: Colombo Fort to Kandy (scenic hill country line, ~3 hours), Colombo to Galle/Matara (coastal line, ~2-3 hours), Colombo to Badulla via Nanu Oya/Ella (famous tea country route, ~9 hours), Colombo to Jaffna (northern line, ~7 hours), Colombo to Batticaloa (eastern line, ~8 hours), Fort to Anuradhapura, Kalutara to Galle, Galle to Trincomalee, and Moratuwa to Maradana. The Colombo to Ella/Badulla route is world-famous for its scenic beauty.',
  },
  {
    question: 'How do I book Sri Lanka railway tickets online?',
    answer:
      'You can book Sri Lanka railway tickets online through the official Sri Lanka Railways seat reservation portal at seatreservation.railway.gov.lk. Our website helps you find the right train schedule first, then you can proceed to the official booking platform. For the official timetable, you can also check www.railway.gov.lk time table section. The railway.gov.lk schedule page has official information.',
  },
]

function FAQJsonLd() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="faq">
      <FAQJsonLd />
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-200/50 mb-4">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span className="text-sm font-semibold text-amber-700">FAQ</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Frequently Asked Questions — Sri Lanka Train Schedule &amp; Railway Time Table
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find answers about Sri Lanka railway timetable, train schedules today &amp; tomorrow, ticket booking, popular routes, and how to search train times online.
        </p>
      </div>

      {/* FAQ Items */}
      <div className="space-y-3">
        {faqItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl border border-gray-200/60 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-5 sm:p-6 text-left group"
              aria-expanded={openIndex === index}
            >
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 pr-4 group-hover:text-blue-700 transition-colors">
                {item.question}
              </h3>
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center transition-all duration-300 ${
                  openIndex === index
                    ? 'bg-blue-500 border-blue-500 rotate-180'
                    : 'bg-gray-50 group-hover:bg-blue-50 group-hover:border-blue-200'
                }`}
              >
                <ChevronDown
                  className={`w-4 h-4 transition-colors ${
                    openIndex === index ? 'text-white' : 'text-gray-500 group-hover:text-blue-500'
                  }`}
                />
              </div>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-0">
                <div className="border-t border-gray-100 pt-4">
                  <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
