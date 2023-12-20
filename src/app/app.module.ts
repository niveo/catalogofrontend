import { environment } from './../environments/environment';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import pt from '@angular/common/locales/pt';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N, pt_BR } from 'ng-zorro-antd/i18n';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { HIGHLIGHT_OPTIONS, HighlightModule } from 'ngx-highlightjs';
import { FooterComponent } from './componentes/footer/footer.component';
import { HomeLogoButtonComponenet } from './componentes/home-logo-button/home-logo.button.component';
import { LoadingComponent } from './componentes/loading.component';
import { NavBarComponent } from './componentes/nav-bar/nav-bar.component';
import { CatalogoModule } from './pages/catalogo/catalogo.module';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutoModule } from './pages/produto/produto.module';
import { ProfileComponent } from './pages/profile/profile.component';
import { APP_CONFIG } from './utils/app-config'; 

registerLocaleData(pt);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,

    FontAwesomeModule,

    CatalogoModule,
    ProdutoModule,

    NavBarComponent,
    HomeLogoButtonComponenet,
    LoadingComponent,
    ErrorComponent,
 
    NzMenuModule,
    NzButtonModule,
    NzAvatarModule,
    NzToolTipModule,

    HighlightModule,

    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        ...environment.httpInterceptor,
      },
    }),
  ],
  providers: [
    { provide: APP_CONFIG, useValue: environment },
    { provide: NZ_I18N, useValue: pt_BR },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthHttpInterceptor,
      multi: true,
    },
    {
      provide: Window,
      useValue: window,
    },
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          json: () => import('highlight.js/lib/languages/json'),
        },
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
