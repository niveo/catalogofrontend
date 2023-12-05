import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam, NzUploadFile } from 'ng-zorro-antd/upload';

@Component({
  selector: 'app-catalogo-importar-component',
  templateUrl: './catalogo-importar.component.html',
})
export class CatalogoImportarComponent {
  fileList: NzUploadFile[] = [];

  constructor(private fb: NonNullableFormBuilder) {}

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
      console.log('submit', this.validateForm.value);
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
