import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Catalogo } from '../../entities/catalogo';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CatalogoImportarComponent } from './importar/catalogo-importar.component';

@Component({
  selector: 'app-catalogo-component',
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent implements OnInit {
  catalogos$!: Observable<Catalogo[]>;
  faUpload = faUpload;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private modalService: NzModalService
  ) {}

  ngOnInit() {
    this.catalogos$ = this.route.data.pipe(switchMap(({ data }) => of(data)));
  }

  navegarDetalhe(id) {
    this.router.navigateByUrl('catalogo/detalhe/' + id);
  }

  navegarImportar() {
    this.modalService.create({
      nzContent: CatalogoImportarComponent,
      nzFooter: null,
    });
  }
}
