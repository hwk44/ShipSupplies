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
        <>
        <div className='flex justify-center'>
          <table class="w-11/12 my-14 text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" class="px-6 py-3 rounded-l-lg">
                        <input type="checkbox" class="accent-indigo-400" />
                      </th>
                      <th scope="col" class="px-6 py-3 rounded-l-lg">상품명</th>
                      <th scope="col" class="px-6 py-3 rounded-l-lg">카테고리</th>
                      <th scope="col" class="px-6 py-3 rounded-l-lg">Machinery</th>
                      <th scope="col" class="px-6 py-3 rounded-l-lg">견적화폐</th>
                      <th scope="col" class="px-6 py-3 rounded-l-lg">견적단가</th>
                      <th scope="col" class="px-6 py-3 rounded-l-lg">공급업체</th>
                      <th scope="col" class="px-6 py-3 rounded-l-lg">예측 리드타임</th>
                    </tr>
                  </thead>
                  <tbody>
                    
                      <tr  class="bg-white dark:bg-gray-800">
                        <td class="px-6 py-4"> 
                          <input type="checkbox" className="accent-indigo-400" />
                        </td>
                        <td class="px-6 py-4">SEAL-O-RING-STOR</td>
                        <td class="px-6 py-4">COOLER</td>
                        <td class="px-6 py-4">NO.1 GENERATOR ENGINE</td>
                        <td class="px-6 py-4">KRW</td>
                        <td class="px-6 py-4">35,714</td>
                        <td class="px-6 py-4">HAEIN Coporation_Cheonan</td>
                        <td class="px-6 py-4">112일</td>

                      </tr>
                  </tbody>
                </table>
          </div>

              <div className='float-right'>
              <button className="mx-14 mt-3 bg-rose-500 hover:bg-rose-600 text-white font-bold py-2 px-4 rounded">
                삭제
              </button>
              </div>   
      </>
    );
}
export default CartList;