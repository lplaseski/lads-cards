import {
  buildList,
  companionList,
  levelList,
  mainstatList,
  stellactrumList,
  substatList,
} from './constants';

export type Stellactrum = (typeof stellactrumList)[number];

export type Build = keyof typeof buildList;

export type Level = (typeof levelList)[number];

export type Companion = (typeof companionList)[number];

export type MainStat = (typeof mainstatList)[number];

export type SubStat = (typeof substatList)[number];

interface CoreSubStat {
  attribute: SubStat['attribute'];
  value: number;
}

export interface Core {
  stellactrum: Stellactrum;
  type: string;
  level: Level;
  mainstat: MainStat['attribute'];
  substat1: CoreSubStat;
  substat2: CoreSubStat;
  substat3?: CoreSubStat;
  substat4?: CoreSubStat;
}
