import { Route, Routes } from 'react-router-dom';
import RouterNav from './RouterNav';
import RouterLogin from './RouterLogin';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import UserDelete from '../components/user/UserDelete';
import UserPwdUpdate from '../components/user/UserPwdUpdate';
import UserUpdate from '../components/user/UserUpdate';
import SearchPage from '../pages/SearchPage';
import PredictionPage from '../pages/PredictionPage';
import RegressionPage from '../pages/RegressionPage';
import HelpDesk from '../pages/HelpDesk';
import PostDetail from '../pages/PostDetail';
import PastLeadtimePage from '../pages/PastLeadtimePage';

import { useState, useEffect } from 'react';

const RouterMain = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {

        // 로그인 상태를 강제로 false로 설정
        setIsLogged(false);
        
    }, []);

    return (
        <>
            {/* <RouterLogin />  */}
            <RouterNav />
            <Routes>
                < Route path="/" element={<MainPage />} />
                < Route path="/login" element={<LoginPage />} />
                < Route path="/mypage" element={<MyPage />} />
                < Route path="/register" element={<RegisterPage />} />
                < Route path="/cart" element={<CartPage />} />
                < Route path="/userdelete" element={<UserDelete />} />
                < Route path="/userupdate" element={<UserUpdate />} />
                < Route path="/userpwdupdate" element={<UserPwdUpdate />} />
                < Route path="/search" element={<SearchPage />} />
                < Route path="/prediction" element={<PredictionPage />} />
                < Route path="/regression" element={<RegressionPage />} />
                < Route path="/helpdesk" element={<HelpDesk />} />
                < Route path="/post/:id" element={<PostDetail />} />
                < Route path="/pastleadtime" element={<PastLeadtimePage />} />
            </Routes>
        </>

    );
}
export default RouterMain;