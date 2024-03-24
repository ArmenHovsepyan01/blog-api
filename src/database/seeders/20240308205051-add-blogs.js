'use strict';

const { Op } = require('sequelize');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Blogs', [
      {
        title: 'The Magnificent Eiffel Tower',
        content: `The Eiffel Tower is a wrought-iron lattice tower on the Champ de Mars in Paris, France. It is named after the engineer Gustave Eiffel, whose company designed and built the tower as the entrance arch to the 1889 World's Fair. It stands 330 meters tall.`,
        imageUrl: '/blog.webp',
        userId: 1,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Guardian of China: The Great Wall',
        content: `The Great Wall of China is a series of fortifications made of stone, brick, tamped earth, wood, and other materials, generally built along an east-to-west line across the historical northern borders of China to protect the Chinese states and empires against the raids and invasions of the various nomadic groups of the Eurasian Steppe.`,
        imageUrl: '/blog.webp',
        userId: 1,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Majestic Colosseum of Rome',
        content: `The Colosseum or Coliseum, also known as the Flavian Amphitheatre, is an oval amphitheatre in the centre of the city of Rome, Italy. Built of travertine limestone, tuff, and brick-faced concrete, it is the largest amphitheatre ever built. The Colosseum is situated just east of the Roman Forum.`,
        imageUrl: '/blog.webp',
        userId: 2,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Machu Picchu: Lost City of the Incas',
        content: `Machu Picchu is a 15th-century Inca citadel located in the Eastern Cordillera of southern Peru on a 2,430-meter (7,970 ft) mountain ridge. It is located in the Machupicchu District within Urubamba Province above the Sacred Valley, which is 80 kilometers (50 mi) northwest of Cuzco. Machu Picchu was built as an estate for the Inca emperor Pachacuti.`,
        imageUrl: '/blog.webp',
        userId: 2,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Symbol of Love: The Taj Mahal',
        content: `The Taj Mahal is an ivory-white marble mausoleum on the right bank of the river Yamuna in the Indian city of Agra. It was commissioned in 1632 by the Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal; it also houses the tomb of Shah Jahan himself. The tomb is the centerpiece of a 17-hectare (42-acre) complex.`,
        imageUrl: '/blog.webp',
        userId: 3,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Enchanting Pyramids of Giza',
        content: `The Great Pyramid of Giza is the oldest and largest of the three pyramids in the Giza pyramid complex bordering present-day Giza in Greater Cairo, Egypt. It is the only one of the Seven Wonders of the Ancient World that is largely intact and is believed to have been constructed as a tomb for the Fourth Dynasty Egyptian pharaoh Khufu.`,
        imageUrl: '/blog.webp',
        userId: 3,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Mesmerizing Niagara Falls',
        content: `Niagara Falls is a group of three waterfalls at the southern end of Niagara Gorge, spanning the border between the province of Ontario in Canada and the state of New York in the United States. The largest of the three is Horseshoe Falls, also known as Canadian Falls, which straddles the international border between Canada and the United States.`,
        imageUrl: '/blog.webp',
        userId: 4,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Iconic Statue of Liberty',
        content: `The Statue of Liberty is a colossal neoclassical sculpture on Liberty Island in New York Harbor within New York City, in the United States. The copper statue, a gift from the people of France to the people of the United States, was designed by French sculptor Frédéric Auguste Bartholdi and its metal framework was built by Gustave Eiffel.`,
        imageUrl: '/blog.webp',
        userId: 4,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Exploring the Acropolis of Athens',
        content: `The Acropolis of Athens is an ancient citadel located on a rocky outcrop above the city of Athens and contains the remains of several ancient buildings of great architectural and historic significance, the most famous being the Parthenon. The word acropolis is from the Greek words ἄκρον (akron, "highest point, extremity") and πόλις (polis, "city").`,
        imageUrl: '/blog.webp',
        userId: 5,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Discovering the Beauty of Kyoto',
        content: `Kyoto is a city located in the central part of the island of Honshu, Japan. It has a population close to 1.5 million. Formerly the imperial capital of Japan for more than one thousand years, it is now the capital city of Kyoto Prefecture located in the Kansai region, as well as a major part of the Kyoto-Osaka-Kobe metropolitan area.`,
        imageUrl: '/blog.webp',
        userId: 5,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Charming City of Venice',
        content: `Venice is a city in northeastern Italy and the capital of the Veneto region. It is situated on a group of 118 small islands that are separated by canals and linked by over 400 bridges. The islands are located in the shallow Venetian Lagoon, an enclosed bay that lies between the mouths of the Po and the Piave rivers.`,
        imageUrl: '/blog.webp',
        userId: 6,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Spectacular Grand Canyon',
        content: `The Grand Canyon is a steep-sided canyon carved by the Colorado River in Arizona, United States. The Grand Canyon is 277 miles long, up to 18 miles wide and attains a depth of over a mile. The canyon and adjacent rim are contained within Grand Canyon National Park, the Kaibab National Forest, Grand Canyon-Parashant National Monument, the Hualapai Indian Reservation, the Havasupai Indian Reservation and the Navajo Nation.`,
        imageUrl: '/blog.webp',
        userId: 6,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Magical Northern Lights',
        content: `The aurora borealis, or northern lights, is a natural light display in the Earth's sky, predominantly seen in high-latitude regions around the Arctic and Antarctic. Auroras are produced when the magnetosphere is sufficiently disturbed by the solar wind that the trajectories of charged particles in both solar wind and magnetospheric plasma, mainly in the form of electrons and protons, precipitate them into the upper atmosphere, where their energy is lost.`,
        imageUrl: '/blog.webp',
        userId: 7,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Mystique of Stonehenge',
        content: `Stonehenge is a prehistoric monument in Wiltshire, England, two miles (3 km) west of Amesbury. It consists of a ring of standing stones, each around 13 feet (4.0 m) high, seven feet (2.1 m) wide, and weighing around 25 tons. The stones are set within earthworks in the middle of the most dense complex of Neolithic and Bronze Age monuments in England, including several hundred tumuli (burial mounds).`,
        imageUrl: '/blog.webp',
        userId: 7,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Splendor of Petra',
        content: `Petra, originally known to its inhabitants as Raqmu, is a historical and archaeological city in southern Jordan. Petra lies around Jabal Al-Madbah in a basin surrounded by mountains which form the eastern flank of the Arabah valley that runs from the Dead Sea to the Gulf of Aqaba.`,
        imageUrl: '/blog.webp',
        userId: 8,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Marvels of the Amazon Rainforest',
        content: `The Amazon rainforest, alternatively, the Amazon Jungle, also known in English as Amazonia, is a moist broadleaf tropical rainforest in the Amazon biome that covers most of the Amazon basin of South America. This basin encompasses 7,000,000 km2 (2,700,000 sq mi), of which 5,500,000 km2 (2,100,000 sq mi) are covered by the rainforest.`,
        imageUrl: '/blog.webp',
        userId: 8,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'The Allure of the Sahara Desert',
        content: `The Sahara is a desert on the African continent. With an area of 9,200,000 square kilometers (3,600,000 sq mi), it is the largest hot desert in the world and the third-largest desert overall, smaller only than the deserts of Antarctica and the Arctic.`,
        imageUrl: '/blog.webp',
        userId: 9,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Unveiling the Wonders of Angkor Wat',
        content: `Angkor Wat is a temple complex in Cambodia and the largest religious monument in the world by land area, measuring 162.6 hectares. Originally constructed as a Hindu temple dedicated to the god Vishnu for the Khmer Empire, it was gradually transformed into a Buddhist temple toward the end of the 12th century.`,
        imageUrl: '/blog.webp',
        userId: 10,
        isPublished: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Blogs', {
      where: {
        id: {
          [Op.gt]: 0
        }
      }
    });
  }
};
