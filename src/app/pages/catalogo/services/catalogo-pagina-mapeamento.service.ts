import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { concat, zip } from 'rxjs';
import { Catalogo } from '../../../entities/catalogo';
import { APP_CONFIG, IConfigToken } from '../../../utils/app-config';
import { CatalogoPaginaMapeamento } from 'src/app/entities/catalogo-pagina-mapeamento';
import { Produto } from 'src/app/entities/produto';

@Injectable()
export class CatalogoPaginaMapeamentoService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}

  lancarMapeamento(cordenada: CatalogoPaginaMapeamento) {
    return this.http.post<CatalogoPaginaMapeamento>(
      `${this.conf.apiUri}/catalogo_pagina_mapeamento`,
      cordenada
    );
  }
}
