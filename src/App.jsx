import { useState } from 'react'
import Books from './components/Books'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import NavBar from './components/NavBar';
import SingleBook from './components/SingleBook';
import Account from './components/Account';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token'))
  

  return (
    <Router>
      <div>
        <h1>Book Buddy</h1>
        <NavBar/>


        <Routes>
          <Route path='/login' element={<Login setToken={setToken} />} />
          <Route path='/' element={<Books token={token}/>}/>
          <Route path='/books' element={<Books token={token}/>}/>
          <Route path="/books/:bookId" element={<SingleBook token={token}/>} />
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/account' token={token} element={<Account />}/>

        </Routes>


        <p>Complete the React components needed to check out books, review their account, and return books that they've finished reading.</p>

        <p>You may need to use the `token` in this top-level component in other components that need to know if a user has logged in or not.</p>

        <p>Don't forget to set up React Router to navigate between the different views of your single page application!</p>
      </div>

    </Router>
  )
}

export default App
