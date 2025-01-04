import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from "react";

import { List } from "./components/list";
import { Item } from "./components/item";
import "./App.css"

function App() {
  //Constants and States
  //Valor en la API
  const limit = 24;
  //Valor inicial de la API
  const [offset, setOffset] = useState(0);
  //Valores que se usan en Item.jsx y list.jsx (son las lecturas de la API)
  const [listPokemon, setListPokemon] = useState([])
  //Aparecer y desaparecer la paginacion
  const [showPagination, setShowPagination] = useState(true);

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
      console.log("Inicio de busqueda para:" + result)
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${result}`);
      const data = await response.json();
  
      console.log("Busqueda Realizada", result, data);
      setListPokemon([{ name: data.name, url: `https://pokeapi.co/api/v2/pokemon/${data.id}` }]);
    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setListPokemon([]); // Limpia la lista si la búsqueda falla.
    }
  };

  // Fetch Pokemon List
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Cargando lista de Pokémon desde:", API_URL);
        const response = await fetch(API_URL);
        const data = await response.json();

        console.log("Lista de Pokémon cargada:", data.results);
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
        <Route index path="/" element={ <List listPokemon={listPokemon} changeSearch={changeSearch}/> } ></Route>
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