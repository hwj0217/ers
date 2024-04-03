import React, { useState } from "react"

import ersLogo from "../assets/img/ers-logo.png";
import { useDispatch, useSelector } from "react-redux";
import { login } from '../actions/loginAction';

const Login = () => {
    const dispatch = useDispatch();

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isPasswordValid, setIsPasswordValid] = useState(false);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (e) => {
        const newEmail = e.target.value;
        setEmail(newEmail);
        const isValidEmail = validateEmail(newEmail);
        if (!isValidEmail) {
            setEmailError('올바르지 않은 이메일 형식입니다.');
            setIsEmailValid(false);
        } else {
            setEmailError('');
            setIsEmailValid(true);
        }
    };
    const validateEmail = (email) => {
        // 간단한 이메일 유효성 검사 정규식
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    // 비밀번호 유효성 검사
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);

        const isValidPassword = validatePassword(newPassword);
        if (!isValidPassword) {
            setPasswordError('비밀번호는 7~31자, 영문자+숫자+특수문자로 이뤄져야 합니다.');
            setIsPasswordValid(false);
        } else {
            setPasswordError('');
            setIsPasswordValid(true);
        }
    };

    const validatePassword = (password) => {
        // 비밀번호는 7~31자, 영문자+숫자+특수문자로 이뤄져야 함
        const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{7,31}$/;
        return passwordRegex.test(password);
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
    const handleLogin = () => {
        const userData = { email: email, password: password };

        fetch('http://localhost:8080/ers/login', {
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
                    setEmailError('');
                } else if (data.code === "200") {
                    setEmailError('');
                    setPasswordError('')
                    dispatch(login(data.member));
                    sessionStorage.setItem("loginInfo", JSON.stringify(data.member));
                    console.log(JSON.parse(sessionStorage.getItem('loginInfo')))
                }
                if (data.error === "invalid_email") {
                    setEmailError('가입되지 않은 이메일 입니다.');
                }
                else if (data.error === "invalid_pwd") {
                    setPasswordError('비밀번호를 확인해 주세요.')
                }
            })
            .catch(error => console.error('Error:', error));
    };
    return (
        <div className="">
            <div className="my-5">
                <img src={ersLogo} className="rounded mx-auto d-block" alt="" />
            </div>
            <div className="my-5">
                <p className="text-center fs-3 fw-bold mc-text" style={{ color: "#204a98", marginBottom: "-10px" }}>간편 영수증 스캐너</p>
                <p className="text-center fs-5 mc-text" style={{ color: "#204a98" }}>Easy Receipt Scanner</p>
            </div>
            <div className="my-5">
                <p className="text-center fw-bold fs-4">로그인</p>
            </div>
            <div className="mt-3 d-grid gap-2 col-6 mx-auto">

                <input
                    type="email"
                    className="form-control"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={handleEmailChange}
                />
                {emailError && <div className="invalid-input">{emailError}</div>}
                <div className="flex-grow">
                    <div className="position-relative w-100">
                        <input
                            id='password'
                            type="password"
                            className="form-control"
                            placeholder="사용하실 비밀번호를 입력하세요."
                            value={password}
                            onChange={handlePasswordChange}
                        />
                        <div className="position-absolute top-50 end-0 translate-middle-y me-2">
                            <i id="password-toggle" onClick={handlePasswordToggle} className="bi-eye-slash-fill password-eye"></i>
                        </div>
                    </div>
                </div>
                {passwordError && <div className="invalid-input">{passwordError}</div>}
                <button disabled={!isEmailValid && !isPasswordValid} onClick={handleLogin} className="btn btn-primary py-2 mt-2">
                    로그인
                </button>
                <div className="container d-flex justify-content-center">
                    <a href="/join">회원가입</a>
                    <span className="text-center mx-2">|</span>
                    <a href="/findpassword">비밀번호를 잊으셨나요?
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Login