import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'

@Component({
  selector: 'app-catalogo-mapeamento-component',
  templateUrl: './catalogo-mapeamento.component.html',
})
export class CatalogoMapeamentoComponent implements OnInit {
  constructor(private readonly route: ActivatedRoute, private router: Router, private location: Location) {}

  ngOnInit() {
    this.route.data.subscribe(({ data }) => {
      
      console.log(data);
      
    });
  }

  back(): void {
    this.location.back()
  }
}
