import Books from "./Books";
import React from "react";

async function getUserDetails() {
  const response = await fetch("/api/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  })

  if (!response.ok) {
    throw new Error("failed to fetch user detais")
  }
  const userData = await response.json();
return userData
}



function Account() {
    const [user, setUser] = React.useState(null)
  
    React.useEffect(() => {
      getUserDetails().then(setUser)
    }, [])
  
    return (
      <div>
      {user ? (
        <div>
          <h1>Welcome, {user.firstname}</h1>
          <h2>Your Checked Out Books:</h2>
          <ul>
            {user.books.length > 0 ? (
              user.books.map((book) => (
                <li key={book.id}>
                  <strong>{book.title}</strong> by {book.author}
                </li>
              ))
            ) : (
              <p>You have no books checked out.</p>
            )}
          </ul>
        </div>
      ) : (
        <div>
          <h1>Please log in to see your books</h1>
        </div>
      )}
    </div>
  );
}

  export default Account