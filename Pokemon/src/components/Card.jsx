export function Card({item}){
    const id = item.url.split('/')[6];

    const IMG_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`
    
    return(
        <div className="card">
            <img src={IMG_URL} alt={`imagen de ${item.name}`} />
        <p>{item.name}</p>
        </div>
    )
}