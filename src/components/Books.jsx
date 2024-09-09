import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Books = ({ token }) => {
    const [books, setBooks] = useState([]);
    const [searchBar, setSearchBar] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async (query = "") => {
        const url = query 
            ? `https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books?search=${encodeURIComponent(query)}`
            : 'https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books';

        try {
            const response = await fetch(url, {
                headers: {
                    'Content-Type': 'application/json',
                    ...(token && { 'Authorization': `Bearer ${token}` }),
                },
            });

            const data = await response.json();
            if (Array.isArray(data)) {
                setBooks(data);
            } else if (data.books && Array.isArray(data.books)) {
                setBooks(data.books);
            } else {
                console.error('Unexpected data format:', data);
            }
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleBookClick = (bookId) => {
        navigate(`/books/${bookId}`);
    };

    const handleSearch = () => {
        fetchBooks(searchBar);
    };

    return (
        <>
            <div className="header">
                <div className="row1">
                    <h1>Welcome to My Library!</h1>
                    <p>Check out my books page.</p>
                </div>
                <div className="row2">
                    <h2>Search for a book!</h2>
                    <div>
                        <input 
                            className='searchBar' 
                            type="text" 
                            placeholder="Search by author or title"
                            value={searchBar}
                            onChange={(e) => setSearchBar(e.target.value)}
                        />
                        <button onClick={handleSearch}>Search</button>
                    </div>
                    <h1>Book List</h1>
                    <ul className="books-container">
                        {books.length > 0 ? (
                            books.map(book => (
                                <li 
                                    className="book-item" 
                                    key={book.id} 
                                    onClick={() => handleBookClick(book.id)}
                                >
                                    <img 
                                        className='bookImages' 
                                        src={book.coverimage} 
                                        alt={`${book.title} cover`} 
                                        style={{ width: '100px', height: '150px', marginRight: '10px' }} 
                                    />
                                    {book.title}
                                </li>
                            ))
                        ) : (
                            <li>No books available</li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Books;