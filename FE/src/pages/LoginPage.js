import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';


const LoginPage = ({ setIsLogged }) => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    // const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('/api/Login', {
                id, 
                password,
            });
            console.log(response.data); // 서버에서 반환한 데이터 출력
            alert('로그인 되었습니다.');
            setIsLogged(true); // 로그인 상태 변경
            localStorage.setItem('isLogged', 'true'); // 로컬 스토리지에 로그인 상태 저장
            // 로그인 완료 후 메인 페이지로 이동
            navigate('/');
        } 
        catch (error) {
            console.log(error);
            alert('ID 혹은 비밀번호가 일치하지 않습니다.');
        }
    };

    return(
        <div className="logindiv1">
            <form className="loginform1" onSubmit={handleSubmit}>
                <div>
                    < input type="text" id="id" value={id} placeholder="아이디"
                        onChange={(e) => setId(e.target.value)} required />
                </div>
                <div>
                    < input type="password" id="password" value={password} placeholder="비밀번호"
                        onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">로그인</button>
            </form>
            <Link to="/register">회원가입</Link>
        </div>
    );
}
export default LoginPage;
