import Hero from '../components/Hero'
import SEOContentSection from '../components/SEOContentSection'
import dynamic from 'next/dynamic'

const SearchSection = dynamic(() => import('../components/SearchSection'), {
  ssr: false,
})

const FAQSection = dynamic(() => import('../components/FAQSection'))

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
