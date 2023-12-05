import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CatalogosRoutingModule } from './catalago-routing.module';
import { CatalogoComponent } from './catalogo.component';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { CatalogoImportarComponent } from './importar/catalogo-importar.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { HttpClientModule } from '@angular/common/http';
import { CatalogoService } from './catalogo.service';
import { NzSpinModule } from 'ng-zorro-antd/spin';

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
    NzSpinModule
  ],
  declarations: [CatalogoComponent, CatalogoImportarComponent],
  providers: [CatalogoService],
})
export class CatalogoModule {}
