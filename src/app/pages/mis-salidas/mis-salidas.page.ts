import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { IonHeader, IonToolbar } from "@ionic/angular/standalone";
import { ComentarioM } from 'src/app/models/comentario.model';
import { LugarTuristicoM } from 'src/app/models/lugarTuristico.model';
import { CargarMasDatosService } from 'src/app/services/cargar-mas-datos.service';

@Component({
  selector: 'app-mis-salidas',
  templateUrl: './mis-salidas.page.html',
  styleUrls: ['./mis-salidas.page.scss'],
  standalone:false
})
export class MisSalidasPage implements OnInit {

favorito: LugarTuristicoM = new LugarTuristicoM('');
  listaFavoritos: LugarTuristicoM[] = [];
  listaFavoritosCarga: LugarTuristicoM[] = [];
  listaComentarios: ComentarioM[] = [];
  listaComentariosCarga: ComentarioM[] = [];


  constructor(
    private alertController: AlertController,
    private cargarMasDatos: CargarMasDatosService,
    private router: Router
  ) { }

  //funcion de prueba para crear los favoritos manualmente
  async crearFavorito() {
    const alert = await this.alertController.create({
      header: 'Crear lista de asistencias',
      inputs: [
        {
          name: 'nombre',
          type: 'text',
          placeholder: 'Nombre del lugar favorito'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          //esto genera dos errores:
            //por un lado se repiten los datos agregados
            //por el otro, dado una lista iniciada con 10 elementos, del 0 al 9, cuando agrego un dato, el siguiente valor,
            //es decir el 10 del this.listaFavoritos[11], se pierde
          text: 'Guardar',
          handler: (data) => {
            //si pones solo data se estaria pasando al constructor un objeto del tipo "titulo",
            //por lo que al aclarar data.titulo solo se pasa la variable titulo del objeto titulo
            let nuevoNombre: string = '🔹 ' + data.nombre;
            this.favorito = new LugarTuristicoM(nuevoNombre);
            this.listaFavoritosCarga.push(this.favorito)
            this.listaFavoritos.push(this.favorito);
          }
        }
      ]
    });
    await alert.present();
  }

  //cuando ya tenga objetos en el local storage favoritos, entonces borra ambas cargaIniciadora y sacar el // a lo
  //que esta ngOnInit

  //lo que sucede es que, automaticamente cuando arranca esta página, lo que haya en favoritos se pasa a
  //la variable listaFavoritos la cual va a ser con la que laburemos aca (lo mismo aplicaria a comentarios)
  ngOnInit() {
    //this.listaFavoritos = JSON.parse(localStorage.getItem('favoritos') || '[]')
    //this.listaComentarios = JSON.parse(localStorage.getItem('comentarios') || '[]')
    this.listaFavoritosCarga.push(...this.cargarMasDatos.cargarInicial(this.listaFavoritos, this.listaFavoritosCarga))
    this.listaComentariosCarga.push(...this.cargarMasDatos.cargarInicial(this.listaComentarios, this.listaComentariosCarga))

  }

  cargaIniciadoraFav() {
    for (let i = 0; i < 12; i++) {
      this.listaFavoritos.push(new LugarTuristicoM(`Favorito ${i}`));
    }
    localStorage.setItem('favoritos', JSON.stringify(this.listaFavoritos))
    for (let i = 0; i < 12; i++) {
      this.listaComentarios.push(new ComentarioM(`Comentario ${i}`));
    }
    localStorage.setItem('comentarios', JSON.stringify(this.listaComentarios))
  }

  //dado que los parametros de las funciones actualizan la variable original automaticamente, este cargarMas y el
  //de los comentarios se podrian simplificar en uno solo.
  cargarMasFavoritos() {
    const carga = this.cargarMasDatos.cargarMas(this.listaFavoritos, this.listaFavoritosCarga);
    this.listaFavoritosCarga.push(...carga);
  }

  cargarMasComentarios() {
    const carga = this.cargarMasDatos.cargarMas(this.listaComentarios, this.listaComentariosCarga);
    this.listaComentariosCarga.push(...carga)
  }

  detalle(idFav: any, lista: LugarTuristicoM[]) {
    let detalle = lista.filter(item => item.nombre === idFav)
    localStorage.setItem('detalle', JSON.stringify(detalle))
    this.router.navigate(['/detalle', idFav]);
  }

  //recordad de cambiar el nombre por id cuando se complete el proyecto
  eliminarFavorito(idFav: any, lista: LugarTuristicoM[]) {
    let listaActualizada = lista.filter(item => item.nombre !== idFav);
    this.listaFavoritosCarga = listaActualizada.slice(0, this.listaFavoritosCarga.length);
    this.listaFavoritos = listaActualizada;
    localStorage.setItem('favoritos', JSON.stringify(listaActualizada))
  }

  //para mas efectividad, el comentario se busca por id y por autor
  eliminarComentario(idCom: any, autor: any, lista: ComentarioM[]) {
    let listaActualizada = lista.filter(item => item.id !== idCom && item.autor !== autor);
    this.listaComentariosCarga = listaActualizada.slice(0, this.listaComentariosCarga.length)
    this.listaComentarios = listaActualizada;
    localStorage.setItem('comentarios', JSON.stringify(listaActualizada))
  }

}
