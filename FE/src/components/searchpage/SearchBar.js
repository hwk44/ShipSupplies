// 검색창 컴포넌트
import items from '../../db/items.json';
import data from '../../db/datas.json'
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { BiSearch } from "react-icons/bi";
import Select from 'react-select';
import axios from 'axios';
import SearchResults from './SearchResults';


const SearchBar = () => {
  // 드롭다운 선택 후 해당 데이터
  const [seldata, setSelData] = useState(null);

  // 드롭다운에서 선택된 항목 정보 저장하는 변수
  const [selectedItem, setSelectedItem] = useState('');
  const [key, setKey] = useState(false);

  useEffect(() => {
    // console.log('선택된 항목:', selectedItem);
    if (selectedItem.includes("카테고리")) {
      setKey("key2")
    } else if (selectedItem.includes("청구품목")) {
      setKey("청구품목")
    } else if (selectedItem.includes("발주처")) {
      setKey("발주처")
    }

  }, [selectedItem]);

  let sel1 = [];
  if (key === '발주처' || key === '청구품목' || key === 'key2') {
    if (Array.isArray(data[key])) {
      sel1 = data[key].map((i) => ({
        value: i,
        label: i,
      }));
    }
  }
  sel1 = [{ value: '', label: '' }, ...sel1];
  // console.log(sel1)
  const [selectSel1, setSelectSel] = useState(sel1[0]);
  //안에 들어가는 값을 받아야해서 state사용

  useEffect(() => {
    // console.log(selectSel1)
  }, [selectSel1]);

  // 돋보기 버튼 클릭시 txtC, key 값을 넘기는 get 요청
  const handleSubmit = async () => {
    try {
      let requestUrl;

      if (key === "key2") {
        // requestUrl = "/api/item/findByCategory";
        requestUrl = "/api/item/findByCategory";
        requestUrl = requestUrl + "?category=" + selectSel1['value'];
        console.log(requestUrl)
        // /?category=cooler
      } else if (key === "청구품목") {
        requestUrl = "/api/item/findByItem";
        requestUrl = requestUrl + "?item=" + selectSel1['value'];
      } else if (key === "발주처") {
        requestUrl = "/api/item/findByCompany";
        requestUrl = requestUrl + "?company=" + selectSel1['value'];
      } else {
        console.error("Invalid key value:", key);
        return;
      }

      const response = await axios.get(requestUrl,
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );
      setSelData(response.data);
      console.log("DATA", response.data);
      console.log("setData => ", seldata);
    } catch (error) {
      console.error("GET 요청 에러:", error);
    }
  };

  return (
    <>
      <div className='flex flex-row justify-center items-center my-7'>
        <select value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          class="mx-2 h-10 border-2 border-indigo-400 focus:outline-none focus:border-indigo-600 text-indigo-600 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
          <option value="" selected hidden>선택</option>
          <option value="발주처">발주처</option>
          <option value="부품명(청구품목)">부품명(청구품목)</option>
          <option value="카테고리(key2)">카테고리(key2)</option>
        </select>

        <div className='w-2/6'>
          <Select
            className=""
            options={sel1} //위에서 만든 배열을 select로 넣기
            onChange={setSelectSel} //값이 바뀌면 setState되게
            defaultValue={sel1[0]} />
        </div>


        <button
          onClick={handleSubmit}
          class="h-10 bg-indigo-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
        >
          <BiSearch />
        </button>
      </div>
      <SearchResults results={seldata} />
    </>
  );
}
export default SearchBar;
