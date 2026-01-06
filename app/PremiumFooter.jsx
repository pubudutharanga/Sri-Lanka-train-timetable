'use client'
import {  
  Train, // Added back since it's used in Tourist Trains link
  MapPin, 
  Phone, 
  Mail, 
  Globe, 
  Twitter, 
  Facebook, 
  Instagram, 
  Youtube,
  Shield,
  Award,
  Clock,
  ChevronRight,
  LinkedinIcon,
  Linkedin,
  GithubIcon,
  Github
} from 'lucide-react'
import Image from 'next/image'

export default function PremiumFooter() {
  const currentYear = new Date().getFullYear()

  // Social Media Links
  const developerLinks = {
    linkedin: "https://www.linkedin.com/in/pubudutharanga",
    facebook: "https://www.facebook.com/share/1ai3Wtn4jc/", 
    github: "https://github.com/pubudutharanga"
  }

  // Quick Links
  const quickLinks = {
    schedule: "#search", // Scrolls to search section
    tickets: "https://seatreservation.railway.gov.lk/mtktwebslr/",
    tourist: "https://seatreservation.railway.gov.lk/mtktwebslr/"
  }

  // Information Links
  const infoLinks = {
    about: "https://www.railway.gov.lk/web/index.php?option=com_content&view=article&id=137&Itemid=181&lang=en",
    safety: "https://www.railway.gov.lk/web/index.php?option=com_content&view=article&id=74&Itemid=155&lang=en"
  }

  return (
    <>
      {/* Premium Footer */}
      <footer className="relative bg-gradient-to-br from-gray-900 via-gray-900 to-blue-900 text-white overflow-hidden">
        
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/4 w-40 h-40 bg-cyan-500/5 rounded-full blur-3xl"></div>
          
          {/* Train Track Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent absolute top-0 left-8 right-8"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent absolute top-8 left-8 right-8"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent absolute top-16 left-8 right-8"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent absolute top-24 left-8 right-8"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-white to-transparent absolute top-32 left-8 right-8"></div>
          </div>
        </div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-12">
              
              {/* Brand Column - UPDATED WITH IMAGE */}
              <div className="lg:col-span-1">
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative w-16 h-16">
                    <Image
                      src="/images/logof.jpg" // Path to your image in public folder
                      alt="Sri Lanka Railways Logo"
                      fill
                      className="object-contain"
                      sizes=" 1834px, 1984px"
                    />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-300 to-cyan-300 bg-clip-text text-transparent">
                      Sri Lanka Railway Timetable
                    </h2>
                  </div>
                </div>
                <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                 We show you train times to help you plan better. Whether you travel daily or once in a while, we help you find the right train easily.
                </p>
                
                {/* Trust Badges */}
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-amber-500 to-amber-400 rounded-full"></span>
                  Quick Links
                </h3>
                <ul className="space-y-3">
                  {/* Train Schedule Link */}
                  <li>
                    <a 
                      href={quickLinks.schedule}
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                      onClick={(e) => {
                        e.preventDefault();
                        const searchSection = document.getElementById('search');
                        if (searchSection) {
                          searchSection.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <div className="w-6 h-6 rounded-md bg-gray-800 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                        <Clock className="w-3 h-3" />
                      </div>
                      <span className="text-sm">Train Schedule</span>
                    </a>
                  </li>
                  
                  {/* Book Tickets Link */}
                  <li>
                    <a 
                      href={quickLinks.tickets}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-6 h-6 rounded-md bg-gray-800 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                        <ChevronRight className="w-3 h-3" />
                      </div>
                      <span className="text-sm">Book Tickets</span>
                    </a>
                  </li>
                  
                  {/* Tourist Trains Link */}
                  <li>
                    <a 
                      href={quickLinks.tourist}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors group"
                    >
                      <div className="w-6 h-6 rounded-md bg-gray-800 flex items-center justify-center group-hover:bg-amber-500/20 transition-colors">
                        <Train className="w-3 h-3" />
                      </div>
                      <span className="text-sm">Tourist Trains</span>
                    </a>
                  </li>
                </ul>
              </div>

              {/* Information */}
              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-cyan-500 to-cyan-400 rounded-full"></span>
                  Information
                </h3>
                <ul className="space-y-3">
                  {/* About Railway Link */}
                  <li>
                    <a 
                      href={infoLinks.about}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      About Railway
                    </a>
                  </li>
                  
                  {/* Safety Guidelines Link */}
                  <li>
                    <a 
                      href={infoLinks.safety}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-gray-300 hover:text-white transition-colors flex items-center gap-2 group"
                    >
                      <ChevronRight className="w-3 h-3 text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                      Safety Guidelines
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact & Social */}
              <div>
                <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-6 bg-gradient-to-b from-blue-500 to-blue-400 rounded-full"></span>
                  Contact Us
                </h3>
                <div className="space-y-4">
                  {/* Phone Link */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Emergency & Support</div>
                      <a 
                        href="tel:+94112421421" 
                        className="font-bold text-lg hover:text-cyan-300 transition-colors"
                      >
                        +94 11 2 421 281
                      </a>
                    </div>
                  </div>
                  
                  {/* Email Link */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Email Support</div>
                      <a 
                        href="mailto:info@railway.gov.lk" 
                        className="font-medium hover:text-cyan-300 transition-colors"
                      >
                        info@railway.gov.lk
                      </a>
                    </div>
                  </div>
                  
                  {/* Address Link (Google Maps) */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-purple-700 flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-xs text-gray-400">Headquarters</div>
                      <a 
                        href="https://www.google.com/maps?q=Colombo+Fort+Station,+Colombo+01"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:text-purple-300 transition-colors"
                      >
                        Colombo Fort Station, Colombo 01
                      </a>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h4 className="text-sm font-semibold mb-3 text-gray-300">Follow Developer</h4>
                  <div className="flex gap-2">
                    {/* LinkedIn */}
                    <a
                      href={developerLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-500 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Linkedin className="w-5 h-5 text-white" />
                    </a>
                    
                    {/* Facebook */}
                    <a
                      href={developerLinks.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl"
                    >
                      <Facebook className="w-5 h-5 text-white" />
                    </a>
                    
                    {/* GitHub */}
                    <a
                      href={developerLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center hover:scale-110 transition-transform duration-300 shadow-lg hover:shadow-xl border border-gray-700"
                    >
                      <Github className="w-5 h-5 text-white" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="bg-gradient-to-r from-gray-900/50 via-gray-900 to-gray-900/50 border-t border-gray-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-300">English</span>
                  </div>
                  <div className="text-sm text-gray-400">|</div>
                  <div className="text-sm text-gray-300">
                    © {currentYear} Railway Timetable.
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-800/50">
                <div className="text-center text-xs text-gray-500">
                  All train data is for demonstration purposes only.
                  <br />
                  <span className="text-gray-400">
                    Official Sri Lanka Railways website:{" "}
                    <a 
                      href="https://www.railway.gov.lk" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-300 hover:text-cyan-200 transition-colors"
                    >
                      railway.gov.lk
                    </a>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  )
}