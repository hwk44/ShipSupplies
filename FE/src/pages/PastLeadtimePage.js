import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import Chart from '../components/cart/Chart';


const PastLeadtimePage = () => {
  const location = useLocation();
  const selectedItem = location.state.selectedItem;
  const [foundItems, setFoundItems] = useState([]);

  useEffect(() => {
    const fetchPastLeadtime = async () => {
      try {
        const encodedItem = encodeURIComponent(selectedItem.item);
        const encodedCategory = encodeURIComponent(selectedItem.category);
        const encodedCompany = encodeURIComponent(selectedItem.company);

        const response = await axios.get(`/api/item/pastLeadtime?item=${encodedItem}&category=${encodedCategory}&company=${encodedCompany}`);
        console.log("pastleadtime 결과:", response.data);
        setFoundItems(response.data);
        // const response = await axios.get(`/api/item/pastLeadtime?item=${selectedItem.item}&category=${selectedItem.category}&company=${selectedItem.company}`);
        // console.log("pastleadtime 결과:", response.data);
        // setFoundItems(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedItem) {
      fetchPastLeadtime();
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

      <Chart foundItems={foundItems} />
    </>
  );
};

export default PastLeadtimePage;
