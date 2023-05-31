import axios from 'axios';
import { useState, useEffect, useRef } from "react";
import Navbar from '../mypage/Navbar';

const UserPwdUpdate = () => {

    const [password, setPassword] = useState('');
    const [changepwd, setChangepwd] = useState('');
    const [confirmChangePwd, setConfirmChangePwd] = useState('');

    const handlePwdUpdate = async (e) => {
        e.preventDefault();
        if (changepwd !== confirmChangePwd) {
            alert('변경할 비밀번호가 일치하지 않습니다.');
            return;
        }
        try {
            const response = await axios.post('/api/user/update', {
                password: password,
                changepwd: changepwd,
                confirmChangePwd: confirmChangePwd,
            });
            console.log(response.data);
            alert('비밀번호 변경이 완료되었습니다.');

        }
        catch (error) {
            console.log(error);
            alert('비밀번호 변경 중 오류가 발생했습니다.');
        }
    }

    return (
        <>
            {/* <h1>비밀번호 변경</h1>
            <form onSubmit={handlePwdUpdate}>
                <div>
                    <label>현재 비밀번호:</label>
                    <input type="password" value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                <div>
                    <label>변경할 비밀번호:</label>
                    <input type="password" value={changepwd}
                        onChange={(e) => setChangepwd(e.target.value)} />
                </div>
                <div>
                    <label>변경할 비밀번호 확인:</label>
                    <input
                        type="password" value={confirmChangePwd}
                        onChange={(e) => setConfirmChangePwd(e.target.value)} />
                </div>
                <button type="submit">비밀번호 변경</button>
            </form> */}
            <Navbar />
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" onSubmit={handlePwdUpdate}>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                value={password}
                                type="password"
                                required
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="현재 비밀번호"
                                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="mt-2">
                            <input
                                id="changepwd"
                                name="changepwd"
                                value={changepwd}
                                type="password"
                                required
                                onChange={(e) => setChangepwd(e.target.value)}
                                placeholder="변경할 비밀번호"
                                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div className="mt-2">
                            <input
                                id="confirmChangePwd"
                                name="confirmChangePwd"
                                value={confirmChangePwd}
                                type="password"
                                required
                                onChange={(e) => setConfirmChangePwd(e.target.value)}
                                placeholder="변경할 비밀번호 확인"
                                className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                비밀번호 변경
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </>
    );
}
export default UserPwdUpdate;
