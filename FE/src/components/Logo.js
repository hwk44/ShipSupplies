import {useNavigate} from 'react-router-dom';
import logoImage from '../images/ship.svg';

const Logo = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate('/')
    }

    return(
        <div className="rlogodiv1" onClick={goHome}>
            <img className="rlogoimg1" src={logoImage} alt="ship" /> 
            <p className="logoname">ShipSupplies</p>
        </div>
    );
}
export default Logo;