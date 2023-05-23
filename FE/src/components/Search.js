import React, { useState } from 'react';
import '../styles/Search.css';

const dataList = ['빨간색', '파란색', '노란색', '검정색'];

const Search = () => {
  const [inputValue, setInputValue] = useState('');
  const [matchDataList, setMatchDataList] = useState([]);
  const [nowIndex, setNowIndex] = useState(0);

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    setInputValue(value);

    const filteredDataList = value
      ? dataList.filter((label) => label.includes(value))
      : [];

    setMatchDataList(filteredDataList);
    setNowIndex(0);
  };

  const handleKeyUp = (event) => {
    switch (event.key) {
      case 'ArrowUp':
        setNowIndex((prevIndex) => Math.max(prevIndex - 1, 0));
        break;
      case 'ArrowDown':
        setNowIndex((prevIndex) =>
          Math.min(prevIndex + 1, matchDataList.length - 1)
        );
        break;
      case 'Enter':
        document.querySelector('#search').value =
          matchDataList[nowIndex] || '';

        setInputValue('');
        setMatchDataList([]);
        setNowIndex(0);
        break;
      default:
        break;
    }
  };

  const showList = (data, value, nowIndex) => {
    const regex = new RegExp(`(${value})`, 'g');

    return data.map((label, index) => (
      <div key={index} className={nowIndex === index ? 'active' : ''}>
        {label.replace(regex, '<mark>$1</mark>')}
      </div>
    ));
  };

  return (
    <div className="searchbox">
      <input
        id="search"
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyUp={handleKeyUp}
      />
      <div className="autocomplete">{showList(matchDataList, inputValue, nowIndex)}</div>
    </div>
  );
};

export default Search;
