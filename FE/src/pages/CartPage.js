import { useState, useEffect , useRef} from "react";
import CartList from "../components/cart/CartList";
import '../styles/Cart.css';

const CartPage = () => {
    const [data, setData] = useState([]);
    const [tableData, setTableData] = useState(null);

    useEffect(() => {
        

    }, []);

    return(
        <>
            <CartList />
        </>
    );
}
export default CartPage;
