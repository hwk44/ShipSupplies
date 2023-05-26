import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import '../styles/MainPage.css';

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
       <></>
    );
}
export default MainPage;
