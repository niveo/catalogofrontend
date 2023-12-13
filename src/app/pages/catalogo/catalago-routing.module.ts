import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { Catalogo } from 'src/app/entities/catalogo';
import { CatalogoPagina } from 'src/app/entities/catalogo-pagina';
import { CatalogoComponent } from './catalogo.component';
import { CatalogoDetalheComponent } from './detalhe/catalogo-detalhe.component';
import { CatalogoMapeamentoComponent } from './mapeamento/catalogo-mapeamento.component';
import { CatalogoPaginaService } from './services/catalogo-pagina.service';
import { CatalogoService } from './services/catalogo.service';

const catalogoDetalhePaginaResolver: ResolveFn<CatalogoPagina> = (
  route: ActivatedRouteSnapshot,
  _state: RouterStateSnapshot
) => {
  return inject(CatalogoPaginaService).getPaginaLazy(
    Number(route.paramMap.get('id')!)
  );
};

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
    path: 'detalhe/:id',
    component: CatalogoDetalheComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: catalogoDetalheResolver,
    },
  },
  {
    path: 'mapeamento/:id',
    component: CatalogoMapeamentoComponent,
    canActivate: [AuthGuard],
    resolve: {
      data: catalogoDetalhePaginaResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogosRoutingModule {}
