import { useEffect, useState } from "react";
import "./PokScope.css";
import SearchInput from "./components/SearchInput";
import PokemonCard from "./components/PokemonCard";
import SearchHistory from "./components/SearchHistory";
import ErrorMessage from "./components/ErrorMessage";
import { Styles } from "./utils/Styles";

function PokScope() {
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

    // Remove duplicates
    for (const key in merged) {
      merged[key] = Array.from(
        new Map(merged[key].map((t) => [t.name, t])).values()
      );
    }

    return merged;
  };

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

    try {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${searchTermLower}`
      );
      if (!res.ok) {
        throw new Error(`Pokémon '${searchTermLower}' not found`);
      }

      const data = await res.json();
      const types = data.types.map((t) => t.type.name);

      const relationPromises = types.map((type) =>
        fetch(`https://pokeapi.co/api/v2/type/${type}`).then((r) => r.json())
      );

      const typeData = await Promise.all(relationPromises);
      const allRelations = typeData.map((t) => t.damage_relations);
      const mergedRelations = mergeDamageRelations(allRelations);

      setSearchHistory((prev) => {
        const updated = [
          searchTermLower,
          ...prev.filter((item) => item !== searchTermLower),
        ];
        return updated.slice(0, 10);
      });

      setPokemon({
        img: data.sprites.front_default,
        data: {
          name: data.name,
          types,
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
      setPokemon({
        img: null,
        data: null,
        error: err.message || "Something went wrong",
        loading: false,
      });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") fetchPokemon();
  };

  const stats = pokemon.data?.stats || [];

  return (
    <div style={Styles.layout.screenContainer}>
      <div
        style={{ ...Styles.layout.contentContainer, ...Styles.spacing.section }}
      >
        <h1 style={Styles.typography.heading}>Welcome to PokScope</h1>
        <p style={Styles.typography.subheading}>
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

        <ErrorMessage message={pokemon.error} />

        {pokemon.loading && <p style={Styles.typography.loading}>Loading...</p>}

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
