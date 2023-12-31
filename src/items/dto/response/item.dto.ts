export class ItemDto {
    id: string;
    title: string;
    picture: string;
    condition: string;
    free_shipping:boolean;
    sold_quantity?:number
    description?: string;
    price: {
        currency: string;
        amount: number;
        decimals: number;
    };
}