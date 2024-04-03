// CheckAuthKey 컴포넌트
import React, { useState } from 'react';

const CheckAuthKey = ({ step2, setStep2, setStep3, email, authKey, setAuthKey }) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(false);

  // 이메일 유효성 검사
  const handleChange = (e) => {
    const newAuthKey = e.target.value;
    setAuthKey(newAuthKey);

    if (newAuthKey === '') {
      setError('이메일로 받은 인증키를 입력해주세요');
      setIsValid(false);
    } else {
      setError('');
      setIsValid(true);
    }
  };

  const handleSummit = () => {
    const userData = { email: email, auth_key: authKey };
    if (window.location.pathname === "/findpassword") {
      fetch('http://localhost:8080/ers/findPasswordAuthKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          if (data.code === "800") {
            setStep2(true);
            setError('인증키가 일치하지 않습니다.');
          } else if (data.code === "200") {
            setStep2(false);
            setStep3(true);
            setError('');
          }
        })
        .catch(error => console.error('Error:', error));
    }
    else if (window.location.pathname === "/join") {
      fetch('http://localhost:8080/ers/checkAuthKey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => response.json())
        .then((data) => {
          console.log(data);
          if (data.code === "800") {
            setStep2(true);
            setError('인증키가 일치하지 않습니다.');
          } else if (data.code === "200") {
            setStep2(false);
            setStep3(true);
            setError('');
          }
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div className="mt-3 d-grid gap-2 col-6 mx-auto">
      <div>회원가입 인증</div>
      <input
        type="text"
        className="form-control"
        placeholder="인증키를 입력하세요."
        value={authKey}
        onChange={handleChange}
      />
      {error && <div className="invalid-input">{error}</div>}
      <div style={{ color: 'gray', fontSize: '0.875rem' }}>입력하신 메일 주소로 메일을 전송하였습니다.</div>
      <div style={{ color: 'gray', fontSize: '0.875rem' }}>메일을 확인하시고 인증키를 입력하세요.</div>
      <button disabled={!isValid} onClick={handleSummit} className="btn btn-primary py-2 mt-2">
        다음
      </button>
    </div>
  );
};

export default CheckAuthKey;
