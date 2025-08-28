import TypeBackgrounds from "../utils/TypeBackgrounds";
import TypeColors from "../utils/typeColors";
import LoadingSpinner from "./LoadingSpinner";

{
  /**
   * SearchInput component provides a controlled text input with Search and Clear buttons.
   *
   * Props:
   * - searchTerm (string): Current input value
   * - onChange (function): Callback fired when input value changes
   * - onKeyDown (function): Callback fired on key press inside input (e.g., Enter key)
   * - onSearchClick (function): Callback fired when Search button is clicked
   * - onClearClick (function): Callback fired when Clear button is clicked
   * - hasError (boolean): Flag to show error styles if input validation fails
   */
}
function SearchInput({
  searchTerm,
  onChange,
  onKeyDown,
  onSearchClick,
  onClearClick,
  hasError,
  isSearching,
}) {
  return (
    <div className="flex items-center space-x-2">
       {/* Text input field with dynamic border and focus styles based on error state */}
      <input
        type="text"
        value={searchTerm}
        onChange={onChange}
        onKeyDown={onKeyDown}
        placeholder="Search Pokémon..."
        className={`flex-1 px-4 py-2 border ${
          hasError
            ? TypeBackgrounds.borders.borderRed
            : TypeBackgrounds.borders.borderGray
        } rounded ${TypeBackgrounds.focuses.focusOutlineNone} ${
          TypeBackgrounds.focuses.focusRing2
        } ${
          hasError
            ? TypeBackgrounds.focuses.focusRingRed
            : TypeBackgrounds.focuses.focusRingBlue
        }`}
      />
      {/* Search button with blue background and white text */}
      <button
        className={`px-4 py-2 ${TypeBackgrounds.bgs.pink} ${TypeColors.white} rounded ${TypeBackgrounds.bgs.HbgPink} ${TypeBackgrounds.searchButton}`}
        onClick={onSearchClick}
        disabled={isSearching}
      >
        {isSearching ? (
          <LoadingSpinner/>
        ):(
          "Search"
        )}
      </button>
      {/* Clear button appears only if there is some input */}
      {searchTerm && (
        <button
          className={`px-3 py-2 ${TypeBackgrounds.bgs.gray300} ${TypeColors.black} rounded ${TypeBackgrounds.bgs.HbgGray400} ${TypeBackgrounds.searchButton}`}
          onClick={onClearClick}
        >
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchInput;
