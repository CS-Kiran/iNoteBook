import React from 'react'
import { Link , useLocation, useNavigate  } from 'react-router-dom'

const Navbar = () => {

    //useLocation tracks user location on navigation
    let location = useLocation();
    let navigate = useNavigate();

    const handleLogOut =() => {
        localStorage.removeItem('token')
        navigate('/login');
    }
    
  return (
    <div data-bs-theme="dark" style={{borderRadius : "50px"}}>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <Link className="navbar-brand mx-2" to="/">
                    <img src={require('./pencil.png')} alt="" width="60" height="60"/>
                </Link>
                <Link className="navbar-brand" to="/" style={{fontFamily : "monospace" , fontSize : "2.3em" , color : "#d4a5fa" , fontWeight : "700"}}>
                    <p className="text-center">iNoteBook</p>
                </Link>
                <div className="d-flex justify-content-end">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-5" style={{fontFamily : "monospace" , fontSize : "1.4em"}}>
                        <li className="nav-item mx-3">
                        <Link className={`nav-link ${location.pathname==='/'?'active':""}`} aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-3">
                        <Link className={`nav-link ${location.pathname==='/about'?'active':""}`} to="/about">About</Link>
                        </li>
                    </ul>
                    {!localStorage.getItem('token')? <form className="d-flex" role="search">
                    <Link className="btn btn-primary mx-2" to="/login" role="button" style={{textAlign: "center" , fontFamily:"monospace" , height:"40px" , fontSize:"1.2em"}}>LogIn</Link>
                    <Link className="btn btn-primary mx-2" to="/signup" role="button" style={{textAlign: "center" , fontFamily:"monospace" , height:"40px" , fontSize:"1.2em"}}>SignUp</Link>
                    </form> : <button onClick={handleLogOut} className='btn btn-primary'>LogOut</button>}
                </div>
            </div>
            </nav>
    </div>
  )
}

export default Navbar