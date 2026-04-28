# Sri Lanka Train Timetable

A modern, fast, and mobile-friendly web application for searching Sri Lanka Railways timetables. Built with **Next.js 13**, **React**, and **Tailwind CSS**, featuring beautiful animations and a comprehensive dataset of 200+ train routes.

   

---

## Table of Contents

* [Features](#-features)
* [Preview](#️-preview)
* [Live Demo](#-live-demo)
* [Technologies Used](#-technologies-used)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)

  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
* [Usage Guide](#-usage-guide)
* [Adding New Trains](#adding-new-trains)
* [Customization](#-customization)
* [Deployment](#-deployment)
* [Data Structure](#-data-structure)
* [Contributing](#-contributing)
* [License](#-license)
* [Acknowledgments](#-acknowledgments)
* [Support](#-support)

---

## ✨ Features

* 🔍 **Advanced Search** — Filter trains by route, day type (weekday/weekend), and departure hour.
* 📱 **Mobile-First Design** — Fully responsive interface optimized for all devices.
* 🎨 **Modern UI/UX** — Smooth animations, gradient backgrounds, and intuitive interactions.
* 🚂 **Detailed Train Cards** — Expandable cards showing stops, classes, journey time, and distance.
* ⚡ **Fast Performance** — Static export for instant loading and optimal SEO.
* 📊 **Google Analytics** — Built-in tracking integration.
* ♿ **Accessible** — Radix UI components ensure accessibility.
* 🎯 **Real-time Status** — Visual indicators for currently running trains.
* 📦 **200+ Trains** — Comprehensive dataset covering major Sri Lankan railway routes.

---

## 🖼️ Preview

*Hero section with animated background and image slideshow*

---

## 🚀 Live Demo

[**View Live Demo**](https://sri-lanka-train-timetable.vercel.app/)

---

## 🛠️ Technologies Used

| Technology                 | Purpose                           |
| -------------------------- | --------------------------------- |
| **Next.js 13.5.6**         | React framework with App Router   |
| **React 18.2.0**           | UI library                        |
| **Tailwind CSS 3.4.17**    | Utility-first CSS styling         |
| **Framer Motion 10.12.16** | Smooth animations and transitions |
| **Radix UI**               | Accessible dropdown components    |
| **Lucide React 0.562.0**   | Icons                             |
| **Next Themes 0.4.6**      | Dark/light mode support           |

---

## 📁 Project Structure

```
Sri-Lanka-train-timetable/
├── app/                          # Next.js App Router
│   ├── layout.js                 # Root layout with metadata
│   ├── page.js                   # Home page
│   ├── PremiumFooter.jsx         # Footer component
│   └── (other pages)/
├── components/
│   ├── Hero.jsx                  # Animated hero section
│   ├── SearchSection.jsx         # Search interface
│   ├── TrainCard.jsx             # Train result cards
│   └── GoogleAnalytics.jsx       # Analytics integration
├── data/
│   └── trains.json               # Complete train dataset (200+ entries)
├── public/
│   └── images/                   # Hero images and logos
├── styles/
│   └── globals.css               # Global styles & custom animations
├── next.config.js                # Next.js configuration
├── tailwind.config.js            # Tailwind configuration
├── postcss.config.js             # PostCSS configuration
└── package.json                  # Dependencies & scripts
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js **16.14.0** or higher
* npm or yarn

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/pubudutharanga/Sri-Lanka-train-timetable.git
cd Sri-Lanka-train-timetable
```

2. **Install dependencies**

```bash
npm install
# or
# yarn install
```

3. **Run development server**

```bash
npm run dev
# Open http://localhost:3000 to view the app
```

4. **Build for production (static export)**

```bash
npm run build
npm run export   # Generates static files in the `out/` folder
```

---

## 📖 Usage Guide

### Searching Trains

1. **Select Route** — Choose departure and arrival stations from the dropdown.
2. **Choose Day Type** — Filter by Any Day, Weekday, Weekend, Saturday, or Sunday.
3. **Pick Departure Time** — Filter by specific hour or keep "Any time".
4. **Click Search** — View all matching trains sorted by departure time.

### Train Card Features

* **Expandable Details** — Click the arrow to view all intermediate stops.
* **Journey Timeline** — Visual timeline showing stops with arrival/departure times.
* **Class Information** — Available classes with badges.
* **Distance & Duration** — Quick summary of journey metrics.

---

## 🆕 Adding New Trains

Edit `data/trains.json` to add new train entries. Example entry:

```json
{
  "id": "SL201",
  "name": "New Express",
  "number": "9999",
  "from": "Colombo Fort",
  "to": "Kandy",
  "departure": "T08:00:00",
  "arrival": "T11:30:00",
  "duration_minutes": 210,
  "distance_km": 120,
  "daysOfWeek": ["monday", "tuesday", "wednesday", "thursday", "friday"],
  "classes": ["1st Class", "2nd Class", "3rd Class"],
  "stops": [
    {
      "station": "Peradeniya Junction",
      "arrival": "T11:15:00",
      "departure": "T11:17:00"
    }
  ]
}
```

---

## 🎨 Customization

### Styling

* **Colors** — Modify `tailwind.config.js` to change theme colors:

```js
// tailwind.config.js (partial)
module.exports = {
  theme: {
    extend: {
      colors: {
        'sl-blue': '#0b5fff',
        'sl-green': '#0fa77a',
        'sl-gold': '#f6c84c'
      }
    }
  }
}
```

* **Animations** — Edit `styles/globals.css` for custom animations and scrollbar styles.

### Configuration

* **Base Path** — Update `basePath` and `assetPrefix` in `next.config.js` if deploying to a subpath.
* **Google Analytics** — Set `NEXT_PUBLIC_GA_MEASUREMENT_ID` environment variable.
* **Images** — Replace hero images in `public/images/` (e.g., `hero1.jpg`, `hero2.jpg`).

---

## 🚢 Deployment

### Vercel (Recommended)

The easiest way to deploy this application is using [Vercel](https://vercel.com). Simply connect your GitHub repository and Vercel will handle the build and deployment automatically.

### Manual Static Build

1. Build static files

```bash
npm run build
```

2. The output will be in the `.next` or `out/` folder depending on your configuration.

### Other Options

* **Netlify** — Deploy the `out/` folder.
* **Apache/Nginx** — Serve static files from the `out` directory.

---

## 📊 Data Structure

**Train Object**

```ts
type Stop = {
  station: string;
  arrival: string;   // e.g. "T14:30:00"
  departure: string; // e.g. "T14:32:00"
}

type Train = {
  id: string;               // Unique identifier (e.g., "SL001")
  name: string;             // Train name (e.g., "Galu Kumari")
  number: string;           // Train number (e.g., "8056")
  from: string;             // Origin station
  to: string;               // Destination station
  departure: string;        // ISO 8601 time (e.g., "T13:40:00")
  arrival: string;          // ISO 8601 time (e.g., "T18:25:00")
  duration_minutes: number; // Total journey time in minutes
  distance_km: number;      // Distance in kilometers
  daysOfWeek: string[];     // Operating days (e.g., ["monday", "tuesday"])
  classes: string[];        // Available classes
  stops: Stop[];            // Intermediate stops
}
```

---

## 🤝 Contributing

Contributions are welcome! Suggested workflow:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/amazing-feature`.
3. Commit your changes: `git commit -m "Add amazing feature"`.
4. Push to the branch: `git push origin feature/amazing-feature`.
5. Open a Pull Request.

### Areas for Contribution

* Add more train routes and schedules.
* Improve UI/UX design.
* Add unit/integration tests.
* Implement real-time data API integration.
* Add multi-language support (Sinhala, Tamil).
* Optimize performance.

---

## 🙏 Acknowledgments

* Sri Lanka Railways for timetable data
* Radix UI for accessible primitives
* Framer Motion for animations
* Lucide for icons
* GitHub for hosting

---

## 📞 Support

If you need help:

* Check the Issues tab in the repo
* Create a new issue with details
* Contact: `pubudutharangel@gmail.com`

