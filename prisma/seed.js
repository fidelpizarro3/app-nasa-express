import "dotenv/config";
import prisma from "../src/prisma/prismaClient.js";

const apods = [
  {
    title: "The Tulip Nebula in Infrared",
    date: "2023-10-18",
    explanation: "The Tulip Nebula, or Sh2-101, is a glowing cloud of gas and dust in the constellation Cygnus. It lies about 8,000 light-years away.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Sharpless_101.jpg/800px-Sharpless_101.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/3/38/Sharpless_101.jpg",
    copyright: "NASA, ESA, CSA, STScI"
  },
  {
    title: "A Horseshoe Einstein Ring from Hubble",
    date: "2023-11-23",
    explanation: "Here is one of the largest structures in the universe: a rare Einstein Ring captured by the Hubble Space Telescope, showing extreme gravitational lensing.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/A_Horseshoe_Einstein_Ring_from_Hubble.JPG/800px-A_Horseshoe_Einstein_Ring_from_Hubble.JPG",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/4/44/A_Horseshoe_Einstein_Ring_from_Hubble.JPG",
    copyright: "ESA/Hubble"
  },
  {
    title: "The Helix Nebula",
    date: "2023-12-05",
    explanation: "The Helix Nebula is a large planetary nebula located in the constellation Aquarius. It is one of the closest bright nebulae to Earth.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/07/NGC7293_%282004%29.jpg/800px-NGC7293_%282004%29.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/0/07/NGC7293_%282004%29.jpg",
    copyright: "NASA/ESA/Hubble"
  },
  {
    title: "Orion Nebula from Hubble",
    date: "2024-01-15",
    explanation: "The Orion Nebula is one of the brightest nebulae visible to the naked eye. This mosaic from Hubble reveals thousands of young stars forming inside.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg/800px-Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "The Pleiades Star Cluster",
    date: "2024-02-10",
    explanation: "Also known as the Seven Sisters, the Pleiades is an open star cluster in the constellation Taurus, surrounded by blue reflection nebulae.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4e/Pleiades_large.jpg/800px-Pleiades_large.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Pleiades_large.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "Aurora Australis from Space",
    date: "2024-03-02",
    explanation: "The Aurora Australis, or Southern Lights, photographed from the International Space Station showing green and blue curtains of light over Earth.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/AuroraAustralis_20050911_filtered.jpg/800px-AuroraAustralis_20050911_filtered.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/3/3b/AuroraAustralis_20050911_filtered.jpg",
    copyright: "NASA"
  },
  {
    title: "The Total Solar Eclipse of 2017",
    date: "2024-04-09",
    explanation: "A spectacular view of the total solar eclipse showing the Sun's corona during totality, photographed from Madras, Oregon in August 2017.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/2017_Solar_Eclipse_%2836720553130%29_%28cropped%29.jpg/800px-2017_Solar_Eclipse_%2836720553130%29_%28cropped%29.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/1/12/2017_Solar_Eclipse_%2836720553130%29_%28cropped%29.jpg",
    copyright: "NASA"
  },
  {
    title: "Milky Way over the Desert",
    date: "2024-05-18",
    explanation: "The central band of our Milky Way galaxy arches over the Black Rock Desert in Nevada, revealing thousands of stars invisible to city dwellers.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg/800px-Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Milky_Way_Night_Sky_Black_Rock_Desert_Nevada.jpg",
    copyright: "Steve Jurvetson"
  },
  {
    title: "M51: The Whirlpool Galaxy",
    date: "2024-06-20",
    explanation: "The Whirlpool Galaxy is a classic spiral galaxy located about 23 million light-years away in the constellation Canes Venatici.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Messier51_sRGB.jpg/800px-Messier51_sRGB.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Messier51_sRGB.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "Jupiter's Great Red Spot",
    date: "2024-07-04",
    explanation: "A close-up view of Jupiter's iconic Great Red Spot, a massive storm wider than Earth that has been raging for centuries.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg/800px-Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Jupiter_and_its_shrunken_Great_Red_Spot.jpg",
    copyright: "NASA/JPL-Caltech"
  },
  {
    title: "The Pillars of Creation",
    date: "2024-08-12",
    explanation: "The Pillars of Creation in the Eagle Nebula, where new stars are forming inside dense clouds of gas and dust, captured by the Hubble Space Telescope.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg/800px-Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/6/68/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg",
    copyright: "NASA/ESA/Hubble"
  },
  {
    title: "Andromeda Galaxy",
    date: "2024-09-15",
    explanation: "Our sister galaxy Andromeda (M31) is the nearest major galaxy to the Milky Way, located 2.5 million light-years away and visible to the naked eye.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg/800px-Andromeda_Galaxy_%28with_h-alpha%29.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/9/98/Andromeda_Galaxy_%28with_h-alpha%29.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "The Crab Nebula from Hubble",
    date: "2024-10-30",
    explanation: "The Crab Nebula is an expanding remnant of a supernova explosion witnessed by astronomers in the year 1054 in the constellation Taurus.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/00/Crab_Nebula.jpg/800px-Crab_Nebula.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/0/00/Crab_Nebula.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "A Martian Sunset from Curiosity",
    date: "2024-11-12",
    explanation: "A blue-tinted sunset captured from the surface of Mars by the Curiosity rover inside Gale Crater, caused by dust particles in the Martian atmosphere.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0d/PIA19400-Mars-CuriosityRover-Sunset-20150415.jpg/800px-PIA19400-Mars-CuriosityRover-Sunset-20150415.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/0/0d/PIA19400-Mars-CuriosityRover-Sunset-20150415.jpg",
    copyright: "NASA/JPL-Caltech"
  },
  {
    title: "The Heart Nebula",
    date: "2024-12-25",
    explanation: "IC 1805, the Heart Nebula, is a glowing emission nebula driven by a cluster of hot, massive newborn stars in the constellation Cassiopeia.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/IC1805_Wendy_Carter.jpg/800px-IC1805_Wendy_Carter.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/3/30/IC1805_Wendy_Carter.jpg",
    copyright: "Wendy Carter"
  },
  {
    title: "Saturn during Equinox",
    date: "2025-01-20",
    explanation: "A breathtaking view of Saturn captured by the Cassini spacecraft during the planet's equinox, when the rings cast thin shadows across the cloud tops.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/Saturn_during_Equinox.jpg/800px-Saturn_during_Equinox.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Saturn_during_Equinox.jpg",
    copyright: "NASA/JPL"
  },
  {
    title: "The Lagoon Nebula",
    date: "2025-02-14",
    explanation: "The Lagoon Nebula (M8) is a giant interstellar cloud classified as an emission nebula and star-forming region in the constellation Sagittarius.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Lagoon_Nebula_from_ESO.jpg/800px-Lagoon_Nebula_from_ESO.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/7/7d/Lagoon_Nebula_from_ESO.jpg",
    copyright: "ESO"
  },
  {
    title: "A Moonbow over a Waterfall",
    date: "2025-03-21",
    explanation: "A rare lunar rainbow or moonbow formed by the mist of a waterfall under the light of a nearly full Moon, showing the spectrum of colors in the night.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Moonbow_at_Cumberland_Falls.jpg/800px-Moonbow_at_Cumberland_Falls.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/2/29/Moonbow_at_Cumberland_Falls.jpg",
    copyright: "Public Domain"
  },
  {
    title: "The Sombrero Galaxy",
    date: "2025-04-18",
    explanation: "M104, the Sombrero Galaxy, is famous for its bright white core and prominent dark dust lane in the constellation Virgo, 28 million light-years away.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/M104_ngc4594_sombrero_galaxy_hi-res.jpg/800px-M104_ngc4594_sombrero_galaxy_hi-res.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/5/5e/M104_ngc4594_sombrero_galaxy_hi-res.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "Comet NEOWISE from the ISS",
    date: "2025-05-30",
    explanation: "Comet C/2020 F3 NEOWISE photographed from the International Space Station as it made its closest approach to Earth in July 2020.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Comet_NEOWISE_from_ISS_%28NHQ202007062132%29.jpg/800px-Comet_NEOWISE_from_ISS_%28NHQ202007062132%29.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/b/be/Comet_NEOWISE_from_ISS_%28NHQ202007062132%29.jpg",
    copyright: "NASA"
  },
  {
    title: "The Rosette Nebula",
    date: "2025-06-15",
    explanation: "A flower-shaped emission nebula about 5,000 light-years away in the constellation Monoceros, filled with young stars emitting intense stellar winds.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Rosette_Nebula_Narrowband_Hubble_Palette.jpg/800px-Rosette_Nebula_Narrowband_Hubble_Palette.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/9/93/Rosette_Nebula_Narrowband_Hubble_Palette.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "Perseid Meteor Shower",
    date: "2025-07-28",
    explanation: "Multiple Perseid meteors streak across the night sky in this composite image taken during the peak of the annual Perseid meteor shower.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Perseids_2015.jpg/800px-Perseids_2015.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Perseids_2015.jpg",
    copyright: "NASA"
  },
  {
    title: "The Bubble Nebula",
    date: "2025-08-19",
    explanation: "NGC 7635, the Bubble Nebula, is a wind-blown bubble of ionized gas created by the stellar wind of a hot massive star in the constellation Cassiopeia.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/NGC_7635_HST.jpg/800px-NGC_7635_HST.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/NGC_7635_HST.jpg",
    copyright: "NASA/ESA"
  },
  {
    title: "Earthrise from Apollo 8",
    date: "2025-09-08",
    explanation: "The historic photograph of Earth rising over the Moon's barren horizon, taken by astronaut William Anders on December 24, 1968 during the Apollo 8 mission.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/NASA-Apollo8-Dec24-Earthrise.jpg/800px-NASA-Apollo8-Dec24-Earthrise.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/a/a8/NASA-Apollo8-Dec24-Earthrise.jpg",
    copyright: "NASA"
  },
  {
    title: "NGC 602 in the Small Magellanic Cloud",
    date: "2025-10-10",
    explanation: "A star-forming region in our neighboring dwarf galaxy, showing young bright stars carving out a cavern in the surrounding gas cloud with their intense radiation.",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/NGC_602.jpg/800px-NGC_602.jpg",
    hdurl: "https://upload.wikimedia.org/wikipedia/commons/3/3d/NGC_602.jpg",
    copyright: "NASA/ESA"
  }
];

async function main() {
  console.log("Comenzando el proceso de sembrado (seeding)...");

  console.log("Limpiando registros antiguos de APOD...");
  await prisma.apod.deleteMany();

  console.log(`Insertando ${apods.length} nuevos registros en la base de datos...`);

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
