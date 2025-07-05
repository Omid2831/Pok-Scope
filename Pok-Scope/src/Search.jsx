import { useEffect, useState } from "react";
import "./Search.css";
import SearchInput from "./components/SearchInput";
import HistoryList from "./components/SearchHistory";
import PokemonCard from "./components/PokemonCard";
import ErrorMessage from "./components/ErrorMessage";
import { Styles } from "./utils/Styles";


function Search() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [pokemon, setPokemon] = useState({
    img: null,
    data: null,
    error: "",
    loading: false,
  });

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history"));
    if (saved) setSearchHistory(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const fetchPokemon = async (term = searchTerm) => {
    const searchTermLower = term.toLowerCase();
    if (!searchTermLower) return;
    setPokemon({ img: null, data: null, error: "", loading: true });

    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchTermLower}`);
      if (!res.ok) throw new Error("Pokémon not found");

      const data = await res.json();

      setSearchHistory((prev) => {
        const updated = [searchTermLower, ...prev.filter((item) => item !== searchTermLower)];
        return updated.slice(0, 10);
      });

      setPokemon({
        img: data.sprites.front_default,
        data: {
          name: data.name,
          types: data.types.map((t) => t.type.name),
          abilities: data.abilities.map((a) => a.ability.name),
        },
        error: "",
        loading: false,
      });
    } catch {
      setPokemon({ img: null, data: null, error: "Pokémon not found!", loading: false });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchPokemon();
  };

 return (
    <div style={Styles.layout.screenContainer}>
      <div style={{ ...Styles.layout.contentContainer, ...Styles.spacing.section }}>
        <h1 style={Styles.typography.heading}>Welcome to My App</h1>
        <p style={Styles.typography.subheading}>This is a simple React application.</p>

        <div style={Styles.spacing.section}>
          <SearchInput
            searchTerm={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            onSearchClick={() => fetchPokemon()}
            onClearClick={() => {
              setSearchTerm("");
              setPokemon({ img: null, data: null, error: "", loading: false });
            }}
            hasError={!!pokemon.error}
          />
        </div>

        <div style={Styles.spacing.section}>
          <HistoryList 
            history={searchHistory} 
            onSelect={(term) => {
              setSearchTerm(term);
              fetchPokemon(term);
            }} 
          />
        </div>

        <ErrorMessage message={pokemon.error} />
        
        {pokemon.loading && (
          <p style={Styles.typography.loading}>Loading...</p>
        )}
        
        {pokemon.data && (
          <PokemonCard
            name={pokemon.data.name}
            img={pokemon.img}
            types={pokemon.data.types}
            abilities={pokemon.data.abilities}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
