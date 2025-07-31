import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import TypeBackgrounds from "/src/utils/TypeBackgrounds";

function HoverActions({ name, onfavorite, onunfavorite }) {
  const [favorited, setFavorited] = useState(false);

  // Load favorite state for this Pokémon on mount or when name changes
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorited(storedFavorites.includes(name));
  }, [name]);

  const handleClick = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");

    let updatedFavorites;
    if (favorited) {
      updatedFavorites = storedFavorites.filter(fav => fav !== name);
      onunfavorite?.();
    } else {
      updatedFavorites = [...storedFavorites, name];
      onfavorite?.();
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setFavorited(!favorited);
  };

  return (
    <div className={TypeBackgrounds.hoverActions.container}>
      <button
        onClick={handleClick}
        className={`${TypeBackgrounds.hoverActions.favoriteBtn} ${
          favorited
            ? TypeBackgrounds.hoverActions.favoriteActive
            : TypeBackgrounds.hoverActions.favoriteInactive
        }`}
        title={favorited ? "Unfavorite" : "Favorite"}
      >
        {favorited ? (
          <FaHeart className={TypeBackgrounds.hoverActions.iconLarge} />
        ) : (
          <FaRegHeart className={TypeBackgrounds.hoverActions.iconLarge} />
        )}
      </button>

      <button
        className={TypeBackgrounds.hoverActions.menuBtn}
        title="More options"
      >
        <RiMenu3Line className={TypeBackgrounds.hoverActions.iconLarge} />
      </button>
    </div>
  );
}

export default HoverActions;
