import {BrowserRouter, Route, Routes, useNavigate, Link} from 'react-router-dom';
import cartImage from '../images/cart.svg';
import '../styles/RouterLogo.css';
import Search from '../components/Search';
import Logo from '../components/Logo';
import Orderhistory from '../components/Orderhistory';



const RouterLogo = () => {
    const navigate = useNavigate();

    const goCartDetail = () => {
        navigate('/cartdetail')
    };

    if (window.location.pathname === '/login') return null;
    if (window.location.pathname === '/register') return null;
    return(
        <div>
            <div className="rlogodiv" >
                <Logo />
                <Search className="rlogosearch" />
                <Orderhistory />
                <div className="rlogodiv2" onClick={goCartDetail}>
                    <img className="rlogoimg2" src={cartImage} alt="cart"/>
                    <p className="rlogop1">관심상품</p>
                </div>
            </div>
        </div>
    );
}
export default RouterLogo;