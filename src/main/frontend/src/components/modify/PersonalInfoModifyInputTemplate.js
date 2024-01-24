import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import UseTermsTemplate from "../signup/UseTermsTemplate";
const PersonalInfoModifyInputTemplate = ({ name, phone, email, year, month, day, cerifiedNum, setPw, setPwCheck, setName, setEmail, setPhone, setCerifiedNum, setYear, setMonth, setDay, setGender, isCheckPw, setIsCheckedDuplicatedEmail, isCheckedDuplicatedEmail, sendCerifiedNum, gender, isPhoneCerified, setIsPhoneCerified }) => {
    console.log(year, month, day);
    const onChangePw = useCallback((e) => {
        setPw(e.target.value);
    }, []);
    const onChangePwCheck = useCallback((e) => {
        setPwCheck(e.target.value);
    }, []);
    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    }, []);
    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    }, []);
    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    }, []);
    const onChangeCerifiedNum = useCallback((e) => {
        setCerifiedNum(e.target.value);
    }, []);
    const onChangeGender = useCallback((e) => {
        setGender(e.target.value);
    }, []);
    const onChangeYear = (e) => {
        setYear(e.target.value);
    };
    const onChangeMonth = (e) => {
        setMonth(e.target.value);
    };
    const onChangeDay = (e) => {
        setDay(e.target.value);
    };
    const checkDuplicatedEmail = () => {
        if (email === prevEmail) {
            setIsCheckedDuplicatedEmail(true);
        }
        else {
            axios.get("/api/v1/members/checkEmail/" + email)
                .then((response) => {
                    setIsCheckedDuplicatedEmail(true);
                }).catch((response) => {
                    setIsCheckedDuplicatedEmail(false);
                });
        }
    };
    const checkCerifiedNum = () => {
        if (phone === prevPhone) {
            setIsPhoneCerified(true);
        }
        else {
            axios.get("/api/v1/checkSms/" + phone + "/" + cerifiedNum)
                .then((response) => {
                    setIsPhoneCerified(true);
                }).catch((response) => {
                    setIsPhoneCerified(false);
                });
        }
    };
    const [prevEmail, setPrevEmail] = useState(email);
    const [prevPhone, setPrevPhone] = useState(phone);
    const years = [...Array(121).keys()].map(i => i + 1900).reverse();
    const months = [...Array(12).keys()].map(i => i + 1);
    const days = [...Array(31).keys()].map(i => i + 1);
    const id = sessionStorage.getItem("user_id");
    setIsCheckedDuplicatedEmail(true);
    setIsPhoneCerified(true);
    return (
        <div>
            <a className="fontForRegister" >아이디<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{ display: "flex", marginBottom: "2.5rem", justifyContent: "space-between" }} >
                <input
                    className="inputForRegister"
                    style={{ width: "14.0625rem" }}
                    placeholder={id}
                    disabled={true}
                />
            </div>
            <a className="fontForRegister"  >새 비밀번호<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{ marginBottom: "2.5rem", display: "flex" }}>
                <input
                    className="inputForRegister"
                    type="password"
                    placeholder={"대,소문자,특수기호,숫자 포함 12-14자리"}
                    onChange={onChangePw}
                />
            </div>
            <a className="fontForRegister"  >새 비밀번호 확인<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{ marginBottom: "2.5rem" }}>
                <input
                    className="inputForRegister"
                    type="password"
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    onChange={onChangePwCheck}
                />
                {isCheckPw === true ? <p>비밀번호가 일치합니다</p> :
                    (isCheckPw === false ? <p>비밀번호가 일치하지 않습니다</p> : null)}
            </div>
            <a className="fontForRegister" >이름<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{ marginBottom: "2.5rem" }}>
                <input
                    className="inputForRegister"
                    placeholder={name}
                    onChange={onChangeName}
                    defaultValue={sessionStorage.getItem("name")}
                />
            </div>
            <a className="fontForRegister" >이메일<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div>
                <input
                    style={{ width: "14.0625rem" }}
                    className="inputForRegister"
                    defaultValue={email}
                    onChange={onChangeEmail}
                />
                <button onClick={() => checkDuplicatedEmail()} disabled={email === prevEmail}>중복확인</button>
                {isCheckedDuplicatedEmail === true ? <p>중복 확인 완료되었습니다</p> :
                    (isCheckedDuplicatedEmail === false ? <p>중복되는 이메일이 존재합니다</p> : null)}
            </div>
            <a className="fontForRegister" >휴대폰<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{ justifyContent: "space-between", display: "flex" }}>
                <input
                    style={{ width: "14.0625rem", marginBottom: "0.625rem" }}
                    className="inputForRegister"
                    value={phone}
                    onChange={onChangePhone}
                />
                <button onClick={() => sendCerifiedNum()} disabled={phone === prevPhone}
                    className="buttonForRegister"
                    style={{ backgroundColor: "#616161", color: "white" }}
                >인증번호 받기</button>
            </div>
            <div style={{ marginBottom: "2.5rem", justifyContent: "space-between", display: "flex" }}>
                <input
                    className="inputForRegister"
                    style={{ width: "14.0625rem" }}
                    placeholder={"인증번호 입력"}
                    onChange={onChangeCerifiedNum}
                />
                <button onClick={() => checkCerifiedNum()} disabled={phone === prevPhone}
                    className="buttonForRegister"
                    style={{ backgroundColor: "#616161", color: "white" }}
                >
                    인증번호 확인</button>
            </div>
            {isPhoneCerified === true ? <p>인증 완료되었습니다</p> :
                (isPhoneCerified === false ? <p>인증 실패했습니다</p> : null)}
            <div>
                <a className="fontForRegister" >생년월일<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                <div style={{ marginBottom: "2.5rem", display: 'flex' }}>
                    <select onChange={onChangeYear} style={{ height: '2.5rem', border: '1px solid #D9D9D9', width: '30%', margin: '0.5rem' }}>
                        <option value="">년(YYYY)</option>
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <select onChange={onChangeMonth} style={{ height: '2.5rem', border: '1px solid #D9D9D9', width: '30%', margin: '0.5rem' }}>
                        <option value="">월(MM)</option>
                        {months.map(month => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select onChange={onChangeDay} style={{ height: '2.5rem', border: '1px solid #D9D9D9', width: '30%', margin: '0.5rem' }}>
                        <option value="">일(DD)</option>
                        {days.map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <a className="fontForRegister" >성별<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
            <div style={{ height: '3rem' }}>
                <div >
                    <input
                        type="radio"
                        name="gender"
                        value="Male"
                        onChange={onChangeGender}
                        id="male"
                    />
                    <label for='male' style={{ display: 'block', marginBottom: '1rem', marginTop: '1rem' }}>
                        <em></em><span className="fontForRegister" >남자</span>
                    </label>
                    <input
                        type="radio"
                        name="gender"
                        value="Female"
                        onChange={onChangeGender}
                        id="female"
                    />
                    <label for='female' style={{ display: 'block' }}>
                        <em></em><span className="fontForRegister" >여자</span>
                    </label>
                </div>
            </div>
        </div>
    )
};

export default PersonalInfoModifyInputTemplate;