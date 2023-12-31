import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { ItemMapper } from './mappers/item.mapper';
import { ItemResponseDto } from './dto/response/item-response.dto';
import { ConfigService } from '@nestjs/config';
import { AuthorDto } from './dto/response/author.dto';
import { SearchResponseDto } from './dto/response/search-response.dto';
import { ItemDto } from './dto/response/item.dto';
import { MeliSearchQuery } from './dto/request/search-query.dto';
import { SearchResponseMapper } from './mappers/search.mapper';

@Injectable()
export class ItemsService {

    private readonly ApiBaseUrl: string;
    private readonly logger = new Logger(ItemsService.name)

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

    async search(searchQuery: MeliSearchQuery): Promise<SearchResponseDto> {;

        const searchResponse = await firstValueFrom(
            this.httpService.get(`${this.ApiBaseUrl}/sites/MLA/search`,
                {
                    params: {
                        q: searchQuery.search,
                        limit:searchQuery.limit,
                    }
                }
            )
        );
        const searchResult = SearchResponseMapper.map(searchResponse.data);
        return {
            author: AuthorDto.getSigned(),
            ...searchResult
        };
    }
}