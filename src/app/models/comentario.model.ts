
export class ComentarioM {
    id: number;
    autor: string;
    fechaCreado: Date;
    puntuacion: number;
    descripcion: string;


    /*
        constructor(autor: string, puntuacion: number, descripcion: string) {
            this.autor = autor;
            this.fechaCreado = new Date();
            this.puntuacion = puntuacion;
            this.descripcion
        }
    */

    constructor(autor: string) {
        this.autor = autor;
        this.fechaCreado = new Date();
        this.puntuacion = 0;
        this.descripcion = '';
        this.id = new Date().getTime();
    }
}