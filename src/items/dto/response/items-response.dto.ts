import { AuthorDto } from "./author.dto";
import { ItemDto } from "./item.dto";

/**
 * formato de respuesta para /api/items?search="busqueda"
 */
export class ItemsResponseDto {
    author: AuthorDto;
    categories:string[];
    items: ItemDto[];
}