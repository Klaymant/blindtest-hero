import { VolumeIcon } from "./VolumeIcon";
import volumeIcon from '../../../public/volume.png';
import muteIcon from '../../../public/mute.png';

export function AudioControls({ audioPreview, mute, changeVolume }: Props) {
  return (
    <section id="audio-controls">
      <button
        type="button"
        className="option"
        onClick={mute}
      >
        {audioPreview?.muted ?
          <VolumeIcon src={muteIcon} alt="mute icon" /> :
          <VolumeIcon src={volumeIcon} alt="volume icon" />
        }
      </button>
      <input
        type="range"
        min="0"
        max="100"
        step="1"
        value={(audioPreview?.volume || 0) * 100}
        onChange={changeVolume}
      />
    </section>
  );
}

type Props = {
  audioPreview: HTMLAudioElement | undefined;
  mute: () => void;
  changeVolume: (event: React.ChangeEvent<HTMLInputElement>) => void;
}