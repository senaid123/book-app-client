import axiosInstance from '../../services/axiosInstance';
import { Author, Book } from '../../types/models';

export const fetchBooks = async (): Promise<Book[]> => {
    const response = await axiosInstance.get('/books');
    return response.data.books;
};

export const fetchBookById = async (id: string): Promise<Book> => {
    const response = await axiosInstance.get(`/books/${id}`);
    return response.data.book;
};

export const fetchBookAuthors = async (id: string): Promise<Author[]> => {
    const response = await axiosInstance.get(`/books/${id}/authors`);
    return response.data;
};

export const createBook = async (
    bookData: Omit<Book, 'id' | 'authors'>
): Promise<Book> => {
    const response = await axiosInstance.post('/books', bookData);
    return response.data.message;
};

export const createBookAuthor = async (
    authorData: Omit<Author, 'id' | 'books'>,
    id: number
): Promise<string> => {
    const response = await axiosInstance.post(
        `/books/${id}/authors`,
        authorData
    );
    return response.data.message;
};

export const updateBook = async (
    bookData: Omit<Book, 'id' | 'authors'>,
    id: number
) => {
    const response = await axiosInstance.put(`/books/${id}`, bookData);
    return response;
};

export const deleteBook = async (id: number) => {
    const response = await axiosInstance.delete(`/books/${id}`);
    return response;
};

export const removeBookAuthor = async (idBook: string, idAuthor: string) => {
    const response = await axiosInstance.delete(
        `/books/${idBook}/authors/${idAuthor}`
    );
    return response;
};
