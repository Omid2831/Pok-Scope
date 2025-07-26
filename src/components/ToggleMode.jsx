import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider";
import "./ToggleMode.css";
import TypeBackgrounds from "../utils/TypeBackgrounds";

function ToggleMode() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    {/* giving the button on the screen */},
    <button 
      onClick={toggleTheme}
      className={`${TypeBackgrounds.toggleModeBadge}`}
    >
      {theme === "light" ? "🌙 " : "☀️ "}
    </button>
  );
}

export default ToggleMode;
