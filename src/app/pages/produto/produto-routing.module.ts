import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { ProdutoComponent } from './produto.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { Produto } from 'src/app/entities/produto';
import { ProdutoService } from './services/produto.service';

const catalogoResolver: ResolveFn<Produto[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(ProdutoService).getAll();
};

const routes: Routes = [
  {
    path: '',
    component: ProdutoComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: catalogoResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}
