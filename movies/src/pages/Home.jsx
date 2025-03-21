import MovieCard from '../components/MovieCard';
import { useState, useEffect } from 'react';
import '../css/Home.css'
import { getPopularMovies, searchMovies } from '../services/api';

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);


    useEffect(()=>{
      const loadPopularMovies = async()=> {
          try{
            const PopularMovies = await getPopularMovies();
            setMovies(PopularMovies)
          }catch(err){
            console.error(err);
            setError("Failed to load movies")
          }finally{
            setLoading(false)
          }
      }
      loadPopularMovies();
    },[])

    const handleSearch = async (e) =>{
      e.preventDefault();
      if(!searchQuery.trim()) return;//prevent empty search //same as if(searchQuery.trim() =="")
      if(loading) return; //if we're already in a loading state. Don't do it
      setLoading(true)
      try{
        const searchResults = await searchMovies(searchQuery)
        setMovies(searchResults);
        setError(null)
      }catch(err){
        console.error(err);
        setError("Failed to search")
      }finally{
        setLoading(false)
      }
      // setSearchQuery("");
    }



    return (
        <div className="home">
          <form className="search-form" onSubmit={handleSearch}>
            <input 
            type="text" 
            className="search-input" 
            placeholder="Search for a movie" 
            value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}/>
            <button type='submit' className='search-button'>
              Search
            </button>
          </form>
          {error && <div className='error-message'>{error}</div>}
          {loading? (<div className='loading'>Loading...</div>):(
            
            <div className="movies-grid">
            {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </div>
          )}
            
        </div>
    )
}

export default Home;