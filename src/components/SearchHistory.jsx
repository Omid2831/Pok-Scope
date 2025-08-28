import TypeColors from "../utils/typeColors";
import TypeBackgrounds from "../utils/TypeBackgrounds";

/**
 * SearchHistory component renders a list of recent search terms as clickable buttons.
 *
 * @param {Array} history - Array of strings representing previous search terms.
 * @param {Function} onSelect - Callback function triggered when a search term is clicked.
 *
 * Renders nothing if the history array is empty.
 */
function SearchHistory({ history, onSelect }) {
  // Return null if there are no recent searches to display
  if (history.length === 0) return null;

  return (
    <div className="text-center space-y-2">
      {/* Section title with subtle background color */}
      <h3 className={`text-sm ${TypeColors.HbgGray}`}>Recent Searches</h3>

      {/* Container for search term buttons, wraps with spacing */}
      <div className="flex flex-wrap justify-center gap-2">
        {/* Map over history array and render each term as a button */}
        {history.map((term) => (
          <button
            key={term}                 // Use term as unique key assuming terms are unique
            onClick={() => onSelect(term)}  // When clicked, call onSelect callback with term
            className={`px-3 py-1 ${TypeBackgrounds.bgs.gray} rounded text-sm ${TypeBackgrounds.bgs.HbgGray} ${TypeColors.black}`}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SearchHistory;
