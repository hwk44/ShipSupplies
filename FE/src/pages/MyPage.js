import { Route, Routes } from 'react-router-dom';
import '../styles/MyPage.css';
import UserDelete from '../components/mypage/UserDelete';
import UserPwdUpdate from '../components/mypage/UserPwdConfirm';

const MyPage = () => {
    return (
        <>
            <Routes>
                <Route path="/userpwdupdate" component={UserPwdUpdate} />
                <Route path="/userdelete" component={UserDelete} />
            </Routes>
        </>
    );
}
export default MyPage;
