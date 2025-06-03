import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';

@Component({
  selector: 'app-view-lugar',
  templateUrl: './view-lugar.page.html',
  styleUrls: ['./view-lugar.page.scss'],
  standalone: false,
})
export class ViewLugarPage implements OnInit {
  lugar: any; // Cambiado a any para la estructura OpenTripMap
  comentarios: any[] = [];
  fotos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private providerLugares: ProviderLugaresService,
    private router: Router
  ) { }

  ngOnInit() {
    // Obtener el ID del lugar desde la URL
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    if (id) {
      // Obtener detalles del lugar desde OpenTripMap
      this.providerLugares.verLugarDetalle(id).subscribe((detalle: any) => {
        this.lugar = detalle;
      });
    }
  }
  abrirEnMapa() {
    if (this.lugar && this.lugar.point) {
      const lat = this.lugar.point.lat;
      const lng = this.lugar.point.lon;
      const id = this.lugar.xid;
      this.router.navigate([`/view-lugar`, id, 'ir', lat, lng]);
    }
  }

}
