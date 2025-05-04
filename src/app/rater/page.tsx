import getGoogleSheet from '@/api/getGoogleSheet';
import Rater from './components/Rater';
import './Rater.css';

interface CoreDataType {
  stellactrum: string;
  level: number;
  mainstat: string;
  substat1: { attribute: string; value: number };
  substat2: { attribute: string; value: number };
  substat3: { attribute: string; value: number };
  substat4: { attribute: string; value: number };
}
const RaterPage = async () => {
  const sheetData = await getGoogleSheet('protocores'); // Format the data assuming the first row contains keys
  const values = sheetData.data.values || [];
  const keys = values[0];
  const coreData = values.slice(1).map((row) => {
    const obj = {} as Record<string, string>;
    keys.forEach((key, index) => {
      obj[key] = row[index];
    });

    const coreObj = {
      stellactrum: obj['stellactrum'],
      level: Number(obj['level']),
      mainstat: obj['mainstat'],
      type: obj['type'],
      substat1: {
        attribute: obj.stat_1_name,
        value: Number(obj.stat_1_value),
      },
      substat2: {
        attribute: obj.stat_2_name,
        value: Number(obj.stat_2_value),
      },
      substat3: {
        attribute: obj.stat_3_name,
        value: Number(obj.stat_3_value || 0),
      },
      substat4: {
        attribute: obj.stat_4_name,
        value: Number(obj.stat_4_value || 0),
      },
    } as CoreDataType;
    return coreObj;
  });

  return <Rater data={coreData} />;
};

export default RaterPage;
