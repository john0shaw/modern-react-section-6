import { useState } from 'react';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
    const [books, setBooks] = useState([]);

    const createBook = (title) => {
        const updatedBooks = [
            ...books,
            {
                id: Math.round(Math.random() * 9999),
                title
            }
        ];

        setBooks(updatedBooks);
    };

    const deleteBookById = (id) => {
        const newBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(newBooks);
    };

    const editBookById = (id, newTitle) => {
        const newBooks = books.map((book) => {
            if (book.id === id) {
                console.log({ ...book, title: newTitle });
                return { ...book, title: newTitle };
            }
            return book;
        });

        setBooks(newBooks);
    };

    return (
        <div className="app">
            <h1>Reading List</h1>
            <BookList onDelete={deleteBookById} onEdit={editBookById} books={books} />
            <BookCreate onCreate={createBook} />
        </div>
    );
}

export default App;
