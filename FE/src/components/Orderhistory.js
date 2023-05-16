import {useNavigate} from 'react-router-dom';
import orderHistoryImage from '../images/orderhistory.svg';
import '../styles/Orderhistory.css';


const Orderhistory = () => {
    const navigate = useNavigate();

    const goCartList = () => {
        navigate('/cartlist')
    }

    return(
        <div className="ordhisdiv" onClick={goCartList}>
            <img className="ordhisimg" src={orderHistoryImage} alt="ordhisimg"/>
            <p className="ohp1">주문내역</p>
        </div>
    );
}
export default Orderhistory;