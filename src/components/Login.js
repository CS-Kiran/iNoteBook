import {React , useState} from 'react'
import { useNavigate } from 'react-router-dom';


const Login = (props) => {

    let history = useNavigate();
    const [credentials , setCredentials] = useState({email : '', password : ''});

    const onChanges = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            localStorage.setItem('token' , json.authToken);
            props.showAlert("Login Successful" , "success");
            history('/');
        }
        else {
            props.showAlert("Login Failed", "danger");
        }
    }

  return (
    <>
    <form onSubmit={handleLogin}>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" value={credentials.email} onChange={onChanges} id="email" name="email" aria-describedby="emailHelp"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" value={credentials.password} onChange={onChanges} id="password" name="password"/>
        </div>
        <button type="submit" className="btn btn-primary">LogIn</button>
    </form>
    </>
  )
}

export default Login