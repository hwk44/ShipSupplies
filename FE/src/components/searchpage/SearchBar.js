import data from '../../db/datas.json'
import { useState, useEffect } from 'react';
import { BiSearch } from "react-icons/bi";
import Select from 'react-select';
import axios from 'axios';
import SearchResults from './SearchResults';


const SearchBar = () => {
  const [seldata, setSelData] = useState(null);

  const [selectedItem, setSelectedItem] = useState('');
  const [key, setKey] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    // console.log(selectSel1)
  }, [selectSel1]);

  const handleSubmit = async () => {
    try {
      let requestUrl;

      if (key === "key2") {
        requestUrl = "/api/item/findByCategory";
        requestUrl = requestUrl + "?category=" + selectSel1['value'];
        // console.log(requestUrl)
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
      // console.log("DATA", response.data);
    } catch (error) {
      console.error("GET 요청 에러:", error);
    }
  };

  // useEffect(() => {
  //   console.log("setData => ", seldata);
  // }, [seldata]);

  return (
    <>
      <div className='mt-24 flex flex-row justify-center items-center my-7'>
        <select value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          class="mx-2 h-10 border-2 border-blue-500 focus:outline-none focus:border-blue-600 text-blue-600 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
          <option value="" selected hidden>선택</option>
          <option value="발주처">발주처</option>
          <option value="부품명(청구품목)">부품명(청구품목)</option>
          <option value="카테고리(key2)">카테고리(key2)</option>
        </select>

        <div className='w-2/6'>
          <Select
            className=""
            options={sel1} 
            onChange={setSelectSel} 
            defaultValue={sel1[0]} />
        </div>


        <button
          onClick={handleSubmit}
          class="h-10 bg-blue-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
        >
          <BiSearch />
        </button>
      </div>
      <SearchResults results={seldata} />
    </>
  );
}
export default SearchBar;
