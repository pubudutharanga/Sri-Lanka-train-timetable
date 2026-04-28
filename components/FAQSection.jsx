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
  {
    question: 'Is there a train from Colombo to Jaffna?',
    answer:
      'Yes, there are trains from Colombo Fort to Jaffna and Kankesanthurai. The Yal Devi and Uttara Devi express trains operate on this route daily. The journey takes approximately 6-7 hours with stops at Anuradhapura, Vavuniya, Kilinochchi, and Pallai. Both 1st class, 2nd class, and 3rd class are available. Search "Colombo Fort to Kankesanthurai" in our timetable.',
  },
  {
    question: 'What is the train schedule from Galle to Colombo?',
    answer:
      'Multiple trains operate on the Galle to Colombo coastal line daily. The journey takes approximately 2-3 hours depending on the service type. Express trains like Ruhunu Kumari and Galu Kumari serve this route with stops at Hikkaduwa, Ambalangoda, Bentota, Kalutara, and Panadura. Search for the Galle to Colombo route in our timetable to see all available departures.',
  },
  {
    question: "How can I find tomorrow's train time table?",
    answer:
      "To find tomorrow's train schedule, use our search tool and select your route. Then use the Day Type filter to match tomorrow's day (weekday, Saturday, or Sunday). The timetable shows all trains operating on that day type. You can plan ahead with the Sri Lanka railway time table tomorrow feature and check morning trains or evening options.",
  },
  {
    question: 'What is the train schedule from Colombo to Negombo?',
    answer:
      'The Colombo Fort to Negombo route is part of the Puttalam line (Coastal/Northern). Multiple trains run daily including early morning services. The train schedule Negombo Colombo Fort early morning starts around 5 AM. The journey takes about 1-1.5 hours. Search "Panadura to Chilaw" or similar routes that pass through Negombo in our timetable.',
  },
  {
    question: 'Can I download the Sri Lanka railway time table as PDF?',
    answer:
      'While our website provides an interactive online search tool for the Sri Lanka railway time table, you can use your browser\'s print function (Ctrl+P) to save results as PDF. For the official PDF timetable download, visit the Sri Lanka Railways official website at railway.gov.lk. Our online train schedule is always up-to-date and faster to search than PDF documents.',
  },
  {
    question: 'What is the Fort to Anuradhapura train time table?',
    answer:
      'Several trains run from Colombo Fort to Anuradhapura on the Northern line. The Yal Devi express covers this route in approximately 4-5 hours with stops at Polgahawela and Kurunegala. The Rajarata Rajina also serves this route. Both 1st class, 2nd class, and 3rd class seats are available. Check our timetable for all Fort to Anuradhapura departures.',
  },
  {
    question: 'What about the Vavuniya to Colombo train schedule?',
    answer:
      'The Vavuniya to Colombo route is served by the Northern line trains. Popular services include the Yal Devi express. The Sri Lanka train schedule Vavuniya Colombo 2026 shows multiple daily departures. The journey passes through Anuradhapura before reaching Colombo Fort. Search our timetable for the latest departure times and train availability.',
  },
  {
    question: 'Is there a live train schedule for Sri Lanka?',
    answer:
      'Our website shows the scheduled train timetable for Sri Lanka Railways. While we don\'t provide real-time GPS tracking, our timetable is updated to reflect the latest railway schedule. For live train status updates, you can contact Sri Lanka Railways directly. Our search tool provides the most current scheduled times for daily train services across all routes.',
  },
  {
    question: 'What is the Rabukkana railway station time table?',
    answer:
      'Rabukkana railway station is located on the Main Line between Colombo Fort and Kandy. Trains from Colombo to Kandy, Badulla, and Nanu Oya stop at Rabukkana. The Rabukkana railway station time table 2026 includes express and slow trains. Search for Colombo Fort to Kandy or Colombo Fort to Badulla routes to see trains stopping at Rabukkana.',
  },
  {
    question: 'What is the Talaimannar to Colombo train schedule?',
    answer:
      'The Talaimannar line connects Talaimannar to Colombo via Madhu Road and Anuradhapura on the Northern line. The Talaimannar to Colombo train time table shows limited services. Check our search tool for the latest schedule. This historic route connects to the northernmost point of the Sri Lanka railway network.',
  },
  {
    question: 'How can I find the Kalutara to Galle train time table?',
    answer:
      'The Kalutara to Galle route is on the Coastal line. Multiple trains pass through Kalutara South station heading to Galle daily. The journey takes approximately 1.5-2 hours via Bentota, Ambalangoda, and Hikkaduwa. Search for Maradana to Galle or Colombo Fort to Matara routes that stop at Kalutara to see all available trains.',
  },
  {
    question: 'What is the Moratuwa to Maradana train time table?',
    answer:
      'Moratuwa station is on the Coastal line, just south of Colombo. Many trains pass through Moratuwa heading to Maradana throughout the day. The journey takes approximately 30-45 minutes. This is a popular commuter route with frequent daily train services. Search coastal line routes in our timetable for Moratuwa departures.',
  },
  {
    question: 'කොටුව දුම්රිය කාලසටහන 2026 — Colombo Fort train schedule in Sinhala?',
    answer:
      'කොටුව (Colombo Fort) දුම්රිය පොළෙන් කොළඹ මහනගරයේ සිට ශ්‍රී ලංකාවේ සෑම ප්‍රධාන ගමනාන්තයකටම දුම්රිය ධාවනය වේ. Our timetable covers all trains from Colombo Fort (කොටුව) to Kandy, Badulla, Galle, Matara, Jaffna, and Batticaloa. Search any route above to see the 2026 දුම්රිය කාලසටහන (train timetable).',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null)

  return (
    <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8" id="faq">
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
