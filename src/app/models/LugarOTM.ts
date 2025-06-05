export interface LugarOTM {
  xid: string;
  name: string;
  dist: number;
  rate: number;
  kinds: string;
  point: {
    lat: number;
    lon: number;
  };
}