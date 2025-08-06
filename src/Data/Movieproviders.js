import neflix from '../assets/images/movieproviders/netflix.jpeg';
import disney from '../assets/images/movieproviders/disgne.jpeg';
import hbomax from '../assets/images/movieproviders/hbomax.jpeg';
import primevideos from '../assets/images/movieproviders/prime.jpeg';
import appletv from '../assets/images/movieproviders/appletv.jpeg';

const movieProviders = [
  {
    id: 'netflix',
    name: "Netflix",
    logo: neflix,
    movies: [
      {
        title: "Extraction 2",
        genre: "Action",
        poster: "https://i.pinimg.com/736x/fb/8c/41/fb8c4189e5acb804d7ae80b853a2aa06.jpg"
      },
        {
      title: "The Gray Man",
      genre: "Action",
      poster: "https://i.pinimg.com/1200x/c2/c8/b4/c2c8b40a3b00e6a448972f9613bb8a3f.jpg"
    },
      {
        title: "The Witcher",
        genre: "Fantasy",
        poster: "https://m.media-amazon.com/images/I/91BsopLeBTL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "You",
        genre: "Thriller",
        poster: "https://m.media-amazon.com/images/I/91-9zzYvTUL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "The Crown",
        genre: "Drama",
        poster: "https://m.media-amazon.com/images/I/71LM0Vtpz7L._AC_UF894,1000_QL80_.jpg"
      },
       {
    title: "BoJack Horseman",
    genre: "Animation",
    poster: "https://i.pinimg.com/736x/9f/dc/69/9fdc69965ec70d21700bdd33bdb96be5.jpg"
  },
  {
    title: "Toy Story",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/uXDfjJbdP4ijW5hWSBrPrlKpxab.jpg"
  },
  {
    title: "Finding Nemo",
    genre: "Animation",
    poster: "https://i.pinimg.com/736x/e3/15/1e/e3151e0a099a7aea3741a520948ddd82.jpg"
  },
  {
    title: "The Incredibles",
    genre: "Animation",
    poster: "https://i.pinimg.com/736x/1f/6f/92/1f6f92a88cc38806f83125e2b2e434e7.jpg"
  },
  {
    title: "Shrek",
    genre: "Animation",
    poster: "https://i.pinimg.com/736x/82/58/d5/8258d5d80e06df3581b603530e17e7de.jpg"
  },
  {
    title: "Despicable Me",
    genre: "Animation",
    poster: "https://i.pinimg.com/736x/de/bf/35/debf35f74d4a646a101b9a2220964807.jpg"
  },
  {
    title: "Kung Fu Panda",
    genre: "Animation",
    poster: "https://i.pinimg.com/736x/f7/9f/28/f79f28d0c5e5d73daa13b332b580e817.jpg"
  },
  {
    title: "Monsters, Inc.",
    genre: "Animation",
    poster: "https://i.pinimg.com/736x/c5/07/9d/c5079da3940817133dad0f281d92e3bd.jpg"
  },
  {
    title: "Ratatouille",
    genre: "Animation",
    poster: "https://i.pinimg.com/736x/02/d9/1f/02d91f8899c03a2bf656e0b197753b7f.jpg"
  },
  {
    title: "Inside Out",
    genre: "Animation",
    poster: "https://i.pinimg.com/736x/76/29/6a/76296a0210f64ff72c538678676681b5.jpg"
  },
  {
    title: "Coco",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/eKi8dIrr8voobbaGzDpe8w0PVbC.jpg"
  },
  {
    title: "The Lion King",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/2bXbqYdUdNVa8VIWXVfclP2ICtT.jpg"
  },
  {
    title: "Aladdin",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/3iYQTLGoy7QnjcUYRJy4YrAgGvp.jpg"
  },
  {
    title: "Beauty and the Beast",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/6a5t9rs1kN17M3S0Th8Xcb3TmlY.jpg"
  },
  {
    title: "How to Train Your Dragon",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/xvx4Yhf0DVH8G4LzNISpMfFBDy2.jpg"
  },
  {
    title: "Frozen",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/pjeMs3yqRmFL3giJy4PMXWZTTPa.jpg"
  },
  {
    title: "Tangled",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/5y3aWJ2i4sbP3RYxBxA6q9UCvga.jpg"
  },
  {
    title: "Wreck-It Ralph",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/cjr4NWURcVN3gW5FlHeabgBHLrY.jpg"
  },
  {
    title: "Zootopia",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/5Q81V3J7lw7kq3DYJPu1R71A3Zy.jpg"
  },
  {
    title: "Megamind",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/wr2C28BkfVhHLeKtKqSmGkPo4sf.jpg"
  },
  {
    title: "The Secret Life of Pets",
    genre: "Animation",
    poster: "https://image.tmdb.org/t/p/w500/qmDpIHrmpJINaRKAfWQfftjCdyi.jpg"
  }

    ]
  },
  {
    id: 'disney',
    name: "Disney+",
    logo: disney,
    movies: [
      {
        title: "Encanto",
        genre: "Animation",
        poster: "https://m.media-amazon.com/images/I/71nRIvyZSDL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "Avengers: Endgame",
        genre: "Superhero",
        poster: "https://m.media-amazon.com/images/I/71niXI3lxlL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "Loki",
        genre: "Sci-Fi",
        poster: "https://m.media-amazon.com/images/I/71B+aU5GOcL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "Turning Red",
        genre: "Family",
        poster: "https://m.media-amazon.com/images/I/71Il9XmqHUL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "The Mandalorian",
        genre: "Adventure",
        poster: "https://m.media-amazon.com/images/I/81FAvuZ2UUL._AC_UF894,1000_QL80_.jpg"
      },
      {
    title: "John Wick: Chapter 4",
    genre: "Action",
    poster: "https://i.pinimg.com/736x/1c/66/c1/1c66c1246d681a6db7ec77e4a7e99a59.jpg"
  },
  {
    title: "The Batman",
    genre: "Crime",
    poster: "https://i.pinimg.com/736x/f4/49/ea/f449ea3a5ea9fc7c88f719a203d6a22e.jpg"
  },
  {
    title: "Dune",
    genre: "Sci-Fi",
    poster: "https://i.pinimg.com/736x/43/38/93/4338931e1f7fa0c43c9f24f82cd4d3a4.jpg"
  },
  {
    title: "Avengers: Endgame",
    genre: "Superhero",
    poster: "https://i.pinimg.com/736x/27/e0/00/27e0009cbbe5c4cc80ab4b50d2d3e4a9.jpg"
  },
  {
    title: "Tenet",
    genre: "Thriller",
    poster: "https://i.pinimg.com/736x/96/1d/58/961d58d7e3512f4303dd6a5a759f0d65.jpg"
  },
  {
    title: "Interstellar",
    genre: "Sci-Fi",
    poster: "https://i.pinimg.com/736x/d7/89/b7/d789b71a0f13411d9283482d2c4ee172.jpg"
  },
  {
    title: "Joker",
    genre: "Drama",
    poster: "https://i.pinimg.com/736x/83/21/9b/83219b6de92e36c66ee7c5f3a4658d62.jpg"
  },
  {
    title: "The Gray Man",
    genre: "Action",
    poster: "https://i.pinimg.com/1200x/c2/c8/b4/c2c8b40a3b00e6a448972f9613bb8a3f.jpg"
  },
  {
    title: "Black Panther: Wakanda Forever",
    genre: "Superhero",
    poster: "https://i.pinimg.com/736x/87/e9/d2/87e9d20e3b9dd8b73f77dfed2ee1677a.jpg"
  },
  {
    title: "No Time to Die",
    genre: "Spy",
    poster: "https://i.pinimg.com/736x/f1/d5/aa/f1d5aa95eead3f97bc01e7ff9e3dc49c.jpg"
  },
  {
    title: "Doctor Strange: Multiverse of Madness",
    genre: "Superhero",
    poster: "https://i.pinimg.com/736x/e4/2e/0d/e42e0d39e7c6aefb34616d6e4d537c94.jpg"
  },
  {
    title: "The Flash",
    genre: "Superhero",
    poster: "https://i.pinimg.com/736x/f8/e7/f9/f8e7f9e90d4ee72517489c90b9e527b5.jpg"
  },
  {
    title: "Spider-Man: No Way Home",
    genre: "Superhero",
    poster: "https://i.pinimg.com/736x/c9/45/bd/c945bd85f8b83e8415d98b9b33b1e80f.jpg"
  },
  {
    title: "Shang-Chi and the Legend of the Ten Rings",
    genre: "Superhero",
    poster: "https://i.pinimg.com/736x/37/48/42/37484268b360cf61a2d364ddbb07d9e4.jpg"
  },
  {
    title: "The Matrix Resurrections",
    genre: "Sci-Fi",
    poster: "https://i.pinimg.com/736x/89/92/f2/8992f2e314de96efdf0dbfb2cf10a1b3.jpg"
  },
  {
    title: "Mission: Impossible – Dead Reckoning",
    genre: "Action",
    poster: "https://i.pinimg.com/736x/1c/66/c1/1c66c1246d681a6db7ec77e4a7e99a59.jpg"
  },
  {
    title: "Fast X",
    genre: "Action",
    poster: "https://i.pinimg.com/736x/08/04/01/080401f63835af1cfb71144ce48f0aed.jpg"
  },
  {
    title: "The Marvels",
    genre: "Superhero",
    poster: "https://i.pinimg.com/736x/c0/7f/e0/c07fe04e23040fd688e3916db0fddf69.jpg"
  },
  {
    title: "The Hunger Games: The Ballad of Songbirds and Snakes",
    genre: "Adventure",
    poster: "https://i.pinimg.com/736x/0f/d6/50/0fd650c46b2b270da5b1fcd3ce70f395.jpg"
  }
    ]
  },
  {
    id: 'hbomax',
    name: "HBO Max",
    logo: hbomax,
    movies: [
      {
        title: "The Batman",
        genre: "Action",
        poster: "https://i.pinimg.com/736x/55/91/41/5591419714430e172683319769248709.jpg"
      },
      {
        title: "Euphoria",
        genre: "Teen Drama",
        poster: "https://m.media-amazon.com/images/I/81-+m0FWDwL._AC_UF894,1000_QL80_.jpg"
      },
        {
    title: "The Gray Man",
    genre: "Action",
    poster: "https://i.pinimg.com/1200x/c2/c8/b4/c2c8b40a3b00e6a448972f9613bb8a3f.jpg"
  },
      {
        title: "Game of Thrones",
        genre: "Fantasy",
        poster: "https://m.media-amazon.com/images/I/91xTc3L2RgL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "Succession",
        genre: "Drama",
        poster: "https://m.media-amazon.com/images/I/81RVaUyTk4L._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "The Last of Us",
        genre: "Post-Apocalyptic",
        poster: "https://m.media-amazon.com/images/I/81vb0PQ-GvL._AC_UF894,1000_QL80_.jpg"
      }
    ]
  },
  {
    id: 'primevideos',
    name: "Amazon Prime",
    logo: primevideos,
    movies: [
      {
        title: "The Boys",
        genre: "Superhero",
        poster: "https://m.media-amazon.com/images/I/81b2zJt+TyL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "Reacher",
        genre: "Crime",
        poster: "https://m.media-amazon.com/images/I/81T+gBThhnL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "Upload",
        genre: "Sci-Fi",
        poster: "https://m.media-amazon.com/images/I/71ZnIlReTgL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "Invincible",
        genre: "Animation",
        poster: "https://m.media-amazon.com/images/I/71QEZxVxnBL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "The Marvelous Mrs. Maisel",
        genre: "Comedy",
        poster: "https://m.media-amazon.com/images/I/81qB3tUONrL._AC_UF894,1000_QL80_.jpg"
      }
    ]
  },
  {
    id: 'appletv',
    name: "Apple TV+",
    logo: appletv,
    movies: [
      {
        title: "Ted Lasso",
        genre: "Comedy",
        poster: "https://m.media-amazon.com/images/I/91ryqUzM1BL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "Foundation",
        genre: "Sci-Fi",
        poster: "https://m.media-amazon.com/images/I/91gOrvjTGbL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "See",
        genre: "Drama",
        poster: "https://m.media-amazon.com/images/I/81TldBLOnKL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "Coda",
        genre: "Family",
        poster: "https://m.media-amazon.com/images/I/91SmSYgJUtL._AC_UF894,1000_QL80_.jpg"
      },
      {
        title: "The Morning Show",
        genre: "News Drama",
        poster: "https://m.media-amazon.com/images/I/91oN8KPGF5L._AC_UF894,1000_QL80_.jpg"
      },
      {
    title: "The Shawshank Redemption",
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg"
  },
  {
    title: "Forrest Gump",
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg"
  },
  {
    title: "The Green Mile",
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg"
  },
  {
    title: "Fight Club",
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8PX.jpg"
  },
  {
    title: "A Beautiful Mind",
    genre: "Drama",
    poster: "https://image.tmdb.org/t/p/w500/5hY7P9nYa0joXtCHTyH21AJKq58.jpg"
  }
    ]
  }
];

export default movieProviders;