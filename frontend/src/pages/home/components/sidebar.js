import Search from "./search";
import { useState } from "react";
import UserList from "./userList";
import './../index.css';

function Sidebar(){
    const [searchKey, setSearchKey] = useState('');

    return(
        <div className="home-sidebar">
            <Search searchKey={searchKey} setSearchKey={setSearchKey}></Search>
            <UserList searchKey={searchKey}></UserList>
        </div>
    )
}

export default Sidebar;