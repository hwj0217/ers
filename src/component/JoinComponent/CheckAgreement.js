import React, { useState, useEffect } from 'react';

const CheckAgreement = ({ email, userId, password }) => {
    const [isValid, setIsValid] = useState(false);
    const [allAgreementsChecked, setAllAgreementsChecked] = useState(false);
    const [ageChecked, setAgeChecked] = useState(false);
    const [agr1Checked, setAgr1Checked] = useState(false);
    const [agr2Checked, setAgr2Checked] = useState(false);
    const [agr3Checked, setAgr3Checked] = useState(false);
    const [agr4Checked, setAgr4Checked] = useState(false);

    useEffect(() => {
        if (ageChecked && agr1Checked && agr2Checked) {
            setIsValid(true);
        }
        else {
            setIsValid(false);
        }
        const agrAgeInput = document.getElementById('agr-age');
        const agr1Input = document.getElementById('agr-1');
        const agr2Input = document.getElementById('agr-2');
        const agr3Input = document.getElementById('agr-3');
        const agr4Input = document.getElementById('agr-4');

        if (agrAgeInput) agrAgeInput.checked = ageChecked;
        if (agr1Input) agr1Input.checked = agr1Checked;
        if (agr2Input) agr2Input.checked = agr2Checked;
        if (agr3Input) agr3Input.checked = agr3Checked;
        if (agr4Input) agr4Input.checked = agr4Checked;
    }, [allAgreementsChecked, ageChecked, agr1Checked, agr2Checked, agr3Checked, agr4Checked]);

    const handleCheckboxChange = (e) => {
        const checkboxId = e.target.id;
        const isChecked = e.target.checked;

        if (checkboxId === 'agr-age') {
            setAgeChecked(isChecked);
        } else if (checkboxId === 'agr-1') {
            setAgr1Checked(isChecked);
        } else if (checkboxId === 'agr-2') {
            setAgr2Checked(isChecked);
        } else if (checkboxId === 'agr-3') {
            setAgr3Checked(isChecked);
        } else if (checkboxId === 'agr-4') {
            setAgr4Checked(isChecked);
        } else if (checkboxId === 'agr-all') {
            setAllAgreementsChecked(isChecked);
            setAgeChecked(isChecked);
            setAgr1Checked(isChecked);
            setAgr2Checked(isChecked);
            setAgr3Checked(isChecked);
            setAgr4Checked(isChecked);
        }

    };

    const handleSummit = () => {
        const userData = { email: email, user_id: userId, name: "default", password: password };

        fetch('/ers/regMember', {
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
    };
    return (
        <div id="agreement-div" className="d-grid gap-2 col-6 mx-auto container-relative">
            <div>약관 동의</div>
            <div className="form-check">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="agr-age"
                    id="agr-age"
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="agr-age">
                    만 14세 이상 확인
                </label>
                <div className="sub-text">만 14세 이상인 분들만 회원에 가입하실 수 있습니다.</div>
                <div className="sub-text">만 14세 미만은 부모 동의가 필요합니다.</div>
            </div>
            <div className="form-check border-2 border-bottom pb-3 mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="agr-all"
                    id="agr-all"
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="agr-all">
                    모든 약관에 동의합니다.
                </label>
            </div>
            <div className="form-check position-relative mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="agr-1"
                    id="agr-1"
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="agr-1">
                    서비스 약관 (필수)
                </label>
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <i className="bi bi-chevron-right"></i>
                </div>
            </div>
            <div className="form-check position-relative mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="agr-2"
                    id="agr-2"
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="agr-2">
                    고유식별 정보의 수집, 이용 동의 (필수)
                </label>
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <i className="bi bi-chevron-right"></i>
                </div>
            </div>
            <div className="form-check position-relative mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="agr-3"
                    id="agr-3"
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="agr-3">
                    개인정보 유효기간 규정 (선택)
                </label>
                <div className="position-absolute top-50 end-0 translate-middle-y">
                    <i className="bi bi-chevron-right"></i>
                </div>
            </div>
            <div className="form-check mb-3">
                <input
                    className="form-check-input"
                    type="checkbox"
                    value="agr-4"
                    id="agr-4"
                    onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="agr-4">
                    마케팅 수신동의(앱, 문자, 이메일) (선택)
                </label>
            </div>
            <button onClick={handleSummit} disabled={!isValid} className="btn btn-primary py-2 mt-2">
                가입하기
            </button>
        </div>
    );
};

export default CheckAgreement;
