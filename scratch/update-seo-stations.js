const fs = require('fs');

const allStations = [
  // Main Line
  'Colombo Fort', 'Maradana', 'Dematagoda', 'Kelaniya', 'Wanawasala', 'Hunupitiya', 'Enderamulla', 'Horape',
  'Ragama Junction', 'Walpola', 'Batuwatta', 'Bulugahagoda', 'Ganemulla', 'Yagoda', 'Gampaha', 'Daraluwa', 'Bemmulla', 'Magelegoda',
  'Heendeniya Pattiyagoda', 'Veyangoda', 'Wandurawa', 'Keenawala', 'Pallewela', 'Ganegoda', 'Wijayarajadahana', 'Mirigama', 'Wilwatta',
  'Botale', 'Ambepussa', 'Yattalgoda', 'Buthgamuwa', 'Alawwa', 'Walakumbura', 'Polgahawela Junction', 'Panaleeya', 'Tismalpola',
  'Yatagama', 'Rambukkana', 'Kadigamuwa', 'Gangoda', 'Ihalakotte', 'Balana', 'Kadugannawa', 'Pilimatalawa', 'Sarasavi Uyana',
  'Peradeniya Junction', 'Koshinna', 'Gelioya', 'Gampola', 'Thembiligala', 'Ulapane', 'Nawalapitiya', 'Inguruoya', 'Galboda',
  'Watawala', 'Ihalawatawala', 'Rozella', 'Hatton', 'Kotagala', 'Talawakele', 'Watagoda', 'Great Western', 'Radella', 'Nanu Oya',
  'Perakumpura', 'Ambewela', 'Pattipola', 'Ohiya', 'Idalgashinna', 'Haputale', 'Diyatalawa', 'Bandarawela', 'Kinigama', 'Heeloya',
  'Kitalella', 'Ella', 'Demodara', 'Uduwara', 'Hali Ela', 'Badulla',
  
  // Coastal Line
  'Secretariat Halt', 'Kompannavidiya', 'Kollupitiya', 'Bambalapitiya', 'Wellawatte', 'Dehiwala', 'Mount Lavinia', 'Ratmalana',
  'Angulana', 'Lunawa', 'Moratuwa', 'Koralawella', 'Egoda Uyana', 'Panadura', 'Pinwatta', 'Wadduwa', 'Kalutara North', 'Kalutara South',
  'Katukurunda', 'Payagala North', 'Payagala South', 'Maggona', 'Beruwala', 'Hettimulla', 'Aluthgama', 'Bentota', 'Induruwa', 'Maha Induruwa',
  'Kosgoda', 'Piyagama', 'Ahungalla', 'Patagamgoda', 'Balapitiya', 'Andadola', 'Kandegoda', 'Ambalangoda', 'Madampagama', 'Akurala',
  'Kahawa', 'Telwatte', 'Seenigama', 'Hikkaduwa', 'Thiranagama', 'Kumarakanda', 'Dodanduwa', 'Rathgama', 'Boossa', 'Ginthota',
  'Piyadigama', 'Richmond Hill', 'Galle', 'Katugoda', 'Unawatuna', 'Talpe', 'Habaraduwa', 'Koggala', 'Kathaluwa', 'Ahangama',
  'Midigama', 'Kumbalgama', 'Weligama', 'Polwathumodara', 'Mirissa', 'Kamburugamuwa', 'Walgama', 'Matara', 'Piliduwa', 'Weherahena',
  'Kekanadura', 'Bambarenda', 'Wewurukannala', 'Nakulugamuwa', 'Beliatta',

  // Northern Line
  'Girambe', 'Talawattegedara', 'Pothuhera', 'Nailiya', 'Kurunegala', 'Muththettugala', 'Wellawa', 'Ganewatta', 'Hiriyala',
  'Nagollagama', 'Timbiriyagedara', 'Maho Junction', 'Randenigama', 'Abanpola', 'Galgamuwa', 'Senarathgama', 'Thambuttegama',
  'Talawa', 'Srawasthipura', 'Anuradhapura Town', 'Anuradhapura', 'Mihintale Junction', 'Saliyapura', 'Parasangahawewa',
  'Medagama', 'Medawachchiya Junction', 'Poonewa', 'Erittaperiyakulam', 'Vavuniya', 'Thandikulam', 'Omanthai', 'Puliyankulam',
  'Mankulam', 'Murukandy', 'Araviyanagar', 'Kilinochchi', 'Paranthan', 'Elephant Pass', 'Palai', 'Eluthumattuval', 'Mirusuwil',
  'Kodikamam', 'Meesalai', 'Sankathanai', 'Chavakachcheri', 'Thachanthoppu', 'Navatkuli', 'Punkankulam', 'Jaffna', 'Kokuvil',
  'Kondavil', 'Inuvil', 'Chunnakam', 'Mallakam', 'Tellippalai', 'Maviddapuram', 'Kankesanthurai',

  // Batticaloa Line
  'Yapahuwa', 'Konwewa', 'Ranamukgama', 'Moragollagama', 'Siyambalangamuwa', 'Negama', 'Awukana', 'Kalawewa', 'Ihalagama',
  'Kekirawa', 'Horiwila', 'Palugaswewa', 'Habarana', 'Hatares Kotuwa', 'Gal Oya Junction', 'Minneriya', 'Hingurakgoda', 'Hathamuna',
  'Jayanthipura', 'Perakum Uyana', 'Laksha Uyana', 'Polonnaruwa', 'Gallella', 'Manampitiya', 'Kolakanaweli', 'Welikanda',
  'Sevanapitiya', 'Aselapura', 'Rideethenna', 'Punanai', 'Kadadasi Nagar', 'Valaichchenai', 'Kalkudah', 'Sittankudi',
  'Vandaramoolai', 'Dewapuram', 'Eravur', 'Batticaloa',

  // Puttalam Line
  'Peralanda', 'Kandana', 'Kapuwatta', 'Ja-Ela', 'Thudella', 'Kudahakapola', 'Alawathupitiya', 'Seeduwa', 'Liyanagemulla',
  'Katunayake', 'Kurana', 'Negombo', 'Kattuwa', 'Kochchikade', 'Waikkala', 'Bolawatta', 'Boralessa', 'Lunuwila', 'Thummodara',
  'Nattandiya', 'Walahapitiya', 'Kudawewa', 'Nelumpokuna', 'Madampe', 'Kakkapalliya', 'Sawarana', 'Chilaw', 'Manuwangama',
  'Bangadeniya', 'Arachchikattuwa', 'Anawilundawa', 'Battuluoya', 'Pulichchikulam', 'Mundel', 'Mangala Eliya', 'Madurankuli',
  'Palavi', 'Puttalam',

  // Matale Line
  'Kandy', 'Asgiriya', 'Mahaiyawa', 'Mavilmada', 'Katugastota', 'Pallethalawinna', 'Udathalawinna', 'Meegammana', 'Yatirawana',
  'Wattegama', 'Yatawara', 'Pathanpaha', 'Marukona', 'Udaththawala', 'Ukuwela', 'Tawalankoya', 'Elwala', 'Kohombiliwala', 'Matale',

  // KV Line
  'Baseline Road', 'Cotta Road', 'Narahenpita', 'Kirullapone', 'Nugegoda', 'Pengiriwatte', 'Udahamulla', 'Nawinna', 'Maharagama',
  'Pannipitiya', 'Kottawa', 'Malapalle', 'Homagama', 'Panagoda', 'Godagama', 'Meegoda', 'Watareka', 'Liyanwala', 'Padukka',
  'Angampitiya', 'Uggalla', 'Pinnawala', 'Gammana', 'Morakele', 'Waga', 'Kadugoda', 'Kosgama', 'Hingurala', 'Puwakpitiya',
  'Avissawella',

  // Mannar & Trinco
  'Cheddikulam', 'Madhu Road', 'Murunkan', 'Mannar', 'Pesalai', 'Talaimannar', 'Talaimannar Pier',
  'Agbopura', 'Kantale', 'Thambalagamuwa', 'China Bay', 'Trincomalee'
];

const uniqueStations = [...new Set(allStations)];

let content = fs.readFileSync('components/SEOContentSection.jsx', 'utf8');

const regex = /const sriLankaStations = \[\s*[\s\S]*?\s*\]/m;
const replacement = `const sriLankaStations = ${JSON.stringify(uniqueStations, null, 2).replace(/"/g, "'")}`;

content = content.replace(regex, replacement);
fs.writeFileSync('components/SEOContentSection.jsx', content, 'utf8');

console.log('Successfully updated sriLankaStations with ' + uniqueStations.length + ' stations.');
