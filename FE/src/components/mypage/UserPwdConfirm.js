import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import UserUpdate from './UserUpdate';

const UserPwdConfirm = () => {

    const [password, setPassword] = useState('');
    const [confirmPwd, setConfirmPwd] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    console.log(isAuthenticated);

    const handleconfirmPwd = async (e) => {
        e.preventDefault();
        if (password !== confirmPwd) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const requestBody = {
                password: password,
                confirmPassword: confirmPwd,
                id: localStorage.getItem("userId")
            };

            const response = await axios.put('/api/user/update', requestBody );
            console.log(response.data);
            // 비밀번호 일치하면 정보변경 페이지로
            setIsAuthenticated(true);
            console.log(isAuthenticated);
        }
        catch (error) {
            console.log(error);
            alert('비밀번호 확인 중 오류가 발생했습니다.');
        }
    }

    return (
        <>
            {isAuthenticated ?
                <UserUpdate /> :
                <div className="flex w-full h-96 flex-col justify-center items-center">
                    <div className="mx-auto w-full max-w-sm">
                        <form className="space-y-6" onSubmit={handleconfirmPwd}>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    value={password}
                                    type="password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="현재 비밀번호"
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div className="mt-2">
                                <input
                                    id="confirmPwd"
                                    name="confirmPwd"
                                    value={confirmPwd}
                                    type="password"
                                    required
                                    onChange={(e) => setConfirmPwd(e.target.value)}
                                    placeholder="비밀번호 확인"
                                    className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                                />
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                                >
                                    다음
                                </button>
                            </div>
                        </form>

                    </div>
                </div>
            }
        </>
    );
}
export default UserPwdConfirm;
