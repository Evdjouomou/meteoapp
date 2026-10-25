import "../styles/SearchBar.css"
function SearchBar( { query, onQueryChange, onSubmit }) {

    function handleSubmit(event) {
        event.preventDefault()
        onSubmit()
    }

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            <input 
                type="text" 
                value={query} 
                onChange={(event) => onQueryChange(event.target.value)}
                placeholder="Rechercher une ville (Yaounde, Paris, Tokyo...)"
                aria-label="Rechercher une ville"
            />
            <button type="submit">Rechercher</button>
        </form>
    )
}

export default SearchBar