import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";

function ScreenTitle() {
  const { setScreenSelection } = useBlindtestContext();

  function playBlindtest() {
    setScreenSelection('game');
  }

  return (
    <section id="screen-title">
      <button type="button" onClick={playBlindtest}>Play</button>
    </section>
  );
}

export { ScreenTitle };
