import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";

function GameOver() {
  const { round, setScreenSelection, resetGame } = useBlindtestContext();

  function replay() {
    resetGame();
    setScreenSelection('game');
  }

  return (
    <section id="game-over">
      <div>
        <h2>Game over</h2>
        <p>You reached round <span className="important">{round}</span>! Well done!</p>
        <button type="button" className="game-navigation" onClick={replay}>Play again</button>
      </div>
    </section>
  );
}

export { GameOver };
