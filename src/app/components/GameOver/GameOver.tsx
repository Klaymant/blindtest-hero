import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import './GameOver.css';
import { NumberModifier } from "@/app/utils/NumberModifier";

function GameOver() {
  const { score, setScreenSelection, resetGame } = useBlindtestContext();

  function replay() {
    resetGame();
    setScreenSelection('game');
  }

  return (
    <section id="game-over">
      <div>
        <h2>Game over</h2>
        <p>You reached a score of</p>
        <p id="score">{NumberModifier.separateThousands(score)}</p>
        <p>Well done!</p>
        <button type="button" className="game-navigation" onClick={replay}>Play again</button>
      </div>
    </section>
  );
}

export { GameOver };
