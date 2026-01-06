import '../styles/globals.css'
import { Inter } from 'next/font/google'
import PremiumFooter from './PremiumFooter'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Sri Lanka Train Timetable",
  description: "Search Sri Lanka Railways timetables — clean, fast, and mobile friendly",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {children}
        <PremiumFooter />
      </body>
    </html>
  )
}