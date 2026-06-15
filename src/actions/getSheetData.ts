import getGoogleSheet from '@/api/getGoogleSheet';
import { CardType } from '@/common/types';

const getSheetData = async (sheet: string) => {
  const sheetData = await getGoogleSheet(sheet); // Format the data assuming the first row contains keys
  const values = sheetData.data.values || [];
  const keys = values[0];
  const data = values.slice(1).map((row) => {
    const obj = {} as CardType;
    keys.forEach((key, index) => {
      obj[key] = row[index];
    });
    return obj;
  });
  return data;
};

export default getSheetData;
