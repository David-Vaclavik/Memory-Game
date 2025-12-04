import { useRef, useState } from "react";
import type { GameState } from "./MainContent";
import { shuffleArray } from "../utils/shuffleArray";

export interface PokemonApiData {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface Pokemon {
  id: number;
  clicked: boolean;
  data: PokemonApiData | null;
}

interface PokemonProps {
  pokemon: Pokemon;
  setPokemons: React.Dispatch<React.SetStateAction<Pokemon[]>>;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  handleImageLoad: (id: number) => void;
  allImagesReady: boolean;
}

export function Pokemon({
  pokemon,
  setPokemons,
  setGameState,
  handleImageLoad,
  allImagesReady,
}: PokemonProps) {
  // const [imageLoaded, setImageLoaded] = useState(false);
  const hasLoadedRef = useRef(false);

  const handleClick = () => {
    //! console.log(`Clicked ${pokemon.data.name} with ID: ${pokemon.id}`)

    setPokemons((prev) => {
      let gameOver = false;

      const updatedPokemons = prev.map((item) => {
        if (item.id === pokemon.id) {
          if (item.clicked === true) {
            setGameState("gameOver");
            gameOver = true;
          }

          return { ...item, clicked: true };
        }

        return item;
      });

      // Check for win condition
      const clickedCount = updatedPokemons.filter((p) => p.clicked).length;
      if (clickedCount === updatedPokemons.length) {
        setGameState("win");
        return updatedPokemons;
      }

      // Don't shuffle if gameOver OR won
      if (gameOver) return updatedPokemons;

      // Only shuffle during normal gameplay
      return shuffleArray(updatedPokemons);
    });
  };

  const handleImageLoadComplete = () => {
    // check if already loaded with onLoad
    if (hasLoadedRef.current) {
      console.log(`Ignoring duplicate load for ${pokemon.id}`);
      return;
    }

    console.log(`First load for ${pokemon.id}`);
    hasLoadedRef.current = true;
    handleImageLoad(pokemon.id);
  };

  // Add null check - don't render if data isn't loaded yet
  if (!pokemon.data) return null;

  return (
    <div className="card">
      <button onClick={handleClick}>
        <img
          src={pokemon.data.sprites.front_default}
          alt={pokemon.data.name}
          style={{
            width: "192px",
            height: "192px",
            opacity: allImagesReady === true ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
          onLoad={handleImageLoadComplete}
        />
        <h2>{pokemon.data.name}</h2>
      </button>
    </div>
  );
}
