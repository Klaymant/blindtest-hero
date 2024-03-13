import { LivesCounter } from '../GameSession/GameSession';
import './RoundBreak.css';

export function RoundBreak({ round, lives }: Props) {
  return (
    <div id="round-break">
      <div>
        <section>
          <h2 key={round}>Round <span className="appear">{round}</span></h2>
          <LivesCounter lives={lives} />
        </section>
      </div>
    </div>
  );
}

type Props = {
  round: number;
  lives: number;
};
