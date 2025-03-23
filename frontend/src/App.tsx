import "./App.css";
import { Header } from "./components/header";
import { Router } from "./routes";
import { useLabels } from "./hooks/useLabels";

function App() {
  const { l } = useLabels();

  console.log(l("username"));

  return (
    <main>
      <Header />
      <Router />
    </main>
  );
}

export default App;
