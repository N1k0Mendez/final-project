import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { Card } from './Card';

export function List({ listPokemon, changeSearch }) {
    const [prevSearch, setPrevSearch] = useState('');
    const navigate = useNavigate(); // Para redirigir a otra ruta

    // Función para generar un Pokémon aleatorio
    const getRandomPokemon = () => {
        const randomId = Math.floor(Math.random() * 898) + 1; // Generar ID aleatorio entre 1 y 898
        navigate(`/item/${randomId}`); // Redirigir al componente Item con el ID aleatorio
    };

    // Función que se ejecuta cuando se envía el formulario de búsqueda
    const sendForm = () => {
        changeSearch(prevSearch);
    };

    return (
        <>
            {/* Campo de búsqueda */}
            <div className="form-data">
                <input
                    type="text"
                    placeholder="Buscar por Nombre/id"
                    value={prevSearch}
                    onChange={(e) => setPrevSearch(e.target.value)} // Actualiza el estado con el valor del campo
                />
                <button onClick={sendForm}><HiSearch /> Buscar</button>

                {/* Botón para obtener un Pokémon aleatorio */}
                <button onClick={getRandomPokemon}>Random Pokémon</button>
            </div>

            {/* Mostrar la lista de Pokémon */}
            <div className="container list">
                {listPokemon && listPokemon.length > 0 && listPokemon.map((item, index) => (
                    <Card key={index} item={item} />
                ))}
                {listPokemon && listPokemon.length <= 0 && <p>No existen un pokemon con ese Nombre</p>}
            </div>
        </>
    );
}