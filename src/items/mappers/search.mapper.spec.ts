import { SearchResultDto } from "../dto/response/search-result.dto";
import { SearchResponseMapper } from "./search.mapper";

describe('SearchResponseMapper', () => {

    it('should Map void arrays', () => {
        const mockSearchInput = {};

        const searchResultDto: SearchResultDto = SearchResponseMapper.map(mockSearchInput);

        expect(searchResultDto).toEqual({
            categories: [],
            items: []
        });
    });
});