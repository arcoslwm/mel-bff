import { Controller, Get, HttpException, HttpStatus, NotFoundException, Param, Query } from '@nestjs/common';
import { ItemResponseDto } from './dto/response/item-response.dto';

@Controller('api/items')
export class ItemsController {

    
    @Get(':id')
    item(@Param() params): ItemResponseDto {

        // throw new NotFoundException();
        // throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        // ServiceUnavailableException
        console.debug(`ItemsController.item item:`, params);
        return {
            author: {
                name:"Luis",
                lastname: "Arcos"
            },
            item:{
               id: params.id,
               title: "audifonos-"+params.id,
               picture: "https://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg",
               description: "wenos wenos los audifonos! vamos!",
               price:{
                amount:1500,
                currency:"CLP",
                decimals:0
               }
            }
        };
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
  