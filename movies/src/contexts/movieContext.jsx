import { createContext, useEffect, useState, useContext } from "react";

const MovieContext = createContext();

//custom hook to access the context easily
export const useMovieContext = () => useContext(MovieContext);

export const MovieProvided = ({children}) => {
    // const favs = JSON.parse(localStorage.getItem("pm_favorites"));
    const [favorites, setFavorites] = useState([]);

    //load from local storage when app first loads
    useEffect(()=>{
        const storedFavs = localStorage.getItem("pm-favorites");
        if(storedFavs) setFavorites(JSON.stringify(storedFavs));
    }, [])


    //update local storage whenever favorites change
    useEffect(()=>{
        localStorage.setItem("pm_favorites", favorites);
    },[favorites])

    //Function to add a movie to favorites
    const addToFavorites = (movie)=> {
        setFavorites((prev) => [...prev, movie]);
    };

    //Function to remove a movie from favorites
    const removeFromFavorites = (movieId) => {
        setFavorites((prev) => prev.filter((movie)=> movie.id !== movieId));
    };

    //Check if a movie is in favorites
    const isFavorite = (movieId) =>{
        return favorites?.some((movie) => movie.id = movieId);
    };

    const value = {
        favorites, 
        addToFavorites, 
        removeFromFavorites, 
        isFavorite,
    };

    return (
        <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
    )
};