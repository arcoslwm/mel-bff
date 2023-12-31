import { ItemDto } from "../dto/response/item.dto";
import { SearchResultDto } from "../dto/response/search-result.dto";
import { ItemMapper } from "./item.mapper";

export class SearchResponseMapper {
    public static map(data: any): SearchResultDto {
        if (!data.results?.length) {
            return {
                categories: [],
                items: []
            };
        }

        const items: ItemDto[] = data.results.map((item: any) => ItemMapper.map(item));

        /**
         * @todo refactorizar, se puede mejorar abstracción
         */
        //busca categorias en available_filters donde estan los resultados para cada una.
        let categories = data.available_filters?.find((cat) => cat['id'] === 'category')?.values || [];
        if (categories.length) {
            //ordena categorias por resultados y setea array de string con las 5 mayores.
            categories = categories.sort((a, b) => b.results - a.results).slice(0, 5).map(category => category.name);
        }
        else {
            //si no encuentra categorias en available_filters las busca en filters donde no tienen el nro de resultados
            categories = data.filters?.find(
                (cat) => cat['id'] === 'category')?.values[0]?.path_from_root?.filter(
                    category => category.name !== undefined).map(category => category.name) || [];
        }

        return {
            categories: categories,
            items: items
        }
    }
}
