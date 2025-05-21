import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class CargarMasDatosService {

  constructor() { }

  //pasa los favoritos de "listaFavoritos" a "listaFavoritosCarga", esta ultima variable sera la mostrada por pantalla
  cargarInicial(listaCompletaParam: any, listaCargadaParam: any) {
    if (listaCompletaParam.length < 10) {
      const limite = listaCompletaParam.length
      const nuevaLista = listaCompletaParam.slice(0, limite);
      return nuevaLista;
    }
    else {
      const nuevaLista = listaCompletaParam.slice(0, 10);
      return nuevaLista;
    }
  }

  //carga mas datos tomando en cuenta donde se quedo la array que carga por pantalla
    //otra alternativa a esto es hacerlo que haga un push directamente a la variable listaCargadaParam
    //ya que la funcion le pasa automaticamente el valor de esa variable de parametro al parametro original
    //cosa que me costo descubrir, en especial porque pensaba que era como C#
  cargarMas(listaCompletaParam: any, listaCargadaParam: any) {
    const longitudCarga = listaCargadaParam.length;
    const siguienteCarga = listaCompletaParam.slice(longitudCarga, longitudCarga + 10);
    return siguienteCarga;
  }
}
