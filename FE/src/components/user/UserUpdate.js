import axios from 'axios';
import { useState, useEffect, useRef } from "react";

const UserUpdate = () => {

    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');

    const handleUpdate = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/api/user/update', {
                userName: userName,
                email: email,
            });
            console.log(response.data);
            alert('회원정보 변경이 완료되었습니다.');

        }
        catch (error) {
            console.log(error);
            alert('회원정보 변경 중 오류가 발생했습니다.');
        }


    }



    return (
        <>
            {/* <h1>회원정보 변경</h1>
            <form onSubmit={handleUpdate}>
                <div>
                    <label>이름:</label>
                    <input type="text" value={userName}
                        onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div>
                    <label>이메일:</label>
                    <input type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <button type="submit">정보수정</button>

            </form> */}

            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
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
