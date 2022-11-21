import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tiempoPipe',
})
export class TiempoPipePipe implements PipeTransform {
  transform(value: number, ...args: string[]): string {
    const segundosTotales = Math.trunc(value);
    if (segundosTotales < 10) {
      return '0:0' + segundosTotales;
    } else if (segundosTotales < 60) {
      return '0:' + segundosTotales;
    } else {
      let minutos = Math.trunc(segundosTotales / 60);
      let segundos = segundosTotales - minutos * 60;

      if (segundos < 10) {
        return minutos + ':0' + segundos;
      }
      return minutos + ':' + segundos;
    }
  }
}
