import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';
import INTRO_IMAGE from '../images/container-ship.jpg';

const MainPage = () => {
    const navigate = useNavigate();

    const goProductSelect = () => {
        navigate("/productselect");
    };

    return (
        // <div className="maindiv1">
        //     <div className="maindiv2">
        //         <h1>MainPage</h1>
        //         <div>서비스 내용</div>
        //         <button onClick={goProductSelect}>바로가기</button>
        //     </div>

        //     <nav>
        //         <ul>
        //             <li><strong>Brand</strong></li>
        //         </ul>
        //         <ul>
        //             <li><a href="#">Link</a></li>
        //             <li><a href="#">Link</a></li>
        //             <li><a href="#" role="button">Button</a></li>
        //         </ul>
        //         <ul>
        //             <li><a href="#">Link</a></li>
        //             <li><a href="#">Link</a></li>
        //             <li><a href="#" role="button">Button</a></li>
        //         </ul>
        //     </nav>
        // </div>

        /*
        <main className='container'>
         <nav>
                 <ul>
                     <li><strong></strong></li>
                 </ul>
                 <ul>
                     <li><a href="#">Link</a></li>
                     <li><a href="#">Link</a></li>
                     <li><a href="#" role="button">Button</a></li>
                 </ul>
                 <ul>
                     <li><a href="#">Link</a></li>
                     <li><a href="#">Link</a></li>
                     <li><a href="#" role="button">Button</a></li>
                 </ul>
             </nav>
        <article>
            test
        </article>
        </main>
        */
        <>
            <figure className="figure">
                <img src={INTRO_IMAGE} alt="intro_img" />
                <article className="txt">
                    <h1 className="h1">선용품 최적 구매발주 서비스</h1>
                    <div className="div">
                        <button className="btn">로그인</button>
                        <button className="btn">회원가입</button>
                    </div>
                </article>
            </figure>
        </>
    );
}
export default MainPage;
