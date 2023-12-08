import {
  CommonModule,
  IMAGE_LOADER,
  ImageLoaderConfig,
  NgOptimizedImage,
  provideImageKitLoader,
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CatalogosRoutingModule } from './catalago-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { CatalogoService } from './catalogo.service';
import { CatalogoDetalheComponent } from './detalhe/catalogo-detalhe.component';
import { CatalogoImportarComponent } from './importar/catalogo-importar.component';

@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    CatalogosRoutingModule,
    NzUploadModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzSpinModule,
    NgOptimizedImage,
  ],
  declarations: [
    CatalogoComponent,
    CatalogoDetalheComponent,
    CatalogoImportarComponent,
  ],
  providers: [
    CatalogoService,
    {
      provide: IMAGE_LOADER,
      useValue: (config: ImageLoaderConfig) => {
        return `https://ik.imagekit.io/aspofp9v1/catalogo/${config.src}`;
      },
    },
  ],
})
export class CatalogoModule {}
