import { ItemDto } from "../dto/response/item.dto";

/**
 * se encarga de transformar datos del backend a formato de respuesta al cliente.
 */
export class ItemMapper {
    public static map(itemInput: any, descriptionInput?: any): ItemDto {
        /**
         * @todo sold_quantity se esta dejando n 0 por defecto ya que no se encuentra el dato en las respuestas de la API MeLi
        */
        const { id, title, condition, thumbnail: picture, shipping: { free_shipping = false } = {}, price, currency_id:currency } = itemInput;
        if (!id || !title || !condition || !picture || !price || !currency) {
            throw new Error('itemInput no contiene propiedades requeridas');
        }
        const decimals: number = price?.toString().split('.')[1]?.length || 0;

        let itemDto: ItemDto = { id, title, condition, picture, free_shipping, sold_quantity: 0, price: { currency, amount: price, decimals } };

        if (descriptionInput) {
            const { plain_text: description } = descriptionInput;
            itemDto.description = description;
        }
        return itemDto;
    }
}