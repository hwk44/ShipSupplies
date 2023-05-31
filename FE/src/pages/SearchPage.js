import items from '../db/items.json';
import Dropdown from "./Dropdown";
// import { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';




const SearchPage = () => {

  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  const [selectedItem, setSelectedItem] = useState('');


  const [selcate, setSelcate] = useState();
  const txtC = useRef();

  const cate = Object.keys(items);
  console.log(cate);

  // 맨 처음 한번 실행될 때 useRef에 포커스
  useEffect(() => {
    txtC.current.focus();
  }, []);

  const selItem = (i) => {
    setSelcate(i);
    txtC.current.value = i;
  }

  // 초기값 빈배열[]
  const [ctag, setCTag] = useState([]);
  const showC1 = (e) => {
    const searchText = txtC.current.value.toLowerCase();
    const temp = cate.filter((i) => i.toLowerCase().includes(searchText));
    setCTag(
      temp.map((i) => (
        <li onClick={() => selItem(i)}key={i}>{i}</li>
      ))
    );
  };
  

  return (
    <>
    <div className="conleft">
      <div>
        <input ref={txtC} type="text" name="txt1" onChange={showC1} placeholder="카테고리"/>
        <input type="text" name="txt2" placeholder="물품" />
      </div>
          <ul>{ctag.map((item) => item)}</ul>
    </div>

    <button onClick={e => setDropdownVisibility(!dropdownVisibility)}>
      {dropdownVisibility ? '닫기': '항목선택'}
    </button> 

    <div className='app'>
      <Dropdown visibility={dropdownVisibility}>
          <ul>
              <li>발주처</li>
              <li>부품명(청구품목)</li> 
              <li>카테고리(key2)</li>
              {/* <li>item 4</li> */}
          </ul>
      </Dropdown>
    </div>



    </>
   
  );

}
export default SearchPage;
