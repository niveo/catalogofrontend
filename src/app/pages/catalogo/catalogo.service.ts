import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Observable,
  catchError,
  concat,
  forkJoin,
  map,
  of,
  switchMap,
} from 'rxjs';
import { Catalogo } from '../../entities/catalogo';
import { APP_CONFIG, IConfigToken } from '../../utils/app-config';
import { handleError } from '../../utils/handle-error.utils';
import { CatalogoPagina } from 'src/app/entities/catalogo-pagina';

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

    let headers = new HttpHeaders();

    return this.http
      .post(`${this.conf.apiUri}/catalogo/importar`, formData, {
        params: {
          descricao: descricao,
          ativo: ativo,
        },
        headers: headers,
      })
      .pipe(catchError(handleError));
  }

  getCatalogo(id: number): Observable<Catalogo> {
    const calCatalogo = this.http.get<Catalogo>(
      `${this.conf.apiUri}/catalogo/${id}`
    );
    const calCatalogoPaginas = this.http.get<CatalogoPagina[]>(
      `${this.conf.apiUri}/catalogo_pagina`,
      {
        params: {
          idCatalogo: id,
        },
      }
    );
    return forkJoin([calCatalogo, calCatalogoPaginas]).pipe(
      map((data) => {
        data[0].paginas = data[1];
        return data[0];
      })
    );
  }
}
