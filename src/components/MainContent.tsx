import { Pokemon } from "./Cards.tsx";
import { Score } from "./Score.tsx";
import { Modal } from "./Modal.tsx";
import { useState, useEffect, useRef } from "react";
import { generateInitialState } from "../utils/pokemonUtils.ts";
import { useFetchPokemons } from "../hooks/useFetchPokemons.ts";

export type GameState = "loading" | "playing" | "gameOver" | "win" | "error";

function MainContent() {
  const [gameKey, setGameKey] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0); // Counter for how many images have loaded
  const [allImagesReady, setAllImagesReady] = useState(false); // Flag for when all images are loaded
  const loadedIdsRef = useRef<Set<number>>(new Set());

  const pokemonsCount = 12; // Total number of Pokemon cards in the game
  const { gameState, setGameState, pokemons, setPokemons } = useFetchPokemons(
    gameKey,
    pokemonsCount
  );

  // console.log(pokemons); //!

  // Callback function passed to each Pokemon component
  // Called when an individual image finishes loading - onLoad
  const handleImageLoad = (pokemonId: number) => {
    // console.log(
    //   `Image load called for ID: ${pokemonId}, already loaded:`,
    //   loadedIdsRef.current.has(pokemonId)
    // );
    if (!loadedIdsRef.current.has(pokemonId)) {
      loadedIdsRef.current.add(pokemonId);
      setImagesLoaded(loadedIdsRef.current.size);
      console.log(`Total loaded: ${loadedIdsRef.current.size}`);

      //* Check if all images are loaded using the Set size
      if (loadedIdsRef.current.size >= pokemonsCount && gameState === "playing") {
        setAllImagesReady(true);
      }
    }
  };

  // Restarts the game by incrementing gameKey
  // This triggers the useEffect that fetches new pokemon
  const handleRestart = () => {
    setGameState("loading");
    setImagesLoaded(0);
    setAllImagesReady(false);
    loadedIdsRef.current = new Set(); //? Reset on new game

    setGameKey((prev) => prev + 1);
  };

  if (gameState === "error") {
    return (
      <main>
        <h1>Error loading Pokémon. Please refresh.</h1>
      </main>
    );
  }

  return (
    <main>
      <Score pokemons={pokemons} />

      {!allImagesReady && gameState === "playing" && (
        <h2>
          Loading images... {imagesLoaded}/{pokemonsCount}
        </h2>
      )}

      {gameState === "loading" && <h2>Loading Pokémon data...</h2>}

      <div className="card-container">
        {pokemons.map((pokemon) => {
          if (!pokemon.data) return null;

          return (
            <Pokemon
              key={`${pokemon.id}-${gameKey}`} // Unique key ensures re-mount on restart
              pokemon={pokemon} // Pass entire pokemon object
              setPokemons={setPokemons}
              setGameState={setGameState}
              handleImageLoad={handleImageLoad} // Callback when image loads
              allImagesReady={allImagesReady} // Boolean to control opacity transition
            />
          );
        })}
      </div>

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
