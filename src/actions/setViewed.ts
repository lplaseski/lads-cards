'use server';

import { google } from 'googleapis';

const setViewed = async (sheet: string, index: number, viewed: number) => {
  const encodedKey = Buffer.from(
    process.env.GOOGLE_KEY || '',
    'base64'
  ).toString();
  const keyFile = JSON.parse(encodedKey);

  //Function for authentication object
  const auth = new google.auth.GoogleAuth({
    credentials: keyFile,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  try {
    const sheets = google.sheets({ version: 'v4', auth });
    //Function for spreadsheetId
    const spreadsheetId = process.env.CARD_SHEET_ID || '';
    //Function for getting the sheet
    await sheets.spreadsheets.values.update({
      auth,
      spreadsheetId,
      range: `${sheet}!G${index + 2}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [[viewed]],
      }
    });
    if (!sheet) {
      throw new Error('Sheet not found');
    }
    return true;
  } catch (error) {
    console.error('Error updating spreadsheet:', error, JSON.stringify(error));
    throw new Error('Error updating spreadsheet');
  }
};

export default setViewed;
