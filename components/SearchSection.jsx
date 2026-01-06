'use client'
import { useEffect, useState } from 'react'
import TrainCard from './TrainCard'
import * as Select from '@radix-ui/react-select'
import { 
  ChevronDown, 
  ChevronUp, 
  Check,
  MapPin,
  Calendar,
  Clock as ClockIcon,
  Search,
  RefreshCw,
  AlertCircle,
  X
} from 'lucide-react'

export default function SearchSection() {
  const [trains, setTrains] = useState([])
  const [loading, setLoading] = useState(true)
  const [query, setQuery] = useState({
    dayType: 'any',
    time: 'any',
    route: ''
  })
  const [results, setResults] = useState([])
  const [error, setError] = useState('')
  const [openSelects, setOpenSelects] = useState({
    route: false,
    dayType: false,
    time: false
  })

  useEffect(() => {
    fetch('/Sri-Lanka-train-timetable/data/trains.json')
      .then(r => r.json())
      .then(data => {
        setTrains(data)
        setLoading(false)
      })
      .catch(err => {
        setError('Failed to load timetable data.')
        setLoading(false)
      })
  }, [])

  function validate() {
    if (!query.route) return 'Please select a route.'
    return ''
  }

  function onSearch(e) {
    e.preventDefault()
    const v = validate()
    setError(v)
    if (v) return

    let filtered = [...trains]

    if (query.dayType !== 'any') {
      switch (query.dayType) {
        case 'saturday':
          filtered = filtered.filter(train => 
            train.daysOfWeek && train.daysOfWeek.includes('saturday')
          )
          break
        case 'sunday':
          filtered = filtered.filter(train => 
            train.daysOfWeek && train.daysOfWeek.includes('sunday')
          )
          break
        case 'weekend':
          filtered = filtered.filter(train => 
            train.daysOfWeek && 
            (train.daysOfWeek.includes('saturday') || train.daysOfWeek.includes('sunday'))
          )
          break
        case 'weekday':
          filtered = filtered.filter(train => {
            if (!train.daysOfWeek) return false
            const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
            return train.daysOfWeek.some(day => weekdays.includes(day))
          })
          break
      }
    }

    if (query.time && query.time !== 'any') {
      const selectedHour = parseInt(query.time.split(':')[0], 10)
      filtered = filtered.filter(train => {
        const trainDepartureTime = train.departure
        const trainHour = parseInt(trainDepartureTime.substring(1, 3), 10)
        return trainHour === selectedHour
      })
    }

    if (query.route) {
      const [from, to] = query.route.split(':')
      filtered = filtered.filter(train => 
        train.from === from && train.to === to
      )
    }

    filtered.sort((a, b) => {
      const timeA = parseInt(a.departure.substring(1, 3), 10) * 60 + 
                   parseInt(a.departure.substring(4, 6), 10)
      const timeB = parseInt(b.departure.substring(1, 3), 10) * 60 + 
                   parseInt(b.departure.substring(4, 6), 10)
      return timeA - timeB
    })

    setResults(filtered)
  }

  const getRoutes = () => {
    const routeSet = new Set()
    trains.forEach(train => {
      const route = `${train.from}:${train.to}`
      routeSet.add(route)
    })
    return Array.from(routeSet).sort().map(route => {
      const [from, to] = route.split(':')
      return { value: route, label: `${from} → ${to}` }
    })
  }

  const routes = getRoutes()

  const timeOptions = [
    { value: 'any', label: 'Any departure time', hour: null, icon: '🕐' }
  ].concat(
    Array.from({ length: 24 }).map((_, i) => {
      const hour = i < 10 ? `0${i}` : i
      const period = i < 12 ? 'AM' : 'PM'
      const displayHour = i === 0 ? 12 : i > 12 ? i - 12 : i
      return {
        value: `${hour}:00`,
        label: `${displayHour}:00 ${period}`,
        hour: i
      }
    })
  )

  const dayTypeOptions = [
    { value: 'any', label: 'Any Day', icon: '📅' },
    { value: 'saturday', label: 'Saturday Only', icon: '🗓️' },
    { value: 'sunday', label: 'Sunday Only', icon: '🗓️' },
    { value: 'weekend', label: 'Weekend (Sat & Sun)', icon: '🎉' },
    { value: 'weekday', label: 'Weekday Only', icon: '💼' }
  ]

  // Helper to get display value for route
  const getRouteDisplay = (value) => {
    if (!value) return 'Select departure & arrival stations'
    const [from, to] = value.split(':')
    return `${from} → ${to}`
  }

  // Helper to get display value for day type
  const getDayTypeDisplay = (value) => {
    const option = dayTypeOptions.find(opt => opt.value === value)
    return option ? option.label : 'Any Day'
  }

  // Helper to get display value for time
  const getTimeDisplay = (value) => {
    if (!value || value === 'any') return 'Any departure time'
    const option = timeOptions.find(opt => opt.value === value)
    return option ? option.label : value
  }

  // Helper to get icon for time option
  const getTimeIcon = (hour) => {
    if (hour === null) return '🕐'
    return hour >= 6 && hour <= 18 ? '🌅' : '🌙'
  }

  return (
    <section className="py-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-3 bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
          Sri Lanka Railway
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Find train schedules across the island with real-time availability
        </p>
      </div>

      {/* Search Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl shadow-2xl border border-gray-200/50 p-6 md:p-8 mb-10 backdrop-blur-sm bg-white/90">
        <form onSubmit={onSearch}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Route Selection - Radix UI Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Route Selection
                </label>
              </div>
              
              <Select.Root 
                value={query.route} 
                onValueChange={(value) => setQuery({ ...query, route: value })}
                open={openSelects.route}
                onOpenChange={(open) => setOpenSelects(prev => ({ ...prev, route: open }))}
              >
                <Select.Trigger 
                  className={`w-full flex items-center justify-between pl-12 pr-4 py-4 rounded-xl border-2 bg-white text-gray-900 focus:outline-none transition-all duration-300
                    ${openSelects.route 
                      ? 'border-blue-500 shadow-lg shadow-blue-100/50 ring-2 ring-blue-500/20' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }
                    ${query.route ? 'bg-gradient-to-r from-blue-50/50 to-white' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <MapPin className={`w-5 h-5 ${openSelects.route ? 'text-blue-600' : 'text-gray-400'} transition-colors`} />
                    <Select.Value placeholder="Select departure & arrival stations">
                      {getRouteDisplay(query.route)}
                    </Select.Value>
                  </div>
                  <Select.Icon>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openSelects.route ? 'rotate-180 text-blue-600' : 'text-gray-400'}`} />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content 
                    className="z-50 overflow-hidden bg-white rounded-xl shadow-2xl border border-gray-200 animate-in fade-in-80"
                    position="popper"
                    sideOffset={5}
                  >
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                      <ChevronUp className="w-4 h-4" />
                    </Select.ScrollUpButton>
                    
                    <Select.Viewport className="p-2 max-h-[300px]">
                      <Select.Group>
                        {routes.map((route) => (
                          <Select.Item 
                            key={route.value} 
                            value={route.value}
                            className="relative flex items-center px-8 py-3 rounded-lg text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700 focus:outline-none cursor-pointer transition-colors data-[disabled]:text-gray-400 data-[disabled]:pointer-events-none data-[highlighted]:bg-blue-50 data-[highlighted]:text-blue-700"
                          >
                            <Select.ItemText>
                              <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                {route.label}
                              </div>
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2 w-4 h-4 inline-flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                      <ChevronDown className="w-4 h-4" />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                <AlertCircle className="w-3 h-3" />
                Choose your starting and destination stations
              </p>
            </div>

            {/* Day Type - Radix UI Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Day Type
                </label>
              </div>
              
              <Select.Root 
                value={query.dayType} 
                onValueChange={(value) => setQuery({ ...query, dayType: value })}
                open={openSelects.dayType}
                onOpenChange={(open) => setOpenSelects(prev => ({ ...prev, dayType: open }))}
              >
                <Select.Trigger 
                  className={`w-full flex items-center justify-between pl-12 pr-4 py-4 rounded-xl border-2 bg-white text-gray-900 focus:outline-none transition-all duration-300
                    ${openSelects.dayType 
                      ? 'border-purple-500 shadow-lg shadow-purple-100/50 ring-2 ring-purple-500/20' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }
                    ${query.dayType !== 'any' ? 'bg-gradient-to-r from-purple-50/50 to-white' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <Calendar className={`w-5 h-5 ${openSelects.dayType ? 'text-purple-600' : 'text-gray-400'} transition-colors`} />
                    <Select.Value>{getDayTypeDisplay(query.dayType)}</Select.Value>
                  </div>
                  <Select.Icon>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openSelects.dayType ? 'rotate-180 text-purple-600' : 'text-gray-400'}`} />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content 
                    className="z-50 overflow-hidden bg-white rounded-xl shadow-2xl border border-gray-200 animate-in fade-in-80"
                    position="popper"
                    sideOffset={5}
                  >
                    <Select.Viewport className="p-2">
                      <Select.Group>
                        {dayTypeOptions.map((option) => (
                          <Select.Item 
                            key={option.value} 
                            value={option.value}
                            className="relative flex items-center px-8 py-3 rounded-lg text-sm text-gray-700 hover:bg-purple-50 hover:text-purple-700 focus:bg-purple-50 focus:text-purple-700 focus:outline-none cursor-pointer transition-colors"
                          >
                            <Select.ItemText>
                              <div className="flex items-center gap-3">
                                <span className="text-lg">{option.icon}</span>
                                {option.label}
                              </div>
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2 w-4 h-4 inline-flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                <AlertCircle className="w-3 h-3" />
                Filter trains by day of operation
              </p>
            </div>

            {/* Time Selection - Radix UI Dropdown */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                <label className="text-sm font-semibold text-gray-700 uppercase tracking-wider">
                  Departure Time
                </label>
              </div>
              
              <Select.Root 
                value={query.time} 
                onValueChange={(value) => setQuery({ ...query, time: value })}
                open={openSelects.time}
                onOpenChange={(open) => setOpenSelects(prev => ({ ...prev, time: open }))}
              >
                <Select.Trigger 
                  className={`w-full flex items-center justify-between pl-12 pr-4 py-4 rounded-xl border-2 bg-white text-gray-900 focus:outline-none transition-all duration-300
                    ${openSelects.time 
                      ? 'border-green-500 shadow-lg shadow-green-100/50 ring-2 ring-green-500/20' 
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }
                    ${query.time !== 'any' ? 'bg-gradient-to-r from-green-50/50 to-white' : ''}`}
                >
                  <div className="flex items-center gap-3">
                    <ClockIcon className={`w-5 h-5 ${openSelects.time ? 'text-green-600' : 'text-gray-400'} transition-colors`} />
                    <Select.Value>{getTimeDisplay(query.time)}</Select.Value>
                  </div>
                  <Select.Icon>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${openSelects.time ? 'rotate-180 text-green-600' : 'text-gray-400'}`} />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  <Select.Content 
                    className="z-50 overflow-hidden bg-white rounded-xl shadow-2xl border border-gray-200 animate-in fade-in-80"
                    position="popper"
                    sideOffset={5}
                  >
                    <Select.ScrollUpButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                      <ChevronUp className="w-4 h-4" />
                    </Select.ScrollUpButton>
                    
                    <Select.Viewport className="p-2 max-h-[300px]">
                      <Select.Group>
                        {timeOptions.map((option) => (
                          <Select.Item 
                            key={option.value} 
                            value={option.value}
                            className="relative flex items-center px-8 py-3 rounded-lg text-sm text-gray-700 hover:bg-green-50 hover:text-green-700 focus:bg-green-50 focus:text-green-700 focus:outline-none cursor-pointer transition-colors"
                          >
                            <Select.ItemText>
                              <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${
                                  option.value === 'any' ? 'bg-gray-300' : 
                                  option.hour >= 6 && option.hour <= 18 ? 'bg-green-500' : 'bg-blue-500'
                                }`}></div>
                                {option.label}
                                <span className="text-xs text-gray-500 ml-auto">
                                  {getTimeIcon(option.hour)}
                                </span>
                              </div>
                            </Select.ItemText>
                            <Select.ItemIndicator className="absolute left-2 w-4 h-4 inline-flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </Select.ItemIndicator>
                          </Select.Item>
                        ))}
                      </Select.Group>
                    </Select.Viewport>

                    <Select.ScrollDownButton className="flex items-center justify-center h-6 bg-white text-gray-700 cursor-default">
                      <ChevronDown className="w-4 h-4" />
                    </Select.ScrollDownButton>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              
              <p className="text-xs text-gray-500 flex items-center gap-1 mt-2">
                <AlertCircle className="w-3 h-3" />
                Filter by hour of departure
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-gray-200/50">
            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-blue-500/25 transition-all duration-300 transform hover:-translate-y-1 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 flex items-center gap-3">
                  <Search className="w-5 h-5" />
                  Search Trains
                </div>
              </button>
              <button
                type="button"
                onClick={() => {
                  setQuery({
                    dayType: 'any',
                    time: 'any',
                    route: ''
                  })
                  setResults([])
                  setError('')
                  setOpenSelects({ route: false, dayType: false, time: false })
                }}
                className="px-6 py-4 border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-200 flex items-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Clear All
              </button>
            </div>
            
            {loading && (
              <div className="flex items-center gap-3 px-4 py-3 bg-blue-50 rounded-xl border border-blue-100">
                <div className="relative">
                  <div className="w-5 h-5 border-2 border-blue-200 rounded-full"></div>
                  <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                </div>
                <span className="text-sm font-medium text-blue-700">Loading train data...</span>
              </div>
            )}
          </div>

          {error && (
            <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-red-50/50 border-l-4 border-red-500 rounded-r-xl animate-pulse-subtle">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <span className="text-red-800 font-semibold">{error}</span>
                  <p className="text-red-600 text-sm mt-1">Please select a route to continue</p>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Results Summary Card - Enhanced */}
      {results.length > 0 && (
        <div className="mb-10 p-6 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl border border-blue-200/50 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md border border-blue-100">
                  <span className="text-xs font-bold text-blue-600">{results.length}</span>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {results.length} Train{results.length !== 1 ? 's' : ''} Found
                </h3>
                <div className="flex items-center gap-2 mt-2">
                  {query.dayType !== 'any' && (
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-blue-700 text-sm font-medium rounded-full border border-blue-200 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {query.dayType.charAt(0).toUpperCase() + query.dayType.slice(1)}
                    </span>
                  )}
                  {query.time && query.time !== 'any' && (
                    <span className="px-3 py-1 bg-white/80 backdrop-blur-sm text-green-700 text-sm font-medium rounded-full border border-green-200 flex items-center gap-1">
                      <ClockIcon className="w-4 h-4" />
                      {getTimeDisplay(query.time)}
                    </span>
                  )}
                </div>
              </div>
            </div>
            
            {query.route && (
              <div className="px-5 py-3 bg-white/90 backdrop-blur-sm rounded-xl border border-gray-200 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold">Route</div>
                    <div className="font-bold text-gray-900 text-lg">
                      {getRouteDisplay(query.route)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Results Section */}
      <div className="space-y-6">
        {/* Empty States */}
        {results.length === 0 && !loading && query.route && (
          <div className="text-center py-16 bg-gradient-to-b from-white to-gray-50/50 rounded-2xl border-2 border-dashed border-gray-300/50">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-inner">
              <AlertCircle className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No trains found</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8 text-lg">
              We couldn't find any trains matching your criteria. Try adjusting your search.
            </p>
            <button
              onClick={() => setQuery({ ...query, time: 'any', dayType: 'any' })}
              className="px-8 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-200 border border-gray-300/50 flex items-center gap-2 mx-auto"
            >
              <RefreshCw className="w-5 h-5" />
              Clear Filters
            </button>
          </div>
        )}

        {results.length === 0 && !loading && !query.route && (
          <div className="text-center py-20 bg-gradient-to-br from-blue-50/30 to-blue-100/20 rounded-2xl border border-blue-200/30">
            <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center shadow-lg">
              <Search className="w-12 h-12 text-blue-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Ready to Explore</h3>
            <p className="text-gray-600 max-w-md mx-auto text-lg mb-10">
              Select your route above to discover available trains and schedules
            </p>
            <div className="flex items-center justify-center gap-6">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">Choose Route</span>
              </div>
              <div className="text-gray-400">→</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse delay-150"></div>
                <span className="text-sm text-gray-600">Select Day</span>
              </div>
              <div className="text-gray-400">→</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-300"></div>
                <span className="text-sm text-gray-600">Pick Time</span>
              </div>
            </div>
          </div>
        )}

        {/* Results Grid */}
        {results.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <h3 className="text-lg font-semibold text-gray-900">Available Trains</h3>
                <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-blue-600 rounded-full"></div>
              </div>
              <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                Sorted by departure time
              </div>
            </div>
            {results.map(train => (
              <div key={train.id} className="transform transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                <TrainCard train={train} />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-pulse-subtle {
          animation: pulse-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  )
}