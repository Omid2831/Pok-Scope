import "./SearchInput.css";
import TypeBackgrounds from "../utils/TypeBackgrounds";
import TypeColors from "../utils/typeColors";

function SearchInput({ searchTerm, onChange, onKeyDown, onSearchClick, onClearClick, hasError }) {
  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={searchTerm}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Search Pokémon..."
        className={`flex-1 px-4 py-2 border ${
          hasError ? TypeBackgrounds.borders.borderRed : TypeBackgrounds.borders.borderGray
        } rounded ${TypeBackgrounds.focuses.focusOutlineNone} ${TypeBackgrounds.focuses.focusRing2} ${
          hasError ? TypeBackgrounds.focuses.focusRingRed : TypeBackgrounds.focuses.focusRingBlue
        }`}
      />
      <button
        className={`px-4 py-2 ${TypeBackgrounds.bgs.blue} ${TypeColors.white} rounded ${TypeBackgrounds.bgs.HbgBlue} transition`}
        onClick={onSearchClick}
      >
        Search
      </button>
      {searchTerm && (
        <button
          className={`px-3 py-2 ${TypeBackgrounds.bgs.gray300} ${TypeColors.black} rounded ${TypeBackgrounds.bgs.HbgGray400} transition`}
          onClick={onClearClick}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchInput;
