import Image, { StaticImageData } from "next/image";

export function VolumeIcon({ src, alt }: VolumeIconProps) {
  return <Image src={src} width={12} height={12} alt={alt} />;
}

type VolumeIconProps = {
  src: StaticImageData;
  alt: string;
};