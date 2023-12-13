import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, map, shareReplay } from 'rxjs';
import { CatalogoPagina } from 'src/app/entities/catalogo-pagina';
import { APP_CONFIG, IConfigToken } from '../../../utils/app-config';

const CACHE_SIZE = 1;

@Injectable()
export class CatalogoPaginaService {
  private cachePaginaLazy$: Observable<CatalogoPagina>;

  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}

  getPaginaLazy(id: number): Observable<CatalogoPagina> {
    if (!this.cachePaginaLazy$) {
      this.cachePaginaLazy$ = this.requestPaginaLazy(id).pipe(
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cachePaginaLazy$;
  }

  private requestPaginaLazy(id: number) {
    return this.http.get<CatalogoPagina>(
      `${this.conf.apiUri}/catalogo_pagina/lazy/${id}`
    );
  }
}
