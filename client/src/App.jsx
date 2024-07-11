import { useState } from "react";
import Hero from "./components/Hero";
import Game from "./components/Game";
import "./styles/main.scss";

function App() {
  const [activeGame, setActiveGame] = useState(false);

  return (
    <>
      {}
      {activeGame ? <Game /> : <Hero setActiveGame={setActiveGame} />}
    </>
  );
}

export default App;
