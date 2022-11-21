import { Howl, Howler, SpatialPosition } from 'howler';

import { AudioService } from './../../services/audio.service';
import { Audio } from './../../classes/audio';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reproductor',
  templateUrl: './reproductor.component.html',
  styleUrls: ['./reproductor.component.scss'],
})
export class ReproductorComponent implements OnInit {
  audios: Audio[] = [];

  constructor(public audioService: AudioService) {}

  playSong(audio: Audio) {
    if (this.audioService.playing !== audio.nombre) {
      this.audioService.sound?.stop();
      this.audioService.sound = new Howl({ src: [audio.link], html5: true });
      this.audioService.sound?.play();
      this.audioService.playing = audio.nombre;
    } else {
      if (this.audioService.sound?.playing()) {
        this.pauseSong();
      } else {
        this.audioService.sound?.play();
        this.audioService.playing = audio.nombre;
      }
    }
  }

  pauseSong() {
    this.audioService.sound?.pause();
  }

  resumeSong() {
    this.audioService.sound?.pause();
  }

  ngOnInit(): void {
    this.audioService.getImagenes().subscribe((docs) => {
      this.audios = docs;
    });
  }
}
