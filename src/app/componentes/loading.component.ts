import { Component } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-loading-component',
  template: ` <nz-spin nzSimple [nzSize]="'large'"></nz-spin>`,
  standalone: true,
  imports: [NzSpinModule],
})
export class LoadingComponent {}
