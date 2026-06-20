'use client'

import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export default function Breadcrumbs({ items }) {
  if (!items || items.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className="w-full py-3 overflow-x-auto text-sm bg-white/50 border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <ol className="flex items-center space-x-2 whitespace-nowrap">
          <li>
            <Link 
              href="/" 
              className="text-gray-500 hover:text-blue-600 flex items-center transition-colors"
              title="Home"
            >
              <Home className="w-4 h-4" />
            </Link>
          </li>
          
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            
            return (
              <li key={index} className="flex items-center">
                <ChevronRight className="w-4 h-4 text-gray-400 mx-1 flex-shrink-0" />
                {isLast ? (
                  <span className="text-gray-900 font-medium truncate" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link 
                    href={item.href}
                    className="text-gray-500 hover:text-blue-600 transition-colors truncate"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            )
          })}
        </ol>
      </div>
    </nav>
  )
}
