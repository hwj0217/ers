// Main.js
import React, { useState, useEffect } from 'react';
import axios from "axios";

import ersLogo from "../src/assets/img/ers-logo.png";
function Main() {
    const [hello, setHello] = useState('');

    useEffect(() => {
        axios.get('http://localhost:8080/ers/sample')
            .then((res) => {
                setHello(res.data);
            })
    }, []);

    const handleClick = () => {
        window.location.href = '/join'
    }
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
                <p className="text-center fw-bold fs-4">영수증을 쉽게 스캔하고</p>
                <p className="text-center fw-bold fs-4">지출내역을 쉽게 생성합니다.</p>
                <p className="text-center fw-bold fs-4">{hello}</p>
            </div>
            <div className="mt-3 d-grid gap-2 col-6 mx-auto">
                <button onClick={handleClick} className="btn btn-primary py-2 mt-2">
                    회원가입
                </button>
            </div>
            <div className="container d-flex justify-content-center mt-2">
                <span className="me-2">이미 계정이 있으신가요?</span>
                <a href="/login">로그인</a>
            </div>
        </div>
    );
}

export default Main;
