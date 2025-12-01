import { useState } from "react";

export function Pokemon({ pokemon, setPokemons, setGameState, onImageLoad, showImage }) {
  const [imageLoaded, setImageLoaded] = useState(false);

  function handleClick() {
    console.log(`Clicked ${pokemon.data.name} with ID: ${pokemon.id}`);
    let gameOver = false;
    let hasWon = false;

    setPokemons((prev) => {
      const updatedPokemons = prev.map((item) => {
        if (item.id === pokemon.id) {
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

  const handleImageLoadComplete = () => {
    if (!imageLoaded) {
      setImageLoaded(true);
      onImageLoad();
    }
  };

  return (
    <div className="card">
      <button onClick={handleClick}>
        <img
          src={pokemon.data.sprites.front_default}
          alt={pokemon.data.name}
          style={{
            width: "192px",
            height: "192px",
            opacity: showImage && imageLoaded ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
          onLoad={handleImageLoadComplete}
        />
        <h2>{pokemon.data.name}</h2>
      </button>
    </div>
  );
}
