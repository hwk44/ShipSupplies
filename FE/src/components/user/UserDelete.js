import { useState } from 'react';
import axios from 'axios';
import Navbar from '../mypage/Navbar';

const UserDelete = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleDelete = (event) => {
    event.preventDefault();

    // 회원 탈퇴 요청을 백엔드로 전송
    axios.post('/api/user/delete', { username, password })
      .then((response) => {
        // 회원 탈퇴 성공 시 처리
        console.log('회원 탈퇴 성공:', response.data);
      })
      .catch((error) => {
        // 회원 탈퇴 실패 시 처리
        console.error('회원 탈퇴 실패:', error.response.data);
      });

    // 폼 초기화
    setUsername('');
    setPassword('');
  };

  return (
    // <form onSubmit={handleDelete}>
    //   <div>
    //     <label htmlFor="username">사용자명:</label>
    //     <input type="text" id="username" value={username}
    //       onChange={handleUsernameChange} />
    //   </div>
    //   <div>
    //     <label htmlFor="password">비밀번호:</label>
    //     <input type="password" id="password" value={password}
    //       onChange={handlePasswordChange} />
    //   </div>
    //   <button type="submit">회원 탈퇴</button>
    // </form>
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleDelete}>
          <div className="mt-2">
            <input
              id="password"
              name="password"
              value={password}
              type="password"
              required
              onChange={handlePasswordChange}
              placeholder="비밀번호"
              className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-2">
            <input
              id="password"
              name="password"
              value={password}
              type="password"
              required
              onChange={handlePasswordChange}
              placeholder="비밀번호 확인"
              className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              회원탈퇴
            </button>
          </div>
        </form>

      </div>
    </div>
    </>

  );
};

export default UserDelete;
