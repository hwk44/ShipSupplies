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
            <header className="rlogoheader" >
                <div className="rlogodiv1" onClick={goHome}>
                    <img className="rlogoimg1" src={logoImage} alt="ship" style={{width : "2em", height : "2em"}} /> 
                    <p className="logoname">ShipSupplies</p>
                </div>
                {/* <Search /> */}
                <div className="rlogodiv2" onClick={goCart}>
                    <img className="rlogoimg2" src={cartImage} alt="cart"/>
                    <p className="rlogop1">관심상품</p>
                </div>
            </header>
        </div>
    );
}
export default RouterLogo;