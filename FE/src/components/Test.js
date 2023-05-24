import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";

function Test() {
    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const 

  const [inputValue, setInputValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // 입력값 변경 이벤트 핸들러
  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    // 입력값에 따라 자동 완성 결과 계산
    const results = []; // 초기화
    setSearchResults(results);
  };

  // 결과 선택 이벤트 핸들러
  const handleResultClick = (result) => {
    // 선택된 결과 처리 로직
  };

  return (
    <div>
      <input type="text" value={inputValue} onChange={handleInputChange} />
      <ul>
        {searchResults.map((result, index) => (
          <li key={index} onClick={() => handleResultClick(result)}>
            {result}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Test;
