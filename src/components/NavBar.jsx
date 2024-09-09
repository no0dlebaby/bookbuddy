import { useNavigate } from "react-router-dom"

function NavBar() {

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');
    };

    const handleRegisterClick = () => {
        navigate('/register');
    };

    const handleAccountClick = () => {
        navigate('/account');
    };

    const handleHomeClick = () => {
        navigate('/');
    };


    return(       
        <div>
                <div className="navBar">
                    <button href="/" className="home" onClick={handleHomeClick}>home</button>
                    
                    <button href="/login" className="login" onClick={handleLoginClick}>login</button>

                    <button href="/register" className="register" onClick={handleRegisterClick}>register</button>
                    
                    <button href="/account" className="account" onClick={handleAccountClick}>account</button>
                </div>
        </div>
    )
}

export default NavBar