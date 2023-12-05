import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { CatalogoService } from '../catalogo.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-catalogo-importar-component',
  templateUrl: './catalogo-importar.component.html',
})
export class CatalogoImportarComponent {
  fileList: NzUploadFile[] = [];
  enviandoCatalogo = false;

  constructor(
    private fb: NonNullableFormBuilder,
    private readonly catalogoService: CatalogoService
  ) {}

  beforeUpload = (file: NzUploadFile): boolean => {
    this.validateForm.patchValue({ arquivo: file });
    this.fileList = this.fileList.concat(file);
    return false;
  };

  validateForm: FormGroup<{
    descricao: FormControl<string>;
    ativo: FormControl<boolean>;
    arquivo: FormControl<any>;
  }> = this.fb.group({
    descricao: ['', [Validators.required]],
    ativo: [false],
    arquivo: [null, [Validators.required]],
  });

  submitForm() {
    if (this.validateForm.valid) {
      this.enviandoCatalogo = true;
      this.catalogoService
        .exportarCatalogo(
          this.fileList[0] as any,
          this.validateForm.value.descricao!,
          this.validateForm.value.ativo!
        )
        .pipe(finalize(() => (this.enviandoCatalogo = false)))
        .subscribe({
          error(err) {
            console.log(err);
          },
          next(value) {
            console.log(value);
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
