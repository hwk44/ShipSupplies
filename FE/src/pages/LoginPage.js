import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import Logo from '../components/icon/Logo';


const LoginPage = ({ setIsLogged }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/user/login', { id, password });
            setShowErrorMessage(false);
            console.log(response.data); // 서버에서 반환한 데이터 출력
            setIsLogged(true); // 로그인 상태 변경
            localStorage.setItem('isLogged', 'true'); // 로컬 스토리지에 로그인 상태 저장
            navigate('/'); // 로그인 완료 후 메인 페이지로 이동
          } catch (error) {
            setShowErrorMessage(true);
            console.log(error);
        }
    };

    return(
        <div className="logindiv1">
            <Logo />
            <form className="loginform1" onSubmit={handleLogin}>
                <div>
                    < input type="text" id="id" value={id} placeholder="아이디"
                        onChange={(e) => setId(e.target.value)} required />
                </div>
                <div>
                    < input type="password" id="password" value={password} placeholder="비밀번호"
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button onClick={handleLogin}>로그인</button>
            {showErrorMessage && (
                <div className="logindiverror">ID 혹은 비밀번호가 일치하지 않습니다.</div>
            )}
            </form>
            <Link to="/register">회원가입</Link>
        </div>
    );
}
export default LoginPage;
