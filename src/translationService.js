// translationService.js
import axios from 'axios';

const translateText = async (text, targetLanguage) => {
  if (targetLanguage === 'en') {
    return text; // If the target language is English, return the original text
  }

  try {
    const response = await axios.get('https://api.mymemory.translated.net/get', {
      params: {
        q: text,
        langpair: `en|${targetLanguage}`
      }
    });
    return response.data.responseData.translatedText;
  } catch (error) {
    console.error('Translation error:', error);
    return text; // Fallback to original text in case of error
  }
};

export default translateText;
