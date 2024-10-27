import React, { useState, useEffect } from 'react';
import { Book } from '../types/models';

interface BookModalProps {
    book: Book | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (bookData: Omit<Book, 'id' | 'authors'>) => void;
}

const BookModal: React.FC<BookModalProps> = ({
    book,
    isOpen,
    onClose,
    onSave,
}) => {
    const [title, setTitle] = useState('');
    const [pages, setPages] = useState(1);
    const [published, setPublished] = useState(1);
    const [image, setImage] = useState('');
    const [isbn, setIsbn] = useState('');

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setPages(book.pages || 1);
            setPublished(book.published || 1);
            setImage(book.image || '');
            setIsbn(book.isbn || '');
        } else {
            setTitle('');
            setPages(1);
            setPublished(1);
            setImage('');
            setIsbn('');
        }
    }, [book]);

    const handleSave = () => {
        const bookData = {
            isbn,
            title,
            pages,
            published,
            image,
        };
        onSave(bookData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    {book ? <div>Update Book</div> : <div>Create Book</div>}{' '}
                </h2>

                <label className="block mb-2">
                    Title
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border p-2 mt-1 rounded"
                        required
                    />
                </label>

                <label className="block mb-2">
                    ISBN
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        className="w-full border p-2 mt-1 rounded"
                        required
                    />
                </label>

                <label className="block mb-2">
                    Number of pages
                    <input
                        type="number"
                        value={pages}
                        onChange={(e) => setPages(Number(e.target.value))}
                        className="w-full border p-2 mt-1 rounded"
                        required
                    />
                </label>

                <label className="block mb-2">
                    Year of publication
                    <input
                        type="number"
                        value={published}
                        onChange={(e) => setPublished(Number(e.target.value))}
                        className="w-full border p-2 mt-1 rounded"
                        required
                    />
                </label>

                <label className="block mb-2">
                    Image URL:
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full border p-2 mt-1 rounded"
                    />
                </label>

                <div className="mt-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="bg-gray-400 text-white px-4 py-2 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookModal;
