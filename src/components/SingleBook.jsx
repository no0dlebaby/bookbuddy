import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleBook = ({ token }) => {
    const [book, setBook] = useState(null)
    const [checkoutMessage, setCheckoutMessage] = useState("");
    const { bookId } = useParams()
    const navigate = useNavigate()

    const handleRegisterClick = () => {
        navigate('/register')
    };

    const handleLoginClick = () => {
        navigate('/login')
    };

    const handleCheckout = async () => {
        if (!token) {
            setCheckoutMessage("please log in to checkout books.")
            return
        }

        try {
            const response = await fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/reservations/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });

            const data = await response.json();
            if (response.ok) {
                setCheckoutMessage("Book checked out successfully!")
            } else {
                setCheckoutMessage(`Checkout failed: ${data.message}`)
            }
        } catch (error) {
            console.error('Error checking out book:', error);
            setCheckoutMessage("An error occurred during checkout. Please try again.")
        }
    };

    useEffect(() => {
        fetch(`https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/books/${bookId}`)
            .then(response => response.json())
            .then(data => {
                if (data.book) {
                    setBook(data.book)
                } else {
                    console.error('Unexpected data format:', data)
                }
            })
            .catch(error => console.error('Error fetching:', error))
    }, [bookId]);

    if (!book) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="singleBookContainer">
                <h1>{book.title}</h1>
                <img className="bookCover" src={book.coverimage} alt={`${book.title} cover`} />
                <p>{book.description}</p>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Published:</strong> {book.publishedDate}</p>
                <p><strong>Available:</strong> {book.available ? 'Yes' : 'No'}</p>
            </div>

            {token ? (
                <>
                    <button onClick={handleCheckout}>Checkout</button>
                    {checkoutMessage && <p>{checkoutMessage}</p>}
                </>
            ) : (
                <div>
                    <h1>Sign in to reserve</h1>
                    <button onClick={handleLoginClick}>Sign in</button>
                    <button onClick={handleRegisterClick}>Register</button>
                </div>
            )}
        </div>
    )
}

export default SingleBook