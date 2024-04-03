// CheckAuthKey 컴포넌트
import React, { useState } from 'react';

const UserIdInputForm = ({ step3, setStep3, setStep4, email, userId, setUserId }) => {
  const [error, setError] = useState('');
  const [isValid, setIsValid] = useState(true);

  // 이메일 유효성 검사
  const handleChange = (e) => {
    const newUserId = e.target.value;
    setUserId(newUserId);
    
    if (setUserId==='') {
      setError('사용하실 아이디를 입력해주세요.');
      setIsValid(false);
    } else {
      setError('');
      setIsValid(true);
    }
  };

  const handleSummit = () => {
    const userData = {user_id: userId};

    fetch('http://localhost:8080/ers/checkUserId', {
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
        setStep3(true);
        setError('사용할 수 없는 아이디 입니다.');
      } else if (data.code === "200") {
        setStep3(false);
        setStep4(true);
        setError('');
      }
    })
    .catch(error => console.error('Error:', error));
  };

  return (
    <div className="mt-3 d-grid gap-2 col-6 mx-auto">
      <div>사용자 아이디를 입력하세요.</div>
      <input
        type="text"
        className="form-control"
        placeholder="사용자 아이디를 입력하세요."
        value={userId}
        onChange={handleChange}
      />
      {error && <div className="invalid-input">{error}</div>}
      
      <button disabled={!isValid} onClick={handleSummit} className="btn btn-primary py-2 mt-2">
        다음
      </button>
    </div>
  );
};

export default UserIdInputForm;
