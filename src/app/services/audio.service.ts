import { Injectable } from '@angular/core';
import { collectionData, Firestore, getDocs } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Howl } from 'howler';
import { Observable } from 'rxjs';
import { Audio } from '../classes/audio';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  //Colecciones
  audiosC = collection(this.fs, 'audios');
  audios: Audio[] = [];
  //Audio principal
  sound?: Howl;
  playing: string = '';
  songTime = 0;
  random = false;
  repetir = false;

  constructor(private fs: Firestore) {
    setInterval(() => {
      this.songTime = this.sound?.seek() || 0;
    }, 500);
  }

  getImagenes() {
    return collectionData(this.audiosC) as Observable<Audio[]>;
  }

  async getAudiosEstaticos() {
    const docs = await getDocs(this.audiosC);
    const audios: Audio[] = [];
    docs.forEach((d) => {
      audios.push(d.data() as Audio);
    });
    return audios;
  }

  play() {
    this.sound?.play();
  }

  pause() {
    this.sound?.pause();
  }

  duracion(): number {
    return this.sound?.duration() || 0;
  }

  isPlaying(): boolean {
    return this.sound?.playing() || false;
  }

  playSong(audio: Audio) {
    if (this.playing !== audio.nombre) {
      this.sound?.stop();
      this.sound = new Howl({ src: [audio.link], html5: true });
      this.sound?.play();
      this.playing = audio.nombre;
      this.sound?.on('end', () => {
        if (this.repetir) {
          this.play();
        } else if (this.random) {
          this.playRandom();
        } else {
          this.next();
        }
      });
    } else {
      if (this.sound?.playing()) {
        this.pause();
      } else {
        this.sound?.play();
        this.playing = audio.nombre;
      }
    }
  }

  next() {
    if (this.random) {
      this.playRandom();
      return;
    }
    let index = -1;
    this.audios.forEach((a, i) => {
      if (a.nombre === this.playing) {
        index = i;
      }
    });

    if (index != -1) {
      if (index === this.audios.length - 1) {
        this.playSong(this.audios[0]);
      } else {
        this.playSong(this.audios[index + 1]);
      }
    }
  }

  prev() {
    if (this.random) {
      this.playRandom();
      return;
    }
    let index = -1;
    this.audios.forEach((a, i) => {
      if (a.nombre === this.playing) {
        index = i;
      }
    });

    if (index != -1) {
      if (index === 0) {
        this.playSong(this.audios[this.audios.length - 1]);
      } else {
        this.playSong(this.audios[index - 1]);
      }
    }
  }

  playRandom() {
    let index = -1;
    this.audios.forEach((a, i) => {
      if (a.nombre === this.playing) {
        index = i;
      }
    });

    if (index != -1) {
      let aleatorio = index;

      while (aleatorio === index) {
        aleatorio = Math.round(Math.random() * this.audios.length - 1);
      }
      this.playSong(this.audios[aleatorio]);
    }
  }
}
