import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faRefresh, faUpload } from '@fortawesome/free-solid-svg-icons';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject, finalize, merge, mergeMap } from 'rxjs';
import { Produto } from 'src/app/entities/produto';
import { ProdutoImportarComponent } from './importar/produto-importar.component';
import { ProdutoService } from './services/produto.service';

@Component({
  selector: 'app-produto-component',
  templateUrl: './produto.component.html',
})
export class ProdutoComponent implements OnInit {
  produtos$!: Observable<Produto[]>;
  faUpload = faUpload;
  faRefresh = faRefresh;
  loading = false;
  update$ = new Subject<void>();
  forceReload$ = new Subject<void>();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private modalService: NzModalService,
    private readonly produtoService: ProdutoService
  ) {}

  ngOnInit() {
    const inicialData$ = this.carregarData();
    const updates$ = merge(this.update$, this.forceReload$).pipe(
      mergeMap(() => this.carregarData())
    );
    this.produtos$ = merge(inicialData$, updates$);
  }

  carregarData() {
    this.loading = true;
    return (this.produtos$ = this.produtoService
      .getAll()
      .pipe(finalize(() => (this.loading = false))));
  }

  forceReload() {
    this.produtoService.forceReloadAll();
    this.forceReload$.next();
  }

  navegarDetalhe(id) {
    this.router.navigateByUrl('produto/detalhe/' + id);
  }

  navegarImportar() {
    this.modalService
      .create<ProdutoImportarComponent>({
        nzContent: ProdutoImportarComponent,
        nzFooter: null,
      })
      .afterClose.subscribe(() => this.forceReload());
  }
}
