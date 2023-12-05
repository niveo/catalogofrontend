import { HttpClient } from '@angular/common/http';
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

  constructor(
    private fb: NonNullableFormBuilder,
    private readonly http: HttpClient
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
      const formData = new FormData();
      formData.append('file', this.fileList[0] as any);
      this.http
        .post('http://localhost:7000/catalogo/importar', formData, {
          params: {
            descricao: this.validateForm.value.descricao!,
            ativo: this.validateForm.value.ativo!,
          },
        })
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
