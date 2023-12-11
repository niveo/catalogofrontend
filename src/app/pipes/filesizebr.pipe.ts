import { Pipe, PipeTransform } from '@angular/core'; 
import { formatFileSize } from '../utils/utils';

@Pipe({
  name: 'filesizebr',
  standalone: true
})
export class FilesizebrPipe implements PipeTransform {
  transform(value: number): string {
    if (value !== undefined && value !== null) {
      return formatFileSize(value);
    } else {
      return '0';
    }
  }
}
