import { Matches } from 'class-validator';
/**
 * Id formato MeLi
 */
export class MeliItemIdParam {
    @Matches('^MLA\\d{1,13}$', '', {
        message:
            'El id: $value parece no ser un formato de id válido para MeLi',
    })
    id: string;
}
