import "./App.css";
import { Header } from "./components/header";
import { Router } from "./routes";

function App() {
  return (
    <main>
      <Header />
      <Router />
    </main>
  );
}

export default App;
