import Hero from '../components/Hero'
import SearchSection from '../components/SearchSection'
import SEOContentSection from '../components/SEOContentSection'
import FAQSection from '../components/FAQSection'

export default function Home() {
  return (
    <div>
      <Hero />
      <div id="search" className="container mx-auto px-4">
        <SearchSection />
      </div>
      <SEOContentSection />
      <FAQSection />
    </div>
  )
}
