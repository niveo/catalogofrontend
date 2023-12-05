import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { APP_CONFIG, IConfigToken } from '../../utils/app-config';
import { handleError } from '../../utils/handle-error.utils';

@Injectable()
export class CatalogoService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}
  exportarCatalogo(file: any, descricao: string, ativo: boolean) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http
      .post(`${this.conf.apiUri}/catalogo/importar`, formData, {
        params: {
          descricao: descricao,
          ativo: ativo,
        },
      })
      .pipe(catchError(handleError));
  }
}
