import items from '../db/items.json';
import data from '../db/datas.json'
import axios from 'axios';
// import { useState, useEffect, useRef } from 'react';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import '../styles/Search.css';
import { BiSearch } from "react-icons/bi";
import Select from 'react-select';


const SearchPage = () => {
  // 드롭다운 선택 후 해당 데이터
  const [seldata, setSelData] = useState(null);

  // 페이지네이션 변수
  const [currentPage, setCurrentPage] = useState(1);

  // 드롭다운 가시화 변수
  const [dropdownVisibility, setDropdownVisibility] = useState(false);

  // 드롭다운에서 선택된 항목 정보 저장하는 변수
  const [selectedItem, setSelectedItem] = useState(''); // 추가된 코드
  // 
  const [key, setKey] = useState(false); //

  const [list1, setList1] = useState([]);

  // 체크박스 데이터 저장할 빈배열
  const [checkedList, setCheckedList] = useState([]);

  // 저장 버튼 클릭 시 응답 기다리는 변수
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate();
  const location = useLocation();


  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  }

  const onCheckedItem = useCallback(
    (checked, item) => {
      if (checked) {
        setCheckedList((prev) => [...prev, item]);
      } else if (!checked) {
        setCheckedList(checkedList.filter((el) => el !== item));
      }
    },
    [checkedList]
  );

  // 1️⃣ onChange함수를 사용하여 이벤트 감지, 필요한 값 받아오기
  const onCheckedElement = (checked, item) => {
    if (checked) {
      setCheckedList([...checkedList, item]);
      console.log("체크항목", checkedList)
    } else if (!checked) {
      setCheckedList(checkedList.filter(el => el !== item));
    }
  };

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

  // key 값이 변할때 data를 다르게 불러오도록 하는 useEffect
  useEffect(() => {
    const newList1 = data[key] || [];;
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
  const txtInput = useRef();

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
    console.log("txtC", txtC);
    // txtC 값을 소문자로 바꾸고
    const searchText = txtC.current.value.toLowerCase();
    // 그 값을 포함하는 list filter로 거름 
    const temp = list1.filter((i) => i.toLowerCase().includes(searchText));
    setCTag(
      temp.map((i) => (
        <li onClick={() => selItem(i)} key={i}>{i}</li>
      ))
    );
  };

  // 돋보기 버튼 클릭시 txtC, key 값을 넘기는 get 요청
  const handleSubmit = async () => {
    try {
      let requestUrl;

      if (key === "key2") {
        // requestUrl = "/api/item/findByCategory";
        requestUrl = "/api/item/findByCategory";
        requestUrl = requestUrl + "?category=" + txtC.current.value;
        console.log(requestUrl)
        // /?category=cooler
      } else if (key === "청구품목") {
        requestUrl = "/api/item/findByItem";
        requestUrl = requestUrl + "?item=" + txtC.current.value;
      } else if (key === "발주처") {
        requestUrl = "/api/item/findByCompany";
        requestUrl = requestUrl + "?company=" + txtC.current.value;
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
    } catch (error) {
      console.error("GET 요청 에러:", error);
    }
  };

  // 저장버튼 클릭시
  const handleSave = async (e) => {
    setIsLoading(true); // 요청이 시작될 때 true로 변경
    console.log('Checked items:', checkedList);

    e.preventDefault();

    try {
      // 필요한 데이터를 추출
      const selectedItems = seldata.filter((item) => checkedList.includes(item.id));
      console.log('selectedItems', selectedItems)

      if (selectedItems.length === 0) {
        throw new Error('선택된 아이템 없음');
      }

      // 선택된 아이템에 대한 요청을 모두 생성
      const requests = selectedItems.map(itemToSend =>
        axios.post(
          '/api/item/predict/regression',
          {
            subject: itemToSend.subject,
            ship: itemToSend.ship,
            key2: itemToSend.category,
            assembly: itemToSend.assembly,
            currency: itemToSend.currency,
            company: itemToSend.company,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            }
          }
        ).then(response => ({ ...itemToSend, response: response.data }))
      );

      // 요청들을 병렬로 수행하고 결과를 배열로 저장
      const results = await Promise.all(requests);

      // 결과 배열을 sentData와 receivedData로 분리
      const sentData = results.map(({ response, ...item }) => item);
      const receivedData = results.map(({ response }) => response);

      // 한 번에 페이지 이동
      navigate('/cart', {
        state: {
          sentData: sentData,
          receivedData: receivedData,
        },
      });

      alert("저장되었습니다.");
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false) // 요청이 끝나면 다시 false로 변경
    }
  };


  // 페이지 전환 핸들러
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // 페이지네이션 시작과 끝 인덱스 설정
  const ITEMS_PER_PAGE = 10;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  return (
    <>
      <div className='app'>
        <div className='flex flex-row justify-center items-center my-7'>
          <select value={selectedItem}
            onChange={(e) => setSelectedItem(e.target.value)}
            class="mx-2 h-10 border-2 border-indigo-400 focus:outline-none focus:border-indigo-600 text-indigo-600 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
            <option value="" selected hidden>선택</option>
            <option value="발주처">발주처</option>
            <option value="부품명(청구품목)">부품명(청구품목)</option>
            <option value="카테고리(key2)">카테고리(key2)</option>
          </select>


          {/* <div class="flex">
            <input ref={txtC} type="text" name="txt1" onChange={showC1}
              placeholder={key || "항목을 먼저 선택해주세요"}
              class="w-full md:w-80 px-3 h-10 rounded-l border-2 border-indigo-400 focus:outline-none focus:border-indigo-600"
            />
            
            {txtC.current && txtC.current.value.length > 0 ? (
            <ul>{ctag.slice(0, 30).map((item) => item)}</ul>) : null}

            <button onClick={handleSubmit} onKeyDown={handleOnKeyPress}
              class="bg-indigo-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1">
              <BiSearch />
            </button>
          </div> */}

          <div>
            <input
              ref={txtC}
              type="text"
              name="txt1"
              onChange={showC1}
              placeholder={key || "항목을 먼저 선택해주세요"}
              class="w-full md:w-80 px-3 h-10 rounded-l border-2 border-indigo-400 focus:outline-none focus:border-indigo-600"
            />
            <select
              value={txtC.current && txtC.current.value}
              onChange={(e) => {
                txtC.current.value = e.target.value;
                showC1();
              }}
              class="w-full md:w-80 px-3 h-10 rounded-l border-2 border-indigo-400 focus:outline-none focus:border-indigo-600"
            >
              <option value="" disabled className=''>
                {key || "---------"}
              </option>
              {ctag.slice(0, 30).map((item) => (
                <option value={item}>{item}</option>
              ))}
            </select>
            <button
              onClick={handleSubmit}
              class="h-10 bg-indigo-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
            >
              <BiSearch />
            </button>
          </div>




          {/* <div className="flex">
            <Select
              ref={txtC}
              type="text"
              name="txt1"
              onChange={showC1}
              options={ctag
                .filter((item) => item.includes(txtC.current && txtC.current.value))
                .slice(0, 30)
                .map((item) => ({ value: item, label: item }))
              }
              placeholder={key || "항목을 먼저 선택해주세요"}
              className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-indigo-400 focus:outline-none focus:border-indigo-600"
            />
            <button
              onClick={handleSubmit}
              // onKeyDown={handleOnKeyPress}
              className="bg-indigo-600 text-white rounded-r px-2 md:px-3 py-0 md:py-1"
            >
              <BiSearch />
            </button>
          </div> */}


        </div>

        {/* 검색창 드롭박스 내려오는 부분 */}
        {/* <div>
          {txtC.current && txtC.current.value.length > 0 ? (
            <ul>{ctag.slice(0, 30).map((item) => item)}</ul>) : null}
        </div> */}


        {seldata && seldata.length > 0 && (
          <div class="flex flex-col justify-center items-center">
            <table class="w-10/12 items-center text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">
                    <input type="checkbox" class="accent-indigo-400" />
                  </th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">상품명</th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">Machinery</th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">Assembly</th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">Part No.1</th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">카테고리</th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">공급업체</th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">화폐</th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">가격</th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">출고운반선</th>
                  <th scope="col" class="px-6 py-3 rounded-l-lg">Subject</th>

                </tr>
              </thead>
              <tbody>
                {seldata && seldata.slice(startIndex, endIndex).map((item) => (
                  <tr key={item.id} class="bg-white dark:bg-gray-800">
                    <td class="px-6 py-4">
                      <input
                        type="checkbox"
                        className="accent-indigo-400"
                        id={item.id}
                        value={item.id}
                        onChange={(e) => onCheckedItem(e.target.checked, item.id)}
                      />
                    </td>
                    <td class="px-6 py-4">{item.item}</td>
                    <td class="px-6 py-4">{item.machinery}</td>
                    <td class="px-6 py-4">{item.assembly}</td>
                    <td class="px-6 py-4">{item.partNo1}</td>z
                    <td class="px-6 py-4">{item.category}</td>
                    <td class="px-6 py-4">{item.company}</td>
                    <td class="px-6 py-4">{item.currency}</td>
                    <td class="px-6 py-4">{item.price.toLocaleString('ko-KR')}</td>
                    <td class="px-6 py-4">{item.ship}</td>
                    <td class="px-6 py-4">{item.subject}</td>
                  </tr>
                ))}

              </tbody>
            </table>

            <ul className="pagination">
              {[...Array(Math.ceil(seldata.length / ITEMS_PER_PAGE)).keys()].map((pageNumber) => (
                <li key={pageNumber} onClick={() => handlePageChange(pageNumber + 1)}>{pageNumber + 1}
                </li>
              )
              )}
            </ul>

          </div>
        )}
        <div className='float-right'>
          <button onClick={handleSave}
            className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-36">
            {isLoading ? 'Loading...' : '저장'}
          </button>
        </div>

      </div>
    </>
  );
}
export default SearchPage;