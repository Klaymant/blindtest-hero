import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";

function ScreenTitle() {
  const { setScreenSelection } = useBlindtestContext();

  function playBlindtest() {
    setScreenSelection('game');
  }

  return (
    <section id="screen-title">
      <div>
        <h2>It's time for you to be a blindtest hero!</h2>
        <p>Challenge yourself on your musical skills by picking the right song in each round.</p>
        <p>When you're good, your goes to the next round, otherwise you lose a life.</p>
        <p>Do your best to reach the biggest round!</p>
        <button type="button" className="game-navigation" onClick={playBlindtest}>Play</button>
      </div>
    </section>
  );
}

export { ScreenTitle };
