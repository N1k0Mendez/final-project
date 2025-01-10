import './filter.css';

export function Filter({ onFilter }) {
    const types = [
    "grass", "fire", "water", "electric", 
    "bug", "rock", "ground", "psychic", 
    "dark", "fairy", "steel", "ice", 
    "dragon", "ghost", "poison", "flying",
    "normal", "fighting"
    ];

    return (
        <div className="filter-container">
            {types.map((type) => (
            <button 
                key={type} 
                className="filter-button" 
                onClick={() => onFilter(type)}
            >
                {type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
            ))}
        </div>
    );
}