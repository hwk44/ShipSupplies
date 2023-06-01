import items from '../db/items.json';
import data from '../db/datas.json'
import axios from 'axios';
import Dropdown from './Dropdown';
// import { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect, useRef } from 'react';


const SearchPage = () => {

  // 토큰을 저장하는 변수
  const token = localStorage.getItem('jwt');
  console.log(token)

  // 드롭다운 가시화 변수
  const [dropdownVisibility, setDropdownVisibility] = useState(false);
 
  // 드롭다운에서 선택된 항목 정보 저장하는 변수
  const [selectedItem, setSelectedItem] = useState(''); // 추가된 코드
  // 
  const [key, setKey] = useState(false); //

  const [list1, setList1] = useState([]);

  useEffect(() => {
    // console.log('선택된 항목:', selectedItem);
    if (selectedItem.includes("카테고리")){
      setKey("key2")
    } else if(selectedItem.includes("청구품목")){
      setKey("청구품목")
    } else if (selectedItem.includes("발주처")){
      setKey("발주처")
    } 
    
  }, [selectedItem]);

  // key 값이 변할때 data를 다르게 불러오도록 하는 useEffect
  useEffect(() => {
    console.log(key)
    const newList1 = data[key];
    setList1(newList1);
    // console.log(list1)
  }, [key]);

  // useEffect(() => {
  //   console.log(list1)
  // }, [list1]);


  // 드롭박스 항목 클릭 함수
  const handleItemClick = (item) => {
    setSelectedItem(item);
    setDropdownVisibility(false);
    // console.log(buttonText);
  }; 

  // 선택된 항목 buttonText
  const buttonText = selectedItem || '항목선택';

  const [selcate, setSelcate] = useState();
  const txtC = useRef();

  const cate = Object.keys(items);
  // console.log(cate);


  const selItem = (i) => {
    setSelcate(i);
    txtC.current.value = i;
    setCTag([]); // txtC가 선택되면 아래항목 보이지않게 배열 초기화
  }

    // 초기값 빈배열[]
    const [ctag, setCTag] = useState([]);

    const showC1 = (e) => {
      // txtC 값을 소문자로 바꾸고
      const searchText = txtC.current.value.toLowerCase();
      // 그 값을 포함하는 list filter로 거름 
      const temp = list1.filter((i) => i.toLowerCase().includes(searchText));
      setCTag(
        temp.map((i) => (
          <li onClick={() => selItem(i)}key={i}>{i}</li>
        ))
      );
    };

    // Button 클릭시 txtC, key 값을 넘기는 post 요청
    const handleSubmit = async () => {
      try {
        let requestUrl;
    
        if (key === "key2") {
          // requestUrl = "/api/item/findByCategory";
          requestUrl = "/api/item/findByCategory";
          requestUrl = requestUrl + "?category=" +txtC.current.value;
          console.log(requestUrl)
          // /?category=cooler
        } else if (key === "청구품목") {
          requestUrl = "/api/item/findByItem";
          requestUrl = requestUrl + "?item=" +txtC.current.value;
        } else if (key === "발주처") {
          requestUrl = "/api/item/findByCompany";
          requestUrl = requestUrl + "?company=" +txtC.current.value;
        } else {
          console.error("Invalid key value:", key);
          return;
        }
    
        const response = await axios.get(requestUrl, 
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`
            }
          }
        );
    
        console.log(response.data);
      } catch (error) {
        console.error("GET 요청 에러:", error);
      }
    };

  return (
    <>
    <button onClick={() => setDropdownVisibility(!dropdownVisibility)}>
        {dropdownVisibility ? '닫기' : buttonText}
    </button> 

    <div className='app'>
        <Dropdown visibility={dropdownVisibility}>
          <ul>
            <li onClick={() => handleItemClick("발주처")}>발주처</li>
            <li onClick={() => handleItemClick("부품명(청구품목)")}>부품명(청구품목)</li> 
            <li onClick={() => handleItemClick("카테고리(key2)")}>카테고리(key2)</li>
          </ul>
        </Dropdown>
        <input ref={txtC} type="text" name="txt1" onChange={showC1} placeholder={key || "항목을 먼저 선택해 주세요"}/>
        <br /><br />
        <button onClick={handleSubmit}>제출</button>
        <div className="conleft">
          {txtC.current && txtC.current.value.length > 0 ? (
            <ul>{ctag.slice(0, 30).map((item) => item)}</ul>) : null}
        </div>
      </div>
    </>
  );
}
export default SearchPage;
