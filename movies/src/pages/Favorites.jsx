import '../css/Favorites.css'
import { useMovieContext } from '../contexts/movieContext';
import MovieCard from '../components/MovieCard';

function Favorites(){

    const {favorites} = useMovieContext();

    if (favorites && favorites.length > 0){
        return(
            <div className="favorites">
                <h2>Your Favorites</h2>
                <div className="movies-grid">
                    {favorites.map((movie, index) => (
                        <MovieCard key={index} movie={movie} />
                ))}
            </div>
        </div>
        )
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorites Yet</h2>
            <p>Start adding movies to your favorites list and they will appear here!</p>
        </div>
    )
}

export default Favorites;