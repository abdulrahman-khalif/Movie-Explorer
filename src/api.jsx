
export const options = {
	method: 'GET',
	headers: {
	  accept: 'application/json',
	  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzc5MzA5MWU1NTAyMGFlNmI2Y2I2ZWUzMDg5YTkzYyIsIm5iZiI6MS43NDYyMDM0MTQ3NjE5OTk4ZSs5LCJzdWIiOiI2ODE0ZjMxNjhjMzcyZGJkODhhMjBjNzUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.E-fstaAz0LkcDBdwbrtaf_jTEedrDE7jj5PAFmVwFso'
	}
  };

export const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
export  const movieSearch = `https://api.themoviedb.org/3/search/movie?&include_adult=false&language=en-US&page=1`


export const url_Imdb = 'https://imdb236.p.rapidapi.com/api/imdb/top-box-office';
export const options_Imdb = {
	method: 'GET',
	headers: {
		'x-rapidapi-key': '3ad6e2474emsh15e2e90060989f9p12f900jsn9ffab28f324c',
		'x-rapidapi-host': 'imdb236.p.rapidapi.com'
	}
};




