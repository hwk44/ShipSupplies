import CartListDetail from './CartListDetail';

const CartList = () => {
    return (

        // <div className="cartlistcontent">
        //     <div className="cartlist">
        //         <div className="clrow0">
        //             <span className="clcol1">상품명</span>
        //             {/* <span className="clcol3">수량</span> */}
        //             {/* <span className="clcol4">가격</span> */}
        //             <span className="clcol5">공급업체</span>
        //             <span className="clcol6">예측 리드타임</span>
        //             <span className="clcol7">카테고리</span>
        //         </div>
        //         <div className="cartdetail">
        //             <CartListDetail />
        //         </div>
        //     </div>
        // </div>

       

<ul class="flex border-b">
  <li class="-mb-px mr-1">
    <a class="bg-white inline-block border-l border-t border-r rounded-t py-2 px-4 text-blue-700 font-semibold" href="#">Active</a>
  </li>
  <li class="mr-1">
    <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
  </li>
  <li class="mr-1">
    <a class="bg-white inline-block py-2 px-4 text-blue-500 hover:text-blue-800 font-semibold" href="#">Tab</a>
  </li>
  <li class="mr-1">
    <a class="bg-white inline-block py-2 px-4 text-gray-400 font-semibold" href="#">Tab</a>
  </li>
</ul>
    );
}
export default CartList;