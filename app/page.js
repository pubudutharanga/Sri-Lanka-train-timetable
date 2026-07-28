import Hero from '../components/Hero'
import SearchSection from '../components/SearchSection'
import SEOContentSection from '../components/SEOContentSection'
import VerificationBadge from '../components/VerificationBadge'
import dynamic from 'next/dynamic'

// FAQ is below-the-fold, lazy-load for performance but still SSR
const FAQSection = dynamic(() => import('../components/FAQSection'))

const BASE_URL = 'https://sri-lanka-train-timetable.vercel.app'

function HomepageBreadcrumbJsonLd() {
  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Train Schedule Search',
        item: `${BASE_URL}/#search`,
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
    />
  )
}

function FAQPageJsonLd() {
  const faqData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'How do I find the train schedule in Sri Lanka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can search for Sri Lanka train schedules on our website by selecting your departure and arrival stations from the route selector above. We provide updated timetables for all Sri Lanka Railways routes including Colombo Fort to Kandy, Galle, Badulla, Jaffna, Anuradhapura, Batticaloa, and more. Simply choose your route, select the day type, and optionally filter by departure time to find your train schedule.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the Sri Lanka railway time table for today?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Our website shows the current Sri Lanka railway timetable updated daily. Select your route and filter by day type (weekday, Saturday, Sunday) to see today's train schedule with departure times, arrival times, duration, distance, available classes, and all intermediate stops along the route. The today train time table shows all trains running on the current day.",
        },
      },
      {
        '@type': 'Question',
        name: 'How can I check the Colombo Fort train time table?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Select Colombo Fort as your departure station in the route selector. You can find trains from Colombo Fort to Kandy (scenic hill country line), Badulla (via Nanu Oya and Ella), Galle and Matara (coastal line), Jaffna and Kankesanthurai (northern line), Batticaloa (eastern line), Anuradhapura, and Negombo. The Colombo train time table includes all express and slow trains.',
        },
      },
      {
        '@type': 'Question',
        name: 'What trains run on weekends — Saturday and Sunday train timetable?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Many Sri Lanka Railways trains operate on weekends including Saturday and Sunday. Use the "Day Type" filter on our timetable search to see Saturday-only, Sunday-only, or weekend train schedules for your chosen route. Express trains like Podi Menike and Udarata Menike run daily including weekends. The Saturday railway time table and Sunday train time table may differ from weekday schedules.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where can I find the railway time table for 2026?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our website provides the latest 2026 Sri Lanka railway timetable. The railway new time table 2026 schedules are regularly updated to reflect the most current train times, routes, and operating days. You can search for any route to see the updated 2026 train time table including the revised timetable effective from the latest schedule changes.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are the most popular train routes in Sri Lanka?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Popular Sri Lanka train routes include: Colombo Fort to Kandy (scenic hill country line, ~3 hours), Colombo to Galle/Matara (coastal line, ~2-3 hours), Colombo to Badulla via Nanu Oya/Ella (famous tea country route, ~9 hours), Colombo to Jaffna (northern line, ~7 hours), Colombo to Batticaloa (eastern line, ~8 hours), Fort to Anuradhapura, Kalutara to Galle, Galle to Trincomalee, and Moratuwa to Maradana. The Colombo to Ella/Badulla route is world-famous for its scenic beauty.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I book Sri Lanka railway tickets online?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You can book Sri Lanka railway tickets online through the official Sri Lanka Railways seat reservation portal at seatreservation.railway.gov.lk. Our website helps you find the right train schedule first, then you can proceed to the official booking platform. For the official timetable, you can also check www.railway.gov.lk time table section. The railway.gov.lk schedule page has official information.',
        },
      },
    ],
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
    />
  )
}

export default function Home() {
  return (
    <div>
      <HomepageBreadcrumbJsonLd />
      <FAQPageJsonLd />
      <Hero />
      <div id="search" className="container mx-auto px-4">
        {/* SearchSection is now SSR-rendered so Google can crawl its content */}
        <SearchSection />
      </div>
      <SEOContentSection />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <VerificationBadge />
      </div>
      <FAQSection />
    </div>
  )
}
