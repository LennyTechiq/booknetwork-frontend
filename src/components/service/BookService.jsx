import axios from "axios";

class BookService {
    static BASE_URL = "http://localhost:1010/api/books";

    // Get all books
    static async getAllBooks() {
        try {
            const response = await axios.get(`${BookService.BASE_URL}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Get a book by ID
    static async getBookById(bookId) {
        try {
            const response = await axios.get(`${BookService.BASE_URL}/${bookId}`);
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Create a new book (Admin only)
    static async createBook(bookData, token) {
        try {
            const response = await axios.post(`${BookService.BASE_URL}`, bookData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Update an existing book (Admin only)
    static async updateBook(bookId, bookData, token) {
        try {
            const response = await axios.put(`${BookService.BASE_URL}/${bookId}`, bookData, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // Delete a book (Admin only)
    static async deleteBook(bookId, token) {
        try {
            const response = await axios.delete(`${BookService.BASE_URL}/${bookId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    // AUTHORIZATION CHECKERS

    // Check if the user is an Admin (Admin only)
    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ADMIN';
    }

    // Check if the user is authenticated
    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token;
    }

    // Admin Only Access Check
    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin();
    }
}

export default BookService;
