import React from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from './../../apiCalls/auth';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from './../../redux/loaderSlice';
import './index.css';

function Login(){
    const dispatch = useDispatch();
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });

    async function onFormSubmit(event){
        event.preventDefault();
        let response = null;
        console.log(0);
        try{
            dispatch(showLoader());
            response = await loginUser(user);
            dispatch(hideLoader());
            if(response.success){
                toast.success(response.message);
                localStorage.setItem('token',response.token);
                window.location.href = "/";
            }else{
                toast.error(response.message);
            }
        }catch(error){
            dispatch(hideLoader());
            toast.error(response.message);
        }
    }

    return (
        <div>
            <div className="login">
                <div className="login-title">
                    <h1>Login</h1>
                </div>
                <div className="login-form">
                    <form onSubmit={onFormSubmit}>
                        <input type="email" placeholder="Email Address" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                        <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
                        <button className="login-button">Login</button>
                    </form>
                </div>
                <div className="extras">
                    <span>Don't have an account?
                        <Link to="/signup">Sign Up Here</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Login;