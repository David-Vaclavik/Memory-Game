import { Pokemon } from "./Cards.jsx";
import { Score } from "./Score.jsx";
import { Modal } from "./Modal.jsx";
import { useState } from "react";

function generateUniqueIds(count, max) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * max) + 1);
  }
  return Array.from(ids);
}

function MainContent() {
  const pokemonsCount = 12;

  const generateInitialState = () => {
    const uniqueIds = generateUniqueIds(pokemonsCount, 386);
    return uniqueIds.map((id) => ({
      id: id,
      clicked: false,
    }));
  };

  const [pokemons, setPokemons] = useState(generateInitialState());
  const [gameState, setGameState] = useState("playing");
  const [gameKey, setGameKey] = useState(0);

  const handleRestart = () => {
    setPokemons(generateInitialState());
    setGameState("playing");
    setGameKey((prev) => prev + 1);
  };

  // const closeModal = () => {
  //   setGameState("playing");
  // };

  return (
    <main>
      {/* <div className="controls">
        <button onClick={handleRestart}>Restart</button>
      </div> */}

      <Score pokemons={pokemons} />

      <div className="card-container">
        {pokemons.map((pokemon) => {
          return (
            <Pokemon
              key={`${pokemon.id}-${gameKey}`}
              id={pokemon.id}
              setPokemons={setPokemons}
              setGameState={setGameState}
            />
          );
        })}
      </div>

      {/* //? maybe remove since we have modal? */}
      {gameState === "gameOver" ? <h1>Game Over!</h1> : null}
      {gameState === "win" ? <h1>You Win!!!</h1> : null}

      <Modal isOpen={gameState === "gameOver"} title="Game Over!">
        <p>You clicked a Pokémon twice!</p>
        <button onClick={handleRestart}>Try Again</button>
      </Modal>

      <Modal isOpen={gameState === "win"} title="Congratulations!">
        <p>🎉 You caught all the Pokémon! 🎉</p>
        <p>Great memory skills!</p>
        <button onClick={handleRestart}>Play Again</button>
      </Modal>
    </main>
  );
}

export { MainContent };
