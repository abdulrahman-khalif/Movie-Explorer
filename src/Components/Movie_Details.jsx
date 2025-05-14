import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom';
import { options } from '../api';
const Movie_Details = () => {
    const { id } = useParams();
    const location = useLocation();
    const movie = location.state || {};
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
                const response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?&append_to_response=releases,videos`, options);
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

            {isLoading ? (<span className="loader"></span>) : (
                <>
                    <div className='top-section'>
                        <div className='movie-details'>
                            <h2 className='title'>{movie.title} </h2>
                            <div className='tags'>
                                <span>{movie.release_date.split("-")[0]}</span>
                                <span> • {usRating}</span>
                                <span> • {formatRuntime(movieData?.runtime)}</span>
                            </div>
                        </div>
                        <div className='rate-popularity'>
                            <div className='rate'><img src="/star.svg" alt="star-icon" />
                                <p>{movie?.vote_average.toFixed(2)}<span>/10</span></p>
                            </div>
                            <span className='trand'>
                                <img className="trand-icon" src="/trand-icon.svg" alt="trand-icon" />
                                <span>{movie?.popularity}</span>
                            </span>
                        </div>
                    </div><div className='mid-section'>
                        <img className='movie-poster' src={movieData?.poster_path ? `https://image.tmdb.org/t/p/w500/${movieData?.poster_path}` : '/No-Poster-h.png'} />
                        <div className="trailer-box">
                            {trailerKey ? (
                                <iframe
                                    width="772"
                                    height="441"
                                    src={`https://www.youtube.com/embed/${trailerKey}?autoplay`}
                                    title="Movie Trailer"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            ) : <img className='poster-NotFound' src='/No-Poster-w.png' />}

                        </div>

                    </div>
                    <div className='buttom-section'>
                        <div className='gneres'>
                            <span className='catacory'>Gneres</span>
                            <div className='gneres-item'>
                                {movieData?.genres.map((genre, index) => {
                                    return <div key={index} className='gnere'>{genre.name}</div>
                                })}
                            </div>
                        </div>
                        <div className='over-view'>
                            <span className='catacory'>OverViw</span>
                            <p className='movie-overView'>{movieData.overview}</p>
                        </div>

                        <div className='release-date'>
                            <span className='catacory'>Release date</span>
                            <p className='description'>{Month(movieData.release_date)}</p>
                        </div>

                        <div className='status'>
                            <span className='catacory'>Status</span>
                            <p className='description'>{movieData.status}</p>
                        </div>

                        <div className='lang'>
                            <span className='catacory'>language</span>
                            <div className='lang-item'>
                                {movieData?.spoken_languages.map((lang, index) => {
                                    return <div key={index} className='description'>{lang.english_name} </div>
                                })}
                            </div>
                        </div>

                        <div className='budget'>
                            <span className='catacory'>Budget</span>
                            <p className='description'>{convertMoney(movieData.budget)}</p>
                        </div>

                        <div className='revenue'>
                            <span className='catacory'>Revenue</span>
                            <p className='description'>{convertMoney(movieData.revenue)}</p>
                        </div>

                        <div className='tagline'>
                            <span className='catacory'>Tagline</span>
                            <p className='description'>{movieData.tagline}</p>
                        </div>

                        <div className='production_companies'>
                            <span className='catacory'>Production Companies</span>
                            <div className='companies_name'>
                                {movieData?.production_companies.map((companies, index) => {
                                    return <div key={index} className='description'>{companies.name} </div>
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
