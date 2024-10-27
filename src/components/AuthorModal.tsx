import React, { useEffect, useState } from 'react';
import { Author } from '../types/models';
import { transformDate } from '../helpers/transformDate';

interface AuthorModalProps {
    author: Author | null;
    isOpen: boolean;
    onClose: () => void;
    onSave: (authorData: Omit<Author, 'id' | 'books'>) => void;
}

const AuthorModal: React.FC<AuthorModalProps> = ({
    author,
    isOpen,
    onClose,
    onSave,
}) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        if (author) {
            setFirstName(author.firstName);
            setLastName(author.lastName);
            setDob(transformDate(author.dob));
            setImage(author.image);
        } else {
            setFirstName('');
            setLastName('');
            setDob('');
            setImage('');
        }
    }, [author]);

    const handleSave = () => {
        const authorData = {
            firstName,
            lastName,
            dob: new Date(dob),
            image,
        };
        onSave(authorData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">
                    {author ? (
                        <div>Update Author</div>
                    ) : (
                        <div>Create Author</div>
                    )}
                </h2>

                <label className="block mb-2">
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full border p-2 mt-1 rounded"
                        required={true}
                    />
                </label>

                <label className="block mb-2">
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full border p-2 mt-1 rounded"
                        required={true}
                    />
                </label>

                <label className="block mb-2">
                    Date of Birth:
                    <input
                        type="date"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                        className="w-full border p-2 mt-1 rounded"
                        required={true}
                    />
                </label>

                <label className="block mb-2">
                    Image URL:
                    <input
                        type="text"
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                        className="w-full border p-2 mt-1 rounded"
                        required={true}
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

export default AuthorModal;
