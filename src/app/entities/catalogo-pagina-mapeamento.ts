import { BaseEntity } from './base-entity';
import { CatalogoPagina } from './catalogo-pagina';

export class CatalogoPaginaMapeamento extends BaseEntity {
  inicialPosicalX?: number;

  finalPosicalX?: number;

  inicialPosicalY?: number;

  finalPosicalY?: number;

  width?: number;

  height?: number;

  catalogoPagina?: CatalogoPagina;
}
