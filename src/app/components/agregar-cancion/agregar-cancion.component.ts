import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-agregar-cancion',
  templateUrl: './agregar-cancion.component.html',
  styleUrls: ['./agregar-cancion.component.scss'],
})
export class AgregarCancionComponent implements OnInit {
  mp3?: Blob;
  nombre: string = '';
  constructor(private audioService: AudioService) {}

  ngOnInit(): void {}

  subir() {
    if (this.mp3 !== undefined && this.nombre.length > 2) {
      this.audioService.subir(this.nombre, this.mp3);
      this.mp3 = undefined;
      this.nombre = '';
    }
  }

  cambio($event: any) {
    const b = new Blob([$event.target.files[0]], { type: 'audio/mpeg' });
    console.log(b);
    this.mp3 = b;
  }
}
