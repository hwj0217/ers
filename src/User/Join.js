import React, { useEffect, useState } from "react";
import ersLogo from "../assets/img/ers-logo.png";
import EmailInputForm from "../component/joinComponent/EmailInputForm";
import CheckAuthKey from "../component/joinComponent/CheckAuthKey";
import UserIdInputForm from "../component/joinComponent/UserIdInputForm";
import PasswordInputForm from "../component/joinComponent/PasswordInputForm";
import CheckAgreement from "../component/joinComponent/CheckAgreement";
const Join = () => {
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [step4, setStep4] = useState(false);
    const [step5, setStep5] = useState(false);
    const [email, setEmail] = useState('');
    const [authKey, setAuthKey] = useState('');
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    
    useEffect(() => {
        console.log("Email exists state:", step1);
    }, [step1]);
    
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
                <p className="text-center fw-bold fs-4">이메일 간편회원가입</p>
            </div>
            {step1 && <EmailInputForm email={email} setEmail={setEmail} setUserId={setUserId} step1={step1} setStep1={setStep1} setStep2={setStep2} />}
            {step2  && <CheckAuthKey authKey={authKey} setAuthKey={setAuthKey} email={email} step2={step2} setStep2={setStep2} setStep3={setStep3}/>}
            {step3  && <UserIdInputForm userId={userId} setUserId={setUserId} email={email} step3={step3} setStep3={setStep3} setStep4={setStep4}/>}
            {step4  && <PasswordInputForm password={password} setPassword={setPassword} step4={step4} setStep4={setStep4} setStep5={setStep5}/>}
            {step5  && <CheckAgreement email={email} userId={userId} password={password} step4={step4} setStep4={setStep4} setStep5={setStep5}/>}
            <div className="container d-flex justify-content-center mt-2">
					<span className="me-2">이미 계정이 있으신가요?</span>
                    <a href="/login">로그인</a>
				</div>
        </div>
    );
};

export default Join;
