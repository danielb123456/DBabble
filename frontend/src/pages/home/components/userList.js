import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createNewChat } from "./../../../apiCalls/chat";
import { hideLoader, showLoader } from "./../../../redux/loaderSlice";
import { setAllChats, setSelectedChat } from './../../../redux/usersSlice';

function UserList({searchKey}){
    const {allUsers, allChats, user: currentUser } = useSelector(state => state.userReducer);
    const dispatch = useDispatch();

    // not naming it createNewChat as well (alias)
    const startNewChat = async (searchedUserId) => {
        let response = null;
        try{
            dispatch(showLoader());
            response = await createNewChat([currentUser._id, searchedUserId]);
            dispatch(hideLoader());

            if(response.success){
                toast.success(response.message);
                const newChat = response.data;
                const updatedChat = [...allChats, newChat];
                dispatch(setAllChats(updatedChat));
                dispatch(setSelectedChat(newChat));
            }
        }catch(error){
            toast.error(response.message);
            dispatch(hideLoader());
        }
    }

    const openChat = (selectedUserId) => {
        const chat = allChats.find(chat => chat.members.includes(currentUser._id) &&
                                           chat.members.includes(selectedUserId)
        );

        if(chat){
            dispatch(setSelectedChat(chat));
        }
    }

    return(
        allUsers
        .filter(user => {
            return (
                (
                    user.firstName.toLowerCase().includes(searchKey.toLowerCase()) ||
                    user.lastName.toLowerCase().includes(searchKey.toLowerCase())) && 
                    searchKey
                ) || (allChats.some(chat => chat.members.includes(user._id)))
        })
        .map(user => {
            return (
        <div class="user-search-filter" onClick={() => openChat(user._id_)} key={user._id}>
            <div className="filtered-user">
                <div className="filter-user-display">
                    {user.profilePic && <img src={user.profilePic} alt="Profile Pic" className="user-profile-pic"></img>}
                    {!user.ProfilePic && <div className="user-default-profile-pic">
                        {
                            user.firstName.charAt(0).toUpperCase() + 
                            user.lastName.charAt(0).toUpperCase()
                        }
                    </div>}
                    <div className="filter-user-details">
                        <div className="user-display-name">
                            { user.firstName + ' ' + user.lastName }
                        </div>
                        <div className="user-display-email">
                                { user.email }
                        </div>
                    </div>
                    <div className="user-create-chat">
                        { !allChats.find(chat => chat.members.includes( user._id )) &&
                            <button className="user-create-chat-button" onClick={() => startNewChat(user._id)}>
                                Create Chat
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
            )
        
    }));
}

export default UserList;