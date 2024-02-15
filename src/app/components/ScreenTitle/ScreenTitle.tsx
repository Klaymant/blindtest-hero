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
        <p>Challenge yourself on your musical skills by <span className="important">picking the right song in each round.</span></p>
        <p>When <span className="important">you're good</span>, you go to the <span className="important">next round</span>, otherwise you lose a life.</p>
        <p>Do your best to <span className="important">reach the biggest round</span>!</p>
        <button type="button" className="game-navigation" onClick={playBlindtest}>Play</button>
      </div>
    </section>
  );
}

export { ScreenTitle };
