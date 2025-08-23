import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLoggedUser, getAllUsers } from './../apiCalls/users';
import { hideLoader, showLoader } from './../redux/loaderSlice';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser, setAllUsers, setAllChats } from './../redux/usersSlice';
import { getAllChats } from '../apiCalls/chat';

function ProtectedRoute({children}){
    const { user } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const getLoggedinUser = async () => {
        let response = null;
        try{
            dispatch(showLoader());
            response = await getLoggedUser();
            dispatch(hideLoader());
            if(response.success){
                dispatch(setUser(response.data));
            }else{
                toast.error(response.message);
                window.location.href = '/login';
            }
        }catch(error){
            dispatch(hideLoader());
            navigate('/login');
        }
    }

    const getAllUsersFromDB = async () => {
        let response = null;
        try{
            dispatch(showLoader());
            response = await getAllUsers();
            dispatch(hideLoader());
            if(response.success){
                dispatch(setAllUsers(response.data));
            }else{
                toast.error(response.message);
                window.location.href = '/login';
            }
        }catch(error){
            dispatch(hideLoader());
            navigate('/login');
        }
    }

    const getLoggedUserChats = async () => {
        try{
            const response = await getAllChats();
            if(response.success)
                return dispatch(setAllChats(response.data));
        }catch(error){
            navigate('/login');
        }
    }

    useEffect(() => { // runs everytime a page is loaded
        if(localStorage.getItem('token')){
            getLoggedinUser(); // if jwt, fetch user details and assng to user state
            getAllUsersFromDB();
            getAllChats();
        }else{
            navigate('/login'); // if no token, send to login page
        }
    }, []); // [] means no dependencies, so React will run this effect ONCE (when the page loads)
            // without [], it would run after every render

    // user? allows it to be null
    return(
        <div>
            { children }
        </div>
    )
}

export default ProtectedRoute