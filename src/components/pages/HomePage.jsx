import React, { useEffect, useState } from "react";
import BookService from "../service/BookService"; // Assuming the BookService is in the services folder
import './HomePage.css'; 

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch books using BookService
    const fetchBooks = async () => {
      try {
        const data = await BookService.getAllBooks();
        setBooks(data);
      } catch (err) {
        setError("Error fetching books, please try again later.");
        console.error("Error fetching books:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to the Book Network</h1>
        <p>Connect with fellow readers, share and discover your favorite books.</p>
      </header>

      <section className="book-list">
        <h2>Popular Books</h2>

        {loading ? (
          <p>Loading books...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : books.length > 0 ? (
          <div className="books-grid">
            {books.map((book) => (
              <div key={book.id} className="book-card">
                <img src={book.coverImageUrl} alt={book.title} className="book-cover" />
                <h3>{book.title}</h3>
                <p>by {book.author}</p>
                <p>{book.description ? `${book.description.substring(0, 100)}...` : 'No description available.'}</p>
                <button className="view-details-btn">View Details</button>
              </div>
            ))}
          </div>
        ) : (
          <p>No books available at the moment.</p>
        )}
      </section>
    </div>
  );
};

export default HomePage;
