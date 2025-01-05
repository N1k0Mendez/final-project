import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

import { List } from "./components/list";
import { Item } from "./components/item";
import "./App.css"

function App() {
  //Constants and States
  const limit = 24;
  const [offset, setOffset] = useState(0);
  const [listPokemon, setListPokemon] = useState([])
  const [showPagination, setShowPagination] = useState(true);
  const [searchError, setSearchError] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith("/item")) {
    setShowPagination(false); // Oculta la paginación en la vista de un Pokémon
    } else {
    setShowPagination(true); // Muestra la paginación en la vista principal
    }
  }, [location]);

  //API
  const API_URL = `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  
  //Search Function
  const changeSearch = async (result) => { 
    try {
        if (!result.trim()) throw new Error("Búsqueda vacía");
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${result.toLowerCase()}`);
        if (!response.ok) throw new Error("Pokémon no encontrado");
        const data = await response.json();
        setListPokemon([{ name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${data.id}` }]);
        setSearchError(false); // Limpia el error si se encuentra un Pokémon
    } catch (error) {
        setSearchError(true); // Indica que la búsqueda falló
    }
};

  // Fetch Pokemon List
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setListPokemon(data.results);
      } catch (error) {
        console.error("Error al cargar los Pokémon:", error);
      }
    };

    fetchData();
  }, [offset]);

  // ---------------------------------------Render App ---------------------------------------
  return (
    <>
      <Routes>
        <Route index path="/" element={ <List listPokemon={listPokemon} changeSearch={changeSearch} searchError={searchError}/> } ></Route>
        <Route path="/item/:name" element={ <Item /> } ></Route>
      </Routes>
      {showPagination && (
        <div className="pagination">
          {Array(9).fill().map((_, index) => (
            <a className="page" key={index} onClick={() => setOffset(limit * index)}> {index + 1} </a>
            ))}
        </div>
      )}
    </>
  )
}

export default App