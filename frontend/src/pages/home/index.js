import ChatArea from "./components/chat";
import Header from "./components/header";
import Sidebar from "./components/sidebar";

function Home(){
    return (
        <div className="home-page">
            <Header></Header>
            <div className="main-content">
                <Sidebar></Sidebar>
                <ChatArea></ChatArea>
                <h2>This is the Home Page</h2>
            </div>
        </div>

    );
}

export default Home;