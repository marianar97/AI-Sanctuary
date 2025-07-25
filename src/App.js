import "./App.css";
import HomePage from "./components/HomePage";
import { AppStateProvider } from "./context/AppStateContext";

function App() {
  return (
    <AppStateProvider>
      <div className="App flex-1">
        <HomePage></HomePage>
      </div>
    </AppStateProvider>
  );
}

export default App;
