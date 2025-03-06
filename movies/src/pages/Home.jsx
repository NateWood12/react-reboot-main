import MovieCard from '../components/MovieCard';
import { useState } from 'react';
import '../css/Home.css'

function Home(){
    const [searchQuery, setSearchQuery] = useState("");
    const movies = [
        {
            title: "Inception",
            release_date: "2010-07-16",
            url: "https://placehold.co/400x600",
          },
          {
            title: "Interstellar",
            release_date: "2014-11-07",
            url: "https://placehold.co/400x600",
          },
          {
            title: "The Dark Knight",
            release_date: "2008-07-18",
            url: "https://placehold.co/400x600",
          },
          {
            title: "Fight Club",
            release_date: "1999-10-15",
            url: "https://placehold.co/400x600",
          },
          {
            title: "The Matrix",
            release_date: "1999-03-31",
            url: "https://placehold.co/400x600",
          },
          {
            title: "Pulp Fiction",
            release_date: "1994-10-14",
            url: "https://placehold.co/400x600",
          }
    ];

    const handleSearch = (e) =>{
      e.preventDefault();
      alert(searchQuery);
      setSearchQuery("");
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
            <div className="movies-grid">
                {movies.map((movie, index) => (
                    <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </div>
    )
}

export default Home;