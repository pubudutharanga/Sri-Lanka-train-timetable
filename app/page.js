import Image from 'next/image'
import dynamic from 'next/dynamic'
import Hero from '../components/Hero'
import SearchSection from '../components/SearchSection'

export default function Home() {
  return (
    <div>
      <Hero />
      <div id="search" className="container mx-auto px-4">
        <SearchSection />
      </div>
    </div>
  )
}
