import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzResizeDirection, NzResizeEvent } from 'ng-zorro-antd/resizable';
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
  width = 400;
  height = 200;
  id = -1;
  disabled = false;
  resizeDirection: NzResizeDirection | null = null;

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

  onResize({ width, height, direction }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
      this.resizeDirection = direction!;
    });
  }
}
