import { google } from 'googleapis';

export default async function getGoogleSheet(sheet: string) {
  try {
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

    const sheets = google.sheets({ version: 'v4', auth });

    //Function for spreadsheetId
    const spreadsheetId = process.env.CARD_SHEET_ID || '';
    //Function for getting the sheet
    const sheetData = await sheets.spreadsheets.values.get({
      auth,
      spreadsheetId,
      range: sheet,
    });

    return sheetData;
  } catch (error) {
    console.error('Error fetching spreadsheet:', JSON.stringify(error));
    return { data: { values: [] } };
  }
}
