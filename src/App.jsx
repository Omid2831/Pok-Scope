import PokScope from "./PokScope";
import "./App.css";
import ThemeProvider from "./context/ThemeProvider";
import ToggleMode from "./components/ToggleMode";

function App() {
  return (
    <ThemeProvider>
      <div style={{ position: "absolute", top: 10, right: 10 }}>
        <ToggleMode />
      </div>
      <PokScope />
    </ThemeProvider>
  );
}
export default App;
