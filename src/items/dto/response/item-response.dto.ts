import { AuthorDto } from "./author.dto";
import { ItemDto } from "./item.dto";

/**
 * formato de respuesta para /api/item/:id
 */
export class ItemResponseDto {
    author: AuthorDto;
    item: ItemDto;
}