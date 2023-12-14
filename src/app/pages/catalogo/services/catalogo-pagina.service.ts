import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogoPagina } from 'src/app/entities/catalogo-pagina';
import { APP_CONFIG, IConfigToken } from '../../../utils/app-config';

@Injectable()
export class CatalogoPaginaService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}

  getPaginaLazy(id: number): Observable<CatalogoPagina> {
    return this.requestPaginaLazy(id);
  }

  private requestPaginaLazy(id: number) {
    return this.http.get<CatalogoPagina>(
      `${this.conf.apiUri}/catalogo_pagina/lazy/${id}`
    );
  }
}
