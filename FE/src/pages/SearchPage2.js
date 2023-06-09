import React, { useState } from 'react';
import SearchBar from '../components/searchpage/SearchBar';
import SearchResults from '../components/searchpage/SearchBar';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);

  const performSearch = () => {

  }

  const handleSearch = (query) => {
    // 검색 요청 처리 및 결과 업데이트 로직
    const results = performSearch(query);
    setSearchResults(results);
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
}
export default SearchPage;