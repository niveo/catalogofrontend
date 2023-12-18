import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'bolhuman',
  standalone: true,
})
export class BolHumanPipe implements PipeTransform {
  transform(value: boolean): string {
    return value ? 'Sim' : 'Não';
  }
}
