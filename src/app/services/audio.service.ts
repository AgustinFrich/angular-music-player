import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
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

  //Audio principal
  sound?: Howl;
  playing: string = '';
  songTime = 0;

  constructor(private fs: Firestore) {
    setInterval(() => {
      this.songTime = this.sound?.seek() || 0;
    }, 1000);
  }

  getImagenes() {
    return collectionData(this.audiosC) as Observable<Audio[]>;
  }
}
