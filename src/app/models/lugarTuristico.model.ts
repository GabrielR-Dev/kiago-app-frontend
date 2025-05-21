import { CoordenadaM } from "./coordenada.model";
import { ComentarioM } from "./comentario.model";


export class LugarTuristicoM {
    id: number;
    nombre: string;
    descripcion: string;
    calle: string;
    numero: number;
    coordenada: CoordenadaM;
    fechaAgregado: Date;
    comentarios: ComentarioM[] = [];

    /*
        constructor(nombre: string, descripcion: string, calle: string, numero: number, coordenada: CoordenadaM) {
            this.id = new Date().getTime(),
            this.nombre = nombre,
            this. descripcion = descripcion,
            this.calle = calle,
            this.numero = numero,
            this.coordenada = coordenada
        }
    */
    constructor(nombre: string) {
        this.nombre = nombre;
        this.id = new Date().getTime();
        this.descripcion = '';
        this.calle = '';
        this.numero = 0;
        this.coordenada = new CoordenadaM(0, 0);
        this.fechaAgregado = new Date();
    }
}