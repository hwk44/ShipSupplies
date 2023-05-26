import data from '../db/items.json';
import category from '../db/category.json';
import { useState, useEffect, useRef } from 'react';

const CateSearchPage = () => {

  const [cate, setCate] = useState('');
  const [item, setItem] = useState('');

  const [selCate, setSelCate] = useState([]); // 초기값 빈 배열
  const txtC = useRef();

  const SelectCate = (i) => {
    setCate(i);
    txtC.current.value = i;
  }

  const saveCate = (e) => {
    const searchText = txtC.current.value.toLowerCase();
    const temp = category.filter((i) => i.toLowerCase().includes(searchText));
    setSelCate(
      temp.map((i) => (
        <li
          onClick={() => SelectCate(i)} key={i}
        >
          {i}
        </li>

      ))
    );


    // console 창에 input 입력값 보임
    setCate(e.target.value);
    console.log(e.target.value);
  };

  return(
    <>
      <input ref={txtC} type='text' placeholder="카테고리" value={cate} onChange={saveCate} />
      <ul>{selCate.map((item) => item)}</ul>
    </>
  );
}
export default CateSearchPage;