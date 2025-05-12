import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { GpsLocationService } from '../service/gps-location.service';

@Component({
  selector: 'app-menu-mapa',
  templateUrl: './menu-mapa.page.html',
  styleUrls: ['./menu-mapa.page.scss'],
  standalone: false,
})
export class MenuMapaPage implements OnInit {
  private map: L.Map | undefined;

  constructor(private gpsLocationService: GpsLocationService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.loadMap();
  }

  private lat = -34.61; // Latitud de Buenos Aires
  private lng = -58.38; // Longitud de Buenos Aires
  private primeraEntrada: boolean = true;
  private marcador: L.CircleMarker | undefined;


  async loadMap() {

    this.map = L.map('map').setView([this.lat, this.lng], 13); //Ubicar en Buenos Aires por defecto

    // Cargar el mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Asegurarse de que el mapa se ajuste al contenedor
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

    // Obtener la ubicación del usuario
    setInterval(() => {
      this.getUserLocation();
    }, 5000);
  }


  // Metodo para obtener la ubicación del usuario y centra el mapa
  async getUserLocation() {
    try {
      const { latitude, longitude } = await this.gpsLocationService.miPosicion();
      console.log('Ubicación del usuario:', latitude, longitude);


      const permiso = await navigator.permissions.query({ name: 'geolocation' });
      console.log(permiso.state);


      if (this.map) {


        if (permiso.state != 'denied' && this.primeraEntrada == true) {
          this.map.setView([latitude, longitude], 20);
          this.marcador = L.circleMarker([latitude, longitude]).addTo(this.map).bindPopup('Estás aquí');

          this.primeraEntrada = true;
        }


        // Solo centrar la primera vez
        if (this.primeraEntrada) {
          this.map.setView([latitude, longitude], 20);
          this.primeraEntrada = false;
        }

        // Si ya hay un marcador, lo movemos
        if (this.marcador) {
          this.marcador.setLatLng([latitude, longitude]);
        }
      }
    } catch (error) {
      console.error('Error al tratar de encontrar la ubicación::', error);
    }
  }
}
