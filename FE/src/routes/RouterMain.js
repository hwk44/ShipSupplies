import { Route, Routes } from 'react-router-dom';
import RouterNav from './RouterNav';
import RouterLogo from './RouterLogo';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import ProductSelectPage from '../pages/ProductSelectPage';
import ProductDetailPage from '../pages/ProductDetailPage';
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
                < Route path="/register" element={<RegisterPage />} />
                < Route path="/cart" element={<CartPage />} />
                < Route path="/productselect" element={<ProductSelectPage />} />
                < Route path="/productdetail" element={<ProductDetailPage />} />
            </Routes>
        </>

    );
}
export default RouterMain;