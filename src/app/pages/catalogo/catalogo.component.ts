import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { Catalogo } from 'src/app/entities/catalogo';

@Component({
  selector: 'app-catalogo-component',
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent implements OnInit {
  catalogos$!: Observable<Catalogo[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.catalogos$ = this.route.data.pipe(switchMap(({ data }) => of(data)));
  }

  navegarDetalhe(id) {
    this.router.navigateByUrl('catalogo/detalhe/' + id);
  }
}
