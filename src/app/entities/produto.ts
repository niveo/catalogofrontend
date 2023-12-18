import { BaseEntity } from './base-entity'; 

export class Produto extends BaseEntity {
  referencia?: string;
  descricao?: string;
  userId?: string;
  identificador?: string;
  ativo: boolean = false;
  mapeados?: number;
}
