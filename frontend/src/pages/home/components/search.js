import './../index.css';

function Search({searchKey,setSearchKey}){
    return (
        <div className="user-search">
            <input type="text" 
                className="user-search-text" 
                value={searchKey}
                onChange={(e) => setSearchKey(e.target.value)}/>
            <i className="user-search-button" aria-hidden="true"></i>
        </div>
    )
}

export default Search;