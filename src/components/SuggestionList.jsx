import "../styles/SuggestionList.css"

function SuggestionList({ suggestions, onSelect }) {
    if (suggestions.length === 0) return null

    return (
        <ul className="card suggestion-list">
            {suggestions.map((city) => (
                <li key={city.id}>
                    <button type="button" onClick={() => onSelect(city)}>
                        {city.name}
                        {city.region ? `, ${city.region}` : ""}
                        {city.country ? `(${city.country})` : ""}
                    </button>
                </li>
            ))}
        </ul>
    )
}

export default SuggestionList