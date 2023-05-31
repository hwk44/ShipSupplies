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

import { useState, useEffect } from 'react';

const RouterMain = () => {
    const [isLogged, setIsLogged] = useState(false);

    useEffect(() => {
        // 로그인 상태를 강제로 false로 설정(자동으로 로그인 되어있는 문제 해결)
        setIsLogged(false);
        
        const storedIsLogged = localStorage.getItem('jwt');
        if (storedIsLogged === 'true') {
            // setIsLogged(true);   

        }

        // checkLoginStatus();
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
            </Routes>
        </>

    );
}
export default RouterMain;