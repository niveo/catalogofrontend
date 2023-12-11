import { CatalogoPagina } from './../../../entities/catalogo-pagina';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';
import { CropperComponent } from 'angular-cropperjs';
import {
  faArrowLeft,
  faHand,
  faCrop,
  faCancel,
  faFloppyDisk,
} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-catalogo-mapeamento-component',
  templateUrl: './catalogo-mapeamento.component.html',
})
export class CatalogoMapeamentoComponent implements OnInit {
  faBackward = faArrowLeft;
  faHand = faHand;
  faCrop = faCrop;
  faCancel = faCancel;
  faFloppyDisk = faFloppyDisk;

  configCropper: any = { checkCrossOrigin: false, autoCrop: false };
  identificador: string;
  catalogoPagina: CatalogoPagina;

  salvarDireto = false;

  @ViewChild('angularCropper', { static: true })
  public angularCropper: CropperComponent;

  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private location: Location,
    @Inject(APP_CONFIG) public readonly config: IConfigToken
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.identificador = params.get('identificador');

      this.route.data.subscribe(({ data }) => {
        this.catalogoPagina = data;
      });
    });

    this.angularCropper.image.nativeElement.addEventListener('cropend', () => {
      if (this.salvarDireto) {
        this.salvar();
      }
    });
  }

  setDragModeMove() {
    this.angularCropper.cropper.setDragMode('move');
  }

  setDragModeCrop() {
    this.angularCropper.cropper.setDragMode('crop');
  }

  cropperReset() {
    this.angularCropper.cropper.clear();
    this.angularCropper.cropper.reset();
  }

  salvar() {}

  back(): void {
    this.location.back();
  }
}
