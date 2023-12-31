import { Controller, Get, HttpException, HttpStatus, Logger, NotFoundException, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemResponseDto } from './dto/response/item-response.dto';
import { ItemsService } from './items.service';
import { MeliItemIdParam } from './dto/request/item-id-param.dto';
import { AxiosError } from 'axios';
import { MeliSearchQuery } from './dto/request/search-query.dto';
import { SearchResponseDto } from './dto/response/search-response.dto';

@Controller('api/items')
export class ItemsController {
    private readonly logger = new Logger(ItemsController.name);

    constructor(private itemsService: ItemsService) { }

    @Get(':id')
    @UsePipes(new ValidationPipe())
    async item(@Param() params: MeliItemIdParam): Promise<ItemResponseDto> {
        // this.logger.log(params,`#######${params.id}`);
        try {
            return await this.itemsService.getById(params.id);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status == HttpStatus.NOT_FOUND) {
                throw new NotFoundException(null, 'Item not found');
            }

            this.logger.error(error, `itemById`);
            throw new HttpException('Hemos tenido un problema.', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get()
    async items(@Query() searchQuery: MeliSearchQuery): Promise<SearchResponseDto>  {
        /**
         * @todo validar parametros de busqueda con limite 4(?)
         */
        try {
            const searchResponseDto: SearchResponseDto = await this.itemsService.search(searchQuery);
            if (searchResponseDto.items.length===0) {
                throw new NotFoundException(null, '');
            } 
            return searchResponseDto;
        } catch (error) {
            if (error instanceof NotFoundException || (error instanceof AxiosError && error.response?.status == HttpStatus.NOT_FOUND)) {
                    throw new NotFoundException(null, 'Busqueda sin resultados');
            }
            this.logger.error(error, `itemSearch`);
            throw new HttpException('Hemos tenido un problema en la busqueda', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}