import { Component, OnDestroy, OnInit } from '@angular/core';
import { CatalogoService } from './catalogo.service';

@Component({
  selector: 'app-catalogo-component',
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent implements OnDestroy, OnInit {
  constructor(private readonly catalogoService: CatalogoService) {}

  ngOnInit() {
    this.catalogoService.getAll().subscribe((sb) => console.log(sb));
  }
  ngOnDestroy() {
    sessionStorage.clear();
  }
}
