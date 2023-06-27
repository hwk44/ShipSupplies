import data from '../db/datas.json'
import axios from 'axios';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Search.css';
import { BiSearch } from "react-icons/bi";
import Select from 'react-select';

const SearchPage = () => {
  const [seldata, setSelData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState('');
  const [key, setKey] = useState(false);
  const [list1, setList1] = useState([]);
  const [checkedList, setCheckedList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const ITEMS_PER_PAGE = 10;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;

  const pageNumbers = seldata
    ? [...Array(Math.ceil(seldata.length / ITEMS_PER_PAGE)).keys()]
    : [];
  const currentPageGroupIndex = Math.floor((currentPage - 1) / 10);
  const pageGroups = [];
  for (let i = 0; i < pageNumbers.length; i += 10) {
    pageGroups.push(pageNumbers.slice(i, i + 10));
  }

  const [isAllChecked, setIsAllChecked] = useState(false);
  const handleAllChecked = useCallback(() => {
    setIsAllChecked(!isAllChecked);
    if (!isAllChecked) {
      if (seldata) {
        const pageItems = seldata.slice(startIndex, endIndex);  
        const pageIds = pageItems.map(item => item.id);  
        setCheckedList(pageIds);
      }
    } else {
      setCheckedList([]);
    }
  }, [isAllChecked, seldata, startIndex, endIndex]);

  const onCheckedItem = useCallback(
    (checked, item) => {
      if (checked) {
        setCheckedList((prev) => [...prev, item]);
      } else {
        setCheckedList(checkedList.filter((el) => el !== item));
      }
    },
    [checkedList]
  );

  useEffect(() => {
    if (selectedItem.includes("카테고리")) {
      setKey("key2")
    } else if (selectedItem.includes("청구품목")) {
      setKey("청구품목")
    } else if (selectedItem.includes("발주처")) {
      setKey("발주처")
    }

  }, [selectedItem]);

  useEffect(() => {
    const newList1 = data[key] || [];;
    setList1(newList1);
  }, [key]);

  const [selcate, setSelcate] = useState();
  const txtC = useRef();

  const selItem = (i) => {
    setSelcate(i);
    txtC.current.value = i;
    setCTag([]); 
  }

  const [ctag, setCTag] = useState([]);

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

  const handleSave = async (e) => {

    // if (!seldata) {
    //   console.error("seldata is null");
    //   return;
    // }

    setIsLoading(true); 
    // console.log('Checked items:', checkedList);

    e.preventDefault();

    try {
      const selectedItems = seldata.filter((item) => checkedList.includes(item.id));
      // console.log('selectedItems', selectedItems)

      if (selectedItems.length === 0) {
        throw new Error('선택된 아이템 없음');
      }

      const requests = selectedItems.map(async itemToSend => {
        try {
          const response = await axios.post(
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
              },
            }
          );

          const itemWithResponse = { ...itemToSend, response: response.data };

          await axios.post(
            '/api/wish/add',
            {
              item: itemWithResponse.item,
              category: itemWithResponse.category,
              machinery: itemWithResponse.machinery,
              currency: itemWithResponse.currency,
              price: itemWithResponse.price,
              company: itemWithResponse.company,
              leadtime: itemWithResponse.response.pred,
              user: { id: userId }
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          return itemWithResponse;
        } catch (error) {
          console.error('Error during requests:', error);
        }
      });

      const results = await Promise.all(requests);
      // console.log('results : ', results);
      navigate('/cart');


      alert("저장되었습니다.");
    } catch (error) {
      console.log(error);
      alert("저장 실패")
    } finally {
      setIsLoading(false) 
    }
  };

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
  const [selectSel1, setSelectSel] = useState(sel1[0]);

  useEffect(() => {
  }, [selectSel1]);


  return (
    <>
      <div className='flex flex-row justify-center items-center my-7'>
        <select value={selectedItem}
          onChange={(e) => setSelectedItem(e.target.value)}
          class="mx-2 h-10 border-2 border-blue-400 focus:outline-none focus:border-blue-600 text-blue-600 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider">
          <option value="" selected hidden>선택</option>
          <option value="발주처">발주처</option>
          <option value="부품명(청구품목)">부품명(청구품목)</option>
          <option value="카테고리(key2)">카테고리(key2)</option>
        </select>

        <div className='w-2/6'>
          <Select options={sel1} 
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

      {seldata && seldata.length > 0 && (
        <>
          <div class="flex flex-col justify-center items-center">
            <table className="t1 mb-6">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      class="accent-blue-400"
                      checked={isAllChecked}
                      onChange={handleAllChecked}
                      className="accent-blue-400"
                    />
                  </th>
                  <th>상품명</th>
                  <th>Machinery</th>
                  <th>Assembly</th>
                  <th>Part No.1</th>
                  <th>카테고리</th>
                  <th>공급업체</th>
                  <th>화폐</th>
                  <th>가격</th>
                  <th>출고운반선</th>
                  <th>Subject</th>
                </tr>
              </thead>
              <tbody>
                {seldata && seldata.slice(startIndex, endIndex).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={isAllChecked || checkedList.includes(item.id)}
                        onChange={(e) => onCheckedItem(e.target.checked, item.id)}
                        className="accent-blue-400"
                      />
                    </td>
                    <td>{item.item}</td>
                    <td>{item.machinery}</td>
                    <td>{item.assembly}</td>
                    <td>{item.partNo1}</td>
                    <td>{item.category}</td>
                    <td>{item.company}</td>
                    <td>{item.currency}</td>
                    <td>{item.price.toLocaleString('ko-KR')}</td>
                    <td>{item.ship}</td>
                    <td>{item.subject}</td>
                  </tr>
                ))}

              </tbody>
            </table>


            <ul className="pagination">
              {currentPageGroupIndex > 0 && (
                <li>
                  <span onClick={() => handlePageChange((currentPageGroupIndex - 1) * 10 + 1)}>
                    &lt; 이전
                  </span>
                </li>
              )}
              {pageGroups[currentPageGroupIndex]?.map((pageNumber) => (
                <li key={pageNumber}>
                  <span
                    onClick={() => handlePageChange(pageNumber + 1)}
                    className={currentPage === pageNumber + 1 ? "active" : ""}
                  >
                    {pageNumber + 1}
                  </span>
                </li>
              ))}
              {currentPageGroupIndex < pageGroups.length - 1 && (
                <li>
                  <span onClick={() => handlePageChange((currentPageGroupIndex + 1) * 10 + 1)}>
                    다음 &gt;
                  </span>
                </li>
              )}
            </ul>

          </div>
          <div className='float-right'>
            <button onClick={handleSave}
              className="mt-3 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mr-36">
              {isLoading ? 'Loading...' : '저장'}
            </button>
          </div>
        </>
      )}

    </>
  );
}
export default SearchPage;