import { useState, useEffect, useRef } from "react";
import CartList from "../components/cart/CartList";
import '../styles/Cart.css';
import { useLocation } from 'react-router-dom';

const CartPage = () => {

    const location = useLocation(); // useLocation hook을 사용해 현재 위치 정보를 가져옵니다.
    const { state } = location || {}; // location 객체에서 state를 추출합니다. 
    const { sentData, receivedData } = state || {}; // state에서 sentData와 receivedData를 추출합니다.

    console.log("sentData", sentData)
    console.log("received data", receivedData)

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
                        {sentData && Array.isArray(sentData) && receivedData ? sentData.map((data, index) => (
                            <tr key={index}>
                                <td class="px-6 py-4">
                                    <input type="checkbox" className="accent-indigo-400" />
                                </td>
                                <td>{data.item}</td>
                                <td>{data.category}</td>
                                <td>{data.machinery}</td>
                                <td>{data.currency}</td>
                                <td>{data.price}</td>
                                <td>{data.company}</td>
                                <td>{receivedData[index]?.pred}</td>
                                {/* ?. 연산자는 옵셔널 체이닝(optional chaining) 연산자. 
                                receivedData[index]가 undefined 또는 null이라면 전체 표현식이 undefined로 평가됨 */}
                            </tr>
                        )) : (
                            <tr>
                                <td class="px-6 py-4">
                                    <input type="checkbox" className="accent-indigo-400" />
                                </td>
                                <td>{sentData?.item}</td>
                                <td>{sentData?.key2}</td>
                                <td>{sentData?.machinery}</td>
                                <td>{sentData?.currency}</td>
                                <td>{sentData?.price}</td>
                                <td>{sentData?.company}</td>
                                <td>{receivedData?.pred}</td>
                            </tr>
                        )}
                    </tbody>


                </table>
            </div>
        </>
    );
}

export default CartPage;
