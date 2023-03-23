import { useState, useEffect } from 'react';
import axios from 'axios';
import BookCreate from './components/BookCreate';
import BookList from './components/BookList';

function App() {
    const [books, setBooks] = useState([]);

    const fetchBooks = async () => {
        const response = await axios.get('http://localhost:3001/books');
        setBooks(response.data);
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    const createBook = async (title) => {
        const response = await axios.post('http://localhost:3001/books', {
            title: title
        });
        const updatedBooks = [
            ...books,
            response.data
        ];

        setBooks(updatedBooks);
    };

    const deleteBookById = async (id) => {
        const response = await axios.delete(`http://localhost:3001/books/${id}`);

        const newBooks = books.filter((book) => {
            return book.id !== id;
        });

        setBooks(newBooks);
    };

    const editBookById = async (id, newTitle) => {
        const response = await axios.put(`http://localhost:3001/books/${id}`, {
            title: newTitle
        });

        const newBooks = books.map((book) => {
            if (book.id === id) {
                return { ...book, ...response.data };
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
