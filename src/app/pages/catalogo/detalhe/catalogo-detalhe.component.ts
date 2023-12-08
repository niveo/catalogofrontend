import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NzResizeDirection, NzResizeEvent } from 'ng-zorro-antd/resizable';
import { Catalogo } from 'src/app/entities/catalogo';

@Component({
  selector: 'app-catalogo-detalhe-component',
  templateUrl: './catalogo-detalhe.component.html',
  styleUrl: './catalogo-detalhe.component.scss',
})
export class CatalogoDetalheComponent implements OnInit {
  catalogo?: Catalogo;

  constructor(private readonly route: ActivatedRoute, private router: Router) {}
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

 
  onResize({ width, height, direction }: NzResizeEvent): void {
    cancelAnimationFrame(this.id);
    this.id = requestAnimationFrame(() => {
      this.width = width!;
      this.height = height!;
      this.resizeDirection = direction!;
    });
  }
}
