export interface CardType {
  [key: string]: string | number | undefined;
  type?: string | undefined;
  name?: string | undefined;
  banner?: string | undefined;
  stellacrum?: string | undefined;
  order?: string | undefined;
  time?: string | undefined;
  character?: string | undefined;
  yt_video?: string | undefined;
}

export interface MLQCCardType {
  [key: string]: string | number | undefined;
  name?: string | undefined;
  date?: string | undefined;
  card?: string | undefined;
  character?: string | undefined;
  yt_link?: string | undefined;
  banner?: string | undefined;
  index?: number | undefined;
  viewed?: number | undefined;
}
