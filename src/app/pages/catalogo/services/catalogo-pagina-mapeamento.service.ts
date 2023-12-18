import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, shareReplay, takeUntil, tap } from 'rxjs';
import { CatalogoPaginaMapeamento } from 'src/app/entities/catalogo-pagina-mapeamento';

const CACHE_SIZE = 1;

@Injectable()
export class CatalogoPaginaMapeamentoService {
  private cacheMapeamentoProdutosCordenadas$: Observable<CatalogoPaginaMapeamento>;
  private reload$ = new Subject<void>();
  constructor(private readonly http: HttpClient) {}

  getMapeamentoProdutosCordenadas(
    id: number
  ): Observable<CatalogoPaginaMapeamento> {
    if (!this.cacheMapeamentoProdutosCordenadas$) {
      this.cacheMapeamentoProdutosCordenadas$ =
        this.requestMapeamentoProdutosCordenadas(id).pipe(
          takeUntil(this.reload$),
          shareReplay(CACHE_SIZE)
        );
    }

    return this.cacheMapeamentoProdutosCordenadas$;
  }

  forceReload() {
    this.reload$.next();
    this.cacheMapeamentoProdutosCordenadas$ = null;
  }

  private requestMapeamentoProdutosCordenadas(id: number) {
    return this.http.get<CatalogoPaginaMapeamento>(
      `/catalogo_pagina_mapeamento/lista/${id}`
    );
  }

  deleteProdutoCordenada(id: number, produto: number): Observable<any> {
    return this.http
      .delete(`/catalogo_pagina_mapeamento/deleteMapeado`, {
        params: {
          id: id,
          produto: produto,
        },
      })
      .pipe(tap(() => this.forceReload()));
  }

  lancarCordenada(cordenada: CatalogoPaginaMapeamento) {
    return this.http
      .post<CatalogoPaginaMapeamento>(`/catalogo_pagina_mapeamento`, cordenada)
      .pipe(tap(() => this.forceReload()));
  }
}
