import { Component, OnInit } from '@angular/core';
import { GpsLocationService } from 'src/app/services/location/gps-location.service';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';

@Component({
  selector: 'app-menumenu',
  templateUrl: './menumenu.page.html',
  styleUrls: ['./menumenu.page.scss'],
  standalone:false,
})
export class MenumenuPage implements OnInit {

  lugares!: any[];
  filtroSeleccionado: string = '';

  constructor(
    private poviderLugares: ProviderLugaresService,
    private miUbicacion: GpsLocationService
  ) {}

  latitude!: number;
  longitude!: number;

  async ngOnInit() {
    const { latitude, longitude } = await this.miUbicacion.miPosicion();
    this.latitude = latitude;
    this.longitude = longitude;
  }

  cargarVista() {
    if (!this.filtroSeleccionado) return;

    this.poviderLugares.lugaresFiltrados(this.latitude, this.longitude, this.filtroSeleccionado)
      .subscribe(lugares => {
        console.log(lugares);
        this.lugares = lugares as any[];
      });
  }

  
}
