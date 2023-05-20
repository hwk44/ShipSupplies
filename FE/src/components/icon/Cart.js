import {useNavigate} from 'react-router-dom';
import cartImage from '../../images/cart.svg';


const Cart = () => {
    const navigate = useNavigate();

    const goCartDetail = () => {
        navigate('/cart')
    };

    return(
        <div className="cartdiv" onClick={goCartDetail}>
            <img className="cartimg" src={cartImage} alt="cart"/>
            <p className="cartp1">관심상품</p>
        </div>
    );

}
export default Cart;