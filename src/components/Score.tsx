import { useState } from "react";
import type { Pokemon } from "./Cards";

interface ScoreProps {
  pokemons: Pokemon[];
}

function Score({ pokemons }: ScoreProps) {
  const [highScore, setHighScore] = useState<number>(0);
  const clickedCount = pokemons.filter((pokemon) => pokemon.clicked === true).length;

  if (clickedCount > highScore) setHighScore(clickedCount);

  return (
    <div className="score">
      <h1>Score: {clickedCount}</h1>
      <h1>High Score: {highScore}</h1>
    </div>
  );
}

export { Score };
