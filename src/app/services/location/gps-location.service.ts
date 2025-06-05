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
    // Soporte web: usar navigator.geolocation si NO está disponible Capacitor.getCurrentPosition
    if (typeof Geolocation.getCurrentPosition === 'function' && !(window as any).Capacitor?.isNativePlatform?.() ) {
      // Estamos en web y la API de Capacitor no está implementada, usar navigator.geolocation
      if (navigator.geolocation) {
        return new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            },
            (error) => {
              console.error('Error en el service al tratar de encontrar la ubicación (Web):', error);
              reject(error);
            }
          );
        });
      } else {
        throw new Error('Geolocalización no soportada en este navegador.');
      }
    } else {
      // Usar Capacitor solo si está implementado y es nativo
      try {
        const position = await Geolocation.getCurrentPosition();
        const { latitude, longitude } = position.coords;
        return { latitude, longitude };
      } catch (error) {
        console.error('Error en el service al tratar de encontrar la ubicación (Capacitor):', error);
        throw error;
      }
    }
  }
}
