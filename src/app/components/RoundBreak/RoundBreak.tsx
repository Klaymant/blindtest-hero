import { LivesCounter } from '../GameSession/GameSession';
import { ScoreCounter } from '../ScoreCounter/ScoreCounter';
import './RoundBreak.css';

export function RoundBreak({ round, lives, score }: Props) {
  return (
    <div id="round-break">
      <div>
        <section>
          <h2 key={round}>Round <span className="appear">{round}</span></h2>
          <ScoreCounter score={score} />
          <LivesCounter lives={lives} />
        </section>
      </div>
    </div>
  );
}

type Props = {
  round: number;
  lives: number;
  score: number;
};
