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
  direccionDestino: string = '';
  distanciaKm: number | null = null;
  duracionTexto: string = '';
  mostrarInfo: boolean = false;
  private lat = this.latFinal // Latitud de BsAs
  private lng = this.lngFinal // Longitud de BsAs


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
        //Logica para borrar mapa antes de cargar uno nuevo
    if (!sessionStorage.getItem('mapaRecargado')) {
      sessionStorage.setItem('mapaRecargado', 'true');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      sessionStorage.removeItem('mapaRecargado');
    }
  }



  //Renderizar el mapa una vez que se haya cargado el HTML
  async ngAfterViewInit() {



    this.loadMap();
    this.lugares(this.latFinal, this.lngFinal);
    await this.getUserLocation();


    this.providerLocationiq.ruter(this.latInicio, this.lngInicio, this.latFinal, this.lngFinal).subscribe((data: any) => {
      this.urlRuta = data.url || JSON.stringify(data);
      const coords = data.routes[0].geometry.coordinates.map((c: number[]) => [c[1], c[0]]);
      L.polyline(coords, { color: 'blue', weight: 5 }).addTo(this.map!);
      this.map!.fitBounds(L.polyline(coords).getBounds(), { padding: [30, 30] });

    }
    );

    // Obtener distancia, duración y dirección
    this.providerLocationiq.obtenerDistancia(this.latInicio, this.lngInicio, this.latFinal, this.lngFinal).subscribe((data: any) => {
      const distanciaMetros = data.routes[0].distance;
      const duracionSegundos = data.routes[0].duration;
      this.distanciaKm = (distanciaMetros / 1000);
      // Formatear duración a h y min
      const horas = Math.floor(duracionSegundos / 3600);
      const minutos = Math.round((duracionSegundos % 3600) / 60);
      this.duracionTexto = `${horas > 0 ? horas + ' h ' : ''}${minutos + 10} min`;
      this.mostrarInfo = true;

      setTimeout(() => {
        this.obtenerDireccionDestino();

      }, 100);
    });
  }

  //Direcciones del destino para mostrar en mapa
  obtenerDireccionDestino() {
    const url = `https://us1.locationiq.com/v1/reverse?key=pk.d43a155e214a7ca6a1b6b41cd30d76be&lat=${this.latFinal}&lon=${this.lngFinal}&format=json`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        this.direccionDestino = data.display_name || '';
      });
  }



  async loadMap() {

    /*if (this.map) {
      this.map.remove(); // Destruye el mapa anterior si ya existe
    }*/

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
  //Configuramos el marcador y agregamos al map
  lugares(lat: number, lng: number, esUsuario: boolean = false) {
    let marker;
    if (esUsuario) {
      marker = L.circleMarker([lat, lng], {
        radius: 12,
        color: '#d32f2f',
        fillColor: '#d32f2f',
        fillOpacity: 0.9,
        weight: 2
      });
    } else {
      marker = L.marker([lat, lng], {
        icon: L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          iconSize: [40, 40], // mismo tamaño que menu-mapa
          iconAnchor: [20, 40],
          popupAnchor: [0, -40],
        })
      });
    }
    marker.addTo(this.map!);
  };



  //Esto devuelve la ubicacion del usuario
  async getUserLocation() {
    try {
      const { latitude, longitude } = await this.gpsLocationService.miPosicion();
      console.log('Ubicación del usuario:', latitude, longitude);
      this.latInicio = latitude;
      this.lngInicio = longitude;
      if (this.map && latitude && longitude) {
        this.map.setView([latitude, longitude], 15);
      }
      this.lugares(this.latInicio, this.lngInicio, true); // esUsuario = true
    } catch (error) {
      console.error('No se pudo obtener la ubicación del usuario:', error);
    }
  }

  volverAtras() {
    window.history.back();
  }
}


