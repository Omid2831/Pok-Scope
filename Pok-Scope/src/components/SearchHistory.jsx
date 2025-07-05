import "./SearchHistory.css";
import TypeColors from "../utils/typeColors";
import TypeBackgrounds from "../utils/TypeBackgrounds";

 function HistoryList({ history, onSelect }) {
  if (history.length === 0) return null;
  return (
    <div className="text-center space-y-2">
      <h3 className={`text-sm ${TypeColors.gray}`}>Recent Searches</h3>
      <div className="flex flex-wrap justify-center gap-2">
        {history.map((term) => (
          <button
            key={term}
            onClick={() => onSelect(term)}
            className={`px-3 py-1 ${TypeBackgrounds.bgs.gray} rounded text-sm ${TypeBackgrounds.bgs.HbgGray}`}
          >
            {term}
          </button>
        ))}
      </div>
    </div>
  );
}

export default HistoryList;