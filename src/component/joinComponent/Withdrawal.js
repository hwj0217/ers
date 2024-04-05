import React, { useState } from "react";
import ersLogo from "../../assets/img/ers-logo.png";
import { useSelector } from "react-redux";
import { sendPostRequest } from "../../axios";

const Withdrawal = () => {
    const [isChecked, setIsChecked] = useState(false);
    const userLoginData = useSelector(state => state.userData);
   
    const handleChange = (e) => {
        const isNewChecked = e.target.checked;
        setIsChecked(isNewChecked);
    }

    const handleClick = () => {
        const userData = { id: userLoginData.id };
        const url = '/ers/withdrawal';

        sendPostRequest(url, userData)
            .then((data) => {
                console.log(data);
                if (data.code === "200") {
                } else if (data.code === "900") {
                }
            })
            .catch(error => console.error('Error:', error));
    }
    return (
        <div className="">
            <div className="mb-3">
                <img src={ersLogo} className="rounded mx-auto d-block" alt="" />
            </div>
            <div className="my-3">
                <p className="text-center fs-3 fw-bold mc-text" style={{ color: "#204a98", marginBottom: "-10px" }}>간편 영수증 스캐너</p>
                <p className="text-center fs-5 mc-text" style={{ color: "#204a98" }}>Easy Receipt Scanner</p>
            </div>
            <div className="my-3">
                <p className="text-center fw-bold fs-4">회원탈퇴</p>
            </div>
            <div className="my-3 w-50 mx-auto">
                <p className="fs-6">회원탈퇴를 하시면 이용 중인 간편 영수증 스캐너 서비스 이용을 하실 수 없고 회원님의 영수증 및 모든 정보가 삭제되며 모든 데이터는 복구가 불가능 합니다.</p>
                <div className="form-check form-switch">
                    <input onChange={handleChange} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" />
                    <label className="form-check-label" htmlFor="flexSwitchCheckDefault">안내를 모두 확인하였으며, 이에 동의합니다.</label>
                </div>
            </div>
            <div style={{width:"fit-content", margin:"50px auto"}}>
                <button onClick={handleClick} disabled={!isChecked} type="button" className="btn btn-primary btn-lg px-5">회원탈퇴</button>
            </div>
        </div>
    );
};

export default Withdrawal;
