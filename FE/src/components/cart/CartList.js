import CartListDetail from './CartListDetail';

const CartList = () => {
    return(
        <div className="cartlistcontent">
            <div className="cartlist">
                <div className="clrow0">
                    <span className="clcol1">상품명</span>
                    {/* <span className="clcol3">수량</span> */}
                    {/* <span className="clcol4">가격</span> */}
                    <span className="clcol5">공급업체</span>
                    <span className="clcol6">예측 리드타임</span>
                    <span className="clcol7">카테고리</span>
                </div>
                <div className="cartdetail">
                    <CartListDetail />
                </div>
            </div>


        </div>
    );
}
export default CartList;