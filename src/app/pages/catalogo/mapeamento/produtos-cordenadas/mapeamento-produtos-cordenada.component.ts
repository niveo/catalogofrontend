import { Component, Inject, OnInit } from '@angular/core';
import {
  faTrash,
  faUpRightFromSquare,
} from '@fortawesome/free-solid-svg-icons';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { Observable, finalize } from 'rxjs';
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

  constructor(
    private readonly catalogoPaginaMapeamentoService: CatalogoPaginaMapeamentoService,
    private readonly nzDrawerRef: NzDrawerRef,
    private notification: NzNotificationService,
    @Inject(NZ_DRAWER_DATA) private data: { id: number }
  ) {}

  ngOnInit() {
    this.carregarData();
  }

  private carregarData() {
    this.loading = true;
    this.produtos$ = this.catalogoPaginaMapeamentoService
      .getMapeamentoProdutoCordenadas(this.data.id)
      .pipe(finalize(() => (this.loading = false)));
  }

  remover(item: CatalogoPaginaMapeamento, produto: Produto) {
    this.catalogoPaginaMapeamentoService
      .deleteProdutoCordenada(item.id, produto.id)
      .subscribe({
        next: () => {
          this.carregarData();
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
