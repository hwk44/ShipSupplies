<<<<<<< HEAD
import {useNavigate} from 'react-router-dom';


const MainPage = () => {
    const navigate = useNavigate();

    const goProductSelect = () => {
        navigate("/productselect");
      };

    return(
        <>
            <h1>MainPage</h1>
            <div>서비스 내용</div>
            <button onClick={goProductSelect}>바로가기</button>
        </>
    );
}
export default MainPage;
=======
import {useNavigate} from 'react-router-dom';


const MainPage = () => {
    const navigate = useNavigate();

    const goProductSelect = () => {
        navigate("/productselect");
      };

    return(
        <>
            <h1>MainPage</h1>
            <div>서비스 내용</div>
            <button onClick={goProductSelect}>바로가기</button>
        </>
    );
}
export default MainPage;
>>>>>>> 49518912e5d96d6db50795f753cdf51dd292c7eb
