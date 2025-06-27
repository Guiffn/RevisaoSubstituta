import { Item } from "./item";
import { Usuario } from "./usuario";

export interface Comentario {
  comentarioId?: number;
  texto: string;
  data?: string;
  itemId: number;
  item?: Item;
  usuario?: Usuario;
}