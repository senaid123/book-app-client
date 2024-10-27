import React, { useEffect, useState } from 'react';
import { createAuthor, fetchAuthors } from './api';
import { Author } from '../../types/models';
import { Link } from 'react-router-dom';
import { transformDate } from '../../helpers/transformDate';
import AuthorModal from '../../components/AuthorModal';
import ValidationError from '../../components/ValidationError';

const Authors: React.FC = () => {
    const [authors, setAuthors] = useState<Author[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setModalOpen] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        const loadAuthors = async () => {
            try {
                const authorsData = await fetchAuthors();
                setAuthors(authorsData);
            } catch (err) {
                setError('Failed to fetch authors');
            } finally {
                setLoading(false);
            }
        };

        loadAuthors();
    }, []);

    const handleAddAuthor = async (
        newAuthorData: Omit<Author, 'id' | 'books'>
    ) => {
        try {
            const newAuthor = await createAuthor(newAuthorData);
            setAuthors((prevAuthors) => [...prevAuthors, newAuthor]);
            setModalOpen(false);
            setValidationErrors([]);
        } catch (error: any) {
            if (
                error.response &&
                error.response.status === 400 &&
                error.response.data.error
            ) {
                const errors = error.response.data.error.map(
                    (err: any) => err.msg
                );
                setValidationErrors(errors);
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
                Create new author?
            </h1>
            <button
                className="mb-10 py-2 px-4 bg-blue-500 rounded-lg text-white"
                onClick={() => setModalOpen(true)}
            >
                Create
            </button>
            {validationErrors.length > 0 && (
                <ValidationError validationErrors={validationErrors} />
            )}
            <table className="w-[60%] text-sm text-left rtl:text-right text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-yellow-50">
                    <tr>
                        <th scope="col" className="px-16 py-3">
                            Image
                        </th>
                        <th scope="col" className="px-6 py-3">
                            First Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Last Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Birth Year
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Details
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {authors.map((author) => (
                        <tr key={author.id} className="bg-white border-b">
                            <td className="p-4">
                                <img
                                    src={author.image}
                                    className="w-16 h-14 md:w-32 max-w-full max-h-full"
                                    alt="Author Image"
                                />
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                {author.firstName}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                {author.lastName}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                {transformDate(author.dob)}
                            </td>
                            <td className="px-6 py-4 font-semibold text-gray-900">
                                <Link to={`/authors/${author.id}`}>
                                    <button className="bg-blue-500 text-white p-2 rounded-lg">
                                        Details
                                    </button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <AuthorModal
                author={null}
                isOpen={isModalOpen}
                onClose={() => setModalOpen(false)}
                onSave={handleAddAuthor}
            />
        </div>
    );
};

export default Authors;
