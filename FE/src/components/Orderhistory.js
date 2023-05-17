import {useNavigate} from 'react-router-dom';
import orderHistoryImage from '../images/orderhistory.svg';

const OrderHistory = () => {
    const navigate = useNavigate();

    const goOrdHisList = () => {
        navigate('/orderhistorylist')
    }

    return(
        <div className="ordhisdiv" onClick={goOrdHisList}>
            <img className="ordhisimg" src={orderHistoryImage} alt="ordhisimg"/>
            <p className="ohp1">주문내역</p>
        </div>
    );
}
export default OrderHistory;