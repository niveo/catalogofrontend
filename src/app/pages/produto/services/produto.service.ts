import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Produto } from 'src/app/entities/produto';
import { APP_CONFIG, IConfigToken } from '../../../utils/app-config';
import { handleError } from '../../../utils/handle-error.utils';

@Injectable()
export class ProdutoService {
  constructor(
    private readonly http: HttpClient,
    @Inject(APP_CONFIG) private readonly conf: IConfigToken
  ) {}

  getAll(): Observable<Produto[]> {
    return this.http.get<Produto[]>(`${this.conf.apiUri}/produto`);
  }

  exportarProdutos(file: any[]) {
    const formData = new FormData();
    file.forEach((f) => {
      formData.append('files', f);
    });

    let headers = new HttpHeaders();

    return this.http
      .post(`${this.conf.apiUri}/produto/importar`, formData, {
        headers: headers,
      })
      .pipe(catchError(handleError));
  }
}
