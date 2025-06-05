import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/comentario';
import { FirebaseService } from 'src/app/services/firebase/firebase.service';

@Component({
  selector: 'app-visitados',
  templateUrl: './visitados.page.html',
  styleUrls: ['./visitados.page.scss'],
  standalone:false
})
export class VisitadosPage implements OnInit {

comentarios: Comentario[] = [];

  constructor(private firebaseSvc: FirebaseService) { }

  ngOnInit() {
    const uid = localStorage.getItem('userUid') || '';
    this.firebaseSvc.getComentariosPorUsuario(uid).then(comentarios => {
      this.comentarios = comentarios;
    });
  }

  async eliminarComentario(id: string | undefined) {
    if (!id) return;


    await this.firebaseSvc.deleteComentario(id);
    const uid = localStorage.getItem('userUid') || '';
    this.firebaseSvc.getComentariosPorUsuario(uid).then(comentarios => {
      this.comentarios = comentarios;
    });
  }
}
