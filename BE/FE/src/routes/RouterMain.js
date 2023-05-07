<<<<<<< HEAD
import { Route, Routes } from 'react-router-dom';
import RouterNav from './RouterNav';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import ProductSelectPage from '../pages/ProductSelectPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import { useState, useEffect } from 'react';

const RouterMain = () => {


    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
        if (storedIsAuthenticated === 'true') {
          setIsAuthenticated(true);
        }
      }, []);

    return(
        <>
            <RouterNav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <Routes>
                < Route path="/" element={<MainPage />} />
                < Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                < Route path="/register" element={<RegisterPage />} />
                < Route path="/cart" element={<CartPage />} />
                < Route path="/productselect" element={<ProductSelectPage />} />
                < Route path="/productdetail" element={<ProductDetailPage />} />
            </Routes>
        </>

    );
}
=======
import { Route, Routes } from 'react-router-dom';
import RouterNav from './RouterNav';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import ProductSelectPage from '../pages/ProductSelectPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import { useState, useEffect } from 'react';

const RouterMain = () => {


    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const storedIsAuthenticated = localStorage.getItem('isAuthenticated');
        if (storedIsAuthenticated === 'true') {
          setIsAuthenticated(true);
        }
      }, []);

    return(
        <>
            <RouterNav isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated}/>
            <Routes>
                < Route path="/" element={<MainPage />} />
                < Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                < Route path="/register" element={<RegisterPage />} />
                < Route path="/cart" element={<CartPage />} />
                < Route path="/productselect" element={<ProductSelectPage />} />
                < Route path="/productdetail" element={<ProductDetailPage />} />
            </Routes>
        </>

    );
}
>>>>>>> 49518912e5d96d6db50795f753cdf51dd292c7eb
export default RouterMain;