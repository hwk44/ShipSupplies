import userEvent from "@testing-library/user-event";
import { useState, useEffect, useRef } from "react";
import CartList from "../components/cart/CartList";
import '../styles/Cart.css';
import axios from "axios";
import { isCompositeComponent } from "react-dom/test-utils";


const CartPage = () => {

    const [wishList, setWishList] = useState([]); // 서버로부터 받은 데이터 저장할 변수
    const userId = localStorage.getItem('userId');

    useEffect(() => {
        const fetchList = async () => {
            try {
                const response = await axios.get(`/api/wish/get/?userId=${userId}`)
                console.log('wishlist : ', response);
                setWishList(response.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchList();
    }, [])


    return (
        <>
            <div className='flex justify-center'>
                <table class="w-11/12 my-14 text-sm text-left text-gray-500 dark:text-gray-400">
                    <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" class="px-6 py-3 rounded-l-lg">
                                <input type="checkbox" class="accent-indigo-400" />
                            </th>
                            <th scope="col" class="px-6 py-3 rounded-l-lg">상품명</th>
                            <th scope="col" class="px-6 py-3 rounded-l-lg">카테고리</th>
                            <th scope="col" class="px-6 py-3 rounded-l-lg">Machinery</th>
                            <th scope="col" class="px-6 py-3 rounded-l-lg">견적화폐</th>
                            <th scope="col" class="px-6 py-3 rounded-l-lg">견적단가</th>
                            <th scope="col" class="px-6 py-3 rounded-l-lg">공급업체</th>
                            <th scope="col" class="px-6 py-3 rounded-l-lg">예측 리드타임</th>
                        </tr>
                    </thead>
                    <tbody>
                        {wishList.map(item => (
                            <tr key={item.id}>
                                <td scope="col" class="px-6 py-3 rounded-l-lg"><input type="checkbox" class="accent-indigo-400" /></td>
                                <td scope="col" class="px-6 py-3 rounded-l-lg">{item.item}</td>
                                <td scope="col" class="px-6 py-3 rounded-l-lg">{item.category}</td>
                                <td scope="col" class="px-6 py-3 rounded-l-lg">{item.machinery}</td>
                                <td scope="col" class="px-6 py-3 rounded-l-lg">{item.currency}</td>
                                <td scope="col" class="px-6 py-3 rounded-l-lg">{item.price}</td>
                                <td scope="col" class="px-6 py-3 rounded-l-lg">{item.company}</td>
                                <td scope="col" class="px-6 py-3 rounded-l-lg">{item.leadtime}</td>
                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        </>
    );
}

export default CartPage;
