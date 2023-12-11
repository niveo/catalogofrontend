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
import { environment } from 'src/environments/environment.development'; 
import { ImagekitioAngularModule } from 'imagekit-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { FilesizebrPipe } from '../../pipes/filesizebr.pipe';

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
    NzGridModule,
    FilesizebrPipe,
    ImagekitioAngularModule.forRoot({
      publicKey: environment.imageKitPublicKey,
      urlEndpoint: environment.imageKitUrlEndPoint,
    }),
  ],
  declarations: [
    CatalogoComponent,
    CatalogoDetalheComponent,
    CatalogoImportarComponent,
  ],
  providers: [CatalogoService],
})
export class CatalogoModule {}
