import {BrowserRouter, Route, Routes, useNavigate, Link} from 'react-router-dom';
import logoImage from '../images/ship.svg';
import cartImage from '../images/cart.svg';
import '../styles/RouterLogo.css';
import Search from '../components/Search';


const RouterLogo = () => {
    const navigate = useNavigate();

    const goCart = () => {
        navigate('/cart')
    };

    const goHome = () => {
        navigate('/')
    }

    return(
        <div>
            <div className="rlogodiv" >
                <div className="rlogodiv1" onClick={goHome}>
                    <img className="rlogoimg1" src={logoImage} alt="ship" /> 
                    <p className="logoname">ShipSupplies</p>
                </div>
                <Search className="rlogosearch" />
                <div className="rlogodiv2" onClick={goCart}>
                    <img className="rlogoimg2" src={cartImage} alt="cart"/>
                    <p className="rlogop1">관심상품</p>
                </div>
            </div>
        </div>
    );
}
export default RouterLogo;