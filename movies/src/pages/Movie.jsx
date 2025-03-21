import { getMovie } from "../services/api";
import { useState, useEffect } from "react";
import "../css/Movie.css"

function Movie({ movieId }) {
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadMovie = async () => {
            if (!movieId) return; // Prevents unnecessary fetches
            setLoading(true);
            setError(null);
            try {
                const movieData = await getMovie(movieId);
                setMovie(movieData);
            } catch (err) {
                console.error("Error fetching movie:", err);
                setError("Failed to load movie.");
            } finally {
                setLoading(false);
            }
        };
        loadMovie();
    }, [movieId]); // Runs whenever `movieId` changes

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="movie-detail">
            <h1>{movie.title}</h1>
            <div className="movie-info">
                <img className="movie-details-poster" src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.title} poster`} />
                <div className="movie-description">
                    <p><strong>Tagline:</strong> {movie.tagline}</p>
                    <p><strong>Overview:</strong> {movie.overview}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Genres:</strong> {movie.genres.map(genre => genre.name).join(', ')}</p>
                    <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                    <p><strong>Rating:</strong> {movie.vote_average} / 10 ({movie.vote_count} votes)</p>
                    <p><strong>Production Companies:</strong> {movie.production_companies.map(company => company.name).join(', ')}</p>
                    <p><strong>Homepage:</strong> <a href={movie.homepage} target="_blank" rel="noopener noreferrer">{movie.homepage}</a></p>
                    <p><strong>IMDB ID:</strong> <a href={`https://www.imdb.com/title/${movie.imdb_id}`} target="_blank" rel="noopener noreferrer">{movie.imdb_id}</a></p>
                </div>
            </div>
        </div>
    );
}

export default Movie;
