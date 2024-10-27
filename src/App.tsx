import React from 'react';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <>
            <div className="bg-yellow-100 min-h-screen">
                <header className="bg-gray-50 text-gray-800 py-20">
                    <div className="container mx-auto text-center">
                        <h1 className="text-4xl font-bold">
                            Your Personal Library
                        </h1>
                        <p className="mt-4 text-lg">
                            Easily add and manage your favorite books and
                            authors.
                        </p>
                    </div>
                </header>

                <section id="features" className="py-10">
                    <div className="container mx-auto text-center">
                        <h2 className="text-3xl font-bold mb-10">Features</h2>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="max-w-xs mx-4 mb-8">
                                <h3 className="text-xl font-semibold">
                                    Add Books
                                </h3>
                                <p className="mt-2">
                                    Quickly add your favorite books
                                </p>
                                <img
                                    className="rounded-lg mt-4"
                                    src="https://img.freepik.com/free-vector/hand-drawn-flat-design-stack-books-illustration_23-2149341898.jpg"
                                    alt="book-img"
                                />
                                <Link to="/books">
                                    <button className="mt-4 bg-blue-400 text-white p-2 hover:bg-blue-500 rounded">
                                        Check books
                                    </button>
                                </Link>
                            </div>
                            <div className="max-w-xs mx-4 mb-8">
                                <h3 className="text-xl font-semibold">
                                    Add Authors
                                </h3>
                                <p className="mt-2">
                                    Quickly add your favorite authors
                                </p>
                                <img
                                    className="rounded-lg mt-4"
                                    src="https://img.freepik.com/free-vector/businesswoman-working-writing-document-paper-character-people-cartoon-flat-design_40876-3339.jpg"
                                    alt="Author img"
                                />
                                <Link to="/authors">
                                    <button className="mt-4 bg-orange-400 text-white p-2 hover:bg-orange-500 rounded-lg border-b-2">
                                        Check authors
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default App;
