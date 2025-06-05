import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LugarOTM } from 'src/app/models/LugarOTM';

import { GpsLocationService } from 'src/app/services/location/gps-location.service';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';

@Component({
  selector: 'app-menumenu',
  templateUrl: './menumenu.page.html',
  styleUrls: ['./menumenu.page.scss'],
  standalone: false,
})
export class MenumenuPage implements OnInit {

  lugares!: LugarOTM[];
  filtroSeleccionado: string = '';
  latitude!: number;
  longitude!: number;
  lugarSeleccionado: any = null;

  constructor(
    private providerLugares: ProviderLugaresService,
    private miUbicacion: GpsLocationService,
    private router: Router

  ) { }


  async ngOnInit() {
    const { latitude, longitude } = await this.miUbicacion.miPosicion();
    this.latitude = latitude
    this.longitude = longitude

    //Llamada aprovedor para que los primeros lugares los buque em bs as
    this.providerLugares.verLuagares(-34.61, -58.38, 3000, 1000).subscribe({
      next: (res) => {
        this.lugares = res;
      },
      error: (err) => {
        console.log(err);
      }
    });

  }
  //Carga en la lista de lugares los lugares segun el filtro que se selecciono
  cargarVista() {
    console.log('Filtro actual:', this.filtroSeleccionado);
    this.lugares = []; // Limpia antes de cargar nuevos

    if (this.filtroSeleccionado) {
      if (this.latitude == undefined) this.latitude = -34.61;
      if (this.longitude == undefined) this.longitude = -58.38;

      this.providerLugares.lugaresFiltrados(this.latitude, this.longitude, this.filtroSeleccionado)
        .subscribe(lugares => {
          console.log(lugares)
          this.lugares = lugares;
        });
    } else {
      // Si no hay filtro, podés cargar todos o mostrar mensaje
      console.log('No se seleccionó filtro');
    }
  }

  //Redirige a los detalles del lugar al que se le dio click
  verDetalles(xid?: string) {
    console.log('Redirigiendo a:', `/view-lugar/${xid}`);
    if (xid) {
      this.router.navigate([`/view-lugar/${xid}`]);
    }
  }


}
