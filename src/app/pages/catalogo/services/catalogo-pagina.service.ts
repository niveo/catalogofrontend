import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Catalogo } from '../../../entities/catalogo';
import { APP_CONFIG, IConfigToken } from '../../../utils/app-config';

@Injectable()
export class CatalogoPaginaService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}

  getPaginaLazy(id: number): Observable<Catalogo> {
    return this.http.get<Catalogo>(`${this.conf.apiUri}/catalogo_pagina/lazy/${id}`);
  }
}
