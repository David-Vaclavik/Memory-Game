import { useEffect, useState } from "react";

export function Pokemon({ id, setPokemons, setGameState }) {
  const [pokemon, setPokemon] = useState(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  }, [id]);

  if (!pokemon) {
    return (
      <div className="card">
        <button>{/* <p>Loading...</p> */}</button>
      </div>
    );
  }

  // console.log(pokemon);

  function handleClick() {
    console.log(`Clicked ${pokemon.name} with ID: ${id}`);
    let gameOver = false;
    let hasWon = false;

    setPokemons((prev) => {
      const updatedPokemons = prev.map((item) => {
        if (item.id === id) {
          if (item.clicked === true) {
            setGameState("gameOver");
            gameOver = true;
            return item;
          }
          return { ...item, clicked: true };
        }
        return item;
      });

      // Check for win condition
      const clickedCount = updatedPokemons.filter((p) => p.clicked).length;
      if (clickedCount === updatedPokemons.length) {
        setGameState("win");
        hasWon = true;
      }

      // Don't shuffle if gameOver OR won
      if (gameOver || hasWon) return updatedPokemons;

      // Only shuffle during normal gameplay
      return shuffleArray(updatedPokemons);
    });
  }

  //? maybe to utils.js ?
  // Helper function to shuffle array
  function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  return (
    <div className="card">
      <button onClick={handleClick}>
        <img
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          style={{
            width: "192px",
            height: "192px",
            opacity: imageLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
          onLoad={() => setImageLoaded(true)}
        />
        <h2>{pokemon.name}</h2>
      </button>
    </div>
  );
}
