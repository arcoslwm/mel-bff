import { Injectable } from '@nestjs/common';

@Injectable()
export class ItemsService {

    getById(id: string) {
        console.debug(`ItemsService··············`);
        /**
         * el servicio debe recibir el id,
         * 
         */
        return this.fakeItem(id);
    }

    private fakeItem(id: string) {
        return {
            author: {
                name:"Luis",
                lastname: "Arcos"
            },
            item:{
               id: id,
               title: "audifonos-"+id,
               picture: "https://http2.mlstatic.com/D_923638-MLA54361048207_032023-I.jpg",
               description: "wenos wenos los audifonos! vamos!",
               price:{
                amount:1500,
                currency:"CLP",
                decimals:0
               }
            }
        }
    }


}