import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { CatalogoComponent } from './catalogo.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { CatalogoImportarComponent } from './importar/catalogo-importar.component';
import { CatalogoDetalheComponent } from './detalhe/catalogo-detalhe.component';
import { Catalogo } from 'src/app/entities/catalogo';
import { CatalogoService } from './catalogo.service';

const catalogoDetalheResolver: ResolveFn<Catalogo> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(CatalogoService).getCatalogo(Number(route.paramMap.get('id')!));
};

const catalogoResolver: ResolveFn<Catalogo[]> = (
  _route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(CatalogoService).getAll();
};

const routes: Routes = [
  {
    path: '',
    component: CatalogoComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: catalogoResolver,
    },
  },
  {
    path: 'importar',
    component: CatalogoImportarComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'detalhe/:id',
    component: CatalogoDetalheComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: catalogoDetalheResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogosRoutingModule {}
