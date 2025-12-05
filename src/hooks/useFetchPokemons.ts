import { useEffect, useState } from "react";
import { generateInitialState } from "../utils/pokemonUtils";
import type { GameState } from "../components/MainContent";

export function useFetchPokemons(gameKey: number, pokemonsCount: number) {
  const [pokemons, setPokemons] = useState(() => generateInitialState(pokemonsCount)); // Array of pokemon objects
  const [gameState, setGameState] = useState<GameState>("loading");

  // Effect: Fetches all pokemon data when component mounts or game restarts
  // Runs whenever 'gameKey' changes (on restart)
  // console.log("handleRestart started TOP level");
  useEffect(() => {
    let cancelled = false; // Cancellation flag
    // console.log("useFetchPokemons started in useEffect");

    const fetchAllPokemons = async () => {
      // initValues(); - set in handleRestart

      // Generate new pokemon IDs for this game
      const initialState = generateInitialState(pokemonsCount);

      // Create array of fetch promises for all pokemon
      // Fetches all pokemon data in parallel
      const pokemonPromises = initialState.map((pokemon) =>
        fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.id}`).then((res) => res.json())
      );

      try {
        const pokemonDataArray = await Promise.all(pokemonPromises);

        // Only update state if not cancelled
        if (cancelled) return;

        // Merge fetched data with initial state structure
        const pokemonsWithData = initialState.map((pokemon, index) => ({
          ...pokemon,
          data: pokemonDataArray[index], //! Add fetched Pokemon data
        }));
        console.log(pokemonsWithData);

        // Update state with pokemon that now have data
        setPokemons(pokemonsWithData);
        setGameState("playing");
      } catch (error) {
        console.error("Failed to fetch pokemon:", error);
        setGameState("error");
      } finally {
        // This runs whether try succeeds or catch runs
        // Good for cleanup like hiding loading spinners
        console.log("Fetch attempt completed");
      }
    };

    fetchAllPokemons();

    // Cleanup function - runs when effect re-runs or component unmounts
    return () => {
      cancelled = true;
    };
  }, [gameKey]); // Only re-run when gameKey changes (on restart)

  return { gameState, setGameState, pokemons, setPokemons };
}
