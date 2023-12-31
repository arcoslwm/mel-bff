import { Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemResponseDto } from './dto/response/item-response.dto';
import { ItemsService } from './items.service';
import { MeliItemIdParam } from './dto/request/item-id-param.dto';
import { AxiosError } from 'axios';
import { MeliSearchQuery } from './dto/request/search-query.dto';
import { SearchResponseDto } from './dto/response/search-response.dto';

@Controller('api/items')
export class ItemsController {
    constructor(private itemsService: ItemsService) { }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    async item(@Param() params: MeliItemIdParam): Promise<ItemResponseDto> {
        console.debug(`ItemsController.item item:`, params.id);
        try {
            return await this.itemsService.getById(params.id);
        } catch (error) {
            let logged = false;
            if (error instanceof AxiosError) {
                if (error.response?.status == HttpStatus.NOT_FOUND) {
                    throw new NotFoundException(null, 'Item not found');
                }
                /**
                 * @todo logear error con error.toJSON en caso de ser axios error, como pueden haber otros errores el tros queda fuera del if.
                 */
                logged = true;
                console.warn(`###ItemsController AxiosError`, error.toJSON());
            }
            if(!logged){
                console.warn(`###ItemsController AxiosError`, error);
            }
            throw new HttpException('Hemos tenido un problema.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async items(@Query() searchQuery: MeliSearchQuery): Promise<SearchResponseDto>  {
        /**
         * @todo validar parametros de busqueda con limite 4(?)
         */
        console.debug(`ItemsController.items searchQuery:`, searchQuery);
        try {
            return await this.itemsService.search(searchQuery);
        } catch (error) {
            let logged = false;
            if (error instanceof AxiosError) {
                if (error.response?.status == HttpStatus.NOT_FOUND) {
                    throw new NotFoundException(null, 'No encontrado');
                }
                /**
                 * @todo logear error con error.toJSON en caso de ser axios error, como pueden haber otros errores el tros queda fuera del if.
                 */
                logged = true;
                console.warn(`###ItemsController AxiosError`, error.toJSON());
            }
            if(!logged){
                console.warn(`###ItemsController AxiosError`, error);
            }
            throw new HttpException('Hemos tenido un problema en la busqueda', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}