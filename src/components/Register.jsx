import React, { useState } from "react"

function Register(){

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const [successMessage, setSuccessMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confPassword) {
            alert("Passwords do not match");
            return;
        } try {
            const response = await fetch('https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api/users/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, email, password })
            });

            const data = await response.json();
            if (response.ok) {
                setSuccessMessage('uccessfully registered!')
            } else {
                console.error('registration failed:', data.message)
            }
        } catch (error) {
            console.error('error registering:', error)
        }
    };
    
    return(

        <form className="registration-form" onSubmit={handleSubmit}>
            <label htmlFor="first name">First Name:
                <input type="text" 
                value={firstName}
                onChange={(e)=>setFirstName(e.target.value)}/>
            </label>
            <br />
            <label htmlFor="last name">Last Name:
                <input type="text" 
                value={lastName}
                onChange={(e)=>setLastName(e.target.value)}/>
            </label>
            <br />
            <label htmlFor="email">Email:
                <input type="email" 
                value={email}
                onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <br />
            <label htmlFor="password">Password:
                <input type="password" 
                value={password}
                onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <br />
            <label htmlFor="confirm password">Confirm Password:
                <input type="password" 
                value={confPassword}
                onChange={(e)=>setConfPassword(e.target.value)}/>
            </label>
            <br />
            <button type="submit">sign up!</button>
        </form>
    )
}


export default Register