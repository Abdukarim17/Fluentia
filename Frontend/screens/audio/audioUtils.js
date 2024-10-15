// utils/audioUtils.js

export const uploadAudioToBackend = async (audioFilePath) => {
    const formData = new FormData();
    formData.append('file', {
      uri: audioFilePath,
      name: 'user_audio.mp3',
      type: 'audio/mpeg',
    });
  
    try {
      const response = await fetch('YOUR_BACKEND_API_URL/upload_audio', {
        method: 'POST',
        body: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      const result = await response.json();
      return result.audioFileUri;  // Return the URI of the AI's response audio file
    } catch (error) {
      console.error('Error uploading audio:', error);
    }
  };
  