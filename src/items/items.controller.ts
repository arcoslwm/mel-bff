import { Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemResponseDto } from './dto/response/item-response.dto';

import { ItemsService } from './items.service';
import { MeliItemIdParam } from './dto/request/item-id-param.dto';

@Controller('api/items')
export class ItemsController {
    constructor(private itemsService: ItemsService){}

    
    @Get(':id')
    @UsePipes(new ValidationPipe())
    item(@Param() params: MeliItemIdParam): ItemResponseDto {

        // throw new NotFoundException();
        // throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        // ServiceUnavailableException
        console.debug(`ItemsController.item item:`, params.id);
       
        // console.debug(`ItemsController.item itemsService:`, );
        return  this.itemsService.getById(params.id);
    }
    
    @Get()
    items(@Query() searchQuery: string): string {
        console.debug(`ItemsController.items searchQuery:`, searchQuery);
        return 'query!!';
    }
}


// {
//     "statusCode": 500,
//     "message": "Internal server error"
//   }
  