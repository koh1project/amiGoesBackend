import { TranslateTextCommand } from '@aws-sdk/client-translate';
import { translateClient } from '../libs/translateClient';

export const translateText = async (language, text) => {
  const params = {
    SourceLanguageCode: 'auto',
    TargetLanguageCode: language,
    Text: text,
  };

  try {
    const data = await translateClient.send(new TranslateTextCommand(params));
    console.log('Success', data.TranslatedText);
    return data.TranslatedText;
  } catch (err) {
    console.log('Error', err);
  }
};
