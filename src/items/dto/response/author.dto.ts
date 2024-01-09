export class AuthorDto {
    name: string;
    lastname: string;

    static getSigned(): AuthorDto {
        const author = new AuthorDto();
        author.name = 'Luis';
        author.lastname = 'Arcos';
        return author;
    }
}
