import {BrowserRouter, Route, Routes, useNavigate, Link} from 'react-router-dom';
import '../styles/RouterLogo.css';
import Search from '../components/Search';
import Logo from '../components/icon/Logo';
import Cart from '../components/icon/Cart';
import OrderHistory from '../components/icon/Orderhistory';



const RouterLogo = () => {
    const navigate = useNavigate();

    const goCategorySearch = () => {
        navigate('/catesearch')
    }

    const goPrediction = () => {
        navigate('/prediction')
    }

    const goBoard = () => {
        navigate('board')
    }
    

    /*if (window.location.pathname === '/login') return null;
    if (window.location.pathname === '/register') return null;*/
    return(
        <div>
            <div className="rlogodiv" >
                <Logo />
                <button className="btn" onClick={goCategorySearch}>카테고리 검색</button>
                <button className="btn" onClick={goPrediction}>카테고리 분류 예측 </button>
                <button className="btn" onClick={goBoard}>게시판</button>
                <Search className="rlogosearch" />
                <OrderHistory />
                <Cart />
            </div>
        </div>
    );
}
export default RouterLogo;