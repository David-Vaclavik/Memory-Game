import { useState } from "react";

interface Pokemon {
  id: number;
  clicked: boolean;
  data: any;
}

interface ScoreProps {
  pokemons: Pokemon[];
}

function Score({ pokemons }: ScoreProps) {
  const clickedCount = pokemons.filter((pokemon) => pokemon.clicked === true).length;
  const [highScore, setHighScore] = useState<number>(0);

  if (clickedCount > highScore) setHighScore(clickedCount);

  //! setHighScore("s");

  return (
    <div className="score">
      <h1>Score: {clickedCount}</h1>
      <h1>High Score: {highScore}</h1>
    </div>
  );
}

export { Score };
