import { useState } from 'react';
import searchImage from '../images/search.svg';
import '../styles/Search.css';

const Search = () => {
    
    const font = {
        fontFamily : "Pretendard Medium",
        fontSize : "1em",
        
    };
    
    return(
        <div className="searchbox">
            <input placeholder="검색" style={font} />
            <img className="searchlogoimg" src={searchImage} alt="search"/>
        </div>
    );
}
export default Search;