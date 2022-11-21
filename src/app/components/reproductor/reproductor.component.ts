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
    this.audioService.playSong(audio);
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
