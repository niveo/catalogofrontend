import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CatalogoPaginaMapeamento } from 'src/app/entities/catalogo-pagina-mapeamento';
import { APP_CONFIG, IConfigToken } from '../../../utils/app-config';
import { Observable } from 'rxjs';

@Injectable()
export class CatalogoPaginaMapeamentoService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}

  getMapeamentoProdutoCordenadas(
    id: number
  ): Observable<CatalogoPaginaMapeamento> {
    return this.http.get<CatalogoPaginaMapeamento>(
      `${this.conf.apiUri}/catalogo_pagina_mapeamento/lista/${id}`
    );
  }

  deleteProdutoCordenada(id: number, produto: number): Observable<any> {
    return this.http.delete(
      `${this.conf.apiUri}/catalogo_pagina_mapeamento/deleteMapeado`,
      {
        params: {
          id: id,
          produto: produto,
        },
      }
    );
  }

  lancarMapeamento(cordenada: CatalogoPaginaMapeamento) {
    return this.http.post<CatalogoPaginaMapeamento>(
      `${this.conf.apiUri}/catalogo_pagina_mapeamento`,
      cordenada
    );
  }
}
