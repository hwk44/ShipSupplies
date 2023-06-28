import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SearchResults = ({ results }) => {

  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');
  const [seldata, setSelData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

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

  const [checkedList, setCheckedList] = useState([]);

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

  const handleSave = async (e) => {

    if (!seldata) {
      alert("선택한 항목이 없습니다.");
      return;
    }

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
      // console.log('results : ', results)

      navigate('/cart');

      alert("저장되었습니다.");
    } catch (error) {
      console.log(error);
      alert("저장 실패")
    } finally {
      setIsLoading(false) 
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  return (
    <div>

      {results && results.length > 0 && (
        <>
          <div class="flex flex-col justify-center items-center">
            <table className="t1">
              <thead>
                <tr>
                  <th>
                    <input type="checkbox" class="accent-indigo-400" />
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
                {results && results.slice(startIndex, endIndex).map((item) => (
                  <tr key={item.id}>
                    <td>
                      <input
                        type="checkbox"
                        className="accent-indigo-400"
                        id={item.id}
                        value={item.id}
                        onChange={(e) => onCheckedItem(e.target.checked, item.id)}
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
      )
      }
    </div>

  );
};

export default SearchResults;
