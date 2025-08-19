import React from 'react';
import { Link } from 'react-router-dom';
import { signupUser } from './../../apiCalls/auth';

function Signup(){
    const [user, setUser] = React.useState({
            firstname: '',
            lastname: '',
            email: '',
            password: ''
    });

    async function onFormSubmit(event){
        event.preventDefault(); 
        let response = null;
        try{
            response = await signupUser(user);
            if(response.success)
                alert(response.message);
            else
                alert(response.message);
        }catch(error){
            alert(response.message);
        }
    }
    
    return (
            <div className="signup">
                <div className="signup-title">
                    <h1>Create An Account</h1>
                </div>
                <div className="signup-form">
                    <form onSubmit={onFormSubmit}>
                        <input type="text" placeholder="First Name" value={user.firstname} onChange={(e) => setUser({...user, firstname: e.target.value})}/>
                        <input type="text" placeholder="Last Name" value={user.lastname} onChange={(e) => setUser({...user, lastname: e.target.value})}/>
                        <input type="text" placeholder="Email Address" value={user.email} onChange={(e) => setUser({...user, email: e.target.value})}/>
                        <input type="password" placeholder="Password" value={user.password} onChange={(e) => setUser({...user, password: e.target.value})}/>
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="extras">
                    <span>Already have an account? 
                        <Link to="/login">Login Here</Link>
                    </span>
                </div>
            </div>
    );
}

export default Signup;