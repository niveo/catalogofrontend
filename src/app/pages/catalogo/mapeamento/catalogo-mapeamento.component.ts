import { Location } from '@angular/common';
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import {
  faArrowLeft,
  faCancel,
  faCrop,
  faFloppyDisk,
  faHand,
  faList,
  faRefresh,
} from '@fortawesome/free-solid-svg-icons';
import { CropperComponent } from 'angular-cropperjs';
import { NzDrawerRef, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { MS5 } from 'src/app/contantes/messages';
import { APP_CONFIG, IConfigToken } from 'src/app/utils/app-config';
import { CatalogoPaginaMapeamentoService } from '../services/catalogo-pagina-mapeamento.service';
import { CatalogoPagina } from './../../../entities/catalogo-pagina';
import { CatalogoMapeamentoCordenadasComponent } from './cordenadas/catalogo-mapeamento-cordenadas.component';
import { MapeamentoProdutosCordenadaComponent } from './produtos-cordenadas/mapeamento-produtos-cordenada.component';
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
  faList = faList;
  faRefresh = faRefresh;

  configCropper: any = { checkCrossOrigin: false, autoCrop: false };
  identificador: string;
  catalogoPagina: CatalogoPagina;

  salvarDireto = false;

  nzDrawerCordenadas: NzDrawerRef<MapeamentoProdutosCordenadaComponent>;

  @ViewChild('angularCropper', { static: true })
  public angularCropper: CropperComponent;

  @ViewChild('refBtnAtualizaCordenadas')
  refBtnAtualizaCordenadas;

  situacaoCropper: 'move' | 'crop' | 'reset' = 'move';

  constructor(
    private readonly route: ActivatedRoute,
    private location: Location,
    @Inject(APP_CONFIG) public readonly config: IConfigToken,
    private drawerService: NzDrawerService,
    private notification: NzNotificationService,
    private readonly catalogoPaginaMapeamentoService: CatalogoPaginaMapeamentoService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.identificador = params.get('identificador');
      this.route.data.subscribe(({ data }) => (this.catalogoPagina = data));
    });

    this.angularCropper.image.nativeElement.addEventListener('cropend', () => {
      if (this.salvarDireto && this.situacaoCropper === 'crop') {
        this.iniciarLancarCordenadas();
      }
    });
    this.setDragModeMove();
  }

  setDragModeMove() {
    this.angularCropper.cropper.setDragMode('move');
    this.situacaoCropper = 'move';
  }

  setDragModeCrop() {
    this.angularCropper.cropper.setDragMode('crop');
    this.situacaoCropper = 'crop';
  }

  cropperReset() {
    this.angularCropper.cropper.clear();
    this.angularCropper.cropper.reset();
    this.situacaoCropper = 'reset';
  }

  atualizarCordenadas() {
    this.nzDrawerCordenadas.getContentComponent().forceReload();
  }

  visualizarProdutosCordenadas() {
    this.nzDrawerCordenadas = this.drawerService.create({
      nzContent: MapeamentoProdutosCordenadaComponent,
      nzData: {
        id: this.catalogoPagina.id,
      },
      nzExtra: this.refBtnAtualizaCordenadas,
    });

    this.nzDrawerCordenadas.afterClose.subscribe((data) => {
      if (data) {
        setTimeout(() => {
          this.cropperReset();
          this.angularCropper.cropper.crop();
          this.angularCropper.cropper.setData({
            x: data.inicialPosicalX,
            y: data.inicialPosicalY,
            width: data.width,
            height: data.height,
            rotate: 0,
          });
        });
      }
    });
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
            .lancarCordenada({
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
              error: (err) => {
                console.error(err);
                this.notification.error('Cordenadas', MS5);
              },
            });
        }
      });
  }

  back(): void {
    this.location.back();
  }
}
