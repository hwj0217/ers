// CheckAuthKey 컴포넌트
import React, { useState } from 'react';

const PasswordInputForm = ({ step4, setStep4, setStep5, password, setPassword, email }) => {
    const [error, setError] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordCheckError, setPasswordCheckError] = useState('');
    const [isValidPasswordCheck, setIsValidPasswordCheck] = useState(false);

    // 비밀번호 유효성 검사
    const handleChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const isValidPassword = validatePassword(newPassword);
        if (!isValidPassword) {
            setError('비밀번호는 7~31자, 영문자+숫자+특수문자로 이뤄져야 합니다.');
            setIsValid(false);
        } else {
            setError('');
            setIsValid(true);
        }
    };

    const handlePasswordCheckChange = (e) => {
        const newPassword = e.target.value;
        setPasswordCheck(newPassword);

        const isValidPassword = password === newPassword;
        if (!isValidPassword) {
            setPasswordCheckError('비밀번호가 일치하지 않습니다.');
            setIsValidPasswordCheck(false);
        } else {
            setPasswordCheckError('');
            setIsValidPasswordCheck(true);
        }
    };

    const validatePassword = (password) => {
        // 비밀번호는 7~31자, 영문자+숫자+특수문자로 이뤄져야 함
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,31}$/;
        return passwordRegex.test(password);
    };
    
    const handleSummit = () => {
        const userData = { email: email, new_password: password };
        if (window.location.pathname === "/findpassword") {
          fetch('/ers/resetPassword', {
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
              } else if (data.code === "200") {
              }
            })
            .catch(error => console.error('Error:', error));
        }
        else if (window.location.pathname === "/join") {
            setStep4(false);
            setStep5(true);
            setError('');
        }
      };
    const handlePasswordToggle = () => {
        var passwordInput = document.getElementById('password');
        var passwordEye = document.querySelector('.password-eye');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordEye.classList.remove('bi-eye-slash-fill');
            passwordEye.classList.add('bi-eye-fill');
        } else {
            passwordInput.type = 'password';
            passwordEye.classList.remove('bi-eye-fill');
            passwordEye.classList.add('bi-eye-slash-fill');
        }
    }

    const handlePasswordCheckToggle = () => {
        var passwordInput = document.getElementById('password-check');
        var passwordEye = document.querySelector('.password-check-eye');

        if (passwordInput.type === 'password') {
            passwordInput.type = 'text';
            passwordEye.classList.remove('bi-eye-slash-fill');
            passwordEye.classList.add('bi-eye-fill');
        } else {
            passwordInput.type = 'password';
            passwordEye.classList.remove('bi-eye-fill');
            passwordEye.classList.add('bi-eye-slash-fill');
        }
    }

    return (
        <div className="mt-3 d-grid gap-2 col-6 mx-auto">
            <span>비밀번호 입력</span>
            <div className="flex-grow">
                <div className="position-relative w-100">
                    <input
                        id='password'
                        type="password"
                        className="form-control"
                        placeholder="사용하실 비밀번호를 입력하세요."
                        value={password}
                        onChange={handleChange}
                    />
                    <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                        <i id="password-toggle" onClick={handlePasswordToggle} className="bi-eye-slash-fill password-eye"></i>
                    </div>
                </div>
            </div>
            {error && <div className="invalid-input">{error}</div>}
            <div className="flex-grow">
                <div className="position-relative w-100">
                    <input
                        id='password-check'
                        type="password"
                        className="form-control"
                        placeholder="사용하실 비밀번호를 한번 더 입력하세요."
                        value={passwordCheck}
                        onChange={handlePasswordCheckChange}
                    />
                    <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                        <i id="password-check-toggle" onClick={handlePasswordCheckToggle} className="bi-eye-slash-fill password-check-eye"></i>
                    </div>
                </div>
            </div>
            {passwordCheckError && <div className="invalid-input">{passwordCheckError}</div>}
            <div style={{ color: 'gray', fontSize: '0.875rem' }}>입력하신 메일 주소로 메일을 전송하였습니다.</div>
            <div style={{ color: 'gray', fontSize: '0.875rem' }}>메일을 확인하시고 인증키를 입력하세요.</div>
            <button disabled={!isValid || !isValidPasswordCheck} onClick={handleSummit} className="btn btn-primary py-2 mt-2">
                다음
            </button>
        </div>
    );
};

export default PasswordInputForm;
