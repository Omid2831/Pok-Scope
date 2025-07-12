import { useEffect, useState, useContext } from "react";
import "./PokScope.css";
import SearchInput from "./components/SearchInput";
import PokemonCard from "./components/PokemonCard";
import SearchHistory from "./components/SearchHistory";
import ErrorMessage from "./components/ErrorMessage";
import { ThemeContext } from "./context/ThemeProvider";
import LoadingSpinner from "./components/LoadingSpinner";
import { Styles } from "./utils/Styles";
import TypeBackgrounds from "./utils/TypeBackgrounds";

function PokScope() {
  const { theme } = useContext(ThemeContext);
  const [showError, setShowError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [pokemon, setPokemon] = useState({
    img: null,
    data: null,
    error: "",
    loading: false,
  });

  // Load saved search history from localStorage on mount
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("history"));
    if (saved) setSearchHistory(saved);
  }, []);

  // Persist search history to localStorage on update
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // Map API stat names to display-friendly names
  const formatStatName = (name) => {
    switch (name) {
      case "hp":
        return "HP";
      case "attack":
        return "Attack";
      case "defense":
        return "Defense";
      case "special-attack":
        return "Sp. Atk";
      case "special-defense":
        return "Sp. Def";
      case "speed":
        return "Speed";
      default:
        return name;
    }
  };

  // Combine damage relations from multiple types and remove duplicates
  const mergeDamageRelations = (allRelations) => {
    const merged = {
      double_damage_from: [],
      half_damage_from: [],
      no_damage_from: [],
    };

    for (const relation of allRelations) {
      for (const key in merged) {
        merged[key].push(...relation[key]);
      }
    }

    // Remove duplicates by Pokémon type name
    for (const key in merged) {
      merged[key] = Array.from(
        new Map(merged[key].map((t) => [t.name, t])).values()
      );
    }

    return merged;
  };

  // Fetch Pokémon data and associated type damage relations
  const fetchPokemon = async (term = searchTerm) => {
    const searchTermLower = term.trim().toLowerCase();

    if (!searchTermLower) {
      setPokemon({
        img: null,
        data: null,
        error: "Please enter a Pokémon name or ID!",
        loading: false,
      });
      return;
    }

    setPokemon({
      img: null,
      data: null,
      error: "Wait for a moment...",
      loading: true,
    });

    const startTime = Date.now();
    const minLoadingTime = 3000; // 3 seconds

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTermLower}`
      );
      if (!res.ok) throw new Error(`Pokémon '${searchTermLower}' not found`);

      const data = await res.json();

      // Fetch damage relations for all Pokémon types
      const relationPromises = data.types.map((t) =>
        fetch(`https://pokeapi.co/api/v2/type/${t.type.name}`).then((r) =>
          r.json()
        )
      );
      const typeData = await Promise.all(relationPromises);
      const mergedRelations = mergeDamageRelations(
        typeData.map((t) => t.damage_relations)
      );

      // Update search history, keep max 10 unique entries
      setSearchHistory((prev) => {
        const updated = [
          searchTermLower,
          ...prev.filter((item) => item !== searchTermLower),
        ];
        return updated.slice(0, 10);
      });

      // Calculate elapsed time and wait if needed
      const elapsed = Date.now() - startTime;
      if (elapsed < minLoadingTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minLoadingTime - elapsed)
        );
      }

      setPokemon({
        img: data.sprites.front_default,
        data: {
          name: data.name,
          types: data.types.map((t) => t.type.name),
          abilities: data.abilities.map((a) => a.ability.name),
          stats: data.stats.map((stat) => ({
            name: formatStatName(stat.stat.name),
            value: stat.base_stat,
          })),
          damageRelations: mergedRelations,
        },
        error: "",
        loading: false,
      });
    } catch (err) {
      // Ensure error loading spinner visible for 6s
      const elapsed = Date.now() - startTime;
      if (elapsed < minLoadingTime) {
        await new Promise((resolve) =>
          setTimeout(resolve, minLoadingTime - elapsed)
        );
      }

      setPokemon({
        img: null,
        data: null,
        error: err.message || "Something went wrong",
        loading: false,
      });

      setShowError(true);
      setTimeout(() => setShowError(false), 4000); // Hide error after 4 seconds
    }
  };

  // Trigger search on Enter key press
  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchPokemon();
  };

  const stats = pokemon.data?.stats || [];

  return (
    <div style={Styles.layout.screenContainer(theme)}>
      <div
        style={{
          ...Styles.layout.contentContainer(theme),
          ...Styles.spacing.section,
        }}
      >
        <h1 style={Styles.typography.heading(theme)}>Welcome to PokScope</h1>
        <p style={Styles.typography.subheading(theme)}>
          Search for a Pokémon and see their stats, abilities, and type
          matchups.
        </p>

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
          <SearchHistory
            history={searchHistory}
            onSelect={(term) => {
              setSearchTerm(term);
              fetchPokemon(term);
            }}
          />
        </div>

        {/* Error message - only shows when there's an error and not loading */}
        {!pokemon.loading && pokemon.error && (
          <ErrorMessage message={pokemon.error} />
        )}

        {pokemon.loading ? (
          <div className={`${TypeBackgrounds.loadingBar}`}>
            <LoadingSpinner />
            <p className={`${TypeBackgrounds.errorMessage}`}>
              Wait for a moment...
            </p>
          </div>
        ) : (
          showError && pokemon.loading && pokemon.error && (
          <ErrorMessage message={pokemon.error} />
        )
        )}

        {pokemon.data && (
          <PokemonCard
            name={pokemon.data.name}
            img={pokemon.img}
            types={pokemon.data.types}
            abilities={pokemon.data.abilities}
            Stats={stats}
            damageRelations={pokemon.data.damageRelations}
            weaknesses={pokemon.data.damageRelations?.double_damage_from || []}
            resistances={pokemon.data.damageRelations?.half_damage_from || []}
            immunities={pokemon.data.damageRelations?.no_damage_from || []}
          />
        )}
      </div>
    </div>
  );
}

export default PokScope;
