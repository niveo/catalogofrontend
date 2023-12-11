import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '@auth0/auth0-angular';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/notfound/page-not-found.component';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'catalogo',
    loadChildren: () =>
      import('./pages/catalogo/catalogo.module').then((m) => m.CatalogoModule),
    data: { preload: true },
  },
  {
    path: 'produto',
    loadChildren: () =>
      import('./pages/produto/produto.module').then((m) => m.ProdutoModule),
    data: { preload: true },
  },
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
