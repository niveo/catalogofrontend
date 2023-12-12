import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { ProdutoImportarComponent } from './importar/produto-importar.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoComponent } from './produto.component';
import { ProdutoService } from './services/produto.service';
@NgModule({
  imports: [
    CommonModule,
    NzFormModule,
    FormsModule,
    ProdutoRoutingModule,
    FontAwesomeModule,
    NzUploadModule,
    NzButtonModule,
    NzInputModule,
    NzCheckboxModule,
    ReactiveFormsModule,
    HttpClientModule,
    NzSpinModule,
    NzGridModule,
    NzToolTipModule,
    NzModalModule,
  ],
  declarations: [ProdutoComponent, ProdutoImportarComponent],
  providers: [ProdutoService],
})
export class ProdutoModule {}
