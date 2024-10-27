import axiosInstance from '../../services/axiosInstance';
import { Author, Book } from '../../types/models';

export const fetchAuthors = async (): Promise<Author[]> => {
    const response = await axiosInstance.get('/authors');
    return response.data.authors;
};

export const fetchAuthorById = async (id: string): Promise<Author> => {
    const response = await axiosInstance.get(`/authors/${id}`);
    return response.data.author;
};

export const fetchAuthorBooks = async (id: string): Promise<Book[]> => {
    const response = await axiosInstance.get(`/authors/${id}/books`);
    return response.data;
};

export const createAuthor = async (
    authorData: Omit<Author, 'id' | 'books'>
): Promise<Author> => {
    const response = await axiosInstance.post('/authors', authorData);
    return response.data.message;
};

export const createAuthorBook = async (
    bookData: Omit<Book, 'id' | 'authors'>,
    id: string
): Promise<string> => {
    const response = await axiosInstance.post(`/authors/${id}/books`, bookData);
    return response.data.message;
};

export const updateAuthor = async (
    authorData: Omit<Author, 'id' | 'books'>,
    id: string
) => {
    const response = await axiosInstance.put(`/authors/${id}`, authorData);
    return response;
};

export const deleteAuthor = async (idAuthor: string) => {
    const response = await axiosInstance.delete(`/authors/${idAuthor}`);
    return response;
};

export const removeAuthorBook = async (idAuthor: string, idBook: string) => {
    const response = await axiosInstance.delete(
        `/authors/${idAuthor}/books/${idBook}`
    );
    return response;
};
