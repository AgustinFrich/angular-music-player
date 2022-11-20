import { Howl, Howler } from 'howler';

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
  sound?: Howl;
  playing: string = '';
  songTime = 0;
  constructor(private audioService: AudioService) {}

  playSong(audio: Audio) {
    if (this.sound?.playing()) {
      this.pauseSong();
    } else {
      if (this.playing !== audio.nombre) {
        this.sound?.stop();
        this.sound = new Howl({ src: [audio.link], html5: true });
      }
      this.sound?.play();
      this.playing = audio.nombre;
      setTimeout(() => {
        console.log(this.sound?.pos());
      }, 2000);
    }
  }

  pauseSong() {
    this.sound?.pause();
  }

  resumeSong() {
    this.sound?.pause();
  }

  ngOnInit(): void {
    this.audioService.getImagenes().subscribe((docs) => {
      this.audios = docs;
    });
  }
}
