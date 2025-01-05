import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { HiSearch } from 'react-icons/hi';
import { Card } from './Card';
import './list.css'

export function List({ listPokemon, changeSearch, searchError }) {
    const [prevSearch, setPrevSearch] = useState('');
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");

    const getRandomPokemon = () => {
        const randomId = Math.floor(Math.random() * 898) + 1; // Generar ID aleatorio entre 1 y 898
        navigate(`/item/${randomId}`); // Redirigir al componente Item con el ID aleatorio
    };

    const sendForm = () => {
        if (!prevSearch.trim()) {
            setErrorMessage("Por favor, ingresa un nombre o ID válido.");
            return;
        }
        setErrorMessage(''); // Limpia el mensaje de error
        changeSearch(prevSearch);
    };
    // ---------------------------------------Render list ---------------------------------------
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
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            {searchError && <p className="error-message">No existen pokémones con ese nombre.</p>}
            {/* Mostrar la lista de Pokémon */}
            <div className="container list">
                {listPokemon && listPokemon.length > 0 && listPokemon.map((item, index) => (
                    <Card key={index} item={item} />
                ))}

            </div>
        </>
    );
}