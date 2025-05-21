import { Component, OnInit, NgZone } from '@angular/core';
import * as L from 'leaflet';
import { GpsLocationService } from '../../services/location/gps-location.service';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';
import { Lugar } from 'src/app/models/lugar.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-mapa',
  templateUrl: './menu-mapa.page.html',
  styleUrls: ['./menu-mapa.page.scss'],
  standalone: false,
})
export class MenuMapaPage implements OnInit {
  private map: L.Map | undefined;

  constructor(
    private gpsLocationService: GpsLocationService,
    public providerLugares: ProviderLugaresService,
    private router: Router,
    private ngZone: NgZone
  ) { }

  ngOnInit() {
    // Escuchar el evento personalizado para navegación desde el popup
    window.addEventListener('verLugar', (event: any) => {
      this.ngZone.run(() => {
        const id = event.detail;
        this.router.navigate(['/view-lugar', id]);
      });
    });
    this.providerLugares.verLuagares().subscribe((lugares: Lugar[]) => {
      console.log('Lugares desde la API:', lugares);
      this.lugares(lugares);
    });


  }

  ngAfterViewInit() {
    this.loadMap();
  }

  private lat = -34.61; // Latitud de BsAs
  private lng = -58.38; // Longitud de BsAs
  private primeraEntrada: boolean = true;
  private marcador: L.CircleMarker | L.Marker | undefined;


  async loadMap() {
    this.map = L.map('map').setView([this.lat, this.lng], 13); //Ubicar en Bs As por defecto

    // Cargar el mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Asegurarse de que el mapa se ajuste al contenedor
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

    // Obtener la ubicación del usuario cada 5 segundos
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
          this.map.setView([latitude, longitude], 15);
          this.marcador = L.circleMarker([latitude, longitude]).addTo(this.map).bindPopup('Estás aquí');

          this.primeraEntrada = true;
        }

        // Solo centrar la primera vez
        if (this.primeraEntrada) {
          this.map.setView([latitude, longitude], 20);
          this.primeraEntrada = false;
        }

        // Si ya hay un marcador lo movemos
        if (this.marcador) {
          this.marcador.setLatLng([latitude, longitude]);
        }
      }
    } catch (error) {
      console.error('Error al tratar de encontrar la ubicación::', error);
    }
  }

  // Marca en el mapa los puntos del array de lugares de la API
  lugares(lugaresArray: Lugar[]) {
    if (!this.map) return;

    lugaresArray.forEach(lugar => {
      const marker = L.marker([lugar.latitude, lugar.longitude], {
        icon: L.icon({
          iconUrl: 'assets/icon/favicon.png',
          iconSize: [25, 25],
          iconAnchor: [12, 25],
          popupAnchor: [0, -25],
        })
      }).addTo(this.map!);

      // Usar <a> y evento personalizado para navegación
      const popupContent = `
        <div style="text-align:center;">
          <strong>${lugar.name || 'Lugar'}</strong><br>
          <a style="color:blue;text-decoration:underline;margin-top:5px;display:inline-block;cursor:pointer;" onclick="window.dispatchEvent(new CustomEvent('verLugar', { detail: ${lugar.id} }))">Ver</a>
        </div>
      `;
      marker.bindPopup(popupContent);
    });
  }


}