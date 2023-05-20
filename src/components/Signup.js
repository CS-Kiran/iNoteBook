import {React , useState} from 'react'
import { useNavigate } from 'react-router-dom';

function Signup(props) {

    let history = useNavigate();
    const [credentials , setCredentials] = useState({name: '', email : '', password : '' , cpassword: ''});

    const onChanges = (e) => {
        setCredentials({...credentials, [e.target.name] : e.target.value})
    };

    const handleSignUp = async (e) => {
        const {name,email,password} = credentials;
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json" 
            },
            body: JSON.stringify({name, email, password})
        });
        const json = await response.json();
        console.log(json);
        if(json.success) {
            //redirect to the dashboard and save auth token
            localStorage.setItem('token' , json.authtoken);
            history('/login');
            props.showAlert("Account created successfully" , "success");
        }
        else {
            props.showAlert("Invalid Credentials" , "danger");
        }
    }

  return (
    
    <>
    <div className='container'>
    <form onSubmit={handleSignUp}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name"  onChange={onChanges} name="name"/>
        </div>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" onChange={onChanges}  name="email"/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password"  onChange={onChanges} name='password'/>
        </div>
        <div className="mb-3">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="cpassword"  onChange={onChanges} name='cpassword'/>
        </div>
        <button type="submit" className="btn btn-primary">SignUp</button>
    </form>
    </div>
    </>
  )
}

export default Signup