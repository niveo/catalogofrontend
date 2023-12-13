import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  faTrash,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import {
  BehaviorSubject,
  Observable,
  Subject,
  finalize,
  merge,
  mergeMap,
} from 'rxjs';
import { CatalogoPaginaMapeamentoService } from '../../services/catalogo-pagina-mapeamento.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { Produto } from 'src/app/entities/produto';
import { CatalogoPaginaMapeamento } from 'src/app/entities/catalogo-pagina-mapeamento';
import { MS5 } from 'src/app/contantes/messages';

@Component({
  selector: 'app-mapeamento-produtos-cordenada-component',
  templateUrl: './mapeamento-produtos-cordenada.component.html',
})
export class MapeamentoProdutosCordenadaComponent implements OnInit {
  produtos$: Observable<any>;
  loading = false;
  faTrash = faTrash;
  faUpRightFromSquare = faUpRightFromSquare;
  update$ = new Subject<void>();
  forceReload$ = new Subject<void>();

  constructor(
    private readonly catalogoPaginaMapeamentoService: CatalogoPaginaMapeamentoService,
    private readonly nzDrawerRef: NzDrawerRef,
    private notification: NzNotificationService,
    @Inject(NZ_DRAWER_DATA)
    private data: { id: number }
  ) {
    nzDrawerRef.nzBodyStyle = {
      padding: '0px',
    };
  }

  ngOnInit() {
    const inicialProdutos$ = this.carregarData();
    const updates$ = merge(this.update$, this.forceReload$).pipe(
      mergeMap(() => this.carregarData())
    );
    this.produtos$ = merge(inicialProdutos$, updates$);
  }

  private carregarData() {
    this.loading = true;
    return this.catalogoPaginaMapeamentoService
      .getMapeamentoProdutosCordenadas(this.data.id)
      .pipe(finalize(() => (this.loading = false)));
  }

  forceReload() {
    this.catalogoPaginaMapeamentoService.forceReload();
    this.forceReload$.next();
  }

  remover(item: CatalogoPaginaMapeamento, produto: Produto) {
    this.catalogoPaginaMapeamentoService
      .deleteProdutoCordenada(item.id, produto.id)
      .subscribe({
        next: () => {
          this.forceReload();
        },
        error: (err) => {
          console.error(err);
          this.notification.error(produto.referencia, MS5);
        },
      });
  }

  visualizar(item: CatalogoPaginaMapeamento) {
    this.nzDrawerRef.close(item);
  }
}
