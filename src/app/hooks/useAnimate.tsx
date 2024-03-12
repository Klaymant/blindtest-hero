import { useRef } from "react";

export function useAnimate(animationName: string): [React.RefObject<HTMLElement>, () => void] {
  const ref = useRef<HTMLElement>(null);

  function animationCallback() {
    ref?.current?.classList?.add(animationName);
    ref?.current?.addEventListener('animationend', () => {
      ref?.current?.classList?.remove(animationName);
    });

    return () => {
      ref?.current?.classList?.remove(animationName);
    };
  }

  return [ref, animationCallback];
}