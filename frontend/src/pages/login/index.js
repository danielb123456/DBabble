import React from 'react';
import { Link } from 'react-router-dom';

function Login(){
    const [user, setUser] = React.useState({
        email: '',
        password: ''
    });

    function onFormSubmit(event){
        event.preventDefault();
        console.log(user);
    }

    return (
        <div>
            <div className="login">
                <div className="login-title">
                    <h1>Login</h1>
                </div>
                <div className="login-form">
                    <form onSubmit={onFormSubmit}>
                        <input type="text" placeholder="Email Address" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                        <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, email: e.target.value})}/>
                        <button>Login</button>
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