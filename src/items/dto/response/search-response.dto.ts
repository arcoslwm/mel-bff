import { AuthorDto } from "./author.dto";
import { SearchResultDto } from "./search-result.dto";

/**
 * formato de respuesta para /api/items?search="busqueda"
 */
export class SearchResponseDto extends SearchResultDto {
    author: AuthorDto;
}