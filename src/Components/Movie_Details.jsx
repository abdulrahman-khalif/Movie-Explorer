import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { options } from '../api';
import Spinner from './Spinner';
const Movie_Details = () => {
    const { id } = useParams();
    const [movieData, setMovieDate] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);
    const usRating = movieData?.releases.countries.find(c => c.iso_3166_1 === 'US')?.certification || "N/A";




    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoading(true);
        const fetchTrailer = async () => {
            try {
                const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?&append_to_response=releases,videos`, options);
                const data = await response.json();
                console.log(data)
                setMovieDate(data);
                const trailer = data.videos.results.find(v => v.site === "YouTube" && v.type === "Trailer");
                // console.log(trailer)
                if (trailer) {
                    setTrailerKey(trailer.key);
                }
                setIsLoading(false);
            } catch (error) {
                setIsError('Failed to fetch trailer:,', error);
                console.error("Failed to fetch trailer:", error);
            }
        };

        fetchTrailer();
    }, []);

    function formatRuntime(minutes) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    }
    const Month = (date) => {
        
        const dateObj = new Date(date);
        const monthName = dateObj.toLocaleString('default', { month: 'long' });
        const year = dateObj.getFullYear();
        const day = dateObj.getDay();
        return `${monthName} ${day}, ${year}`;
    }

    const convertMoney = (money) => {
        const movie_budget = Number(money);
    
        if (movie_budget >= 1_000_000) {
            return '$' + (movie_budget / 1_000_000).toFixed(2) + ' Million';
        } else if (movie_budget >= 1_000) {
            return '$' + (movie_budget / 1_000).toFixed(2) + ' Thousand';
        } else {
            return '$' + movie_budget;
        }
    };
    

    return (
        <div className='movie-container'>

            {isLoading ? (<div className="w-full flex justify-center items-center"><Spinner /></div>) 
            : (
                <>
                    <div className='flex justify-between my-2.5'>
                        <div className='flex flex-col flex-wrap space-x-2'>
                            <h2>{movieData?.title} </h2>
                            <div className='text-[var(--color-light-200)] px-2 mt-4'>
                                <span>{movieData?.release_date.split("-")[0]}</span>
                                <span> • {usRating}</span>
                                <span> • {formatRuntime(movieData?.runtime)}</span>
                            </div>
                        </div>
                        <div className='w-100 flex flex-row justify-around'>
                            <div className='rate'><img src="/star.svg" alt="star-icon" />
                                <p>{movieData?.vote_average.toFixed(2)}<span>/10</span></p>
                            </div>
                            <div className='trand'>
                                <img className="trand-icon" src="/trand-icon.svg" alt="trand-icon" />
                                <p>{movieData?.popularity}</p>
                            </div>
                        </div>
                    </div><div className='flex flex-row items-center justify-center gap-5 max-w-[1100px] w-full my-12 mx-auto max-lg:flex-col'>
                        <img className='max-w-[303px] max-h-[441px] rounded-xl'src={movieData?.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData?.poster_path}` : '/No-Poster-h.png'} />
                        <div className="trailer-box">
                            {trailerKey ? (
                                <iframe
                                className=' max-lg:w-[400px]'
                                    width="772px"
                                    height="441"
                                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay`}
                                    title="Movie Trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : <img className='max-w-[772px] max-h-[441px]' src='/No-Poster-w.png' />}

                        </div>

                    </div>
                    <div className='flex items-start gap-5 flex-col flex-wrap'>
                        <div className='overSection'>
                            <p className='catacory'>Gneres</p>
                            <div className='items'>
                                {movieData?.genres.map((genre, index) => {
                                    return <div key={index} className='bg-[#221f3d] text-center p-[15px] rounded-xl text-[16px] text-[#ffffff]'>{genre.name}</div>
                                })}
                            </div>
                        </div>
                        <div className='overSection'>
                            <span className='catacory'>OverViw</span>
                            <p className='text-lg max-w-[700px] w-full'>{movieData.overview}</p>
                        </div>

                        <div className='overSection'>
                            <span className='catacory'>Release date</span>
                            <p>{Month(movieData.release_date)}</p>
                        </div>

                        <div className='overSection'>
                            <span className='catacory'>Status</span>
                            <p> {movieData.status}</p>
                        </div>

                        <div className='overSection'>
                            <span className='catacory'>language</span>
                            <div className='items'>
                                {movieData?.spoken_languages.map((lang, index) => {
                                    return <p key={index}>{lang.english_name} </p>
                                })}
                            </div>
                        </div>

                        <div className='overSection'>
                            <span className='catacory'>Budget</span>
                            <p>{convertMoney(movieData.budget)}</p>
                        </div>

                        <div className='overSection'>
                            <span className='catacory'>Revenue</span>
                            <p>{convertMoney(movieData.revenue)}</p>
                        </div>

                        <div className='overSection'>
                            <span className='catacory'>Tagline</span>
                            <p>{movieData.tagline}</p>
                        </div>

                        <div className='overSection'>
                            <p className='catacory'>Production Companies</p>
                            <div className='items'>
                                {movieData?.production_companies.map((companies, index) => {
                                    return <p key={index} >{companies.name} </p>
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )
            }

        </div>
    )
}

export default Movie_Details