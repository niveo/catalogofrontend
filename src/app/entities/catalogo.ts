import { BaseEntity } from './base-entity';
import { CatalogoPagina } from './catalogo-pagina';

export class Catalogo extends BaseEntity {
  descricao?: string;
  userId?: string;
  identificador?: string;
  ativo: boolean = false;
  paginas: CatalogoPagina[] = [];
}
