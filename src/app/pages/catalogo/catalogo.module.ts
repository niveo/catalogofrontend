import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AngularCropperjsModule } from 'angular-cropperjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { CatalogoMapeamentoCordenadasComponent } from './mapeamento/cordenadas/catalogo-mapeamento-cordenadas.component';
import { NzListModule } from 'ng-zorro-antd/list';
import { CatalogoPaginaMapeamentoService } from './services/catalogo-pagina-mapeamento.service';
import { MapeamentoProdutosCordenadaComponent } from './mapeamento/produtos-cordenadas/mapeamento-produtos-cordenada.component';
import { BolHumanPipe } from 'src/app/pipes/bolhuman.pipe';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';

@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    CatalogosRoutingModule,
    FontAwesomeModule,
    NzUploadModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    NzModalModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzSpinModule,
    NzGridModule,
    NzDrawerModule,
    NzToolTipModule,
    NzListModule,
    FilesizebrPipe,
    NzCardModule,
    NzAvatarModule,
    BolHumanPipe,
    AngularCropperjsModule,
    ImagekitioAngularModule.forRoot({
      publicKey: environment.imageKitPublicKey,
      urlEndpoint: environment.imageKitUrlEndPoint,
    }),
  ],
  declarations: [
    CatalogoComponent,
    CatalogoDetalheComponent,
    CatalogoImportarComponent,
    CatalogoMapeamentoComponent,
    CatalogoMapeamentoCordenadasComponent,
    MapeamentoProdutosCordenadaComponent,
  ],
  providers: [
    CatalogoService,
    CatalogoPaginaService,
    CatalogoPaginaMapeamentoService,
  ],
})
export class CatalogoModule {}
