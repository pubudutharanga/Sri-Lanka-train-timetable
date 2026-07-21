import Hero from '../components/Hero'
import SearchSection from '../components/SearchSection'
import SEOContentSection from '../components/SEOContentSection'
import dynamic from 'next/dynamic'

// FAQ is below-the-fold, lazy-load for performance but still SSR
const FAQSection = dynamic(() => import('../components/FAQSection'))

export default function Home() {
  return (
    <div>
      <Hero />
      <div id="search" className="container mx-auto px-4">
        {/* SearchSection is now SSR-rendered so Google can crawl its content */}
        <SearchSection />
      </div>
      <SEOContentSection />
      <FAQSection />
    </div>
  )
}
