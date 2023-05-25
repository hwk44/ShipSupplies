import Search from '../components/Search';
import SearchBar1 from '../components/SearchBar1';
import items from '../db/items.json';
import { useState, useEffect, useRef } from 'react';




const CateSearchPage = () => {
    const [selc1, setSelc1] = useState();
    const txtR = useRef();


    const cate = Object.keys(items);
    // console.log(cate); // ["ADAPTER", "BINO"]

    const item = Object.values(items);
     console.log("item", item)

    // 맨 처음 한번 실행될 때 useRef에 포커스
    useEffect(() => {
        txtR.current.focus();
    }, []);

    const selItem = (i) => {
        setSelc1(i);
        txtR.current.value = i;
    }

    // 초기값 빈배열[]
    const [c1tag, setC1Tag] = useState([]);
    const showC1 = () => {
        const searchText = txtR.current.value.toLowerCase();
        const temp = cate.filter((i) => i.toLowerCase().includes(searchText));
        setC1Tag(
          temp.map((i) => (
            <li
              className={i === selc1 ? 'ulis' : 'uli'}
              onClick={() => selItem(i)}
              key={i}
            >
              {i}
            </li>
          ))
        );
      };
      
    return (
        <div className="conleft">
          <div>
            <form>
              <input
                ref={txtR}
                type="text"
                name="txt1"
                onChange={showC1}
                placeholder="카테고리를 입력하세요."
              />
              <input name="txt2" placeholder="상품명을 입력하세요."/>
            </form>
          </div>
          <ul>{c1tag.map((item) => item)}</ul>
        </div>
    );
      

}
export default CateSearchPage;