import items from '../db/items.json';
import { useState, useEffect, useRef } from 'react';

const CateSearchPage = () => {
  const [selc1, setSelc1] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const txtC = useRef();
  const txtI = useRef();
  const cate = Object.keys(items);
  // console.log(cate); // ["ADAPTER", "BINO"]

  //const item = Object.values(items);
  // console.log("item", item)
  /*
  let tempp = items.map((i,n) =>
    <span>{items[i]}</span>
  );
  */
  

  // 맨 처음 한번 실행될 때 useRef에 포커스
  useEffect(() => {
    txtC.current.focus();
  }, []);

  const selCate = (i) => {
    setSelc1(i);
    txtC.current.value = i;
  }

  const selItem = (j) => {
    setSelectedValue(j);
    txtI.current.value = j;
  }

  // 초기값 빈배열[]
  const [c1tag, setC1Tag] = useState([]);
  const showC1 = () => {
    const searchText1 = txtC.current.value.toLowerCase();
    const temp1 = cate.filter((i) => i.toLowerCase().includes(searchText1));
    setC1Tag(
      temp1.map((i) => (
        <li
          className={i === selc1 ? 'ulis1' : 'uli1'}
          onClick={() => selCate(i)}
          key={i}
        >
          {i}
        </li>
      ))
    );
  };

  const [c2tag, setC2Tag] = useState([]);
  const showC2 = () => {
    const searchText2 = txtI.current.value.toLowerCase();
    const temp2 = cate.filter((i) => i.toLowerCase().includes(searchText2));
    setC2Tag(
      temp2.map((j) => (
        <li
          className={j === selectedValue ? 'ulis2' : 'uli2'}
          onClick={() => selItem(j)}
          key={j}
        >
          {j}
        </li>
      ))
    );
  };

  return (
    <div className="conleft">
      <div>
        <form>
          <input
            ref={txtC}
            type="text"
            name="txt1"
            onChange={showC1}
            placeholder="카테고리를 입력하세요." />
          <input 
            ref={txtI} 
            type="text" 
            name="txt2" 
            onChange={showC2} 
            placeholder="상품명을 입력하세요." />
        </form>
      </div>
      <ul>{c1tag.map((item) => item)}</ul>
      <ul>{c2tag.map((item) => item)}</ul>
      

    </div>
  );


}
export default CateSearchPage;