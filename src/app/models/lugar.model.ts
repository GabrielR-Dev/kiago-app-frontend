export interface Lugar {
  id: number;
  name: string;
  address: string;
  category: string;
  company: string | null;
  createdBy: string;
  description: string;
  latitude: number;
  longitude: number;
}
