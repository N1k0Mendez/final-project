import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';

import './item.css';

export function Item(){
    const { name } = useParams()
    const [pokemon, setPokemon] = useState(null)

    const API_URL = `https://pokeapi.co/api/v2/pokemon/${name}`

    useEffect(() =>{
        const dataPokemon = async () => {
            const response = await fetch(API_URL)
            const data = await response.json()

            setPokemon(data)
        }

        dataPokemon()
    }, [])

    // ---------------------------------------Render item ---------------------------------------
    return(
        <div className="container item">
            { pokemon && 
                <>
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div className="info">
                        <h2>{pokemon.name}</h2>
                        <p>weight : {pokemon.weight /10} kg</p>
                        <p>height : {pokemon.height /10} Meters</p>
                        <h3>Stats</h3>
                            {
                            pokemon.stats.map((stat, index) => (
                                <p key={index} className="stat">
                                    <span>{stat.stat.name}</span>
                                    <span>{stat.base_stat}</span>
                                </p>
                                ))
                            }
                            <h3>Type</h3>
                            {
                            pokemon.types.map((type, index) => (
                                <p className="type" key={index}> {type.type.name} </p>
                            ))
                            }
                    </div>
                </>
            }
            <Link  className="nav-item" to="/" ><button>Volver a la lista Pokémon</button></Link>
        </div>
    )
}