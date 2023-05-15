import searchImage from '../images/search.svg';
import '../styles/Search.css';

const Search = () => {
    return(
        <div className="searchbox">
            <input placeholder="검색" />
            <img className="searchlogoimg" src={searchImage} alt="search"/>
        </div>
    );
}
export default Search;