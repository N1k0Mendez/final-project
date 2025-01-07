import { Link } from 'react-router-dom';

import './card.css';

export function Card({ item }) {
    // Extract ID Pokémon 
    const id = item.url.split('/')[6];

    // URL ID
    const IMG_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
    
    // ---------------------------------------Render card ---------------------------------------
    return (
        <Link className="card" to={`/item/${item.name}`}>
            <div className="card-body">
                <img className="card-img"src={IMG_URL} alt={`Imagen de ${item.name}`} />
                <div className="card-text">
                    <small className="card-small">{"ID: " +id}</small>
                    <p className="card-p">{item.name}</p>
                </div>
            </div>
        </Link>
    );
}