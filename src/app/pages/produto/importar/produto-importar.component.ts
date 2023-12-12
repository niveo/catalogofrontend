import { Component } from '@angular/core';
import { NonNullableFormBuilder } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { finalize } from 'rxjs';
import { MS1, MS2 } from '../../../contantes/messages';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-produto-importar-component',
  templateUrl: './produto-importar.component.html',
})
export class ProdutoImportarComponent {
  fileList: NzUploadFile[] = [];
  enviandoRegistro = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private readonly produtoService: ProdutoService,
    private readonly notification: NzNotificationService
  ) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  submitForm() {
    this.enviandoRegistro = true;
    this.produtoService
      .exportarProdutos(this.fileList)
      .pipe(finalize(() => (this.enviandoRegistro = false)))
      .subscribe({
        error: (err) => {
          console.log(err);
          this.notification.error('Importador', MS2);
        },
        next: (value) => {
          console.log(value);
          this.notification.success('Importador', MS1);
        },
      });
  }
}
