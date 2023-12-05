import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-catalogo-component',
  templateUrl: './catalogo.component.html',
})
export class CatalogoComponent implements OnDestroy {
  ngOnDestroy() {
    sessionStorage.clear();
  }
}
