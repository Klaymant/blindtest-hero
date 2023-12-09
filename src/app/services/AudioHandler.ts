function AudioHandler() {
  const publicApi = {
    copyAudioElement,
  };

  function copyAudioElement(audio: HTMLAudioElement): HTMLAudioElement {
    const audioCopy = new Audio(audio.src);
  
    audioCopy.muted = audio.muted;
    audioCopy.currentTime = audio.currentTime;
    audioCopy.volume = audio.volume;
    return audioCopy;
  }

  return publicApi;
}

export { AudioHandler };
