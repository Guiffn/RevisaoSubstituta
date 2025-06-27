import { Categoria } from "./Categoria";
import { Comentario } from "./Comentario";

export interface Item {
  itemId: number;
  nome: string;
  categoriaId: number;
  categoria?: Categoria;
  criadoEm: string;
  comentarios?: Comentario[];
}