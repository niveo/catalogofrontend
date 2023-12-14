import { Component } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { finalize } from 'rxjs';
import { MS1, MS2 } from '../../../contantes/messages';
import { CatalogoService } from '../services/catalogo.service';

@Component({
  selector: 'app-catalogo-importar-component',
  templateUrl: './catalogo-importar.component.html',
})
export class CatalogoImportarComponent {
  fileList: NzUploadFile[] = [];
  enviandoCatalogo = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private readonly catalogoService: CatalogoService,
    private readonly router: Router,
    private readonly notification: NzNotificationService,
    private drawerRef: NzModalRef
  ) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    this.validateForm.patchValue({ arquivo: this.fileList });
    return false;
  };

  validateForm: FormGroup = this.fb.group({
    descricao: ['', [Validators.required]],
    titulo: ['', [Validators.required]],
    ativo: [false],
    arquivo: [null, [Validators.required]],
  });

  submitForm() {
    if (this.validateForm.valid) {
      this.enviandoCatalogo = true;
      this.catalogoService
        .exportarCatalogo(
          this.fileList,
          this.validateForm.value.titulo!,
          this.validateForm.value.descricao!,
          this.validateForm.value.ativo!
        )
        .pipe(finalize(() => (this.enviandoCatalogo = false)))
        .subscribe({
          error: (err) => {
            console.log(err);
            this.notification.error('Importador', MS2);
          },
          next: (value) => {
            console.log(value);
            this.notification.success('Importador', MS1);
            this.drawerRef.close();
            this.router.navigateByUrl('catalogo/detalhe/' + value);
          },
        });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
