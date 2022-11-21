import { Audio } from './../../classes/audio';
import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-bara-inferior',
  templateUrl: './bara-inferior.component.html',
  styleUrls: ['./bara-inferior.component.scss'],
})
export class BaraInferiorComponent implements OnInit {
  audios: Audio[] = [];

  constructor(public audioService: AudioService) {}

  ngOnInit(): void {
    this.audioService.getImagenes().subscribe((docs) => {
      this.audios = docs;
      this.audioService.audios = docs;
    });
  }

  playPause() {
    if (this.audioService.isPlaying()) {
      this.audioService.pause();
    } else {
      if (this.audioService.sound !== undefined) {
        this.audioService.play();
      } else {
        this.audioService.playSong(this.audios[0]);
      }
    }
  }

  cambiarMomento($event: any) {
    this.audioService.sound?.seek($event.target.value);
    this.audioService.play();
  }
}
