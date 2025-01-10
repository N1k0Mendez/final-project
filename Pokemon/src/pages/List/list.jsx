import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';

import { Filter } from '../../components/Filter/Filter';
import { Card } from '../../components/Card/card';
import './list.css'

export function List({ listPokemon, changeSearch, searchError }) {
    const [prevSearch, setPrevSearch] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const getRandomPokemon = () => {
        const randomId = Math.floor(Math.random() * 898) + 1;
        navigate(`/item/${randomId}`);
    };

    const sendForm = () => {
        if (!prevSearch.trim()) {
            setErrorMessage("Por favor, ingresa un nombre o ID válido.");
            return;
        }
        setErrorMessage('');
        changeSearch(prevSearch);
    };

    const filterByType = async (type) => {
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/type/${type}`);
            const data = await response.json();
            const filteredList = data.pokemon.map((p) => ({
            name: p.pokemon.name,
            url: p.pokemon.url,
            }));
          changeSearch(filteredList); // Cambia el estado con la nueva lista
        } catch (error) {
            console.error('Error al filtrar por tipo:', error);
        }
        };
    // ---------------------------------------Render list ---------------------------------------
    return (
        <>
            <header>
                <div className="box-pokedex">
                <img className="header-img" src="./public/pokemon79x45.png" alt="Imagen Pokeomn" />
                <img className="titulo-pokedex"src="./public/pokedex.png" alt="imagen Pokedex" />

                </div>
                <div className="box-search">
                    <input type="text" placeholder="Buscar por Nombre o ID" value={prevSearch} onChange={(e) => setPrevSearch(e.target.value)}/>
                    <div className="box-buttons">
                        <button className="button-search" onClick={sendForm}><HiSearch /></button>
                        <button className="button-random" onClick={getRandomPokemon}>Random Pokémon</button>
                    </div>
                </div>
                <div className="error-messages">
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    {searchError && (<p className="error-message">No existen pokémones con ese nombre.</p>)}
                </div>
            </header>
            <Filter onFilter={filterByType} />
            <section>
                <div className="container list">
                    {listPokemon && listPokemon.length > 0 && listPokemon.map((item, index) => (<Card key={index} item={item} />))}
                </div>
            </section>
        </>
    );
}