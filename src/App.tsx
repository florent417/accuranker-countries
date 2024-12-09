import { Header } from "./components/Header";
import { CountriesList } from "./views/CountriesList";
function App() {
  return (
    <div style={{ display: "flex" }}>
      <Header />
      <CountriesList />
    </div>
  );
}

export default App;
