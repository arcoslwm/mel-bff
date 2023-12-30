import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ItemMapper } from './mappers/item.mapper';
import { ItemResponseDto } from './dto/response/item-response.dto';
import { ConfigService } from '@nestjs/config';
import { AuthorDto } from './dto/response/author.dto';

@Injectable()
export class ItemsService {

    private readonly ApiBaseUrl: string;

    constructor(private readonly httpService: HttpService, private configService: ConfigService) {
        this.ApiBaseUrl = this.configService.get<string>('MELI_BACKEND_API_BASE_URL');
    }
    
    async getById(id: string): Promise<ItemResponseDto> {

        const [itemData, descriptionData] = await Promise.all([
            firstValueFrom(this.httpService.get(`${this.ApiBaseUrl}/items/${id}`)),
            firstValueFrom(this.httpService.get(`${this.ApiBaseUrl}/items/${id}/description`)),
        ]);

        const itemDto = ItemMapper.map(itemData.data, descriptionData.data);
        return {
            item: itemDto,
            author: AuthorDto.getSigned()
        };
    }

    // private fakeItem(id: string) {
    //     return {
    //         author: {
    //             name:"Luis",
    //             lastname: "Arcos"
    //         },
    //         item:{
    //            id: id,
    //            title: "audifonos-"+id,
    //            picture: "https://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg",
    //            description: "wenos wenos los audifonos! vamos!",
    //            price:{
    //             amount:1500,
    //             currency:"CLP",
    //             decimals:0
    //            }
    //         }
    //     }
    // }


}