import ChatArea from "./components/chat";
import Header from "./components/header";
import Sidebar from "./components/sidebar";
import { useSelector } from "react-redux";
import './index.css';

function Home(){
    const { selectedChat } = useSelector(state => state.userReducer);
    return (
        <div className="home-page">
            <Header></Header>
            <div className="main-content">
                <Sidebar></Sidebar>
                {selectedChat && <ChatArea></ChatArea>}
            </div>
        </div>

    );
}

export default Home;