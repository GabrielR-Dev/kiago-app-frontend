import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';

// Import Firestore y Auth de Firebase
import { NgIfContext } from '@angular/common';


@Component({
  selector: 'app-view-lugar',
  templateUrl: './view-lugar.page.html',
  styleUrls: ['./view-lugar.page.scss'],
  standalone: false,
})
export class ViewLugarPage implements OnInit {
  lugar: any; // Datos del lugar
  comentarios: any[] = [];
  fotos: any[] = [];

  nuevoComentario: string = '';
  isLoading: any;
  cargando: TemplateRef<NgIfContext<boolean>> | null | undefined;

  constructor(
    private route: ActivatedRoute,
    private providerLugares: ProviderLugaresService,
    private router: Router,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    if (id) {
      this.cargarLugar(id);
    }
  if (!sessionStorage.getItem('mapaRecargado')) {
    sessionStorage.setItem('mapaRecargado', 'true');
    setTimeout(() => {
      window.location.reload();
    }, 20);
  } else {
    // Ya se recargó una vez, limpia la bandera para futuras visitas
    sessionStorage.removeItem('mapaRecargado');
    // Continúa con la carga normal sin recargar
  }
  }

  cargarLugar(id: string) {
    this.providerLugares.verLugarDetalle(id).subscribe((detalle: any) => {
      this.lugar = detalle;
    });
  }


  abrirEnMapa() {
    if (this.lugar && this.lugar.point) {
      const lat = this.lugar.point.lat;
      const lng = this.lugar.point.lon;
      const id = this.lugar.xid;
      this.router.navigate([`/view-lugar`, id, 'ir', lat, lng]);
    }
  }

  agregarComentario() {
    alert('Para poder comentar debes abonar la sucripcion: Transferir al CBU 01703168400000042952828');
    this.nuevoComentario = "";
  }


}
