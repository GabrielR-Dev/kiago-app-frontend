import { Component, NgZone, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Lugar } from 'src/app/models/lugar.model';
import { ProviderLocationiqService } from 'src/app/services/location-iq/provider-locationiq.service';
import { GpsLocationService } from 'src/app/services/location/gps-location.service';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';


@Component({
  selector: 'app-ir',
  templateUrl: './ir.page.html',
  styleUrls: ['./ir.page.scss'],
  standalone: false
})
export class IrPage implements OnInit {

  private map: L.Map | undefined;
  private latInicio: number = 0;
  private lngInicio: number = 0;
  private latFinal: number = 0;
  private lngFinal: number = 0;
  private marcador: L.CircleMarker | L.Marker | undefined
  urlRuta: string | null = null;


  constructor(
    private gpsLocationService: GpsLocationService,
    public providerLugares: ProviderLugaresService,
    private route: ActivatedRoute,
    private providerLocationiq: ProviderLocationiqService
  ) { }

  ngOnInit() {
    //Coordenadas pasadas por URL del Lugar hacia donde se desea ir
    this.latFinal = Number(this.route.snapshot.paramMap.get('lat'));
    this.lngFinal = Number(this.route.snapshot.paramMap.get('lng'));
  }



  //Renderizar el mapa una vez que se haya cargado el HTML
  async ngAfterViewInit() {
    this.loadMap();
    this.lugares(this.latFinal, this.lngFinal);
    await this.getUserLocation();
    // Llamar al servicio de LocationIQ para obtener la URL de la ruta
    if (this.latInicio && this.lngInicio && this.latFinal && this.lngFinal) {
      this.providerLocationiq.ruter(this.latInicio, this.lngInicio, this.latFinal, this.lngFinal).subscribe((data: any) => {
        this.urlRuta = data.url || JSON.stringify(data);
        console.log('Respuesta LocationIQ:', data);
        // Dibuja la ruta en el mapa
        if (data && data.routes && data.routes[0] && data.routes[0].geometry && data.routes[0].geometry.coordinates) {
          // LocationIQ devuelve [lng, lat], Leaflet espera [lat, lng]
          const coords = data.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
          L.polyline(coords, { color: 'blue', weight: 5 }).addTo(this.map!);
          // Ajusta el mapa para mostrar toda la ruta
          this.map!.fitBounds(L.polyline(coords).getBounds(), { padding: [30, 30] });
        }
      });
    }
  }

  private lat = this.latFinal // Latitud de BsAs
  private lng = this.lngFinal // Longitud de BsAs



  async loadMap() {
    this.map = L.map('map').setView([this.lat, this.lng], 13); 

    // Cargar el mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Asegurarse de que el mapa se ajuste al contenedor
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

  }



  lugares(lat: number, lng: number) {

    const markerLugar = L.marker([lat, lng], {
      icon: L.icon({
        iconUrl: 'assets/icon/favicon.png',
        iconSize: [25, 25],
        iconAnchor: [12, 25],
        popupAnchor: [0, -25],
      })
    })

    markerLugar.addTo(this.map!);
  };




  async getUserLocation() {
    try {
      const { latitude, longitude } = await this.gpsLocationService.miPosicion();
      console.log('Ubicación del usuario:', latitude, longitude);
      this.latInicio = latitude;
      this.lngInicio = longitude;
      // Centrar el mapa en la ubicación del usuario si está disponible
      if (this.map && latitude && longitude) {
        this.map.setView([latitude, longitude], 15);
      }
      this.lugares(this.latInicio, this.lngInicio);
    } catch (error) {
      console.error('No se pudo obtener la ubicación del usuario:', error);
    }
  }

  volverAtras() {
    window.history.back();
  }
}


