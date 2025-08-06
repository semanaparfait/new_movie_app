import junior from '../assets/images/abasobanuzi/junior.jpg';
import rocky from '../assets/images/abasobanuzi/rocky.jpg';
import sankara from '../assets/images/abasobanuzi/savimbi.jpg';

const interpreters = [
  {
    id: 'junior',
    name: 'junior',
    photo: junior,
 movies: 
 [
     {
    id: 'junior_mov001',
    title: 'Tenet',
    genre: 'Sci-Fi',
    year: 2020,
    provider: 'Junior',
    popularity: '567,646,884',
    rating:'7.8',
    poster: 'https://i.pinimg.com/1200x/71/02/cd/7102cdb6d5d68bff1034facbc1da6ede.jpg',
    description: 'A secret agent embarks on a time-bending mission to prevent global catastrophe.'
  },
  {
    id: 'junior_mov002',
    title: 'Inception',
    genre: 'Sci-Fi',
    year: 2010,
    rating:'5.8',
    popularity: '897,646,884',
    provider: 'Junior',
    poster: 'https://i.pinimg.com/1200x/b0/ae/a4/b0aea49646879a043ad9f6ec3002e99f.jpg',
    description: 'A skilled thief uses dream-sharing technology to implant an idea into a target’s mind.'
  },
  {
    id: 'junior_mov003',
    title: 'Interstellar',
    genre: 'Adventure',
    year: 2014,
    provider: 'Junior',
    popularity: '227,646,884',
    rating:'6.8',
    poster: 'https://i.pinimg.com/1200x/0b/34/ce/0b34ce2145b475247577a5d438a199b0.jpg',
    description: 'Astronauts travel through a wormhole in search of a new home for humanity.'
  },
  {
    id: 'junior_mov004',
    title: 'The Prestige',
    genre: 'Drama',
    year: 2006,
    provider: 'Junior',
    poster: 'https://i.pinimg.com/originals/46/d4/6e/46d46eeb31374ef26950fc2fcb52d63d.jpg',
    description: 'Two rival magicians engage in a dangerous battle of wits and secrets.'
  },
  {
    id: 'junior_mov005',
    title: 'Dunkirk',
    genre: 'War',
    year: 2017,
    provider: 'Junior',
    poster: 'https://i.pinimg.com/originals/32/41/6a/32416acdf2a41d3bd7650ce0c4f896d5.jpg',
    description: 'Allied soldiers are evacuated from the beaches of Dunkirk during WWII.'
  },
  {
    id: 'junior_mov006',
    title: 'The Dark Knight',
    genre: 'Action',
    year: 2008,
    provider: 'Junior',
    poster: 'https://i.pinimg.com/736x/5d/55/f6/5d55f69bbe7948d202dffbbea4b857d8.jpg',
    description: 'Batman faces his most ruthless enemy, the Joker, in a battle for Gotham’s soul.'
  },
  {
    id: 'junior_mov007',
    title: 'Memento',
    genre: 'Thriller',
    year: 2000,
    provider: 'Junior',
    poster: 'https://i.pinimg.com/originals/f3/34/42/f33442f8500c2d9e5c160abb8e21b786.jpg',
    description: 'A man with short-term memory loss hunts for his wife’s killer using tattoos and notes.'
  },
  {
    id: 'junior_mov008',
    title: 'Oppenheimer',
    genre: 'Biography',
    year: 2023,
    provider: 'Junior',
    poster: 'https://i.pinimg.com/originals/2d/4c/75/2d4c753c7f6a983f93f97d8ad1213e40.jpg',
    description: 'A dramatic portrayal of J. Robert Oppenheimer and the making of the atomic bomb.'
  },
  {
    id: 'junior_mov009',
    title: 'The Matrix',
    genre: 'Sci-Fi',
    year: 1999,
    provider: 'Junior',
    poster: 'https://i.pinimg.com/originals/89/d4/f0/89d4f0d36c95c04b4a4bff4b1a0244ea.jpg',
    description: 'A computer hacker discovers the truth behind reality and his role in saving humanity.'
  },
  {
    id: 'junior_mov010',
    title: 'Blade Runner 2049',
    genre: 'Sci-Fi',
    year: 2017,
    provider: 'Junior',
    poster: 'https://i.pinimg.com/originals/42/13/ae/4213ae3078b998164f1aacc0021a69a2.jpg',
    description: 'A new blade runner uncovers secrets that threaten to unravel what remains of society.'
  }
    ]
  },
  {
    id: 'rocky',
    name: 'Rocky',
    photo: rocky,
 movies: [
      {
    id: 'rocky_mov001',
    title: 'Extraction',
    genre: 'Action',
    poster: 'https://i.pinimg.com/736x/fb/8c/41/fb8c4189e5acb804d7ae80b853a2aa06.jpg',
    year: 2020,
    provider: 'Rocky Kimomo',
    description: 'A fearless black-market mercenary embarks on a deadly extraction mission in Dhaka, Bangladesh.'
  },
  {
    id: 'rocky_mov002',
    title: 'John Wick',
    genre: 'Action',
    poster: 'https://i.pinimg.com/1200x/f3/f4/c6/f3f4c64663457d886bd7508b6950c433.jpg',
    year: 2014,
    provider: 'Rocky Kimomo',
    description: 'An ex-hitman comes out of retirement to track down the gangsters that killed his dog and stole his car.'
  },
  {
    id: 'rocky_mov003',
    title: 'Mad Max: Fury Road',
    genre: 'Adventure',
    poster: 'https://i.pinimg.com/1200x/a6/5f/e5/a65fe533096f92828113b4b880b5ee07.jpg',
    year: 2015,
    provider: 'Rocky Kimomo',
    description: 'In a post-apocalyptic wasteland, Max teams up with a mysterious woman to flee from a warlord.'
  },
  {
    id: 'rocky_mov004',
    title: 'Gladiator',
    genre: 'Drama',
    poster: 'https://i.pinimg.com/564x/07/b5/5e/07b55e4d8e08c3ec3c4fd634ff08983e.jpg',
    year: 2000,
    provider: 'Rocky Kimomo',
    description: 'A betrayed Roman general fights as a gladiator to take revenge against the corrupt emperor.'
  },
  {
    id: 'rocky_mov005',
    title: 'The Dark Knight',
    genre: 'Crime',
    poster: 'https://i.pinimg.com/564x/f8/e4/90/f8e49053e0e2a7f53d80d1f1432bdf13.jpg',
    year: 2008,
    provider: 'Rocky Kimomo',
    description: 'Batman faces his greatest psychological and physical tests as he takes on the Joker.'
  },
  {
    id: 'rocky_mov006',
    title: 'Inception',
    genre: 'Sci-Fi',
    poster: 'https://i.pinimg.com/564x/5c/61/b5/5c61b5acb1d1e295d4ebc728ac43418a.jpg',
    year: 2010,
    provider: 'Rocky Kimomo',
    description: 'A skilled thief is given a chance at redemption if he can successfully plant an idea into a target\'s subconscious.'
  },
  {
    id: 'rocky_mov007',
    title: 'The Revenant',
    genre: 'Adventure',
    poster: 'https://i.pinimg.com/564x/d7/9b/83/d79b8354f9b9f4d7b930f1d44a319de2.jpg',
    year: 2015,
    provider: 'Rocky Kimomo',
    description: 'A frontiersman fights for survival after being mauled by a bear and left for dead.'
  },
  {
    id: 'rocky_mov008',
    title: 'Edge of Tomorrow',
    genre: 'Sci-Fi',
    poster: 'https://i.pinimg.com/564x/e6/0d/d7/e60dd7d05574652d5a44d0ad3eabf8a5.jpg',
    year: 2014,
    provider: 'Rocky Kimomo',
    description: 'A soldier relives the same day over and over in a war against alien invaders.'
  },
  {
    id: 'rocky_mov009',
    title: 'Skyfall',
    genre: 'Spy',
    poster: 'https://i.pinimg.com/564x/2d/9e/0b/2d9e0bb2b6e2083782e5c0b3932eaad6.jpg',
    year: 2012,
    provider: 'Rocky Kimomo',
    description: 'James Bond must track down and destroy the threat to MI6, no matter the personal cost.'
  },
  {
    id: 'rocky_mov010',
    title: 'Logan',
    genre: 'Superhero',
    poster: 'https://i.pinimg.com/564x/e4/6e/7f/e46e7fdcfc9e8824abf23dc1958572f4.jpg',
    year: 2017,
    provider: 'Rocky Kimomo',
    description: 'In the near future, a weary Logan cares for an ailing Professor X, while hiding from the world.'
  }
    ]
  },
  {
  id: 'sankara',
  name: 'Sankara',
  photo: sankara,
  movies: [
    {
    id: 'sankara_mov001',
    title: 'The Revenant',
    genre: 'Adventure',
    poster: 'https://i.pinimg.com/736x/e9/57/3e/e9573eccf1269c66e225bfdef0512996.jpg',
    year: 2015,
    provider: 'Sankara',
    description: 'A frontiersman on a fur trading expedition fights for survival after being mauled by a bear.'
  },
      {
    id: 'sankara_mov001',
    title: 'Tenet',
    genre: 'Sci-Fi',
    year: 2020,
    provider: 'Junior',
    poster: 'https://i.pinimg.com/1200x/71/02/cd/7102cdb6d5d68bff1034facbc1da6ede.jpg',
    description: 'A secret agent embarks on a time-bending mission to prevent global catastrophe.'
  },
  {
    id: 'sankara_mov002',
    title: 'Joker',
    genre: 'Drama',
    poster: 'https://i.pinimg.com/1200x/75/bd/39/75bd39af740f73f3c88895c2fb3acdb4.jpg',
    year: 2019,
    provider: 'Sankara',
    description: 'A mentally troubled stand-up comedian turns to a life of crime and chaos in Gotham City.'
  },
  {
    id: 'sankara_mov003',
    title: '1917',
    genre: 'War',
    poster: 'https://i.pinimg.com/736x/ff/4b/d5/ff4bd52ef1fafed53be6b0b66edbb2c5.jpg',
    year: 2019,
    provider: 'Sankara',
    description: 'Two British soldiers receive orders to deliver a message to save 1,600 men during World War I.'
  },
  {
    id: 'sankara_mov004',
    title: 'Ford v Ferrari',
    genre: 'Biography',
    poster: 'https://i.pinimg.com/564x/c5/8e/5f/c58e5f2c31c0c1cb1a539324e93df1b1.jpg',
    year: 2019,
    provider: 'Sankara',
    description: 'American car designer Carroll Shelby and driver Ken Miles challenge Ferrari at Le Mans in 1966.'
  },
  {
    id: 'sankara_mov005',
    title: 'Interstellar',
    genre: 'Sci-Fi',
    poster: 'https://i.pinimg.com/564x/e6/60/7b/e6607ba1f6b4d6b25f524ab3df12fc64.jpg',
    year: 2014,
    provider: 'Sankara',
    description: 'A team of explorers travel through a wormhole in space in an attempt to ensure humanity’s survival.'
  },
  {
    id: 'sankara_mov006',
    title: 'Gladiator',
    genre: 'Action',
    poster: 'https://i.pinimg.com/1200x/49/22/6c/49226cc2be5cb537218993fa89d075a8.jpg',
    year: 2000,
    provider: 'Sankara',
    description: 'A former Roman General seeks revenge after being betrayed and forced into slavery.'
  },
  {
    id: 'sankara_mov007',
    title: 'Whiplash',
    genre: 'Drama',
    poster: 'https://i.pinimg.com/564x/53/90/60/53906048a8aa4781b9820df97e19060d.jpg',
    year: 2014,
    provider: 'Sankara',
    description: 'A young jazz drummer is pushed to his limits by an abusive music instructor.'
  },
  {
    id: 'sankara_mov008',
    title: 'Shutter Island',
    genre: 'Thriller',
    poster: 'https://i.pinimg.com/564x/02/41/3c/02413c7f740acdc78717a0a8f0cdb378.jpg',
    year: 2010,
    provider: 'Sankara',
    description: 'Two U.S. Marshals investigate the disappearance of a prisoner from a mental institution.'
  },
  {
    id: 'sankara_mov009',
    title: 'The Hateful Eight',
    genre: 'Western',
    poster: 'https://i.pinimg.com/564x/24/82/c7/2482c7e32a314385a62701fe31cf6c3e.jpg',
    year: 2015,
    provider: 'Sankara',
    description: 'Eight strangers seek refuge in a stagecoach stopover during a blizzard but secrets erupt.'
  },
  {
    id: 'sankara_mov010',
    title: 'No Country for Old Men',
    genre: 'Crime',
    poster: 'https://i.pinimg.com/564x/62/1d/3c/621d3cc94c2ef885c8d097f215e8e7c3.jpg',
    year: 2007,
    provider: 'Sankara',
    description: 'Violence and mayhem ensue after a hunter finds a stash of money in the desert.'
  }
  ]
}

  // Add others...
];
export default interpreters;