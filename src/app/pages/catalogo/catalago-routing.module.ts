import { NgModule, inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { Catalogo } from '../../entities/catalogo';
import { CatalogoPagina } from '../../entities/catalogo-pagina';
import { CatalogoComponent } from './catalogo.component'; 
import { CatalogoMapeamentoComponent } from './mapeamento/catalogo-mapeamento.component';
import { CatalogoPaginaService } from './services/catalogo-pagina.service';
import { CatalogoService } from './services/catalogo.service';
import { CatalogoImportarComponent } from './importar/catalogo-importar.component';
import { CatalogoPaginasComponent } from './paginas/catalogo-paginas.component';

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

const routes: Routes = [
  {
    path: '',
    component: CatalogoComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'paginas/:id',
    component: CatalogoPaginasComponent,
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
  {
    path: 'importar',
    component: CatalogoImportarComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogosRoutingModule {}
