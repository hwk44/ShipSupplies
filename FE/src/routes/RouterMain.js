import { Route, Routes } from 'react-router-dom';
import RouterNav from './RouterNav';
import RouterLogo from './RouterLogo';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import ItemDetailPage from '../pages/ItemDetailPage';
import OrderHistoryListPage from '../pages/OrderHistoryListPage';
import UserDelete from '../components/user/UserDelete';
import UserPwdUpdate from '../components/user/UserPwdUpdate';
import UserUpdate from '../components/user/UserUpdate';

import { useState, useEffect } from 'react';

const RouterMain = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=> {
        const storedIsLogged = localStorage.getItem('isLogged');
        if (storedIsLogged === 'true') {
            setIsLogged(true);
        }
    }, []);

    return(
        <>
            <RouterNav isLogged={isLogged} setIsLogged={setIsLogged} />
            <RouterLogo />
            <Routes>
                < Route path="/" element={<MainPage />} />
                < Route path="/login" element={<LoginPage setIsLogged={setIsLogged} />} />
                < Route path="/mypage" element={<MyPage />} />
                < Route path="/register" element={<RegisterPage />} />
                < Route path="/orderhistorylist" element={<OrderHistoryListPage />} />
                < Route path="/cart" element={<CartPage />} />
                < Route path="/itemdetail" element={<ItemDetailPage />} />
                < Route path="/userdelete" element={<UserDelete />} />
                < Route path="/userupdate" element={<UserUpdate />} />
                < Route path="/userpwdupdate" element={<UserPwdUpdate />} />

                
            </Routes>
        </>

    );
}
export default RouterMain;