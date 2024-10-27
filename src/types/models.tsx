export interface Author {
    id: string;
    firstName: string;
    lastName: string;
    dob: Date;
    image: string;
    books: Array<Book>;
}

export interface Book {
    id: number;
    isbn: string;
    title: string;
    pages: number;
    published: number;
    image: string;
    authors: Array<Author>;
}
