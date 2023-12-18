import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, Subject, catchError, shareReplay, takeUntil } from 'rxjs';
import { Produto } from '../../../entities/produto';
import { APP_CONFIG, IConfigToken } from '../../../utils/app-config';
import { handleError } from '../../../utils/handle-error.utils';

const CACHE_SIZE = 1;

@Injectable()
export class ProdutoService {
  cacheAll$: Observable<Produto[]>;
  private reloadAll$ = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}

  getAll(): Observable<Produto[]> {
    if (!this.cacheAll$) {
      this.cacheAll$ = this.requestAll().pipe(
        takeUntil(this.reloadAll$),
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cacheAll$;
  }

  forceReloadAll() {
    this.reloadAll$.next();
    this.cacheAll$ = null;
  }

  private requestAll() {
    return this.http.get<Produto[]>(`${this.conf.apiUri}/produto`);
  }

  getReferencia(referencia: string): Observable<Produto> {
    return this.http.get<Produto>(
      `${this.conf.apiUri}/produto/referencia/${referencia}`
    );
  }

  exportarProdutos(file: any[], comCabecalho: boolean, separador = ';') {
    const formData = new FormData();
    file.forEach((f) => {
      formData.append('files', f);
    });

    return this.http
      .post(`${this.conf.apiUri}/produto/importar`, formData, {
        params: {
          comCabecalho: comCabecalho,
          separador: separador,
        },
      })
      .pipe(catchError(handleError));
  }
}
