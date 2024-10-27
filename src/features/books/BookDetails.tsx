import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
    createBookAuthor,
    deleteBook,
    fetchBookAuthors,
    fetchBookById,
    removeBookAuthor,
    updateBook,
} from './api';
import { Author, Book } from '../../types/models';
import { transformDate } from '../../helpers/transformDate';
import BookModal from '../../components/BookModal';
import AuthorModal from '../../components/AuthorModal';
import ValidationError from '../../components/ValidationError';

const AuthorDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBooks] = useState<Book | null>(null);
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [errors, setErrors] = useState<string | null>(null);
    const [updateModalOpen, setUpdateModalOpen] = useState<boolean>(false);
    const [authorModal, setAuthorModal] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([])
    const navigate = useNavigate();

    useEffect(() => {
        const loadBook = async () => {
            if (!id) {
                setErrors('Invalid book ID');
                setLoading(false);
                return;
            }
            try {
                const bookData = await fetchBookById(id);
                const atuhorData = await fetchBookAuthors(id);
                setAuthors(atuhorData);
                setBooks(bookData);
            } catch (err) {
                setErrors('Failed to fetch book details');
            } finally {
                setLoading(false);
            }
        };

        loadBook();
    }, [id]);

    const handleUpdateBook = async (
        newAuthorData: Omit<Book, 'id' | 'authors'>
    ) => {
        try {
            if (book && book.id) {
                const response = await updateBook(newAuthorData, book.id);
                if (response.status === 200) {
                    navigate(0);
                }
            }
        } catch (error: any) {
            console.error('Failed to create author:', error);
        }
    };

    const handleAddAuthor = async (
        authorData: Omit<Author, 'id' | 'books'>
    ) => {
        try {
            if (book && book.id) {
                await createBookAuthor(authorData, book.id);
                setAuthorModal(false);
                navigate(0);
                setValidationErrors([]);
            }
        } catch (error: any) {
            if (
                error.response &&
                error.response.status === 400 &&
                error.response.data
            ) {
                const errors = error.response.data.map((err: any) => err.msg);
                setValidationErrors(errors);
            } else {
                console.error('Failed to create author:', error);
            }
        }
    };

    const deleteBookHandler = async (id: number) => {
        const response = await deleteBook(id);
        if (response.status === 200) {
            return navigate('/books');
        }
    };

    const handleRemoveBookAuthor = async (id: string) => {
        const authorId = id.toString();
        try {
            if (book && book.id) {
                const response = await removeBookAuthor(book.id.toString(), authorId);
                if (response.status === 200) {
                    navigate(0);
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (errors) {
        return <div className="text-red-500 text-center">{errors}</div>;
    }

    if (!book) {
        return <div className="text-center">No Book found.</div>;
    }

    return (
        <div className="flex-grow mt-10">
           {validationErrors && 
            <ValidationError validationErrors={validationErrors} /> }
            <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
                <div className="flex items-center mb-6">
                    <img
                        src={book.image}
                        alt={`${book.title}`}
                        className="w-32 h-32 rounded-full border border-gray-300 mr-4"
                    />
                    <div>
                        <h1 className="text-3xl font-bold">{book.title}</h1>
                        <p className="text-gray-600">
                            <span className="font-bold">pages: </span>
                            {book.pages}
                        </p>
                        <p className="text-gray-600">
                            <span className="font-bold">published: </span>
                            {book.published}
                        </p>
                        <button
                            onClick={() => deleteBookHandler(book.id)}
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
                            onClick={() => setAuthorModal(true)}
                            className="bg-blue-500 text-white text-sm p-1 rounded-lg"
                        >
                            Add Author
                        </button>
                    </div>
                </div>
                <div className="w-full">
                    <h2 className="text-2xl font-semibold mb-2">
                        List of book authors
                    </h2>
                    {authors.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {authors.map((author) => (
                                <div key={author.id} className="flex flex-col">
                                <Link
                                    key={author.id}
                                    to={`/authors/${author.id}`}
                                >
                                    <div className="mt-4 border-2 flex p-2 rounded-lg hover:bg-gray-100 cursor-pointer shadow-md">
                                        <img
                                            src={author.image}
                                            className="w-20 mr-3 rounded border border-gray-300 mt-"
                                        />
                                        <div>
                                            <h4 className="text-xl font-semibold">
                                                {author.firstName}{' '}
                                                {author.lastName}
                                            </h4>
                                            <p className="text-gray-600 text-xs font-semibold">
                                                dob: {transformDate(author.dob)}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                                 <button
                                 onClick={() =>
                                     handleRemoveBookAuthor(author.id)
                                 }
                                 className="text-xs text-white bg-red-500 w-20 rounded mt-2 py-1"
                             >
                                 Remove
                             </button>
                             </div>
                            ))}
                        </div>
                    ) : (
                        <p>No authors available for this bok.</p>
                    )}
                </div>
            </div>
            <BookModal
                book={book}
                onSave={handleUpdateBook}
                isOpen={updateModalOpen}
                onClose={() => setUpdateModalOpen(false)}
            />
            <AuthorModal
                author={null}
                onSave={handleAddAuthor}
                isOpen={authorModal}
                onClose={() => setAuthorModal(false)}
            />
        </div>
    );
};

export default AuthorDetails;
