import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';


const UserUpdate = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [newPwd, setNewPwd] = useState('');
    const navigate = useNavigate();


    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const requestBody = {
                username: userName,
                email: email,
                password: password,
                newPassword: newPwd,
                id: localStorage.getItem("userId")
            };

            const response = await axios.put('/api/user/update', requestBody);
            // console.log(response.data);
            alert('회원정보 변경이 완료되었습니다.');
            navigate('/');

        }
        catch (error) {
            console.log(error);
            alert('회원정보 변경 중 오류가 발생했습니다.');
        }
    }

    return (
        <>
            <div className="flex h-96 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handleUpdate}>
                        <div className="mt-2">
                            <input
                                id="userName"
                                name="userName"
                                value={userName}
                                type="text"
                                required
                                onChange={(e) => setUserName(e.target.value)}
                                placeholder="이름"
                                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                value={email}
                                type="text"
                                required
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="이메일"
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
                                placeholder="현재 비밀번호"
                                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="mt-2">
                            <input
                                id="newPwd"
                                name="newPwd"
                                value={newPwd}
                                type="password"
                                required
                                onChange={(e) => setNewPwd(e.target.value)}
                                placeholder="새 비밀번호"
                                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                                정보수정
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}
export default UserUpdate;
