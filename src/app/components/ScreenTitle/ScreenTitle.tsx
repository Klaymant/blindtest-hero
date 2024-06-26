import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import './ScreenTitle.css';

function ScreenTitle() {
  const { setScreenSelection } = useBlindtestContext();

  function playBlindtest() {
    setScreenSelection('game');
  }

  return (
    <section id="screen-title">
      <div>
        <h2>It&apos;s time for you to be a blindtest hero!</h2>
        <p>Challenge yourself on your musical skills by <span className="important">picking the right song in each round.</span></p>
        <p>When <span className="important">you&apos;re good</span>, you earn points depending on the remaining time, otherwise you lose a life.</p>
        <p>The game stops when you run out of lives. Do your best to <span className="important">reach the biggest score</span>!</p>
        <button type="button" className="game-navigation" onClick={playBlindtest}>Play</button>
      </div>
    </section>
  );
}

export { ScreenTitle };
