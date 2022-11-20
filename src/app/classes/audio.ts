export class Audio {
  id: string;
  nombre: string;
  imagen: string;
  link: string;

  constructor(nombre: string) {
    this.nombre = nombre;
    this.id = '';
    this.imagen = '';
    this.link = '';
  }
}
