import React from 'react'

const MovieCard = ({ movie: 
    {poster_path, title, vote_average,original_language,release_date}
 }) => {

    return (

        <div className='card'>
            <img className='movie-poster' src={poster_path ? `https://image.tmdb.org/t/p/w500/${poster_path}` : './No-Poster-h.png'}
                alt="movie-poster" loading='lazy' />
            <div className='movie-content'>
                <p className='title'>{title}</p>
                <div className='movie-info'>
                    <img src="./star.svg" alt="rate-icon" loading='lazy' />
                    <p className='rateing'>{vote_average.toFixed(2)}</p>
                    <span>•</span>
                    <p className='language'>{original_language}</p>
                    <span>•</span>
                    <p className='release-date'>{release_date.split('-')[0]}</p>
                </div>
            </div>

        </div>

    )
}

export default MovieCard
