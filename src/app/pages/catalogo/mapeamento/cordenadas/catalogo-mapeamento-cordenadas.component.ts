import { HttpErrorResponse } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { finalize } from 'rxjs';
import { MS3, MS4, MS5 } from 'src/app/contantes/messages';
import { ProdutoService } from 'src/app/pages/produto/services/produto.service';

const posicaoNotificacao = {
  nzPlacement: 'bottomRight',
};

@Component({
  selector: 'app-catalogo-mapeamento-cordenadas-component',
  templateUrl: './catalogo-mapeamento-cordenadas.component.html',
})
export class CatalogoMapeamentoCordenadasComponent implements OnInit {
  faSearch = faSearch;
  faTrash = faTrash;
  produtos = [];
  loading = false;
  referenciaProduto: string;

  @ViewChild('refProduto')
  refProduto: ElementRef;

  constructor(
    @Inject(NZ_DRAWER_DATA) public data: { cordenadas: any; id: number },
    private readonly produtoService: ProdutoService,
    private notification: NzNotificationService,
    private drawerRef: NzDrawerRef
  ) {}

  remover(e) {
    const index = this.produtos.findIndex((f) => f.id === e.id);
    this.produtos.splice(index, 1);
  }

  ngOnInit() {
    setTimeout(() => this.novoLancamento(), 300);
  }

  private novoLancamento() {
    this.refProduto.nativeElement.select();
    this.refProduto.nativeElement.focus();
  }

  pesquisarProduto() {
    this.loading = true;

    const index = this.produtos.findIndex(
      (f) => f.referencia === this.referenciaProduto
    );
    if (index !== -1) {
      this.notification.warning(this.referenciaProduto, MS3, {
        nzPlacement: 'bottomRight',
      });
      return;
    }
    this.produtoService
      .getReferencia(this.referenciaProduto)
      .pipe(
        finalize(() => {
          this.loading = false;
          this.novoLancamento();
        })
      )
      .subscribe({
        next: (value) => {
          this.produtos.push(value);
        },
        error: (err: HttpErrorResponse) => {
          if (err.status === 404) {
            this.notification.error(this.referenciaProduto, MS4, {
              nzPlacement: 'bottomRight',
            });
          } else {
            this.notification.error(this.referenciaProduto, MS5);
          }
        },
      });
  }

  lancarCordenadas() {
    this.drawerRef.close(this.produtos.map((m) => m));
  }
}
