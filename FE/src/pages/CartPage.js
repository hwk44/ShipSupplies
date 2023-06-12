import userEvent from "@testing-library/user-event";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import CartList from "../components/cart/CartList";
import '../styles/Cart.css';
import axios from "axios";
import { isCompositeComponent } from "react-dom/test-utils";
import PastLeadtimePage from '../pages/PastLeadtimePage';
import { useNavigate } from "react-router-dom";


const CartPage = () => {

    const [wishList, setWishList] = useState([]); // 서버로부터 받은 데이터 저장할 변수
    const userId = localStorage.getItem('userId');
    const [selectedItem, setSelectedItem] = useState(null); // 클릭한 항목 정보 저장
    const navigate = useNavigate();

    const handleClick = (item) => {
        setSelectedItem(item);
        navigate("/pastleadtime", { state: { selectedItem: item } });
    };

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get(`/api/wish/get/?userId=${userId}`)
                console.log('wishlist : ', response);
                // console.log('response.data', response.data);
                setWishList(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [])


    return (
        <article>
            <div className='flex justify-center'>
                <table className="t1">
                    <thead>
                        <tr>
                            <th>
                                <input type="checkbox" class="accent-indigo-400" />
                            </th>
                            <th>상품명</th>
                            <th>카테고리</th>
                            <th>Machinery</th>
                            <th>견적화폐</th>
                            <th>견적단가</th>
                            <th>공급업체</th>
                            <th>예측 리드타임</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishList.map(item => (
                            <tr key={item.id}>
                                <td></td>
                                <td onClick={() => handleClick(item)}>
                                    {item.item}
                                </td>
                                <td>{item.category}</td>
                                <td>{item.machinery}</td>
                                <td>{item.currency}</td>
                                <td>{item.price}</td>
                                <td>{item.company}</td>
                                <td>{item.leadtime}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="float-right">
                <button className="mx-14 mt-3 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded">
                    삭제
                </button>
            </div>
        </article>

    );
}

export default CartPage;
