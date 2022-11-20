import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { Audio } from '../classes/audio';

@Injectable({
  providedIn: 'root',
})
export class AudioService {
  audiosC = collection(this.fs, 'audios');

  constructor(private fs: Firestore) {}

  getImagenes() {
    return collectionData(this.audiosC) as Observable<Audio[]>;
  }
}
