export class ItemDto {
    id: string;
    title: string;
    picture: string;
    description: string;
    price: {
        currency: string;
        amount: number;
        decimals: number;
    };
}

// “item”: {
//     "id": String,
//     "title": String,
//     "price": {
//     "currency": String,
//     "amount": Number,
//     "decimals": Number,
//     },
//     “picture”: String,
//     "condition": String,
//     "free_shipping": Boolean,
//     "sold_quantity", Number
//     "description": String
//     }