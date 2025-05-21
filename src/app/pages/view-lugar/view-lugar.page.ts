import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';
import { Lugar } from 'src/app/models/lugar.model';

@Component({
  selector: 'app-view-lugar',
  templateUrl: './view-lugar.page.html',
  styleUrls: ['./view-lugar.page.scss'],
  standalone: false,
})
export class ViewLugarPage implements OnInit {
  lugar: Lugar | undefined;
  comentarios: any[] = [];
  fotos: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private providerLugares: ProviderLugaresService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    console.log('ID recibido:', id);
    if (id) {
      this.providerLugares.verLugar(+id).subscribe((lugar: Lugar) => {
        this.lugar = lugar;
      });
      this.providerLugares.verComentarios(+id).subscribe((comentarios: any[]) => {
        this.comentarios = comentarios;
      });
      this.providerLugares.verFotos(+id).subscribe((fotos: any[]) => {
        this.fotos = fotos;
      });
    }
  }

  abrirEnMapa() {
    if (this.lugar) {
      const lat = this.lugar.latitude;
      const lng = this.lugar.longitude;
      const id = this.lugar.id;
      this.router.navigate([`/view-lugar/${id}/ir`], { queryParams: { lat, lng } });
    }
  }

}
