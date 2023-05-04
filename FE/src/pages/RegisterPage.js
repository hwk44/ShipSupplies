import { useState } from 'react';
import axios from 'axios';
import '../styles/Register.css';

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  const onEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const onPasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const onConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }

    const data = {
      email,
      password,
      name,
    };

    // TODO: API 호출 등의 처리

    // 예시로서 콘솔에 출력
    console.log(data);
  };

  return (
    <div className="form1">
      <form className="form2" onSubmit={onSubmitHandler}>
        <label>이메일 주소</label>
        <input type="email" value={email} onChange={onEmailChange} placeholder="email" />
        <label>비밀번호</label>
        <input type="password" value={password} onChange={onPasswordChange} />
        <label>비밀번호 재확인</label>
        <input type="password" value={confirmPassword} onChange={onConfirmPasswordChange} />
        <label>이름</label>
        <input type="text" value={name} onChange={onNameChange} />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};

export default RegisterPage;
