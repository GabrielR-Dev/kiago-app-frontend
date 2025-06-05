import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProviderLugaresService } from 'src/app/services/lugares/provider-lugares.service';
import { NgIfContext } from '@angular/common';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';
import { Comentario } from 'src/app/models/comentario';

@Component({
  selector: 'app-view-lugar',
  templateUrl: './view-lugar.page.html',
  styleUrls: ['./view-lugar.page.scss'],
  standalone: false,
})
export class ViewLugarPage implements OnInit {
  lugar: any;
  comentarios: Comentario[] = [];
  fotos: any[] = [];
  nuevoComentario: string = '';
  isLoading: any;
  cargando: TemplateRef<NgIfContext<boolean>> | null | undefined;
  comentario: Comentario | undefined;

  constructor(
    private route: ActivatedRoute,
    private providerLugares: ProviderLugaresService,
    private router: Router,
    private firebaseSvc: FirebaseService
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.cargarLugar(id);
    }
  }


  cargarLugar(id: string) {
    this.providerLugares.verLugarDetalle(id).subscribe((detalle: any) => {
      this.lugar = detalle;
      this.cargarComentarios(); // Comentarios después de tener el lugar
    });
  }



  //Trae los comentarios del un lugar
  cargarComentarios() {
    if (this.lugar?.xid) {
      this.firebaseSvc
        .getComentariosPorLugar(this.lugar.xid)
        .then((comentarios) => {
          this.comentarios = comentarios;
        });
    }
  }

  //Dirije a la pagina del recorrido en el mapa
  abrirEnMapa() {
    if (this.lugar && this.lugar.point) {
      const lat = this.lugar.point.lat;
      const lng = this.lugar.point.lon;
      const id = this.lugar.xid;
      this.router.navigate([`/view-lugar`, id, 'ir', lat, lng]);
    }
  }

  // Agrega datos del comentario
  agregarComentario() {
    const uid = localStorage.getItem('userUid');
    const nombreLugar = localStorage.getItem('userUid');
    if (!uid) {
      alert('Debes iniciar sesión para comentar.');
      return;
    }
    if (!this.nuevoComentario.trim()) {
      alert('El comentario no puede estar vacío.');
      return;
    }

    const comentario: Comentario = {
      xid: this.lugar.xid,
      uid: uid,
      comentario: this.nuevoComentario.trim(),
      nombreLugar: this.lugar.name,
      fecha: new Date()
    };

    this.firebaseSvc.addComentario(comentario).then(() => {
      this.nuevoComentario = '';
      this.cargarComentarios(); // Recargar los comentarios
    });
  }
}
