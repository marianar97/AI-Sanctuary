import "./App.css";
import HomePage from "./components/HomePage";
import { ResourceProvider } from "./context/ResourceContext";
import { TagProvider } from "./context/TagContext";

function App() {
  return (
    <TagProvider>
      <ResourceProvider>
        <div className="App flex-1">
          <HomePage></HomePage>
        </div>
      </ResourceProvider>
    </TagProvider>
  );
}

export default App;
