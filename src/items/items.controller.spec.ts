import { Test, TestingModule } from '@nestjs/testing';
import { ItemsController } from './items.controller';
import { ItemsService } from './items.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MeliItemIdParam } from './dto/request/item-id-param.dto';
import { BadRequestException, HttpException, NotFoundException } from '@nestjs/common';
import { ItemResponseDto } from './dto/response/item-response.dto';
import { AuthorDto } from './dto/response/author.dto';

describe('ItemsController', () => {
  let controller: ItemsController;
  let itemsService: ItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemsService],
      controllers: [ItemsController],
      imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true, })],
    }).compile();

    itemsService = module.get<ItemsService>(ItemsService);
    controller = module.get<ItemsController>(ItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should thrown NotFoundException', (done) => {
    const mockInvalidMeliItemIdParam: MeliItemIdParam = {
      id: 'MLA1'
    };

    controller.item(mockInvalidMeliItemIdParam)
      .catch((error) => {
        expect(error).toBeInstanceOf(NotFoundException);
        expect(error.message).toBe('Item not found');
        done();
      });
  });

  it('should throw HttpException in unknown errors', async () => {
    const mockError = new Error('Internal server error');
    jest.spyOn(itemsService, 'getById').mockRejectedValue(mockError);

    await expect(() => controller.item({ id: 'MLA1185354643' })).rejects.toThrow(HttpException);
  });

  it('should return item by ID', async () => {
    const mockItemIdParam: MeliItemIdParam = { id: 'example_id' };
    const mockItemResponse: ItemResponseDto = {
      author: AuthorDto.getSigned(),
      item: {
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
      }
    };

    jest.spyOn(itemsService, 'getById').mockResolvedValue(mockItemResponse);

    const result = await controller.item(mockItemIdParam);

    expect(result).toEqual(mockItemResponse);
    expect(itemsService.getById).toHaveBeenCalledWith(mockItemIdParam.id);
  });
});
