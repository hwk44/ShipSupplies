import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';

const LoginPage = () => {
    const [id, setId] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleOnKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    }


    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("/api/user/login", { id, password });
            // setIsLoggedIn(true);
            console.log(isLoggedIn);
            console.log(response.data); // 서버에서 반환한 데이터 출력
            localStorage.setItem("userId", response.data.userId)
            console.log("로컬스토리지에 저장된 ID : ",localStorage.getItem("userId"))
            
            navigate('/'); // 로그인 완료 후 메인 페이지로 이동
        } catch (error) {
            alert("ID 혹은 비밀번호가 일치하지 않습니다.")
            console.log(error);
        }
    };

    return (
        <>
            <div className="flex h-96 flex-1 flex-col justify-center items-center px-6 py-12 lg:px-8 ">
                

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm ">
                    <h2 className="mb-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        로그인
                    </h2>
                    <form className="space-y-6" onSubmit={handleLogin}>
                        <div className="mt-2">
                            <input
                                id="id"
                                name="id"
                                value={id}
                                type="text"
                                required
                                onChange={(e) => setId(e.target.value)}
                                placeholder="아이디"
                                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                value={password}
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="비밀번호"
                                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                onKeyDown={handleOnKeyPress} 
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                로그인
                            </button>
                        </div>
                    </form>
                    <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm flex justify-center">
                        <a href="/register" className="text-base font-semibold leading-7 tracking-tight text-blue-600">
                            회원가입
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
export default LoginPage;
