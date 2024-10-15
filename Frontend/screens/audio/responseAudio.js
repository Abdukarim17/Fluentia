import Sound from 'react-native-sound';

export const playAudio = (audioUri) => {
  const sound = new Sound(audioUri, Sound.MAIN_BUNDLE, (error) => {
    if (error) {
      console.log('Failed to load sound', error);
      return;
    }
    sound.play((success) => {
      if (!success) {
        console.log('Playback failed');
      }
    });
  });
};
