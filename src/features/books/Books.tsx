import React, { useEffect, useState } from 'react';
import { createBook, fetchBooks } from './api';
import { Book } from '../../types/models';
import { Link } from 'react-router-dom';
import BookModal from '../../components/BookModal';

const Authors: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                const authorsData = await fetchBooks();
                setBooks(authorsData);
            } catch (err) {
                setError('Failed to fetch books');
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    const handleAddBook = async (newBookData: Omit<Book, 'id' | 'authors'>) => {
        try {
            const newBook = await createBook(newBookData);
            setBooks((prevBooks) => [...prevBooks, newBook]);
            setModalOpen(false);
            setValidationErrors([]);
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

    if (loading) {
        return <div className="text-center">Loading...</div>;
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg flex flex-grow flex-col w-full items-center justify-center">
            <h1 className="text-orange-500 text-3xl font-semibold mb-4">
                Create new book?
            </h1>
            <button
                className="mb-10 py-2 px-4 bg-blue-500 rounded-lg text-white"
                onClick={() => setModalOpen(true)}
            >
                Create
            </button>
            {validationErrors.length > 0 && (
                <div className="mb-4 w-[60%] text-red-500 text-sm">
                    <ul>
                        {validationErrors.map((error, index) => (
                            <div
                                key={index}
                                className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
                                role="alert"
                            >
                                <span className="font-medium">
                                    Validation Error: {error}
                                </span>
                            </div>
                        ))}
                    </ul>
                </div>
            )}
            <table className="w-[60%] text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-yellow-50">
                    <tr className="text-center">
                        <th scope="col" className="px-16 py-3">
                            <span className="">Image</span>
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Title
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Number of pages
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Publication year
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Details
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {books && books.map((book) => (
                        <tr
                            key={book.id}
                            className="bg-white border-b text-center"
                        >
                            <td className="p-4">
                                <img
                                    src={book.image}
                                    className="w-20 h-20 md:w-32 max-w-full"
                                    alt="Author Image"
                                />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900 ">
                                {book.title}
                            </td>

                            <td className="px-6 py-4 font-semibold text-gray-900">
                                {book.pages}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                {book.published}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                <Link to={`/books/${book.id}`}>
                                    <button className="bg-blue-500 text-white p-2 rounded-lg">
                                        Details
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <BookModal
                book={null}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddBook}
            />
        </div>
    );
};

export default Authors;
