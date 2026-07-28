const fs = require('fs');
const trains = JSON.parse(fs.readFileSync('public/data/trains.json', 'utf8'));

const routeSet = new Set();
trains.forEach(t => {
  const allStops = [t.from];
  if (t.stops) {
    t.stops.forEach(s => allStops.push(s.station));
  }
  allStops.push(t.to);
  
  const uniqueStops = allStops.filter((item, pos, arr) => pos === 0 || item !== arr[pos-1]);

  for (let i = 0; i < uniqueStops.length; i++) {
    for (let j = i + 1; j < uniqueStops.length; j++) {
       routeSet.add(`${uniqueStops[i]}:${uniqueStops[j]}`);
    }
  }
});

console.log('Total unique routes:', routeSet.size);
