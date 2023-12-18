import { BaseEntity } from './base-entity';
import { CatalogoPagina } from './catalogo-pagina';

export class Catalogo extends BaseEntity {
  titulo?: string; 
  descricao?: string; 
  avatar?: string;
  logo?: string;
  identificador?: string;
  ativo: boolean = false;
  paginas: CatalogoPagina[] = [];
}
