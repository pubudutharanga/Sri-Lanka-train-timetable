'use client'
import { 
  Train, 
  MapPin, 
  Clock, 
  Mountain, 
  Waves, 
  TreePine, 
  Compass,
  ArrowRight,
  Star
} from 'lucide-react'

const popularRoutes = [
  {
    from: 'Colombo Fort',
    to: 'Kandy',
    line: 'Main Line',
    duration: '~3 hrs',
    distance: '120 km',
    highlight: 'Scenic Hill Country',
    icon: Mountain,
    color: 'from-emerald-500 to-green-600',
    bgColor: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    description: 'Travel through lush green tea plantations on the famous hill country line.',
  },
  {
    from: 'Colombo Fort',
    to: 'Galle',
    line: 'Coastal Line',
    duration: '~2.5 hrs',
    distance: '116 km',
    highlight: 'Ocean Views',
    icon: Waves,
    color: 'from-blue-500 to-cyan-600',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    description: 'Ride along the stunning Sri Lanka coastline with breathtaking ocean views.',
  },
  {
    from: 'Colombo Fort',
    to: 'Badulla',
    line: 'Main Line',
    duration: '~9 hrs',
    distance: '292 km',
    highlight: 'Famous Ella Route',
    icon: TreePine,
    color: 'from-purple-500 to-indigo-600',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    description: 'World-famous train ride through Ella, Nine Arch Bridge & tea country.',
  },
  {
    from: 'Colombo Fort',
    to: 'Jaffna',
    line: 'Northern Line',
    duration: '~7 hrs',
    distance: '413 km',
    highlight: 'Northern Express',
    icon: Compass,
    color: 'from-amber-500 to-orange-600',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-200',
    description: 'Express service to the cultural capital of the north via Anuradhapura.',
  },
  {
    from: 'Colombo Fort',
    to: 'Matara',
    line: 'Coastal Line',
    duration: '~3.5 hrs',
    distance: '159 km',
    highlight: 'Southern Coast',
    icon: Waves,
    color: 'from-teal-500 to-emerald-600',
    bgColor: 'bg-teal-50',
    borderColor: 'border-teal-200',
    description: 'Journey along the southern coast to Matara via Galle and Hikkaduwa.',
  },
  {
    from: 'Colombo Fort',
    to: 'Batticaloa',
    line: 'Eastern Line',
    duration: '~8 hrs',
    distance: '350 km',
    highlight: 'Eastern Gateway',
    icon: Compass,
    color: 'from-rose-500 to-pink-600',
    bgColor: 'bg-rose-50',
    borderColor: 'border-rose-200',
    description: 'Travel east through Polonnaruwa to the lagoon city of Batticaloa.',
  },
]

const sriLankaStations = [
  'Colombo Fort', 'Maradana', 'Kandy', 'Galle', 'Matara', 'Badulla',
  'Jaffna', 'Anuradhapura', 'Batticaloa', 'Trincomalee', 'Vavuniya',
  'Negombo', 'Panadura', 'Kalutara', 'Hikkaduwa', 'Ella', 'Nanu Oya',
  'Haputale', 'Hatton', 'Kurunegala', 'Polonnaruwa', 'Chilaw',
  'Mount Lavinia', 'Moratuwa', 'Bentota', 'Ambalangoda', 'Beliatta',
  'Peradeniya', 'Polgahawela', 'Kilinochchi', 'Kankesanthurai',
  'Talaimannar', 'Rabukkana', 'Mirigama', 'Pallai', 'Madhu Road',
  'Galoya Junction', 'Habarana'
]

export default function SEOContentSection() {
  const scrollToSearch = () => {
    document.getElementById('search')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
  }

  return (
    <>
      {/* ── Popular Routes Section ─────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="popular-routes">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200/50 mb-4">
            <Train className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-semibold text-blue-700">Popular Routes</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Popular Sri Lanka Train Routes & Timetable
          </h2>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Explore the most popular Sri Lanka railway routes. Find train schedules from Colombo Fort to major destinations across Sri Lanka.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularRoutes.map((route, index) => {
            const IconComponent = route.icon
            return (
              <div
                key={index}
                onClick={scrollToSearch}
                className={`group relative ${route.bgColor} rounded-2xl border ${route.borderColor} p-6 cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden`}
              >
                {/* Decorative gradient */}
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${route.color} opacity-5 rounded-full -translate-y-8 translate-x-8 group-hover:opacity-10 transition-opacity`}></div>

                <div className="relative z-10">
                  {/* Route Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${route.color} flex items-center justify-center shadow-sm`}>
                      <IconComponent className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xs font-semibold text-gray-500 bg-white/80 px-2 py-1 rounded-lg">
                      {route.line}
                    </span>
                  </div>

                  {/* Route Name */}
                  <h3 className="text-lg font-bold text-gray-900 mb-1 flex items-center gap-2">
                    {route.from}
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                    {route.to}
                  </h3>

                  {/* Highlight */}
                  <div className="flex items-center gap-1 mb-3">
                    <Star className="w-3 h-3 text-amber-500" />
                    <span className="text-sm font-medium text-amber-700">{route.highlight}</span>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {route.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {route.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {route.distance}
                    </div>
                  </div>

                  {/* CTA */}
                  <div className="mt-4 pt-4 border-t border-gray-200/50">
                    <span className="text-sm font-semibold text-blue-600 group-hover:text-blue-700 flex items-center gap-1">
                      View Train Schedule
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* ── SEO Content Section ─────────────────────────────────────── */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white" id="about-trains">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg prose-gray max-w-none">
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
              Sri Lanka Railway Time Table — Complete Train Schedule Guide
            </h2>

            <div className="bg-white rounded-2xl border border-gray-200/50 p-6 sm:p-8 shadow-sm mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                About Sri Lanka Train Timetable
              </h3>
              <p className="text-gray-600 leading-relaxed mb-4">
                Welcome to Sri Lanka Train Timetable — your comprehensive guide to <strong>Sri Lanka railway time table</strong> and{' '}
                <strong>train schedules</strong>. Our platform provides up-to-date <strong>train timetables</strong> for all{' '}
                <strong>Sri Lanka Railways</strong> routes, helping you plan your journey across this beautiful island.
              </p>
              <p className="text-gray-600 leading-relaxed">
                Whether you&apos;re searching for the <strong>train schedule from Colombo Fort to Kandy</strong>, looking up the{' '}
                <strong>railway time table today</strong>, or planning a trip on the famous{' '}
                <strong>Colombo to Ella train route</strong>, our search tool makes it easy to find accurate departure times,
                arrival times, and all intermediate stops.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl border border-gray-200/50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  🚂 Major Railway Lines
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Main Line</strong> — Colombo Fort to Badulla via Kandy, Nanu Oya, Ella</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Coastal Line</strong> — Colombo to Galle, Matara, Beliatta via Kalutara, Hikkaduwa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Northern Line</strong> — Colombo to Jaffna, Kankesanthurai via Anuradhapura</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Eastern Line</strong> — Colombo to Batticaloa, Trincomalee via Polonnaruwa</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Puttalam Line</strong> — Colombo to Chilaw, Puttalam via Negombo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200/50 p-6 shadow-sm">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  🎫 Train Classes Available
                </h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-purple-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>1st Class</strong> — Air-conditioned reserved seats, observation saloons</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>2nd Class</strong> — Reserved and unreserved seating</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>3rd Class</strong> — Unreserved, most affordable option</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0"></span>
                    <span><strong>Sleeper Class</strong> — Available on overnight long-distance trains</span>
                  </li>
                </ul>
                <p className="text-xs text-gray-500 mt-3">
                  Book tickets online at{' '}
                  <a
                    href="https://seatreservation.railway.gov.lk/mtktwebslr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    seatreservation.railway.gov.lk
                  </a>
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200/50 p-6 sm:p-8 shadow-sm mb-8">
              <h3 className="text-lg font-bold text-gray-900 mb-3">
                🏔️ Famous Express Trains
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                Sri Lanka Railways operates several famous named express trains that connect major cities across the island:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <Train className="w-4 h-4 text-blue-500" />
                  <span><strong>Podi Menike</strong> — Colombo to Badulla</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <Train className="w-4 h-4 text-green-500" />
                  <span><strong>Udarata Menike</strong> — Colombo to Badulla</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <Train className="w-4 h-4 text-amber-500" />
                  <span><strong>Yal Devi</strong> — Colombo to Jaffna</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <Train className="w-4 h-4 text-cyan-500" />
                  <span><strong>Ruhunu Kumari</strong> — Colombo to Matara</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <Train className="w-4 h-4 text-purple-500" />
                  <span><strong>Rajarata Rajina</strong> — Anuradhapura to Beliatta</span>
                </div>
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gray-50">
                  <Train className="w-4 h-4 text-rose-500" />
                  <span><strong>Udaya Devi</strong> — Colombo to Batticaloa</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Station Keywords Section ──────── */}
      <section className="py-12 bg-gray-50/50" id="stations" aria-label="Sri Lanka Railway Stations">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Sri Lanka Railway Stations — Search Train Timetable by Station
          </h2>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Search train schedules for all major railway stations across Sri Lanka. Select any station to find daily train times, departure schedules, and the complete railway time table.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {sriLankaStations.map((station, index) => (
              <span
                key={index}
                onClick={() => {
                  document.getElementById('search')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="px-3 py-1.5 bg-white rounded-full border border-gray-200 text-sm text-gray-600 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 cursor-pointer transition-all duration-200 shadow-sm"
              >
                {station}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Route-Specific Keyword Content ──────── */}
      <section className="py-12 bg-white" id="route-schedules" aria-label="Route-Specific Train Schedules">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Train Schedule by Route — Sri Lanka Railways Time Table 2026
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Today / Tomorrow */}
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border border-blue-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">📅 Today &amp; Tomorrow Train Time Table</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Find the <strong>today train time table</strong> for Sri Lanka Railways. Check <strong>today&apos;s train schedule</strong> from Colombo Fort to all destinations.
                Planning ahead? Search the <strong>tomorrow train time table</strong> and <strong>Sri Lanka railway time table tomorrow morning</strong> trains.
                Our daily train schedule covers weekday, <strong>Saturday railway time table</strong>, and <strong>Sunday train timetable</strong> services.
                Filter by <strong>train schedule for today</strong> or <strong>train schedule for tomorrow</strong> with specific departure times.
              </p>
            </div>

            {/* Official Resources */}
            <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🌐 Official Railway Resources</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The <strong>www railway gov lk time table</strong> is available at the official Sri Lanka Railways website.
                Check <strong>railway.gov.lk schedule</strong> for official notices.
                For the <strong>Sri Lanka railways official website timetable</strong> and PDF downloads,
                visit <a href="https://www.railway.gov.lk" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">railway.gov.lk</a>.
                Book tickets online at <a href="https://seatreservation.railway.gov.lk/mtktwebslr/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">seatreservation.railway.gov.lk</a>.
                Our site provides a faster, mobile-friendly <strong>online train schedule</strong> search.
              </p>
            </div>

            {/* Northern Routes */}
            <div className="bg-gradient-to-br from-amber-50 to-white rounded-2xl border border-amber-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🚂 Northern Line Train Schedule</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Search the <strong>Fort to Anuradhapura train time table</strong> on the Northern line.
                Find <strong>Jaffna train time table</strong> and <strong>train from Colombo to Jaffna</strong> departures.
                Check the <strong>Sri Lanka train schedule Vavuniya Colombo 2026</strong>.
                The <strong>Talaimannar to Colombo train time table</strong> connects the northernmost stations.
                View <strong>Rabukkana railway station time table 2026</strong> on the Main Line to Kandy.
              </p>
            </div>

            {/* Coastal Routes */}
            <div className="bg-gradient-to-br from-cyan-50 to-white rounded-2xl border border-cyan-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🌊 Coastal Line Train Timetable</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Find the <strong>Kalutara to Galle train time table</strong> on the scenic Coastal line.
                Check <strong>Moratuwa to Maradana train time table</strong> for commuter services.
                Search <strong>train schedule Colombo to Negombo</strong> and <strong>train schedule Negombo Colombo Fort early morning</strong> departures.
                View <strong>Galle to Trincomalee train time table</strong> connecting the coast to the east.
                Also available: <strong>Moratuwa to Anuradhapura train time table</strong> and <strong>train schedule Galle</strong>.
              </p>
            </div>

            {/* Hill Country */}
            <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl border border-purple-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🏔️ Hill Country &amp; Main Line</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                The world-famous <strong>Colombo to Badulla train</strong> passes through Kandy, Nanu Oya, Ella, and Haputale.
                Search <strong>train schedule Mirigama</strong> on the Main Line.
                Find the <strong>India to Sri Lanka train time table</strong> connections.
                Check <strong>train schedule Colombo</strong> for all departures from Colombo Fort station.
                The <strong>SL railway time table</strong> and <strong>SL train schedule</strong> cover every route.
              </p>
            </div>

            {/* Sinhala / How-to */}
            <div className="bg-gradient-to-br from-rose-50 to-white rounded-2xl border border-rose-100 p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">🔍 How to Search Train Times</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>How to find train time table</strong>: Select your route, day type, and departure hour above.
                <strong>How to see train time table</strong>: Click &ldquo;Search Trains&rdquo; to view results with stops.
                <strong>How to find train timings</strong>: Each result shows departure, arrival, and duration.
                Our <strong>live train schedule Sri Lanka</strong> tool is the easiest way to <strong>search train schedule</strong> and <strong>find train schedule</strong> online.
                <br /><br />
                <span className="text-gray-700 font-medium">කොටුව දුම්රිය කාලසටහන 2026</span> — Search Colombo Fort (කොටුව) train schedules in our timetable above.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
