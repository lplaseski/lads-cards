import { CardType } from '@/common/types';
import { google } from 'googleapis';

const getSheetData = async () => {
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
    const sheet = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: 'Sheet1',
    });
    if (!sheet) {
      throw new Error('Sheet not found');
    }
    //Function for getting the values
    const values = sheet.data.values || [];
    const keys = values[0];
    const data = values.slice(1).map((row) => {
      const obj: CardType = {};
      keys.forEach((key, index) => {
        obj[key] = row[index];
      });
      return obj;
    });
    return data;
  } catch (error) {
    console.error('Error fetching spreadsheet:', JSON.stringify(error));
    return [];
  }
};

export default getSheetData;
