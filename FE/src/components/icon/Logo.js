import {useNavigate} from 'react-router-dom';
import logoImage from '../../images/ship.svg';

const Logo = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/')
    }

    return(
        <div className="logodiv" onClick={goHome}>
            <img className="logoimg" src={logoImage} alt="ship" /> 
            <p className="logop1">ShipSupplies</p>
        </div>
    );
}
export default Logo;