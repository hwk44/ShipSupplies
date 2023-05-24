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
import CateSearchPage from '../pages/CateSearchPage';
import PredictionPage from '../pages/PredictionPage';
import BoardPage from '../pages/BoardPage';

import Login from '../pages/Login'

import { useState, useEffect } from 'react';

const RouterMain = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(()=> {
        
        const storedIsLogged = localStorage.getItem('jwt');
        if (storedIsLogged === 'true') {
            // setIsLogged(true);   
            isLogged(true);                     
        }
        
        checkLoginStatus();
    }, []);
    
    const checkLoginStatus = () => {
        const token = localStorage.getItem('jwt');
        setIsLogged(!!token); // 토큰이 존재하면 true, 없으면 false로 설정
    };

    /*
    const accessToken = localStorage.getItem("jwt");
        if (accessToken && accessToken !== null){
            setIsLogged(false);
        }
    */    
    return(
        <>
            <RouterNav />
            <RouterLogo />
            <Routes>
                < Route path="/" element={<MainPage />} />
                < Route path="/login" element={<LoginPage />} />
                < Route path="/login1" element={<Login />} />

                < Route path="/mypage" element={<MyPage />} />
                < Route path="/register" element={<RegisterPage />} />
                < Route path="/orderhistorylist" element={<OrderHistoryListPage />} />
                < Route path="/cart" element={<CartPage />} />
                < Route path="/itemdetail" element={<ItemDetailPage />} />
                < Route path="/userdelete" element={<UserDelete />} />
                < Route path="/userupdate" element={<UserUpdate />} />
                < Route path="/userpwdupdate" element={<UserPwdUpdate />} />
                < Route path="/catesearch" element={<CateSearchPage />} />
                < Route path="/prediction" element={<PredictionPage />} />
                < Route path="/board" element={<BoardPage />} />

            </Routes>
        </>

    );
}
export default RouterMain;