import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
@Injectable({
  providedIn: 'root'
})
/* 
  Servicio para obtener la ubicación GPS del dispositivo. 
  Utilizo la libreria Geolocation de Capacitor.
*/
export class GpsLocationService {

  constructor(public geolocation: Geolocation) { }


  /* Obtiene la posicion actual del dispositivo. usamos async await porque la funcion getCurrentPosition() devuelve una promesa
   */
  async miPosicion(): Promise<{ latitude: number; longitude: number }> {
    try {



      const position = await Geolocation.getCurrentPosition();

      console.log('Posicion actual: ', position);

      const { latitude, longitude } = position.coords;
      return { latitude, longitude };

    } catch (error) {
      console.error('Error en el service al tratar de encontrar la ubicación:', error);
      throw error;
    }
  }
}
