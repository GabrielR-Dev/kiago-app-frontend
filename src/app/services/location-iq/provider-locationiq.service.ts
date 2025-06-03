import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProviderLocationiqService {

  constructor(private http : HttpClient) { }

  private latI! : number;
  private lngI! : number;
  private latF! : number;
  private lngF! : number;
  private apiKey = 'pk.d43a155e214a7ca6a1b6b41cd30d76be';

  private urlRouter = 'https://us1.locationiq.com/v1/directions/driving/-0.12070277,51.514156;-0.12360937,51.507996?key=Your_API_Access_Token&steps=true&alternatives=true&geometries=polyline&overview=full&geometries=geojson';


  public ruter(latI: number, lngI: number, latF: number, lngF: number) {
    const url = `https://us1.locationiq.com/v1/directions/driving/${lngI},${latI};${lngF},${latF}?key=${this.apiKey}&steps=true&alternatives=true&geometries=polyline&overview=full&geometries=geojson`;
    return this.http.get(url);
  }

  public obtenerDistancia(latI: number, lngI: number, latF: number, lngF: number) {
    const url = `https://us1.locationiq.com/v1/directions/driving/${lngI},${latI};${lngF},${latF}?key=${this.apiKey}&overview=false`;
    return this.http.get(url);
  }



}
