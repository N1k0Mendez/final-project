import { useState, useEffect } from "react";
import { Card } from "./components/Card";
function App() {

  const API_URL = "https://pokeapi.co/api/v2/pokemon?limit=20"}
  const IMG_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index}.png`

  const [listPokemon, setListPokemon] = useState(null);

  useEffect(() => {
    const fechtData = async () => {
      const response = await fetch(API_URL);
      const data = await response.json();

      console.log(data.results);

      setListPokemon(data.results);
    }
    
    fechtData()
  }, []);

  return (
    <div className="list">
    { listPokemon &&  listPokemon.map((item, index) => (
        <Card key={index} item ={item} />
        ))
    }
    </div>
  )
}

export default App