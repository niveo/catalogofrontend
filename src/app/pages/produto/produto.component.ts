import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { Produto } from 'src/app/entities/produto';

@Component({
  selector: 'app-produto-component',
  templateUrl: './produto.component.html',
})
export class ProdutoComponent implements OnInit {
  produtos$!: Observable<Produto[]>;
  faUpload = faUpload;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) {}

  ngOnInit() {
    this.produtos$ = this.route.data.pipe(switchMap(({ data }) => of(data)));
  }

  navegarDetalhe(id) {
    this.router.navigateByUrl('produto/detalhe/' + id);
  }

  navegarImportar() {
    this.router.navigateByUrl('produto/importar');
  }
}
