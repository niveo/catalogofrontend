import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import {
  Observable,
  Subject,
  catchError,
  finalize,
  shareReplay,
  takeUntil,
} from 'rxjs';
import { Catalogo } from '../../../entities/catalogo';
import { APP_CONFIG, IConfigToken } from '../../../utils/app-config';
import { handleError } from '../../../utils/handle-error.utils';

const CACHE_SIZE = 1;

@Injectable()
export class CatalogoService {
  cacheAll$: Observable<Catalogo[]>;
  private reloadAll$ = new Subject<void>();

  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}

  getAll(): Observable<Catalogo[]> {
    if (!this.cacheAll$) {
      this.cacheAll$ = this.requestAll().pipe(
        takeUntil(this.reloadAll$),
        shareReplay(CACHE_SIZE)
      );
    }
    return this.cacheAll$;
  }

  private requestAll() {
    return this.http.get<Catalogo[]>(`${this.conf.apiUri}/catalogo`);
  }

  forceReloadAll() {
    this.reloadAll$.next();
    this.cacheAll$ = null;
  }

  delete(id: number) {
    return this.http
      .delete<any>(`${this.conf.apiUri}/catalogo/${id}`)
      .pipe(finalize(() => this.forceReloadAll()));
  }

  exportarCatalogo(
    file: any[],
    fileLogo: any[],
    fileAvatar: any[],
    titulo: string,
    descricao: string,
    ativo: boolean
  ) {
    const formData = new FormData();
    file.forEach((f) => {
      formData.append('files', f);
    });
    formData.append('logo', fileLogo[0]);
    formData.append('avatar', fileAvatar[0]);

    return this.http
      .post(`${this.conf.apiUri}/catalogo/importar`, formData, {
        params: {
          titulo: titulo,
          descricao: descricao,
          ativo: ativo,
        },
      })
      .pipe(finalize(() => this.forceReloadAll()))
      .pipe(catchError(handleError));
  }

  getCatalogo(id: number): Observable<Catalogo> {
    return this.http.get<Catalogo>(`${this.conf.apiUri}/catalogo/lazy/${id}`);
  }
}
