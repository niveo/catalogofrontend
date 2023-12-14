import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  faEdit,
  faRefresh,
  faTrash,
  faUpRightFromSquare,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject, finalize, merge, mergeMap } from 'rxjs';
import { MS6, MS7 } from 'src/app/contantes/messages';
import { Catalogo } from 'src/app/entities/catalogo';
import { APP_CONFIG, IConfigToken } from '../../utils/app-config';
import { CatalogoService } from './services/catalogo.service';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-catalogo-component',
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent implements OnInit {
  catalogos$!: Observable<Catalogo[]>;
  faUpload = faUpload;
  loading = false;
  faTrash = faTrash;
  faRefresh = faRefresh;
  faUpRightFromSquare = faUpRightFromSquare;
  update$ = new Subject<void>();
  forceReload$ = new Subject<void>();
  faEdit = faEdit;

  constructor(
    private readonly router: Router,
    private modalService: NzModalService,
    private readonly catalogoService: CatalogoService,
    @Inject(APP_CONFIG) readonly config: IConfigToken,
    private notification: NzNotificationService
  ) {}

  ngOnInit() {
    const inicialData$ = this.carregarData();
    const updates$ = merge(this.update$, this.forceReload$).pipe(
      mergeMap(() => this.carregarData())
    );
    this.catalogos$ = merge(inicialData$, updates$);
  }

  carregarData() {
    this.loading = true;
    return this.catalogoService
      .getAll()
      .pipe(finalize(() => (this.loading = false)));
  }

  forceReload() {
    this.catalogoService.forceReloadAll();
    this.forceReload$.next();
  }

  visualizar(catalogo: Catalogo) {
    this.router.navigateByUrl('catalogo/detalhe/' + catalogo.id);
  }

  editar(catalogo: Catalogo) {
    this.messageNaoImplementado();
  }

  remover(catalogo: Catalogo) {
    this.modalService.confirm({
      nzTitle: 'Exclusão',
      nzContent: MS6,
      nzOnOk: () => {
        this.catalogoService
          .delete(catalogo.id)
          .pipe(finalize(() => this.forceReload()))
          .subscribe();
      },
    });
  }

  navegarImportar() {
    this.router.navigateByUrl('catalogo/importar');
  }

  private messageNaoImplementado() {
    this.notification.warning('Alerta', MS7);
  }
}
