import { Route, Routes } from 'react-router-dom';
import RouterNav from './RouterNav';
// import RouterLogin from './RouterLogin';
import MainPage from '../pages/MainPage';
import LoginPage from '../pages/LoginPage';
import MyPage from '../pages/MyPage';
import RegisterPage from '../pages/RegisterPage';
import CartPage from '../pages/CartPage';
import UserDelete from '../components/mypage/UserDelete';
import UserPwdConfirm from '../components/mypage/UserPwdConfirm';
import SearchPage from '../pages/SearchPage';
import PredictionPage from '../pages/PredictionPage';
import RegressionPage from '../pages/RegressionPage';
import HelpDeskPage from '../pages/HelpDeskPage';
import PostDetailPage from '../pages/PostDetailPage';
import PastLeadtimePage from '../pages/PastLeadtimePage';
import DataPage from '../pages/DataPage';

const RouterMain = () => {
    
    // const [isLogged, setIsLogged] = useState(false);

    // useEffect(() => {

    //     // 로그인 상태를 강제로 false로 설정
    //     setIsLogged(false);
        
    // }, []);

    // useEffect(() => {
    // localStorage.removeItem('userId')
    // },[isLogged])


    return (
        <>
            {/* <RouterLogin />  */}
            <RouterNav />
            <Routes>
                < Route path="/" element={<MainPage />} />
                < Route path="/login" element={<LoginPage />} />
                < Route path="/mypage" element={<MyPage />} />
                < Route path="/register" element={<RegisterPage />} />
                < Route path="/cart" element={<CartPage />} />
                < Route path="/userdelete" element={<UserDelete />} />
                < Route path="/userupdate" element={<UserPwdConfirm />} />
                < Route path="/search" element={<SearchPage />} />
                < Route path="/prediction" element={<PredictionPage />} />
                < Route path="/regression" element={<RegressionPage />} />
                < Route path="/helpdesk" element={<HelpDeskPage />} />
                < Route path="/post/:id" element={<PostDetailPage />} />
                < Route path="/pastleadtime" element={<PastLeadtimePage />} />
                < Route path="/data" element={<DataPage />} />
            </Routes>
        </>

    );
}
export default RouterMain;