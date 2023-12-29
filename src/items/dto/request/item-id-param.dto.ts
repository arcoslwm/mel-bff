import { Matches } from "class-validator";
/**
 * Id formato MeLi
 */
export class MeliItemIdParam {
    @Matches('^MLA\\d{1,13}$')
    id: string;
}