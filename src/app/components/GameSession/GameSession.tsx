import { useBlindtestContext } from "@/app/contexts/BlindtestProvider";
import TrackDisplay from "../TrackDisplay/TrackDisplay";

function GameSession() {
  const { score, lives } = useBlindtestContext();

  return (
    <>
      <section id="play-data">
        <p id="score">Score: <span>{score}</span></p>
        <p id="lives">Lives: <span>{lives}</span></p>
      </section>
      <TrackDisplay />
    </>
  )
}

export { GameSession };
