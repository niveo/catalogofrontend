import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { CatalogoPagina } from 'src/app/entities/catalogo-pagina';
import { CatalogoPaginaMapeamentoService } from './catalogo-pagina-mapeamento.service';

@Injectable()
export class CatalogoPaginaService {
  constructor(
    private readonly http: HttpClient,
    private readonly catalogoPaginaMapeamentoService: CatalogoPaginaMapeamentoService
  ) {}

  /**
   * @param id
   * @returns
   * Após carregar a pagina limpar o cache dos mapeamentos
   */
  getPaginaLazy(id: number): Observable<CatalogoPagina> {
    return this.requestPaginaLazy(id).pipe(
      finalize(() => this.catalogoPaginaMapeamentoService.forceReload())
    );
  }

  private requestPaginaLazy(id: number) {
    return this.http.get<CatalogoPagina>(`/catalogo_pagina/lazy/${id}`);
  }
}
