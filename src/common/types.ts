export interface CardType {
  [key: string]: string | number | undefined;
  type?: string | undefined;
  name?: string | undefined;
  banner?: string | undefined;
  stellacrum?: string | undefined;
  order?: string | undefined;
  release_date?: string | undefined;
  time?: string | undefined;
  character?: string | undefined;
  yt_video?: string | undefined;
}

export interface StatsType {
  [key: string]: string | number | undefined;
  name?: string | undefined;
  stellacrum?: string | undefined;
  time?: string | undefined;
  character?: string | undefined;
  stars?: string | undefined;
  owner?: string | undefined;
  level?: string | undefined;
  release?: string | undefined;
}
