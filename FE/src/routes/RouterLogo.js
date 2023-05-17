import {BrowserRouter, Route, Routes, useNavigate, Link} from 'react-router-dom';
import '../styles/RouterLogo.css';
import Search from '../components/Search';
import Logo from '../components/Logo';
import Cart from '../components/Cart';
import OrderHistory from '../components/OrderHistory';



const RouterLogo = () => {

    if (window.location.pathname === '/login') return null;
    if (window.location.pathname === '/register') return null;
    return(
        <div>
            <div className="rlogodiv" >
                <Logo />
                <Search className="rlogosearch" />
                <OrderHistory />
                <Cart />
            </div>
        </div>
    );
}
export default RouterLogo;