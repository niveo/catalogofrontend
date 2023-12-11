import { BaseEntity } from './base-entity';
import { Catalogo } from './catalogo';
import { CatalogoPaginaMapeamento } from './catalogo-pagina-mapeamento';

export class CatalogoPagina extends BaseEntity {
  pagina?: number;
  size?: number;
  height?: number;
  width?: number;
  name?: number;
  catalogo?: Catalogo;
  mapeamentos?: CatalogoPaginaMapeamento[];
  mapeados?: number = 0;
}
