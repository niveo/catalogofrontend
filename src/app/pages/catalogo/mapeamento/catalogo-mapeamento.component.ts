import { CatalogoService } from './../services/catalogo.service';
import { Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  faArrowLeft,
  faCancel,
  faCrop,
  faFloppyDisk,
  faHand,
} from '@fortawesome/free-solid-svg-icons';
import { CropperComponent } from 'angular-cropperjs';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';
import { CatalogoPagina } from './../../../entities/catalogo-pagina';
import { CatalogoMapeamentoCordenadasComponent } from './cordenadas/catalogo-mapeamento-cordenadas.component';
import { CatalogoPaginaMapeamentoService } from '../services/catalogo-pagina-mapeamento.service';
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
    @Inject(APP_CONFIG) public readonly config: IConfigToken,
    private drawerService: NzDrawerService,
    private readonly catalogoPaginaMapeamentoService: CatalogoPaginaMapeamentoService
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
        this.iniciarLancarCordenadas();
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

  iniciarLancarCordenadas() {
    const cordenadas = this.angularCropper.cropper.getData();
    if (cordenadas.x === 0 && cordenadas.y === 0) return;
    this.drawerService
      .create({
        nzContent: CatalogoMapeamentoCordenadasComponent,
        nzData: {
          cordenadas: cordenadas,
          id: this.catalogoPagina.id,
        },
        nzFooter: null,
      })
      .afterClose.subscribe((data: any[]) => {
        if (data) {
          this.catalogoPaginaMapeamentoService
            .lancarMapeamento({
              catalogoPagina: this.catalogoPagina,
              produtos: data,
              inicialPosicalX: cordenadas.x,
              inicialPosicalY: cordenadas.y,
              finalPosicalX: cordenadas.x + cordenadas.width,
              finalPosicalY: cordenadas.y + cordenadas.height,
              width: cordenadas.width,
              height: cordenadas.height,
            })
            .subscribe({
              next(value) {
                console.log(value);
              },
              error(err) {
                console.error(err);
              },
            });
        }
      });
  }

  back(): void {
    this.location.back();
  }
}
