import { useEffect, useState } from 'react'
import Search from './Components/Search';
import { url, options, movieSearch } from './api';
import MovieCard from './Components/MovieCard'
import { Router, Routes, Route, Link } from 'react-router-dom';
import Content from './Components/Content';
import Movie_Details from './Components/Movie_Details';


function App() {



  return (
    <Routes>
      <Route path='/' element={<Content />}/>
      <Route path='/movie/:id' element={<Movie_Details />} />
    </Routes>

  );




  


}
export default App



