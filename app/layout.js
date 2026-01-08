import '../styles/globals.css'
import { Inter } from 'next/font/google'
import PremiumFooter from './PremiumFooter'
import GoogleAnalytics from '../components/GoogleAnalytics'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Sri Lanka Train Timetable",
  description: "Search Sri Lanka Railways timetables — clean, fast, and mobile friendly",
  other: {
    'google-site-verification': '9KQ9eLhD46bM434cKjpY_MOQ8NcOIk8XGyf3I-zcFT4'
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <GoogleAnalytics />
        {children}
        <PremiumFooter />
      </body>
    </html>
  )
}
