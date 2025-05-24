import { useEffect, useState } from 'react'
import Search from './Search';
import { url, movieSearch, options, url_Imdb, options_Imdb } from '../api';
import MovieCard from './MovieCard'
import { Link } from 'react-router-dom';
import Spinner from './Spinner';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useDebounce } from 'use-debounce';

const Content = () => {
  const [movies, setMovies] = useState(null);
  // const [top_box, setTop_box] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(null);
  const [search, setSearch] = useState("");
  const [count, setCount] = useState(1);
  const [nextpage, setNextPage] = useState(false);
  const [previusPage, setPreviusPage] = useState(false);
  const [DebounceSearchTerm] = useDebounce(search, 700);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  useEffect(() => {
    FetchData(DebounceSearchTerm)
    // imdb_api_request();
  }, [DebounceSearchTerm, count])

  const handlCickNext = () => {
    if (count >= 50) {
      setNextPage(true);
      return;
    } else {
      setCount((n) => n + 1);
      setPreviusPage(false);
      return;
    }
  }

  const handlCickPrevius = () => {
    if (count <= 1) {
      setPreviusPage(true);
      return;
    } else {
      setCount((n) => n - 1);
      setNextPage(false)
      return;
    }
  }


  async function FetchData(query = '') {
    try {
      setIsLoading(true);
      setIsError('');
      const response = await fetch(query ? `${movieSearch}&query=${DebounceSearchTerm}` : `${url}&page=${count}`, options)
        .then(async (response) => {
          if (!response.ok) {
            throw new Error("faild to fetch Data");
          } else {
            return await response.json();
          }
        })
        .then((response) => {
          console.log(response)
          setMovies(response);
          setIsLoading(false);
        })

    } catch (error) {
      console.error(error);
      setIsLoading(false)
      setIsError('There is Error in Fetch Data Please try agian later');
    }
  }

  // const imdb_api_request = async () => {
  //   try {
  //     const response = await fetch(url_Imdb, options_Imdb)
  //       .then(async (response) => {
  //         if (!response.ok) {
  //           throw new Error("faild to fetch Data");
  //         } else {
  //           return await response.json();
  //         }
  //       }).then((response) => {
  //         console.log(response);
  //         setTop_box(response);
  //       });
  //   } catch (error) {
  //     console.error(error);
  //   }

  // }

  return (
    <main>
      <div className='pattern' />
      <div className='wrapper'>
        <header>
          <h1>Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle</h1>          <Search search={search} setSearch={setSearch} />
        </header>
        {/* {search ? "" : <div className='hero-section'>
          <h2 className='top-box-office'>Top Box Office Movies</h2>

          <div className='slider-holder'>
            <Slider {...settings}>
              {top_box?.map((movie, index) => (
                <Link to={`/movie/${movie.id}`} key={index}>
                  <div className='image-container'>
                    <img src={movie.primaryImage} alt={`slide-${movie.primaryTitle}`} loading='lazy' />
                  </div>

                </Link>
              ))}
            </Slider>

          </div>
        </div>} */}



        {isLoading ? (
          <div className='mt-16 mx-auto'>
             <Spinner />
          </div>
         
        ) : isError ? (
          <p className="text-red-500">{isError}</p>
        )
          : movies?.results[0] ? <section className="all-movies">
            <h2>Popular Movies</h2>
            <div className='card-container'>
              <ul>
                {
                  movies?.results.map((movie, index) => (
                    <div key={index}>
                      <Link to={`/movie/${movie.id}`} state={movie}>
                        <div ><MovieCard movie={movie} state={movie} /></div>
                      </Link>
                    </div>
                  ))
                }
              </ul>
            </div>
            <div className='pageHandelr'>
              <button
                onClick={handlCickPrevius}
                disabled={previusPage}
                className="arrow-left">
                <img src="./arrow-left-icon.svg" alt="aro-right" />
              </button>
              <span>{count}/50</span>
              <button
                onClick={handlCickNext}
                disabled={nextpage}
                className="arrow-right" >
                <img src="./arrow-right-icon.svg" alt="next" />
              </button>
            </div>

          </section> : <h2 className='text-center mt-16 text-3xl '>No Movie found 😔</h2>}

      </div>
    </main>
  )
}

export default Content
