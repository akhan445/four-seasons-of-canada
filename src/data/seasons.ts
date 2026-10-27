import type { Season, Tack } from '../types'

// All tack and card content lives here. x and y are percent of the map image.
// Image files go in public/images/; a missing one is drawn in as a placeholder.
export const tacks: Tack[] = [
  // Spring
  {
    id: 'spring-maple-syrup',
    season: 'spring',
    x: 71,
    y: 78,
    items: [
      {
        title: 'Maple syrup season',
        description:
          'In late winter and early spring, sap runs in Quebec and Ontario maple trees. Most of the world’s maple syrup comes from Quebec.',
        image: '/images/maple-syrup.jpg',
      },
    ],
  },
  {
    id: 'spring-cherry-blossoms',
    season: 'spring',
    x: 5.4,
    y: 73,
    items: [
      {
        title: 'Cherry blossoms',
        description:
          'Vancouver’s streets turn pink in March and April when thousands of cherry trees bloom.',
        image: '/images/cherry-blossoms.jpg',
      },
    ],
  },
  {
    id: 'spring-geese',
    season: 'spring',
    x: 40,
    y: 71,
    items: [
      {
        title: 'Canada geese return',
        description:
          'Flocks fly north in V shapes and land on Prairie wetlands to nest as the snow melts.',
        image: '/images/canada-geese.jpg',
      },
    ],
  },
  {
    id: 'spring-tulips',
    season: 'spring',
    x: 69,
    y: 86,
    items: [
      {
        title: 'Tulip festival',
        description:
          'Ottawa blooms with a million tulips every May, a thank-you gift that began with the Dutch royal family.',
        image: '/images/ottawa-tulips.jpg',
      },
    ],
  },
  {
    id: 'spring-trillium',
    season: 'spring',
    x: 64,
    y: 91,
    items: [
      {
        title: 'Trillium',
        description:
          'The white trillium carpets Ontario forests in spring. It is the province’s official flower.',
        image: '/images/trillium.jpg',
      },
    ],
  },

  // Summer
  {
    id: 'summer-midnight-sun',
    season: 'summer',
    x: 12,
    y: 36,
    items: [
      {
        title: 'Midnight sun',
        description:
          'In the far north the sun barely sets in June and July, so it can be bright at midnight.',
        image: '/images/midnight-sun.jpg',
      },
    ],
  },
  {
    id: 'summer-whales',
    season: 'summer',
    x: 88,
    y: 85,
    items: [
      {
        title: 'Whale watching',
        description:
          'Humpback and fin whales feed in the Bay of Fundy and off Nova Scotia all summer long.',
        image: '/images/whales.jpg',
      },
    ],
  },
  {
    id: 'summer-puffins',
    season: 'summer',
    x: 94,
    y: 64,
    items: [
      {
        title: 'Atlantic puffins',
        description:
          'Newfoundland’s coastal cliffs host the largest puffin colony in North America each summer.',
        image: '/images/puffins.jpg',
      },
    ],
  },
  {
    id: 'summer-canola',
    season: 'summer',
    x: 30,
    y: 68,
    items: [
      {
        title: 'Golden canola fields',
        description:
          'Saskatchewan’s Prairies turn bright yellow when canola blooms in July.',
        image: '/images/canola.jpg',
      },
    ],
  },
  {
    id: 'summer-loons',
    season: 'summer',
    x: 64,
    y: 90,
    items: [
      {
        title: 'Calling loons',
        description:
          'The common loon’s haunting call echoes over Ontario’s cottage-country lakes on summer evenings.',
        image: '/images/loon.jpg',
      },
    ],
  },

  // Autumn
  {
    id: 'autumn-fall-colours',
    season: 'autumn',
    x: 65,
    y: 88,
    items: [
      {
        title: 'Fall colours',
        description:
          'Sugar maples across Ontario and Quebec turn red, orange and yellow in late September and October.',
        image: '/images/fall-colours.jpg',
      },
    ],
  },
  {
    id: 'autumn-moose',
    season: 'autumn',
    x: 53,
    y: 77,
    items: [
      {
        title: 'Moose',
        description:
          'Autumn is the moose rut, when bulls call across the boreal forest looking for a mate.',
        image: '/images/moose.jpg',
      },
    ],
  },
  {
    id: 'autumn-salmon',
    season: 'autumn',
    x: 11,
    y: 65,
    items: [
      {
        title: 'Salmon run',
        description:
          'Millions of sockeye salmon swim back up British Columbia’s rivers, turning them red.',
        image: '/images/salmon.jpg',
      },
    ],
  },
  {
    id: 'autumn-polar-bears',
    season: 'autumn',
    x: 44,
    y: 57.5,
    items: [
      {
        title: 'Polar bears at Churchill',
        description:
          'In October and November polar bears gather near Churchill, Manitoba, waiting for Hudson Bay to freeze.',
        image: '/images/polar-bear.jpg',
      },
    ],
  },
  {
    id: 'autumn-cabot-trail',
    season: 'autumn',
    x: 90.5,
    y: 84.5,
    items: [
      {
        title: 'Cabot Trail',
        description:
          'Cape Breton’s coastal highway is one of the most famous fall-colour drives in the world.',
        image: '/images/cabot-trail.jpg',
      },
    ],
  },

  // Winter
  {
    id: 'winter-northern-lights',
    season: 'winter',
    x: 30,
    y: 49,
    items: [
      {
        title: 'Northern lights',
        description:
          'Long winter nights above Yellowknife give some of the best aurora views on Earth.',
        image: '/images/northern-lights.jpg',
      },
    ],
  },
  {
    id: 'winter-rideau',
    season: 'winter',
    x: 69,
    y: 86,
    items: [
      {
        title: 'Rideau Canal Skateway',
        description:
          'When the canal freezes, Ottawa opens the world’s largest naturally frozen skating rink.',
        image: '/images/rideau-canal.jpg',
      },
    ],
  },
  {
    id: 'winter-snowy-owl',
    season: 'winter',
    x: 55,
    y: 40,
    items: [
      {
        title: 'Snowy owl',
        description:
          'These white owls spend winter on the open Arctic tundra and sometimes fly south over farm fields.',
        image: '/images/snowy-owl.jpg',
      },
    ],
  },
  {
    id: 'winter-carnival',
    season: 'winter',
    x: 74,
    y: 80,
    items: [
      {
        title: 'Quebec Winter Carnival',
        description:
          'Ice sculptures, parades and Bonhomme, the snowman mascot, fill Quebec City every February.',
        image: '/images/winter-carnival.jpg',
      },
    ],
  },
  {
    id: 'winter-skiing',
    season: 'winter',
    x: 16,
    y: 64,
    items: [
      {
        title: 'Skiing in the Rockies',
        description:
          'Banff and Whistler get deep powder, which makes the mountains a skiing destination.',
        image: '/images/skiing.jpg',
      },
    ],
  },
]

export const tacksForSeason = (season: Season) =>
  tacks.filter((t) => t.season === season)
