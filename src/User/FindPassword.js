import React, { useEffect, useState } from "react";
import ersLogo from "../assets/img/ers-logo.png";
import EmailInputForm from "../component/JoinComponent/EmailInputForm";
import CheckAuthKey from "../component/JoinComponent/CheckAuthKey";
import PasswordInputForm from "../component/JoinComponent/PasswordInputForm";

const FindPassword = () => {
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [email, setEmail] = useState('');
    const [authKey, setAuthKey] = useState('');
    const [password, setPassword] = useState('');
    
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
                <p className="text-center fw-bold fs-4">비밀번호 찾기</p>
            </div>
            {step1 && <EmailInputForm email={email} setEmail={setEmail} step1={step1} setStep1={setStep1} setStep2={setStep2} />}
            {step2  && <CheckAuthKey authKey={authKey} setAuthKey={setAuthKey} email={email} step2={step2} setStep2={setStep2} setStep3={setStep3}/>}
            {step3  && <PasswordInputForm email={email}password={password} setPassword={setPassword} step3={step3}/>}
        </div>
    );
};

export default FindPassword;
