import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faEdit,
  faRefresh,
  faTrash,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject, finalize, merge, mergeMap } from 'rxjs';
import { Produto } from '../../entities/produto';
import { ProdutoImportarComponent } from './importar/produto-importar.component';
import { ProdutoService } from './services/produto.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MS7 } from '../../contantes/messages';

@Component({
  selector: 'app-produto-component',
  templateUrl: './produto.component.html',
})
export class ProdutoComponent implements OnInit {
  produtos$!: Observable<Produto[]>;
  faUpload = faUpload;
  faRefresh = faRefresh;
  faEdit = faEdit;
  loading = false;
  update$ = new Subject<void>();
  forceReload$ = new Subject<void>();
  faTrash = faTrash;

  constructor(
    private readonly router: Router,
    private modalService: NzModalService,
    private readonly produtoService: ProdutoService,
    private notification: NzNotificationService
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

  visualizar(item: Produto) {
    this.messageNaoImplementado();
  }

  remover(item: Produto) {
    this.messageNaoImplementado();
  }

  editar(item: Produto) {
    this.messageNaoImplementado();
  }

  private messageNaoImplementado() {
    this.notification.warning('Alerta', MS7);
  }
}
