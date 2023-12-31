import { Test, TestingModule } from '@nestjs/testing';
import { ItemsService } from './items.service';
import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ItemResponseDto } from './dto/response/item-response.dto';
import { AuthorDto } from './dto/response/author.dto';
import { SearchResponseMapper } from './mappers/search.mapper';
import { SearchResultDto } from './dto/response/search-result.dto';
import { ItemMapper } from './mappers/item.mapper';
import { ItemDto } from './dto/response/item.dto';


describe('ItemsService', () => {
  let service: ItemsService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
      imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true, })]
    }).compile();

    service = module.get<ItemsService>(ItemsService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });


  it('should search items', async () => {
    const mockSearchResult: SearchResultDto = {
      categories:['cat001'],
      items: [{
        id: 'example_id',
        title: "audifonos",
        picture: "https://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg",
        condition: 'new',
        free_shipping: true,
        price: {
          amount: 1500,
          currency: "CLP",
          decimals: 0
        }
      }]
    };
    jest.spyOn(SearchResponseMapper, 'map').mockReturnValue(mockSearchResult);

    const query = { search: 'test', limit: 4 };
    const result = await service.search(query);

    expect(result).toEqual({ author: AuthorDto.getSigned(), ...mockSearchResult });
  });

  it('should get item by ID', async () => {
    const mockItemDto: ItemDto = {
      id: 'example_id',
      title: "audifonos",
      picture: "https://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg",
      condition: 'new',
      free_shipping: true,
      price: {
        amount: 1500,
        currency: "CLP",
        decimals: 0
      }
    };

    jest.spyOn(ItemMapper, 'map').mockReturnValue(mockItemDto);

    /**
     * @todo
     * añadir mocks para httpService, este testa esta corriendo la consulta a la API meli.
     */
    const testItemId = 'MLA1185354643';
    const result = await service.getById(testItemId);
    expect(result).toEqual({ item: mockItemDto, author: AuthorDto.getSigned() });
  });

  
});
