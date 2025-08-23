import React from 'react';
import { Link } from 'react-router-dom';
import { signupUser } from './../../apiCalls/auth';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { hideLoader, showLoader } from './../../redux/loaderSlice'; 

function Signup(){
    const dispatch = useDispatch();
    const [user, setUser] = React.useState({
            firstName: '',
            lastName: '',
            email: '',
            password: ''
    });

    async function onFormSubmit(event){
        event.preventDefault(); 
        let response = null;
        try{
            dispatch(showLoader());
            response = await signupUser(user);
            dispatch(hideLoader());
            if(response.success){
                toast.success(response.message);
            }else{
                toast.error(response.message);
            }
        }catch(error){
            dispatch(hideLoader());
            toast.error(response.message);
        }
    }
    
    return (
            <div className="signup">
                <div className="signup-title">
                    <h1>Create An Account</h1>
                </div>
                <div className="signup-form">
                    <form onSubmit={onFormSubmit}>
                        <input type="text" placeholder="First Name" value={user.firstName} onChange={(e) => setUser({...user, firstName: e.target.value})}/>
                        <input type="text" placeholder="Last Name" value={user.lastName} onChange={(e) => setUser({...user, lastName: e.target.value})}/>
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