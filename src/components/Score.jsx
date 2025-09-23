import { useState } from "react";

function Score({ pokemons }) {
  const clickedCount = pokemons.filter((pokemon) => pokemon.clicked === true).length;
  const [highScore, setHighScore] = useState(0);

  if (clickedCount > highScore) setHighScore(clickedCount);

  return (
    <div className="score">
      <h1>Score: {clickedCount}</h1>
      <h1>High Score: {highScore}</h1>
    </div>
  );
}

export { Score };
