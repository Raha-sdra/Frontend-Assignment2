import { useEffect, useState } from "react";
import UserInfoForm from './UserInfoForm'
// import { Routes, Route } from 'react-router-dom'

export default function App() {

  const [movies, setMovies] = useState();
  const [screening, setScreening] = useState();
  const [movieScreening, setMovieScreening] = useState();


  useEffect(() => {
    // Fetch screenings and movies data
    const fetchScreenings = fetch("/api/screenings")
      .then((res) => res.json())
        .then((json) => setScreening(json));

    const fetchMovies = fetch("/api/movies")
      .then((res) => res.json())
        .then((json) => setMovies(json));

  }, []);

  function getMovieTitleFromMovieId(movies, movieId){
    try{
      return movies?.find(element => element.id === movieId).title;
    }catch(exception){
      return [];

    }
  }

  function getMovieCategoriesFromMovieId(movies, movieId){
    try{
      return movies?.find(element => element.id === movieId).description.categories;
    }catch(exception){
        return [];
    }
  }

  function getMovieImagesFromMovieId(movies, movieId){
    try{
      return "https://cinema-rest.nodehill.se/" + movies?.find(element => element.id === movieId).description.posterImage;
    }catch(exception){
      return [];

    }
  }

  function getScreenDate(screenTime){
    let date = new Date(screenTime)
    return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDay()
  }

  function getScreenTime(screenTime){
    let date = new Date(screenTime)
    return date.getHours() + ':' + date.getMinutes()
  }

  function sortByTime(sort){
    const fetchScreenings = fetch("/api/screenings?sort=" + sort)
      .then((res) => res.json())
        .then((json) => setScreening(json));
  }
  
  function sort(event){
    if(event.target.value == "timeasc"){
      sortByTime('time');
    }
    if(event.target.value == "timedsc"){
      sortByTime('-time');
    }
  }

  function filter(event){
    const fetchMovies = fetch("/api/movies")
      .then((res) => res.json())
        .then((json) => {
          let filteredMovies = [...json]
          let CopyOfMovies = [];
          filteredMovies.filter((item) => {
            if(item.description.categories.some((element) => element.toLowerCase() === event.target.value)) 
              CopyOfMovies.push(item);
          });
          setMovies([...CopyOfMovies]);        
        });
  }

  return <>
    Sort: 
    <select onChange={sort}>
      <option value="select">Select</option>
      <option value="timeasc">Time ASC</option>
      <option value="timedsc">Time DSC</option>
    </select>
    Filter:
    <select onChange={filter}>
      <option value="select">Select</option>
      <option value="adventure">Adventure</option>
      <option value="comedy">Comedy</option>
      <option value="family">Family</option>
      <option value="drama">Drama</option>
      <option value="horror">Horror</option>
      <option value="fantasy">Fantasy</option>
      <option value="thriller">Thriller</option>
      <option value="biography">Biography</option>
      <option value="music">Music</option>
      <option value="documentary">Documentary</option>
      <option value="crime">Crime</option>
      
    </select>
    <div className="screeningsContainer" id="screenings">
      {screening?.map((screening) =>
        (getMovieImagesFromMovieId(movies, screening.movieId) == 0) ? '' : <div className="screeningContainer">
          <img className="posterImage" src={getMovieImagesFromMovieId(movies, screening.movieId)}/>
          <div className="categoryContainer">
            {getMovieCategoriesFromMovieId(movies, screening.movieId)?.map(category => 
                <p>{category}</p>
            )}
          </div>
          <p className="movieTitle">{getMovieTitleFromMovieId(movies, screening.movieId)}</p>
          <p className="screeningTime">{getScreenDate(screening.time)}</p>
          <p className="screeningTime">{getScreenTime(screening.time)}</p>
        </div>
      )}
    </div>
  </>
}