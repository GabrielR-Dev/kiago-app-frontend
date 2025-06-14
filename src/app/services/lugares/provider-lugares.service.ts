import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LugarOTM } from 'src/app/models/LugarOTM';

@Injectable({
  providedIn: 'root'
})
export class ProviderLugaresService {
  private apiKey = '5ae2e3f221c38a28845f05b6bbdc2458cdb09706420c747fa278f746';
  private baseUrl = 'https://api.opentripmap.com/0.1/en/places/radius';
  private detailsUrl = 'https://api.opentripmap.com/0.1/en/places/xid';


  constructor(public http: HttpClient) { }

  // Obtener lugares cercanos usando OpenTripMap
  verLuagares(lat: number = -34.60346, lon: number = -58.38139, radius: number = 300, limit: number = 1000): Observable<LugarOTM[]> {

    const url = `${this.baseUrl}?radius=${radius}&lon=${lon}&lat=${lat}&rate=2&limit=${limit}&format=json&apikey=${this.apiKey}`;
    return this.http.get<LugarOTM[]>(url);
  }

  verLuagaresCercanos(lat: number, lon: number): Observable<LugarOTM[]> {
    const radius = 30000;
    const limit = 1000;
    const url = `${this.baseUrl}?radius=${radius}&lon=${lon}&lat=${lat}&rate=2&limit=${limit}&format=json&apikey=${this.apiKey}`;
    return this.http.get<LugarOTM[]>(url);
  }

  // Obtener detalles de un lugar por xid
  verLugarDetalle(xid: string) {
    return this.http.get<any>(`${this.detailsUrl}/${xid}?apikey=${this.apiKey}`);
  }

  getDetallesLugar(xid: string): Observable<any> {
    const url = `${this.detailsUrl}/${xid}?apikey=${this.apiKey}`;
    return this.http.get(url);
  }

  lugaresFiltrados(lat: number, lon: number, filtro: string) {
    const limit = 50;
    const url = `${this.baseUrl}?radius=10000&lat=${lat}&lon=${lon}&kinds=${filtro}&format=json&apikey=${this.apiKey}`;
    return this.http.get<LugarOTM[]>(url);
  }
  
}

