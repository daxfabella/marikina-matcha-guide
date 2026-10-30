// Marikina Matcha Guide — place data.
// Edit this file to change text, photos or hours. Order here = pin numbers on the map.
//
// hours: one entry per day (sun..sat). Each is "HH:MM-HH:MM" (24h) or null for closed.
// photos: first photo is the card cover. Files live in images/ (full) and images/thumbs/ (small).
// rec / note / photos are optional; leave them out and that section simply won't show.

window.GUIDE = {
  // Paste your Google Form link here when it's ready. Leave "" to show "coming soon".
  recommendFormUrl: "https://forms.gle/suYAQT6NaPbeREYeA",
  hoursCheckedOn: "October 30, 2026",
};

window.PLACES = [
  {
    id: "whisked",
    name: "Whisked Matcha Bar",
    area: "Gen. Ordoñez St",
    address: "88 Gen. Ordoñez St, Marikina",
    lat: 14.6442937, lng: 121.1165889,
    instagram: "https://www.instagram.com/whisked.matchabar/",
    mapsFtid: "0x3397b9001df9e0fd:0xee489d7b74e41be4",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.205137877079!2d121.11400861077645!3d14.644293685788245!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b9001df9e0fd%3A0xee489d7b74e41be4!2sWhisked%20Matcha%20Bar!5e0!3m2!1sen!2sph!4v1793356679360!5m2!1sen!2sph",
    description:
      "A cozy matcha bar along Gen. Ordoñez that's quietly become a neighborhood favorite. Reviewers love the sea salt matcha latte, the hojicha, and the banana pudding — and there are sockets if you want to stay and work.",
    hours: ["08:00-23:00", "08:00-23:00", "08:00-23:00", "08:00-23:00", "08:00-23:00", "08:00-23:00", "08:00-23:00"],
  },
  {
    id: "niji",
    name: "Niji Matcha Block",
    area: "Rainbow St",
    address: "Inside Niji Street Cafe, 95 Rainbow St cor. Lilac St, Marikina",
    lat: 14.6407279, lng: 121.1216215,
    instagram: "https://www.instagram.com/nijimatchablock/",
    mapsFtid: "0x3397b969e035a8e7:0xcb4c4977d3469af5",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.2679065130687!2d121.11904121077643!3d14.640727885791378!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b969e035a8e7%3A0xcb4c4977d3469af5!2sNiji%20Street%20Cafe!5e0!3m2!1sen!2sph!4v1793356747200!5m2!1sen!2sph",
    description:
      "A matcha corner tucked inside Niji Street Cafe on Rainbow St. Easy to pair with the cafe's food menu, and open until late most nights.",
    rec: "Matcha Float — eat the ice cream first.",
    hours: ["08:00-22:00", "08:00-22:00", "08:00-22:00", "08:00-22:00", "08:00-22:00", "08:00-22:00", "08:00-23:00"],
    photos: [
      { file: "niji_float.jpg", alt: "Layered matcha float topped with a scoop of matcha ice cream in a Niji Matcha Block glass" },
    ],
  },
  {
    id: "ateakiosk",
    name: "A Tea Kiosk",
    area: "MGM Complex, Hacienda Heights",
    address: "MGM Complex, Hacienda Heights, 32 Lilac St, Marikina",
    lat: 14.64348, lng: 121.1214426,
    instagram: "https://www.instagram.com/a.tea.kiosk/",
    mapsFtid: "0x3397b9452a254411:0x583f97ad6e000049",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.2194627225476!2d121.11886231077641!3d14.643479985788987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b9452a254411%3A0x583f97ad6e000049!2sA%20Tea%20Kiosk%20(Marikina)!5e0!3m2!1sen!2sph!4v1793356773898!5m2!1sen!2sph",
    description:
      "A bright, minimalist kiosk from the team behind Matcha Later in Poblacion. Known for Japanese tea soft serve — matcha and hojicha, plus rotating flavors — on its own or floated over a latte.",
    rec: "Matcha Latte (best with their dairy milk) and the Hojicha Soft Serve — try this one separately.",
    hours: ["09:00-20:00", null, "09:00-20:00", "09:00-20:00", "09:00-20:00", "09:00-20:00", "09:00-20:00"],
    photos: [
      { file: "ateakiosk_float.jpg", alt: "Hojicha soft serve over a matcha latte in a paper cup" },
      { file: "ateakiosk.jpg", alt: "The white counter inside A Tea Kiosk" },
      { file: "ateakiosk_2.jpg", alt: "A Tea Kiosk signage by the window with a potted plant" },
    ],
  },
  {
    id: "kokorobi",
    name: "Kokorobi Matcha",
    area: "Marikina Heights",
    address: "Paraclete Bldg., 90 T. Bugallon St, Marikina Heights",
    lat: 14.6505154, lng: 121.1111278,
    instagram: "https://www.instagram.com/kokorobimatcha/",
    mapsFtid: "0x3397b940b9032e51:0x71351b3687a553d7",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.095581938185!2d121.10855291815284!3d14.650515374311205!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b940b9032e51%3A0x71351b3687a553d7!2sKokorobi%20Matcha!5e0!3m2!1sen!2sph!4v1793356800214!5m2!1sen!2sph",
    description:
      "A calm, Japanese-inspired slow bar with low seating and a shoji corner. They use organic Uji, Kyoto matcha and also sell powder to take home for your own whisking.",
    rec: "Premium Kokorobi Latte — on the pricier side, but worth it.",
    hours: ["10:00-22:00", "10:00-22:00", "10:00-22:00", "10:00-22:00", "10:00-22:00", "10:00-22:00", "10:00-22:00"],
    photos: [
      { file: "kokorobi_latte.jpg", alt: "Two layered matcha drinks on wooden trays beside a cast-iron kettle" },
      { file: "kokorobi.jpg", alt: "Kokorobi's bar counter with wooden stools" },
      { file: "kokorobi_2.jpg", alt: "Low tatami-style seating with shoji screens" },
      { file: "kokorobi_latte2.jpg", alt: "Matcha latte with a small matcha dessert" },
    ],
  },
  {
    id: "arialitea",
    name: "Arialitea",
    area: "Gen. Ordoñez St",
    address: "Inside Bingbingcat Kitchen, Gen. Ordoñez St, Marikina",
    lat: 14.6444505, lng: 121.1149049,
    instagram: "https://www.instagram.com/arialiteaa/",
    mapsFtid: "0x3397b9a53b7d526b:0x2cc68da5fb47c54",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.202377389711!2d121.1123246107765!3d14.644450485788118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b9a53b7d526b%3A0x2cc68da5fb47c54!2sBingbingcat%20Kitchen!5e0!3m2!1sen!2sph!4v1793356832626!5m2!1sen!2sph",
    description:
      "A small weekend matcha stand inside Bingbingcat Kitchen, a Tausug kakanin spot. Every drink uses a generous 6 grams of matcha, and the dango cups are a fun twist.",
    rec: "Black Sesame Dango — and know that they use 6 grams for all their drinks.",
    note: "Only open on weekends. Hours shown follow Bingbingcat Kitchen.",
    hours: ["14:00-21:00", null, null, null, null, null, "14:00-21:00"],
    photos: [
      { file: "arialitea_dango.jpg", alt: "Matcha drink topped with cream and a stick of pink, white and green dango" },
      { file: "arialitea_2.jpg", alt: "Green storefront of Bingbingcat Kitchen" },
      { file: "arialitea_menu.jpg", alt: "Arialitea menu: 6 grams for all drinks" },
      { file: "arialitea.jpg", alt: "Arialitea's matcha stand counter" },
    ],
  },
  {
    id: "matchafolk",
    name: "matcha folk",
    area: "Lamp Quarters",
    address: "Lamp Quarters, Mayor Gil Fernando Ave, Marikina",
    lat: 14.6415142, lng: 121.1041861,
    instagram: "https://www.instagram.com/matchafolk/",
    mapsFtid: "0x3397b900379b147b:0xee0736e71e1c615d",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.2540665903252!2d121.10160581077633!3d14.641514185790676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b900379b147b%3A0xee0736e71e1c615d!2smatcha%20folk!5e0!3m2!1sen!2sph!4v1793356850664!5m2!1sen!2sph",
    description:
      "A bright little matcha bar inside Lamp Quarters on Gil Fernando Ave, with a clean blue-tiled counter. Their sea salt matcha is a crowd favorite.",
    hours: ["10:00-22:00", "10:00-22:00", "10:00-22:00", "10:00-22:00", "10:00-22:00", "10:00-22:00", "10:00-22:00"],
    photos: [
      { file: "matchafolk_seasalt.jpg", alt: "Sea salt matcha latte on a green tray" },
      { file: "matchafolk.jpg", alt: "matcha folk counter with blue tiles and a whisk mural" },
    ],
  },
  {
    id: "franken",
    name: "Franken Coffee Bar + Roastery",
    area: "J. P. Rizal St",
    address: "132 J. P. Rizal St, Marikina",
    lat: 14.6248859, lng: 121.0959197,
    instagram: "https://www.instagram.com/franken.coffeebar/",
    mapsFtid: "0x3397b991a6c5a67d:0x67307cc09090fcd4",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.5465918365517!2d121.09333941077604!3d14.624885885805435!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b991a6c5a67d%3A0x67307cc09090fcd4!2sFranken%20Coffee%20Bar%20%2B%20Roastery!5e0!3m2!1sen!2sph!4v1793356883043!5m2!1sen!2sph",
    description:
      "A well-loved specialty coffee bar and roastery (4.9★ on Google) that also pours a solid matcha latte. A good pick if your group is split between coffee and matcha.",
    hours: ["09:00-22:00", "16:00-22:00", null, "16:00-22:00", "16:00-22:00", "16:00-22:00", "09:00-22:00"],
    photos: [
      { file: "franken_latte.jpg", alt: "Two iced matcha lattes in Franken cups" },
      { file: "franken.jpg", alt: "Franken Coffee Bar + Roastery counter and menu screen" },
    ],
  },
  {
    id: "dogud",
    name: "Do Güd Cafe",
    area: "Parang",
    address: "9 E. Rodriguez St cor. Lakandula, Parang, Marikina",
    lat: 14.6596743, lng: 121.1107825,
    instagram: "https://www.instagram.com/dogudcafe/",
    mapsFtid: "0x3397b90fc50fd489:0x635765ebea3d6c98",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3859.934222457645!2d121.1082022107768!3d14.659674285774647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b90fc50fd489%3A0x635765ebea3d6c98!2sDo%20G%C3%BCd%20Cafe!5e0!3m2!1sen!2sph!4v1793356898078!5m2!1sen!2sph",
    description:
      "A warm, plant-filled neighborhood cafe in Parang that's open into the night. Their matcha menu lets you choose your powder, so you can taste the difference between cultivars.",
    rec: "Matcha Oat with the Yabukita powder.",
    hours: ["13:00-23:00", "13:00-23:00", "13:00-23:00", null, "13:00-23:00", "13:00-23:00", "13:00-23:00"],
    photos: [
      { file: "dogud_latte.jpg", alt: "Two matcha lattes on coasters with a plant behind" },
      { file: "dogud_menu.jpg", alt: "Do Güd matcha menu with powder options" },
      { file: "dogud.jpg", alt: "Dimly lit interior of Do Güd Cafe" },
    ],
  },
  {
    id: "despensa",
    name: "Despensa Marikina",
    area: "La Arcada, Gil Fernando Ave",
    address: "2F La Arcada Bldg, Centro de Bueviaje, Mayor Gil Fernando Ave, Marikina",
    lat: 14.6420455, lng: 121.104342,
    instagram: "https://www.instagram.com/despensamarikina/",
    mapsFtid: "0x3397b9d595e1ca9d:0xb766c57eff47d44d",
    mapsEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.244714594158!2d121.10176171077639!3d14.642045485790218!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397b9d595e1ca9d%3A0xb766c57eff47d44d!2sDespensa%20Marikina!5e0!3m2!1sen!2sph!4v1793356914527!5m2!1sen!2sph",
    description:
      "A weekend market on the second floor of La Arcada where emerging matcha pop-ups set up shop alongside local food and handmade goods. Come hungry and try a few stalls.",
    note: "Weekend matcha market for emerging pop-ups. Hours are from their market poster.",
    hours: ["11:00-21:00", null, null, null, null, null, "11:00-21:00"],
    photos: [
      { file: "despensa_latte.jpg", alt: "Two iced matcha drinks on a wooden bench" },
      { file: "despensa_poster.jpg", alt: "Despensa Marikina Weekend Market poster, Saturday and Sunday 11am to 9pm" },
      { file: "despensa.jpg", alt: "Pop-up stalls inside Despensa" },
      { file: "despensa_2.jpg", alt: "Crowd browsing the market hallway" },
    ],
  },
];
