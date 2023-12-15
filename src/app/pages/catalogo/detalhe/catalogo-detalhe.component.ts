import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Catalogo } from 'src/app/entities/catalogo';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';

@Component({
  selector: 'app-catalogo-detalhe-component',
  templateUrl: './catalogo-detalhe.component.html',
  styleUrl: './catalogo-detalhe.component.scss',
})
export class CatalogoDetalheComponent implements OnInit {
  catalogo?: Catalogo;

  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    @Inject(APP_CONFIG) public readonly config: IConfigToken
  ) {}

  ngOnInit() {
    this.route.data.subscribe(({ data }) => {
      this.catalogo = data;
    });
  }

  navegarMapeamento(id: number) {
    this.router.navigate([
      'catalogo/mapeamento/' + id,
      {
        identificador: this.catalogo.identificador,
      },
    ]);
  }
}
