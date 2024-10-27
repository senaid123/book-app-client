import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Books from './features/books/Books';
import Authors from './features/authors/Authors';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import App from './App';
import BookDetails from './features/books/BookDetails';
import AuthorDetails from './features/authors/AuthorDetails';

const AppLayout = () => (
    <div className="flex flex-col min-h-screen">
        <Navbar />
        <Outlet />
        <Footer />
    </div>
);

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        children: [
            {
                path: '/',
                element: <App />,
            },
            {
                path: '/books',
                element: <Books />,
            },
            {
                path: '/books/:id',
                element: <BookDetails />,
            },
            {
                path: '/authors',
                element: <Authors />,
            },
            {
                path: '/authors/:id',
                element: <AuthorDetails />,
            },
        ],
    },
]);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <RouterProvider router={router}></RouterProvider>
    </StrictMode>
);
