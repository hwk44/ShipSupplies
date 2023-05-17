import CartList from "../components/cart/CartList";
import '../styles/OrderHistoryList.css';

const OrderHistoryListPage = () => {
    return(
        <>
           <div>
                <h1>주문내역</h1>
                <CartList />
           </div>
        </>
    );
}
export default OrderHistoryListPage;
