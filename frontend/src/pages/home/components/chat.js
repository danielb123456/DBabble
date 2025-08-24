import { useSelector, useDispatch } from "react-redux";
import './../index.css';
import { showLoader, hideLoader } from "../../../redux/loaderSlice";
import { createNewMessage, getAllMessages } from "../../../apiCalls/message";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";


function ChatArea(){
    const { selectedChat, user } = useSelector(state => state.userReducer)

    const selectedUser = selectedChat.members.find( u => u._id !== user._id);

    const dispatch = useDispatch();

    const [message, setMessage] = useState("");
    
    const [allMessages, setAllMessages] = useState([]);

    const sendMessage = async() => {
        try{
                const newMessage = {
                        chatId: selectedChat._id,
                        sender: user._id,
                        text: message
                }
                dispatch(showLoader());
                const response = await createNewMessage(newMessage);
                dispatch(hideLoader());

                if(response.success){
                        setMessage('');
                }
        }catch(error){
                dispatch(hideLoader());
                toast.error(error.message);
        }
    }

    const getMessages = async() => {
        try{
                dispatch(showLoader());
                const response = await getAllMessages(selectedChat._id);
                dispatch(hideLoader());

                if(response.success){
                        setAllMessages(response.data);
                }
        }catch(error){
                dispatch(hideLoader());
                toast.error(error.message);
        }
    }

    useEffect(() => {
        getMessages();
    }, [selectedChat])

    return <>   
                {selectedChat && 
                <div className="chat-area">
                        <div className="chat-area-header">
                                { selectedUser.firstName + " " + selectedUser.lastName }
                        </div>
                        <div className="chat-area-message-area">
                                Message Area
                        </div>
                        <div class="send-message-box">
                                <input type="text" 
                                        className="send-message-input" 
                                        placeholder="Send a Message"
                                        value={message}
                                        onChange={ (e) => { setMessage(e.target.value) }}
                                />
                                <button className="fa fa-paper-plane send-message-button" aria-hidden="true" onClick={ sendMessage}></button>
                        </div>
                </div>}
        </>
}

export default ChatArea;