import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Lugar {
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

@Injectable({
  providedIn: 'root'
})
export class ProviderLugaresService {
 
  
  constructor(public http : HttpClient) { }

  verLuagares() {
    return this.http.get<Lugar[]>('http://localhost:8080/api/places');
  }

  verLugar(id: number): Observable<Lugar> {
    return this.http.get<Lugar>(`http://localhost:8080/api/places/${id}`);
  }

  verComentarios(idPlace: any): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/comments/place/${idPlace}`);
  }

  verFotos(idPlace: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/api/photos/${idPlace}`);
  }

}
