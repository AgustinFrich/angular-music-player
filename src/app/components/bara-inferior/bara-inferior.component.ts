import { Component, OnInit } from '@angular/core';
import { AudioService } from 'src/app/services/audio.service';

@Component({
  selector: 'app-bara-inferior',
  templateUrl: './bara-inferior.component.html',
  styleUrls: ['./bara-inferior.component.scss'],
})
export class BaraInferiorComponent implements OnInit {
  constructor(public audioService: AudioService) {}

  ngOnInit(): void {}
}
