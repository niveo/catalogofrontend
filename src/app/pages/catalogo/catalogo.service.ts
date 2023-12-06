import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  getAll() {
    return this.http.get(`${this.conf.apiUri}/catalogo`);
  }

  exportarCatalogo(file: any[], descricao: string, ativo: boolean) {
    const formData = new FormData();
    file.forEach((f) => {
      formData.append('files', f);
    });

    let headers = new HttpHeaders(); 
 
    return this.http
      .post(`${this.conf.apiUri}/catalogo/importar`, formData, {
        params: {
          descricao: descricao,
          ativo: ativo,
        },
        headers:headers
      })
      .pipe(catchError(handleError));
  }
}
