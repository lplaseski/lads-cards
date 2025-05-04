import getGoogleSheet from '@/api/getGoogleSheet';
import { CardType, MLQCCardType } from '@/common/types';

const getSheetData = async (sheet: string) => {
  const sheetData = await getGoogleSheet(sheet); // Format the data assuming the first row contains keys
  const values = sheetData.data.values || [];
  const keys = values[0];
  const data = values.slice(1).map((row) => {
    let obj;
    if (sheet === 'Sheet3') {
      obj = {} as MLQCCardType;
    } else {
      obj = {} as CardType;
    }
    keys.forEach((key, index) => {
      obj[key] = row[index];
    });
    return obj;
  });
  return data;
};

export default getSheetData;
