import React,{useState} from 'react';
import image from '../../img/image.png';
import PostView from '../post-view/post-view';
import { BrowserRouter as Router ,Switch, Route, Link,useHistory } from "react-router-dom";
import './landing-page.css'
import icon  from "../../img/icon.png";


const axios = require('axios');



export default function LandingPage() {
    var historyobj=useHistory();
    const useFormInput = initialValue => {
        const [value, setValue] = useState(initialValue);
        
        const handleChange = e => {
            setValue(e.target.value);
        }
        return {
            value,
            onChange: handleChange
        }
    }
           

    const email = useFormInput('');
    const password = useFormInput('');
    let handleSubmit=function(event) {
        try {
            alert("submited")
            event.preventDefault();
            console.log(email.value)
            console.log(password.value)
            axios.post('http://localhost:3000/api/v1/login',{email:email.value,password:password.value})
            .then(function (response) {
                window.localStorage.setItem("Token",response.data.token)
                historyobj.push("/post")
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
        } catch (error) {
            console.log(error)
            alert("login Failed")
            
        }
      }
    

    return (
        
            <div>
                <div className="container">
                 
                    <form onSubmit={handleSubmit}>
                        <div className="logo">
                            <div>
                                <span><img src={icon} alt="error" height="50px" width="50px" /></span>
                            </div>
                            <div className="nav-text">
                                <span className="insta-clone">InstaClone</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" {...email}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" {...password}  className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <div className="form-button-div">
                            <button type="submit" className="btn btn-primary login-button">Login</button>
                        </div>
                        <div className="form-button-div">
                            <button type="submit" className="btn btn-outline-success signup-button">Create New Account</button>
                        </div>
                    </form>
                </div>
                <div className="container">
                    
                    <form onSubmit={handleSubmit}>
                        <div className="logo">
                            <div>
                                <span><img src={icon} alt="error" height="50px" width="50px" /></span>
                            </div>
                            <div className="nav-text">
                                <span className="insta-clone">InstaClone</span>
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" {...email}  className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" {...password}  className="form-control" id="exampleInputPassword1" placeholder="Password"/>
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>

        
    );
}

