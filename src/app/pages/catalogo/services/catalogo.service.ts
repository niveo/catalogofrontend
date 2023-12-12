import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Catalogo } from '../../../entities/catalogo';
import { APP_CONFIG, IConfigToken } from '../../../utils/app-config';
import { handleError } from '../../../utils/handle-error.utils';

@Injectable()
export class CatalogoService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}

  getAll(): Observable<Catalogo[]> {
    return this.http.get<Catalogo[]>(`${this.conf.apiUri}/catalogo`);
  }

  exportarCatalogo(file: any[], descricao: string, ativo: boolean) {
    const formData = new FormData();
    file.forEach((f) => {
      formData.append('files', f);
    });

    return this.http
      .post(`${this.conf.apiUri}/catalogo/importar`, formData, {
        params: {
          descricao: descricao,
          ativo: ativo,
        },
      })
      .pipe(catchError(handleError));
  }

  getCatalogo(id: number): Observable<Catalogo> {
    return this.http.get<Catalogo>(`${this.conf.apiUri}/catalogo/lazy/${id}`);
  }
}
