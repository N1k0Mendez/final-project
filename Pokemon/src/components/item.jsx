import { Link } from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import './item.css';
export function Item(){
    const { name } = useParams()
    const [pokemon, setPokemon] = useState(null)

    const API_URL = `https://pokeapi.co/api/v2/pokemon/${name}`

    useEffect(() =>{
        // Info about the pokemons
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
                        <p>height : {pokemon.height /10} Metros</p>
                        <h3>Stats:</h3>
                            {
                            pokemon.stats.map((stat, index) => (
                                <p key={index}> {stat.stat.name} : {stat.base_stat}</p>
                            ))
                            }
                            {
                            pokemon.types.map((type, index) => (
                                <p key={index}> {type.type.name}  {type.name}</p>
                            ))
                            }
                    </div>
                </>
            }
            <button><Link  className="nav-item" to="/" >Ver lista Pokemon</Link></button>
        </div>
    )
}