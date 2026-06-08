import "dotenv/config";
import prisma from "../src/prisma/prismaClient.js";

const apods = [
  {
    title: "The Tulip Nebula in Infrared",
    date: "2023-10-18",
    explanation: "The Tulip Nebula, or Sh2-101, is a glowing cloud of gas and dust in the constellation Cygnus. It lies about 8,000 light-years away.",
    url: "https://apod.nasa.gov/apod/image/2310/Tulip_Webb_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2310/Tulip_Webb_960.jpg",
    copyright: "NASA, ESA, CSA, STScI"
  },
  {
    title: "A Thousand Galaxies in the Perseus Cluster",
    date: "2023-11-23",
    explanation: "Here is one of the largest structures in the universe: the Perseus Cluster of Galaxies, captured in sharp detail by the Euclid space telescope.",
    url: "https://apod.nasa.gov/apod/image/2311/PerseusCluster_Euclid_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2311/PerseusCluster_Euclid_960.jpg",
    copyright: "ESA/Euclid"
  },
  {
    title: "The Helix Nebula from CFHT",
    date: "2023-12-05",
    explanation: "The Helix Nebula is a large planetary nebula located in the constellation Aquarius. It is one of the closest bright nebulae to Earth.",
    url: "https://apod.nasa.gov/apod/image/2312/Helix_CFHT_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2312/Helix_CFHT_960.jpg",
    copyright: "CFHT"
  },
  {
    title: "Orion over the Italian Alps",
    date: "2024-01-15",
    explanation: "The famous constellation of Orion the Hunter rises over the snow-covered peaks of the Italian Alps in this beautiful winter landscape.",
    url: "https://apod.nasa.gov/apod/image/2401/OrionAlps_Lillo_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2401/OrionAlps_Lillo_960.jpg",
    copyright: "Marcella Lillo"
  },
  {
    title: "The Pleiades Star Cluster",
    date: "2024-02-10",
    explanation: "Also known as the Seven Sisters, the Pleiades is an open star cluster in the constellation Taurus, surrounded by blue reflection nebulae.",
    url: "https://apod.nasa.gov/apod/image/2402/Pleiades_Maras_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2402/Pleiades_Maras_960.jpg",
    copyright: "Maras"
  },
  {
    title: "A Dragon-Shaped Aurora over Iceland",
    date: "2024-03-02",
    explanation: "A spectacular green northern lights display shapes the form of a giant dragon in the night sky over Iceland.",
    url: "https://apod.nasa.gov/apod/image/2403/DragonAurora_Hallgrimsson_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2403/DragonAurora_Hallgrimsson_960.jpg",
    copyright: "Jingyi Zhang"
  },
  {
    title: "The Total Solar Eclipse of 2024",
    date: "2024-04-09",
    explanation: "A composite view of the total solar eclipse showing the Sun's corona and red prominences erupting along the limb.",
    url: "https://apod.nasa.gov/apod/image/2404/Eclipse_Cooper_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2404/Eclipse_Cooper_960.jpg",
    copyright: "Gwyneth Cooper"
  },
  {
    title: "Milky Way over the Lavender Fields",
    date: "2024-05-18",
    explanation: "The central band of our Milky Way galaxy arches beautifully over blooming purple lavender fields in Valensole, France.",
    url: "https://apod.nasa.gov/apod/image/2405/MilkyWayLavender_Perez_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2405/MilkyWayLavender_Perez_960.jpg",
    copyright: "Valensole Perez"
  },
  {
    title: "M51: The Whirlpool Galaxy",
    date: "2024-06-20",
    explanation: "The Whirlpool Galaxy is a classic spiral galaxy located about 23 million light-years away in the constellation Canes Venatici.",
    url: "https://apod.nasa.gov/apod/image/2406/M51_Hubble_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2406/M51_Hubble_960.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "Jupiter's Great Red Spot from Juno",
    date: "2024-07-04",
    explanation: "A close-up view of Jupiter's iconic Great Red Spot, a massive storm wider than Earth, captured by NASA's Juno spacecraft.",
    url: "https://apod.nasa.gov/apod/image/2407/JunoSpot_NASA_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2407/JunoSpot_NASA_960.jpg",
    copyright: "NASA/JPL-Caltech"
  },
  {
    title: "The Pillars of Creation in Near-Infrared",
    date: "2024-08-12",
    explanation: "James Webb Space Telescope's view of the Pillars of Creation in the Eagle Nebula, where new stars are forming inside dense clouds.",
    url: "https://apod.nasa.gov/apod/image/2408/PillarsWebb_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2408/PillarsWebb_960.jpg",
    copyright: "NASA, ESA, CSA"
  },
  {
    title: "Andromeda Galaxy from a Backyard",
    date: "2024-09-15",
    explanation: "Our sister galaxy, Andromeda (M31), is the nearest major galaxy to the Milky Way, located 2.5 million light-years away.",
    url: "https://apod.nasa.gov/apod/image/2409/M31_Backyard_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2409/M31_Backyard_960.jpg",
    copyright: "AstroBackyard"
  },
  {
    title: "The Crab Nebula from Hubble",
    date: "2024-10-30",
    explanation: "An expanding remnant of a supernova explosion witnessed by astronomers in the year 1054 in the constellation Taurus.",
    url: "https://apod.nasa.gov/apod/image/2410/CrabHubble_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2410/CrabHubble_960.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "A Martian Sunset from Curiosity",
    date: "2024-11-12",
    explanation: "A blue-tinted sunset captured from the surface of Mars by the Curiosity rover inside Gale Crater.",
    url: "https://apod.nasa.gov/apod/image/2411/MarsSunset_Curiosity_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2411/MarsSunset_Curiosity_960.jpg",
    copyright: "NASA/JPL-Caltech"
  },
  {
    title: "The Heart Nebula in Cassiopeia",
    date: "2024-12-25",
    explanation: "IC 1805, or the Heart Nebula, is a glowing emission nebula driven by a cluster of hot, massive newborn stars.",
    url: "https://apod.nasa.gov/apod/image/2412/HeartNebula_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2412/HeartNebula_960.jpg",
    copyright: "AstroDoc"
  },
  {
    title: "Saturn's Rings Edge-On",
    date: "2025-01-20",
    explanation: "A rare perspective from the Cassini spacecraft showing Saturn's magnificent ring system seen nearly edge-on.",
    url: "https://apod.nasa.gov/apod/image/2501/SaturnRings_Cassini_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2501/SaturnRings_Cassini_960.jpg",
    copyright: "NASA/JPL"
  },
  {
    title: "The Lagoon Nebula in Sagittarius",
    date: "2025-02-14",
    explanation: "The Lagoon Nebula (M8) is a giant interstellar cloud classified as an emission nebula and star-forming region.",
    url: "https://apod.nasa.gov/apod/image/2502/Lagoon_Hubble_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2502/Lagoon_Hubble_960.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "A Moon Bow over Yosemite",
    date: "2025-03-21",
    explanation: "A rare lunar rainbow or 'moonbow' formed by the mist of Yosemite Falls under the light of a nearly full Moon.",
    url: "https://apod.nasa.gov/apod/image/2503/MoonbowYosemite_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2503/MoonbowYosemite_960.jpg",
    copyright: "Yosemite NPS"
  },
  {
    title: "The Sombrero Galaxy from Hubble",
    date: "2025-04-18",
    explanation: "M104, the Sombrero Galaxy, is famous for its bright white core and prominent dark dust lane in the constellation Virgo.",
    url: "https://apod.nasa.gov/apod/image/2504/Sombrero_Hubble_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2504/Sombrero_Hubble_960.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "Comet Neowise over Stonehenge",
    date: "2025-05-30",
    explanation: "A spectacular view of Comet C/2020 F3 (NEOWISE) passing over the historic monoliths of Stonehenge, UK.",
    url: "https://apod.nasa.gov/apod/image/2505/CometStonehenge_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2505/CometStonehenge_960.jpg",
    copyright: "Stonehenge Photo"
  },
  {
    title: "The Rosette Nebula",
    date: "2025-06-15",
    explanation: "A flower-shaped emission nebula located in the constellation Monoceros, filled with young stars emitting intense winds.",
    url: "https://apod.nasa.gov/apod/image/2506/Rosette_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2506/Rosette_960.jpg",
    copyright: "AstroGallery"
  },
  {
    title: "A Meteor over Crater Lake",
    date: "2025-07-28",
    explanation: "A bright Perseid meteor streaks across the night sky, reflected in the deep, calm waters of Crater Lake in Oregon.",
    url: "https://apod.nasa.gov/apod/image/2507/PerseidCraterLake_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2507/PerseidCraterLake_960.jpg",
    copyright: "National Parks"
  },
  {
    title: "The Bubble Nebula",
    date: "2025-08-19",
    explanation: "NGC 7635, also known as the Bubble Nebula, is a wind-blown bubble of gas created by the stellar wind of a hot, massive star.",
    url: "https://apod.nasa.gov/apod/image/2508/Bubble_Hubble_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2508/Bubble_Hubble_960.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "Earthrise from Apollo 8",
    date: "2025-09-08",
    explanation: "The historic photograph of Earth rising over the Moon's horizon, taken by astronaut William Anders during the Apollo 8 mission.",
    url: "https://apod.nasa.gov/apod/image/2509/EarthriseApollo8_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2509/EarthriseApollo8_960.jpg",
    copyright: "NASA"
  },
  {
    title: "NGC 602 in the Small Magellanic Cloud",
    date: "2025-10-10",
    explanation: "A star-forming region in our neighboring dwarf galaxy, showing young, bright stars carving out a cavern in the gas cloud.",
    url: "https://apod.nasa.gov/apod/image/2510/NGC602_Hubble_960.jpg",
    hdurl: "https://apod.nasa.gov/apod/image/2510/NGC602_Hubble_960.jpg",
    copyright: "NASA/ESA"
  }
];

async function main() {
  console.log("Comenzando el proceso de sembrado (seeding)...");

  console.log("Limpiando registros antiguos de APOD...");
  await prisma.apod.deleteMany();

  console.log(`Insertando ${apods.length} nuevos registros reales en la base de datos...`);
  
  const result = await prisma.apod.createMany({
    data: apods
  });

  console.log(`Sembrado completado con éxito. Se insertaron ${result.count} registros.`);
}

main()
  .catch((e) => {
    console.error("Error durante el sembrado:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
