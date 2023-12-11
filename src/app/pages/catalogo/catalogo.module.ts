import {
  CommonModule
} from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ImagekitioAngularModule } from 'imagekit-angular';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { environment } from 'src/environments/environment.development';
import { FilesizebrPipe } from '../../pipes/filesizebr.pipe';
import { CatalogosRoutingModule } from './catalago-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { CatalogoDetalheComponent } from './detalhe/catalogo-detalhe.component';
import { CatalogoImportarComponent } from './importar/catalogo-importar.component';
import { CatalogoMapeamentoComponent } from './mapeamento/catalogo-mapeamento.component';
import { CatalogoService } from './services/catalogo.service';
import { CatalogoPaginaService } from './services/catalogo-pagina.service';

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
    NzToolTipModule,
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
    CatalogoMapeamentoComponent
  ],
  providers: [CatalogoService, CatalogoPaginaService],
})
export class CatalogoModule {}
