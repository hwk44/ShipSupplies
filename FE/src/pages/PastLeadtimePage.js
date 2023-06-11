import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";


const PastLeadtimePage = () => {
    const location = useLocation();
    const selectedItem = location.state.selectedItem;
    const [foundItems, setFoundItems] = useState([]);

    useEffect(() => {
        const fetchItemsByItem = async () => {
            try {
                const response = await axios.get(`/api/item/pastleadtime?category=${selectedItem.category}?company=${selectedItem.company}?item=${selectedItem.item}`);
                console.log("pastleadtime 결과:", response.data);
                setFoundItems(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (selectedItem) {
            fetchItemsByItem();
        }
    }, [selectedItem]);

    return (
        <>
        {selectedItem && (
          <div>
            <p>상품명: {selectedItem.item}</p>
            <p>카테고리: {selectedItem.category}</p>
            <p>Machinery: {selectedItem.machinery}</p>
            <p>발주처: {selectedItem.company}</p>
          </div>
        )}
  
        {/* API에서 가져온 결과를 렌더링 */}
        <h2>검색 결과:</h2>
        {foundItems.map((item) => (
          <div key={item.id}>
            <p>아이템 이름: {item.item}</p>
            {/* 나머지 아이템 정보 렌더링 */}
          </div>
        ))}
      </>
    );
};

export default PastLeadtimePage;
