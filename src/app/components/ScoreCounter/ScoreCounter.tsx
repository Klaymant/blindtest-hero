import Image from "next/image";
import pointIcon from '../../../../public/premium-badge.png';
import { NumberModifier } from "@/app/utils/NumberModifier";

export function ScoreCounter({ score }: { score: number }) {
  return (
    <p className="text-icon">
      <div className="text-icon-wrapper">
        <Image src={pointIcon} alt="heart" />
        <span className="color-primary">{NumberModifier.separateThousands(score)}</span>
      </div>
    </p>
  );
}