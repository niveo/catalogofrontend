import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogoComponent } from './catalogo.component';
import { AuthGuard } from '@auth0/auth0-angular';
import { CatalogoImportarComponent } from './importar/catalogo-importar.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogoComponent,
    canActivate: [AuthGuard],
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
