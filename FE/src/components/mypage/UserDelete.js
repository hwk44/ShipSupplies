import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserDelete = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  const userId = localStorage.getItem('userId')
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordChangeComfirm = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleDelete = async (event) => {
    event.preventDefault();

    const data = {
        id: userId,
        password: password,
        confirmPassword: confirmPassword
    }
    // 회원 탈퇴 요청을 백엔드로 전송
    try{
      await axios.delete('api/user/delete', {
        data: data,
        headers: {
          'Content-Type': 'application/json',
        }
      });
      alert('회원 탈퇴가 완료되었습니다.')
      navigate('/')
      localStorage.removeItem('userId')
    } catch(error) {
      alert('다시 시도해주세요.')
      console.log(error)
  } 

    // 폼 초기화
    setUsername('');
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <>
    <div className="flex h-96 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
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
              className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div className="mt-2">
            <input
              id="password"
              name="password"
              value={confirmPassword}
              type="password"
              required
              onChange={handlePasswordChangeComfirm}
              placeholder="비밀번호 확인"
              className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
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
