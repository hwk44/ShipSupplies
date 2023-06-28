import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import PastLeadtime from '../components/charts/PastLeadtime';


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
        // console.log("pastleadtime 결과:", response.data);
        setFoundItems(response.data);
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
        <div className="flex flex-col items-center pt-9">
          <div className="text-xl  leading-7 tracking-tight text-gray-900 flex flex-row">
            카테고리 &nbsp;
            <p className="text-2xl font-semibold leading-7 text-blue-500">{selectedItem.category}</p>
          </div>

          <div className="text-xl  leading-7 tracking-tight text-gray-900 flex flex-row">
            상품명 &nbsp;
            <p className="text-2xl font-semibold leading-7 text-blue-500">{selectedItem.item}</p>
          </div>
          <div className="text-xl  leading-7 tracking-tight text-gray-900 flex flex-row">
            발주처 &nbsp;
            <p className="text-2xl font-semibold leading-7 text-blue-500">{selectedItem.company}</p>
          </div>
        </div>
      )}

      <PastLeadtime foundItems={foundItems} />
    </>
  );
};

export default PastLeadtimePage;
