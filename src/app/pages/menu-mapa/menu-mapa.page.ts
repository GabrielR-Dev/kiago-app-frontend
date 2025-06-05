import { Component, OnInit, NgZone } from '@angular/core';
import * as L from 'leaflet';
import { GpsLocationService } from '../../services/location/gps-location.service';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-mapa',
  templateUrl: './menu-mapa.page.html',
  styleUrls: ['./menu-mapa.page.scss'],
  standalone: false,
})
export class MenuMapaPage implements OnInit {
  // Definición de variables
  private map: L.Map | undefined;
  filtroSeleccionado: string = '';

  constructor(
    private gpsLocationService: GpsLocationService,
    public providerLugares: ProviderLugaresService,
    private router: Router,
    private ngZone: NgZone
  ) { }


  ngOnInit() {
    // Obtener la ubicación del usuario al iniciar

    this.getUserLocation();
    // Escuchar el evento personalizado para navegación desde el popup
    window.addEventListener('verLugar', (event: any) => {
      this.ngZone.run(() => {
        const id = event.detail;
        this.router.navigate(['/view-lugar', id]);
      });
    });
    // Usar OpenTripMap para obtener lugares cercanos
    /*this.providerLugares.verLuagares(this.lat, this.lng).subscribe((lugares) => {
      console.log('Lugares desde OpenTripMap:', lugares);
      this.lugares(lugares);
    });*/
  }

  // Renderizar el mapa una vez que se haya cargado el HTML
async ngAfterViewInit() {
  // Prevenimos el error: "Map container is already initialized"
  const container = document.getElementById('map') as any;
  if (container && container._leaflet_id) {
    container._leaflet_id = null;
  }

  await this.loadMap(); // Esperamos que el mapa se cargue

  // Ahora sí pedimos los lugares
  this.providerLugares.verLuagares(this.lat, this.lng).subscribe((lugares) => {
    console.log('Lugares desde OpenTripMap:', lugares);
    this.lugares(lugares); // Asegurado que this.map ya está definido
  });
}

  ionViewWillLeave() {
    if (this.map) {
      this.map.remove();
      this.map = undefined;
    }
  }

  private lat = -34.61; // Latitud de BsAs
  private lng = -58.38; // Longitud de BsAs
  private primeraEntrada: boolean = true;
  private marcador: L.CircleMarker | L.Marker | undefined;
  private markers: L.Marker[] = [];



  loadMap() {

    const container = document.getElementById('map') as any;
    if (container && container._leaflet_id) {
      container._leaflet_id = null;
    }

    this.map = L.map('map').setView([this.lat, this.lng], 15); //Ubicar en Bs As por defecto


    // Cargar el mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    // Asegurarse de que el mapa se ajuste al contenedor
    setTimeout(() => {
      this.map?.invalidateSize();
    }, 0);

    // Obtener la ubicación del usuario cada 5 segundos
    //    setInterval(() => {
    this.getUserLocation();
    //    }, 5000);
  }



  // Metodo para obtener la ubicación del usuario y centra el mapa
  async getUserLocation() {
    try {
      const { latitude, longitude } = await this.gpsLocationService.miPosicion();
      console.log('Ubicación del usuario:', latitude, longitude);

      this.lat = latitude;
      this.lng = longitude;

      const permiso = await navigator.permissions.query({ name: 'geolocation' });
      console.log(permiso.state);

      if (this.map) {

        // Centrar y marcar la ubicación del usuario
        if (permiso.state != 'denied' && this.primeraEntrada == true) {
          this.map.setView([latitude, longitude], 15);
          this.marcador = L.circleMarker([latitude, longitude]).addTo(this.map).bindPopup('Estás aquí');
          this.primeraEntrada = true;
        }
        //Si es la primera entrada con cordenadas del gps se centra en el lugar de su ubicacion
        if (this.primeraEntrada) {
          this.map.setView([latitude, longitude], 20);
          this.primeraEntrada = false;
        }
        //Marca la ubicacion del gps
        if (this.marcador) {
          this.marcador.setLatLng([latitude, longitude]);
          console.log(this.marcador.setLatLng([latitude, longitude]));
        }

        // Recargar lugares cercanos a la nueva ubicación con un rango aún más amplio (por ejemplo, 8000 metros)
        this.providerLugares.verLuagares(latitude, longitude, 8000).subscribe((lugares) => {
          // Guardar en localStorage para acceso en detalle
          localStorage.setItem('lugares_otm', JSON.stringify(lugares));
          this.lugares(lugares);
        });
      }
    } catch (error) {
      console.error('Error al tratar de encontrar la ubicación::', error);
    }
  }

  // Hace una peticion para buscar los lugares segun el filtro den html
  cargarVista() {
    if (!this.filtroSeleccionado) {
      console.warn('No se seleccionó ningún filtro');
      return;
    }
    //Peticion
    this.providerLugares.lugaresFiltrados(this.lat, this.lng, this.filtroSeleccionado).subscribe({
      next: (lugares) => {
        console.log('Lugares filtrados:', lugares);
        this.lugares(lugares); // Reutiliza el método que renderiza los marcadores
      },
      error: (error) => {
        console.error('Error al cargar lugares filtrados:', error);
      }
    });
  }

  // Marca en el mapa los puntos del array de lugares de la API
  lugares(lugaresArray: any[]) {
    if (!this.map) return;
    // Eliminar marcadores anteriores y con los lugares que se le pasan los marca devuelta
    this.markers.forEach(marker => this.map!.removeLayer(marker));
    this.markers = [];
    lugaresArray.forEach(lugar => {
      const marker = L.marker([lugar.point.lat, lugar.point.lon], {
        icon: L.icon({
          iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
          iconSize: [32, 32],
          iconAnchor: [16, 32],
          popupAnchor: [0, -32],
        })
      }).addTo(this.map!);

      //Creamos un bindPopup para el marker en el mapa
      const popupContent = `
        <div style="text-align:center;">
          <strong>${lugar.name || 'Lugar'}</strong><br>
          <a style="color:blue;text-decoration:underline;margin-top:5px;display:inline-block;cursor:pointer;" onclick="window.dispatchEvent(new CustomEvent('verLugar', { detail: '${lugar.xid}' }))">Ver</a>
        </div>
      `;
      marker.bindPopup(popupContent);
      this.markers.push(marker);

    });
  }

}