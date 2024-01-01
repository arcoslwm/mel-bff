import { ItemDto } from "../dto/response/item.dto";
import { ItemMapper } from "./item.mapper";

describe('ItemMapper', () => {

    it('should throw Error', () => {
        const mockItemInput = {};

        expect(() => {
            ItemMapper.map(mockItemInput);
        }).toThrow(Error);
    });

      it('should map item data correctly', () => {
        const itemInput = {
          id: '12345',
          title: 'Producto de prueba',
          condition: 'new',
          thumbnail: "http://http2.mlstatic.com/D_89234710-MLA493453037849_042022-I.jpg",
          shipping: {
            store_pick_up: false,
            free_shipping: true,
            logistic_type: "fulfillment",
            mode: "me2",
            tags: [
              "fulfillment"
            ],
            benefits: null,
            promise: null
          },
          price: 1250.5,
          currency_id: 'CLP',
        };
        const itemDto: ItemDto = ItemMapper.map(itemInput);
  
        expect(itemDto).toEqual({
          id: '12345',
          title: 'Producto de prueba',
          condition: 'new',
          picture: 'http://http2.mlstatic.com/D_89234710-MLA493453037849_042022-I.jpg',
          free_shipping: true,
          sold_quantity: 0,
          price: { currency: 'CLP', amount: 1250.50, decimals: 1 },
        });
      });
  
  });