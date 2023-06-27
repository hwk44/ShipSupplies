import userEvent from "@testing-library/user-event";
import { useState, useEffect, useRef, useCallback } from "react";
import { BrowserRouter as Router, Routes, Link, Route } from 'react-router-dom';
import '../styles/Cart.css';
import axios from "axios";
import { isCompositeComponent } from "react-dom/test-utils";
import PastLeadtimePage from '../pages/PastLeadtimePage';
import { useNavigate } from "react-router-dom";
import { MdClose } from "react-icons/md";


const CartPage = () => {

    const [wishList, setWishList] = useState([]); // 서버로부터 받은 데이터 저장할 변수
    const userId = localStorage.getItem('userId');
    const [selectedItem, setSelectedItem] = useState(null); // 클릭한 항목 정보 저장
    const navigate = useNavigate();
    const [selectAllState, setSelectAllState] = useState({}); // 전체선택 체크박스 상태

    // 체크박스 데이터 저장할 빈배열
    const [checkedList, setCheckedList] = useState([]);

    useEffect(() => {
        const newCheckedList = [...checkedList];

        for (let category in selectAllState) {
            const categoryItems = wishList.filter(item => item.category === category).map(item => item.id);
            if (selectAllState[category]) {
                newCheckedList.push(...categoryItems);
            } else {
                for (let item of categoryItems) {
                    const index = newCheckedList.indexOf(item);
                    if (index > -1) {
                        newCheckedList.splice(index, 1);
                    }
                }
            }
        }

        setCheckedList([...new Set(newCheckedList)]); // 중복 제거(무한 루프 방지)
    }, [selectAllState, wishList]);


    const handleSelectAll = (category) => {
        const currentSelectAllState = selectAllState[category] || false;
        const newSelectAllState = !currentSelectAllState;
        setSelectAllState({ ...selectAllState, [category]: newSelectAllState });
        if (newSelectAllState) {
            const categoryItems = wishList.filter((item) => item.category === category);
            setCheckedList([...checkedList, ...categoryItems.map((item) => item.id)]);
        } else {
            const categoryItems = wishList.filter((item) => item.category === category).map((item) => item.id);
            setCheckedList(checkedList.filter((item) => !categoryItems.includes(item)));
        }
    };

    const handleClick = (item) => {
        setSelectedItem(item);
        navigate("/pastleadtime", { state: { selectedItem: item } });
    };

    const onCheckedItem = useCallback(
        (checked, item) => {
            if (checked) {
                setCheckedList((prev) => [...prev, item]);
            } else if (!checked) {
                setCheckedList(checkedList.filter((el) => el !== item));
                if (selectAllState[item.category]) {
                    setSelectAllState(prev => ({ ...prev, [item.category]: false }));
                }
            }
        },
        [checkedList, selectAllState]
    );


    // 삭제버튼 클릭시
    const handleDelete = async (e) => {
        if (checkedList.length === 0) {
            console.error("선택된 항목이 없습니다.");
            return;
        }

        e.preventDefault();
        console.log("선택된 항목들:", checkedList);

        try {
            // 선택된 항목들을 삭제하는 요청 보내기
            await Promise.all(checkedList.map(id => axios.delete("/api/wish/delete", { data: { id } })));

            // 선택된 항목들을 제외한 새로운 wishList 생성
            const updatedWishList = wishList.filter(item => !checkedList.includes(item.id));
            setWishList(updatedWishList);
            setCheckedList([]); // 선택된 항목들 초기화
            alert("삭제되었습니다.")

        } catch (error) {
            console.log(error);
            alert("삭제 중 오류가 발생했습니다.");
        }
    }

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

    const getUniqueCategories = () => {
        const categories = wishList.map((item) => item.category);
        return [...new Set(categories)];
    };

    return (
        <article>
            {getUniqueCategories().length > 0 ?
                getUniqueCategories().map((category) => (
                    <div key={category}>
                        <div className="flex flex-col justify-center items-center mb-6 mt-3 ">
                        <p className="mr-auto ml-40 mb-5 text-xl leading-7 tracking-tight text-blue-500 font-semibold">{category}</p>
                            <table className="t1">
                                <thead>
                                    <tr>
                                        <th>
                                            <input
                                                type="checkbox"
                                                class="accent-blue-400"
                                                checked={selectAllState[category] || false}
                                                onChange={() => handleSelectAll(category)}
                                            />
                                        </th>
                                        <th>상품명</th>
                                        <th>카테고리</th>
                                        <th>Machinery</th>
                                        <th>견적화폐</th>
                                        <th>견적단가</th>
                                        <th>공급업체</th>
                                        <th>예측 리드타임</th>
                                        <th>과거 리드타임</th>
                                    </tr>
                                </thead>
                                {wishList
                                    .filter((item) => item.category === category).length > 0 && (
                                        <tbody>
                                            {wishList
                                                .filter((item) => item.category === category)
                                                .map((item) => (
                                                    <tr key={item.id}>
                                                        <td>
                                                            <input
                                                                type="checkbox"
                                                                className="accent-blue-400"
                                                                id={item.id}
                                                                value={item.id}
                                                                checked={checkedList.includes(item.id)}
                                                                onChange={(e) => onCheckedItem(e.target.checked, item.id)}
                                                            />
                                                        </td>
                                                        <td>{item.item}</td>
                                                        <td>{item.category}</td>
                                                        <td>{item.machinery}</td>
                                                        <td>{item.currency}</td>
                                                        <td>{item.price.toLocaleString('ko-KR')}</td>
                                                        <td>{item.company}</td>
                                                        <td>{item.leadtime}</td>
                                                        <td>
                                                            <button onClick={() => handleClick(item)}>보기</button>
                                                        </td>
                                                    </tr>
                                                ))}
                                        </tbody>
                                    )}
                            </table>
                        </div>
                    </div>
                ))
                :
                <div className="flex justify-center mb-6 mt-3 ">
                <table className="t1">
                <thead>
                    <tr>
                        
                        <th>상품명</th>
                        <th>카테고리</th>
                        <th>Machinery</th>
                        <th>견적화폐</th>
                        <th>견적단가</th>
                        <th>공급업체</th>
                        <th>예측 리드타임</th>
                        <th>과거 리드타임</th>
                    </tr>
                </thead>
                <p className="text-lg p-6">위시리스트가 비어있습니다.</p>
                </table>
                </div>
            }
            {getUniqueCategories().length > 0 && (
                <div className="flex justify-end mr-28">
                    <button
                        onClick={handleDelete}
                        className="mx-14 mt-3 bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded"
                    >
                        삭제
                    </button>
                </div>
            )}
        </article>
    );
};

export default CartPage;