import CartList from "../components/cart/CartList";
import '../styles/CartList.css';

const CartListPage = () => {
    return(
        <>
           <div>
                <h1>주문내역</h1>
                <CartList />
           </div>
        </>
    );
}
export default CartListPage;
