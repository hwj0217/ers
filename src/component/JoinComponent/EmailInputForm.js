// EmailInputForm 컴포넌트
import React, { useState } from 'react';

const EmailInputForm = ({ step1, setStep1, setStep2, email, setEmail, setUserId }) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  // 이메일 유효성 검사
  const handleChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    const isValidEmail = validateEmail(newEmail);
    if (!isValidEmail) {
      setError('올바르지 않은 이메일 형식입니다.');
      setIsValid(false);
    } else {
      setError('');
      setIsValid(true);
    }
  };

  const handleCheck = () => {
    const userData = { email };
    if(window.location.pathname === "/findpassword"){
      fetch('http://192.168.0.4:8080/ers/findPassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.code === "900") {
          setStep1(true);
          setError('가입되지 않은 이메일 입니다.');
        } else if (data.code === "200") {
          setStep1(false);
          setStep2(true);
          setError('');
        }
      })
      .catch(error => console.error('Error:', error));
    }
    else if (window.location.pathname === "/join"){
      fetch('http://192.168.0.4:8080/ers/checkUserEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
      .then(response => response.json())
      .then((data) => {
        console.log(data);
        if (data.code === "900") {
          setStep1(true);
          setError('이미 가입된 이메일 입니다.');
        } else if (data.code === "200") {
          setStep1(false);
          setStep2(true);
          setUserId(email.split('@')[0]);
          setError('');
        }
      })
      .catch(error => console.error('Error:', error));
    }
    
  };

  const validateEmail = (email) => {
    // 간단한 이메일 유효성 검사 정규식
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  return (
    <div className="mt-3 d-grid gap-2 col-6 mx-auto">
      <div style={{ color: 'gray', fontSize:'0.975rem'  }}>이메일 주소를 입력해주세요</div>
      <input
        type="email"
        className="form-control"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={handleChange}
      />
      {error && <div className="invalid-input">{error}</div>}
      <button disabled={!isValid} onClick={handleCheck} className="btn btn-primary py-2 mt-2">
        다음
      </button>
    </div>
  );
};

export default EmailInputForm;
