import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    createAuthorBook,
    deleteAuthor,
    fetchAuthorBooks,
    fetchAuthorById,
    removeAuthorBook,
    updateAuthor,
} from './api';
import { Author, Book } from '../../types/models';
import { transformDate } from '../../helpers/transformDate';
import BookModal from '../../components/BookModal';
import AuthorModal from '../../components/AuthorModal';
import ValidationError from '../../components/ValidationError';

const AuthorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [author, setAuthor] = useState<Author>();
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string | null>(null);
    const [updateModalOpen, setUpdateModalOpen] = useState(false);
    const [bookModal, setBookModal] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        const loadAuthor = async () => {
            if (!id) {
                setErrors('Invalid author ID');
                setLoading(false);
                return;
            }
            try {
                const authorData = await fetchAuthorById(id);
                const bookData = await fetchAuthorBooks(id);
                setAuthor(authorData);
                setBooks(bookData);
            } catch (err) {
                setErrors('Failed to fetch author details');
            } finally {
                setLoading(false);
            }
        };

        loadAuthor();
    }, [id]);

    const deletAuthorHandler = async (id: string) => {
        const response = await deleteAuthor(id);
        if (response.status === 200) {
            return navigate('/authors');
        }
    };

    const handleUpdateAuthor = async (
        newAuthorData: Omit<Author, 'id' | 'books'>
    ) => {
        if (author && author.id) {
            const response = await updateAuthor(newAuthorData, author.id);
            if (response.status === 200) {
                navigate(0);
            }
        }
    };

    const handleAddBook = async (newBookData: Omit<Book, 'id' | 'authors'>) => {
        try {
            if (author && author.id) {
                await createAuthorBook(newBookData, author.id);
                setBookModal(false);
                navigate(0);
                setValidationErrors([]);
            }
        } catch (error: any) {
            if (
                error.response &&
                error.response.status === 400 &&
                error.response.data
            ) {
                const errors = error.response.data.error.map(
                    (err: any) => err.msg
                );
                setValidationErrors(errors);
            }
        }
    };

    const handleRemoveAuthorBook = async (id: number) => {
        const bookId = id.toString();
        if (author && author.id) {
            const response = await removeAuthorBook(author.id, bookId);
            if (response.status === 200) {
                navigate(0);
            }
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (errors) {
        return <div className="text-red-500 text-center">{errors}</div>;
    }

    if (!author) {
        return <div className="text-center">No author found.</div>;
    }

    return (
        <div className="flex-grow mt-10">
            {validationErrors && (
                <ValidationError validationErrors={validationErrors} />
            )}
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <img
                        src={author.image}
                        alt={`${author.firstName} ${author.lastName}`}
                        className="w-32 h-32 rounded-full border border-gray-300 mr-4"
                    />
                    <div>
                        <h1 className="text-3xl font-bold">
                            {author.firstName} {author.lastName}
                        </h1>
                        <p className="text-gray-600">
                            Date of Birth: {transformDate(author.dob)}
                        </p>
                        <button
                            onClick={() => deletAuthorHandler(author.id)}
                            className="bg-red-500 text-white text-sm p-1 rounded-lg"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => setUpdateModalOpen(true)}
                            className="bg-green-500 text-white text-sm p-1 rounded-lg mx-2"
                        >
                            Update
                        </button>
                        <button
                            onClick={() => setBookModal(true)}
                            className="bg-blue-500 text-white text-sm p-1 rounded-lg"
                        >
                            Add Book
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="text-2xl font-semibold mb-2">
                        List of books from author
                    </h2>
                    {books.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {books.map((book) => (
                                <div key={book.id} className="flex flex-col">
                                    <Link to={`/books/${book.id}`}>
                                        <div className="mt-4 border-2 flex p-1 rounded-lg hover:bg-gray-100 cursor-pointer shadow-md">
                                            <img
                                                width={80}
                                                height={80}
                                                src={book.image}
                                                alt={book.title}
                                                className="mr-3 rounded"
                                            />
                                            <div>
                                                <h4 className="text-xl font-semibold">
                                                    {book.title}
                                                </h4>
                                                <p className="text-gray-600 text-xs font-semibold">
                                                    ISBN: {book.isbn}
                                                </p>
                                                <p className="text-gray-600">
                                                    Pages: {book.pages}
                                                </p>
                                                <p className="text-gray-600">
                                                    Published: {book.published}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                    <button
                                        onClick={() =>
                                            handleRemoveAuthorBook(book.id)
                                        }
                                        className="text-xs text-white bg-red-500 w-20 rounded mt-2 py-1"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No books available for this author.</p>
                    )}
                </div>
            </div>
            <AuthorModal
                author={author}
                onSave={handleUpdateAuthor}
                isOpen={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
            />
            <BookModal
                book={null}
                onSave={handleAddBook}
                isOpen={bookModal}
                onClose={() => setBookModal(false)}
            />
        </div>
    );
};

export default AuthorDetails;
