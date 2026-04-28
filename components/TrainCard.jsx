'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function minutesToH(duration){
  const h = Math.floor(duration/60)
  const m = duration%60
  return `${h}h ${m}m`
}

function formatTimeString(timeStr) {
  if (!timeStr) return '';
  if (timeStr.startsWith('T')) {
    return timeStr.substring(1, 6);
  }
  return timeStr;
}

function formatDateTime(datePart, timeStr) {
  if (!datePart || !timeStr) return '';
  
  try {
    const timeOnly = timeStr.startsWith('T') ? timeStr.substring(1) : timeStr;
    const dateTimeStr = `${datePart}T${timeOnly}`;
    const date = new Date(dateTimeStr);
    
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (e) {
    return formatTimeString(timeStr);
  }
}

// Day badge with icons
const getDayIcon = (day) => {
  const icons = {
    monday: '📅',
    tuesday: '📅',
    wednesday: '📅',
    thursday: '📅',
    friday: '📅',
    saturday: '🎉',
    sunday: '☀️'
  };
  return icons[day] || '📅';
};

// Class badge colors
const getClassColor = (className) => {
  switch(className) {
    case '1st Class':
    case '1st Class AC':
      return 'from-purple-500 to-purple-600 text-white';
    case '2nd Class':
      return 'from-blue-500 to-blue-600 text-white';
    case '3rd Class':
      return 'from-green-500 to-green-600 text-white';
    case 'Sleeper':
      return 'from-indigo-500 to-indigo-600 text-white';
    case 'Observation':
      return 'from-amber-500 to-amber-600 text-white';
    default:
      return 'from-gray-500 to-gray-600 text-white';
  }
};

// ... (previous code remains the same)

export default function TrainCard({ train }){
  const [open, setOpen] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  
  const departureTime = formatTimeString(train.departure);
  const arrivalTime = formatTimeString(train.arrival);
  
  // Calculate if train is currently running or upcoming
  const getTimeStatus = () => {
    const now = new Date();
    const currentHour = now.getHours();
    const trainHour = parseInt(departureTime.split(':')[0]);
    
    if (currentHour > trainHour) return 'completed';
    if (currentHour === trainHour) return 'current';
    return 'upcoming';
  };
  
  const timeStatus = getTimeStatus();
  
  return (
    <motion.div 
      layout 
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -2 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 25
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative bg-gradient-to-br from-white to-gray-50 rounded-2xl border border-gray-200/50 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group"
    >
      {/* Animated Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-100/0 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      {/* Status Indicator */}
      <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
        timeStatus === 'current' ? 'bg-gradient-to-b from-green-500 to-green-400 animate-pulse' :
        timeStatus === 'upcoming' ? 'bg-gradient-to-b from-blue-500 to-blue-400' :
        'bg-gradient-to-b from-gray-400 to-gray-300'
      }`}></div>
      
      <div className="relative p-6">
        {/* Header Section - UPDATED LOGO SECTION */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <div className="relative">
                {/* Image Logo Container */}
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-gray-200 shadow-md bg-gradient-to-br from-blue-50 to-blue-100">
                  <img 
                    src="/images/logoc.jpg" // Changed to local image
                    alt={`${train.name} logo`}
                    className="w-full h-full object-contain p-1"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/logoc.jpg"; // Try local image again
                      // Fallback to emoji if local image also fails
                      setTimeout(() => {
                        if (e.target.complete && e.target.naturalWidth === 0) {
                          e.target.style.display = 'none';
                          const fallbackDiv = document.createElement('div');
                          fallbackDiv.className = 'w-full h-full flex items-center justify-center';
                          fallbackDiv.innerHTML = '<span class="text-lg font-bold text-blue-600">🚂</span>';
                          e.target.parentNode.appendChild(fallbackDiv);
                        }
                      }, 100);
                    }}
                  />
                </div>
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-white rounded-full flex items-center justify-center shadow-sm border border-gray-200">
                  <span className="text-[10px] font-bold text-blue-600">SL</span>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-lg">
                    #{train.number}
                  </span>
                  <span className="text-xs text-gray-400">•</span>
                  <span className="text-sm font-medium text-gray-600">{train.name}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    timeStatus === 'current' ? 'bg-green-100 text-green-700' :
                    timeStatus === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {timeStatus === 'current' ? 'Running Now' :
                     timeStatus === 'upcoming' ? 'Upcoming' :
                     'Completed'}
                  </span>
                </div>
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              {train.from} → {train.to}
            </h3>
          </div>
          
          <button 
            onClick={() => setOpen(!open)} 
            className="relative w-10 h-10 rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center group/btn"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-blue-600/0 group-hover/btn:from-blue-500/10 group-hover/btn:to-blue-600/10 rounded-xl transition-all duration-300"></div>
            <svg 
              className={`w-5 h-5 text-gray-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Journey Timeline */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-green-500 to-green-400 shadow-md"></div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Departure</div>
                <div className="text-lg font-bold text-gray-900">{departureTime}</div>
                <div className="text-sm text-gray-600">{train.from}</div>
              </div>
            </div>
            
            <div className="flex-1 px-4">
              <div className="relative h-1 bg-gradient-to-r from-green-500 via-blue-500 to-red-500 rounded-full">
                <div className="absolute -top-3 left-0 right-0 flex items-center justify-center">
                  <div className="w-12 h-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-xs font-bold text-white">{minutesToH(train.duration_minutes)}</span>
                  </div>
                </div>
              </div>
              <div className="text-center mt-4 text-xs text-gray-500">
                {train.distance_km} km journey
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">Arrival</div>
                <div className="text-lg font-bold text-gray-900">{arrivalTime}</div>
                <div className="text-sm text-gray-600">{train.to}</div>
              </div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-red-500 to-red-400 shadow-md"></div>
            </div>
          </div>
        </div>

        {/* Days of Operation */}
        <div className="mb-6">
          <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Operating Days</div>
          <div className="flex flex-wrap gap-2">
            {train.daysOfWeek?.map((day, idx) => (
              <div 
                key={idx} 
                className="relative group/day"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover/day:opacity-100 transition-opacity duration-300"></div>
                <span 
                  className="relative px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-lg text-gray-700 flex items-center gap-2 transition-all duration-200 group-hover/day:border-blue-200 group-hover/day:text-blue-700"
                >
                  <span className="text-base">{getDayIcon(day)}</span>
                  {day.charAt(0).toUpperCase() + day.slice(1)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Available Classes */}
        {train.classes && train.classes.length > 0 && (
          <div className="mb-6">
            <div className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Available Classes</div>
            <div className="flex flex-wrap gap-2">
              {train.classes.map((cls, idx) => (
                <span 
                  key={idx} 
                  className={`px-3 py-1.5 text-xs font-semibold bg-gradient-to-r rounded-lg shadow-sm ${getClassColor(cls)}`}
                >
                  {cls}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Stops Section */}
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-6 border-t border-gray-200/50">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Stops ({train.stops?.length || 0})</h4>
                      <p className="text-xs text-gray-500">Intermediate stations along the route</p>
                    </div>
                  </div>
                  
                  {train.stops && train.stops.length > 0 && (
                    <div className="text-sm text-gray-500">
                      Total journey time: <span className="font-bold text-gray-900">{minutesToH(train.duration_minutes)}</span>
                    </div>
                  )}
                </div>

                {train.stops && train.stops.length > 0 ? (
                  <div className="space-y-4">
                    {train.stops.map((stop, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="relative"
                      >
                        {/* Timeline */}
                        {idx < train.stops.length - 1 && (
                          <div className="absolute left-3 top-6 bottom-0 w-0.5 bg-gradient-to-b from-blue-400 to-blue-300"></div>
                        )}
                        
                        <div className="flex items-start gap-4 p-3 rounded-xl hover:bg-blue-50/50 transition-colors duration-200 group/stop">
                          <div className="relative">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center shadow-sm group-hover/stop:scale-110 transition-transform duration-200">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <div className="absolute -right-1 -top-1 w-4 h-4 bg-white rounded-full border border-blue-200 flex items-center justify-center">
                              <span className="text-[8px] font-bold text-blue-600">{idx + 1}</span>
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h5 className="font-semibold text-gray-900">{stop.station}</h5>
                              <span className="text-xs text-gray-500">
                                Stop {idx + 1} of {train.stops.length}
                              </span>
                            </div>
                            
                            <div className="flex items-center gap-4 text-sm">
                              {stop.arrival && (
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-gray-700">
                                    Arr: <span className="font-semibold">{formatTimeString(stop.arrival)}</span>
                                  </span>
                                </div>
                              )}
                              
                              {stop.departure && (
                                <div className="flex items-center gap-2">
                                  <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span className="text-gray-700">
                                    Dep: <span className="font-semibold">{formatTimeString(stop.departure)}</span>
                                  </span>
                                </div>
                              )}
                              
                              {stop.arrival && stop.departure && (
                                <span className="text-xs text-gray-400">
                                  ({Math.abs(
                                    parseInt(formatTimeString(stop.departure).split(':')[0]) * 60 + 
                                    parseInt(formatTimeString(stop.departure).split(':')[1]) -
                                    (parseInt(formatTimeString(stop.arrival).split(':')[0]) * 60 + 
                                     parseInt(formatTimeString(stop.arrival).split(':')[1]))
                                  )} min stop)
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 bg-gray-50/50 rounded-xl">
                    <div className="w-12 h-12 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-gray-600">No intermediate stops on this route</p>
                    <p className="text-sm text-gray-500 mt-1">Direct train from {train.from} to {train.to}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence> 
      </div>
    </motion.div>
  )
}