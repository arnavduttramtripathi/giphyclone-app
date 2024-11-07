import { createContext, useContext, useEffect, useState } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";



const GifContext = createContext();


const GifProvider = ({ children }) => {
    const [gifs, setGifs] = useState([]);
    const [filter, setFilter] = useState("gifs");
    const [favorites, setFavorites] = useState([]);

    const addTooFavorites = (id) => {
        if (favorites.includes(id)) {
            const updatedFavorites = favorites.filter((itemId) => itemId !== id);
            localStorage.setItem("favoritesGIFs", JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        } else {
            const updatedFavorites = [...favorites,id];
            updatedFavorites.push(id);
            localStorage.setItem("favoritesGIFs", JSON.stringify(updatedFavorites));
            setFavorites(updatedFavorites);
        }
    };

    useEffect(() => {
        const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(favorites);
    }, []);

    const gf = new GiphyFetch(import.meta.env.VITE_GIPHY_KEY);

    return <GifContext.Provider
        value={{ gf, gifs, setGifs, filter, setFilter, favorites , addTooFavorites}}>
        {children}</GifContext.Provider>;
};

export const GifState = () => {
    return useContext(GifContext)
}

export default GifProvider;