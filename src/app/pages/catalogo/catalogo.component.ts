import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  faRefresh,
  faTrash,
  faUpRightFromSquare,
  faUpload,
} from '@fortawesome/free-solid-svg-icons';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Observable, Subject, finalize, merge, mergeMap } from 'rxjs';
import { MS6 } from 'src/app/contantes/messages';
import { Catalogo } from '../../entities/catalogo';
import { CatalogoImportarComponent } from './importar/catalogo-importar.component';
import { CatalogoService } from './services/catalogo.service';

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

  constructor(
    private readonly router: Router,
    private modalService: NzModalService,
    private readonly catalogoService: CatalogoService
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

  remover(catalogo: Catalogo) {
    this.modalService.confirm({
      nzTitle: 'Exclusão',
      nzContent: MS6,
      nzOnOk: () => {
        this.catalogoService
          .delete(catalogo.id)
          .subscribe(() => this.forceReload());
      },
    });
  }

  navegarImportar() {
    this.modalService.create({
      nzContent: CatalogoImportarComponent,
      nzFooter: null,
    });
  }
}
