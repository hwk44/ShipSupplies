import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Register.css';

const RegisterPage = () => {
  // 아이디, 이메일, 비밀번호, 비밀번호 확인
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // 오류메시지 상태저장
  const [idMessage, setIdMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
  const [userNameMessage, setUserNameMessage] = useState('');
  const [emailMessage, setEmailMessage] = useState('');

  // 유효성 검사
  const [isId, setIsId] = useState('');
  const [isPassword, setIsPassword] = useState('');
  const [isConfirmPassword, setIsConfirmPassword] = useState('');
  const [isUserName, setIsUserName] = useState('');
  const [isEmail, setIsEmail] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const response = await axios.post('/api/user/join', {
        id: id,
        password: password,
        username: userName,
        email: email,
        role: "USER"
      });
      console.log(response.data); // 서버에서 반환한 데이터 출력
      alert('회원가입이 완료되었습니다.');

      // 회원가입 완료 후 로그인 페이지로 이동 등의 처리
      navigate('/login');
    }
    catch (error) {
      console.log(error);
      alert('회원가입 중 오류가 발생했습니다.');
    }
  };

  // 이름
  const onChangeName = async (e) => {
    setUserName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setUserNameMessage('2글자 이상 5글자 미만으로 입력해주세요.');
      setIsUserName(false);
    }
  }


  // 이메일
  const onChangeEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
    const emailCurrent = e.target.value
    setEmail(emailCurrent)

  }


  return (

    <div className="flex h-96 flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          회원가입
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleRegister}>
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

          <div className="mt-2">
            <input
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호 재확인"
              className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
            />
          </div>

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
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="이메일"
                  className="pl-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm sm:leading-6"
                />
              </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              회원가입
            </button>
          </div>
        </form>

      </div>
    </div>

  );
};

export default RegisterPage;
