// src/translationService.js
import axios from 'axios';

const translateText = async (text, targetLanguage) => {
  const url = 'https://libretranslate.com/translate';

  try {
    const response = await axios.post(url, {
      q: text,
      source: 'en',
      target: targetLanguage,
      format: 'text'
    });

    return response.data.translatedText;
  } catch (error) {
    console.error('Error translating text:', error);
    return text;
  }
};

export default translateText;