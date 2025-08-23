import { useSelector } from 'react-redux';

function Header(){
    const { user } = useSelector(state => state.userReducer);

    console.log(user);

    function getFullName(){
        let fname = user?.firstName.toUpperCase();
        let lname = user?.lastName.toUpperCase();
        return fname + ' ' + lname;
    }

    function getInitials(){
        let f = user?.firstName.toUpperCase()[0];
        let l = user?.lastName.toUpperCase()[0];
        return f + l;
    }
    return(
        <div className='app-header'>
            <div className='app-logo'>
                <i className='fa fa-comments' aria-hidden='true'></i>
            </div>
            <div className='app-options'>
                <div className='logged-user-name'>{ getFullName() }</div>
                <div className='logged-user-profile-pic'>{ getInitials() }</div>
            </div>
        </div>


    );
}

export default Header;