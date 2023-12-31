// import { Matches } from "class-validator";
/**
 * Search
 */
export class MeliSearchQuery {
    // @Matches('^MLA\\d{1,13}$')
    search: string;
    limit:number;
}