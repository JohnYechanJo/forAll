import {useCallback, useEffect, useState} from "react";
import { Gender } from "../utils/enums";
import axios from "axios";
import UseTermsTemplate from "./UseTermsTemplate";
const PersonalInfoModifyInputTemplate = ({ role, name, phone, email,year,month,day, cerifiedNum, setPw,setPwCheck, setName, setEmail, setPhone, setCerifiedNum, setYear,setMonth,setDay, setGender, isCheckPw, setIsCheckedDuplicatedEmail ,isCheckedDuplicatedEmail, sendCerifiedNum, gender, isPhoneCerified, setIsPhoneCerified }) => {
    console.log(year,month,day);
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
        if (email===prevEmail){
            setIsCheckedDuplicatedEmail(true);
        }
        else{
            axios.get("/api/v1/members/checkEmail/"+email)
                .then((response) => {
                    setIsCheckedDuplicatedEmail(true);
                }).catch((response) => {
                setIsCheckedDuplicatedEmail(false);
            });
        }
    };
    const checkCerifiedNum = () => {
        if (phone===prevPhone){
            setIsPhoneCerified(true);
        }
        else{
            axios.get("/api/v1/checkSms/"+phone+"/"+cerifiedNum)
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
            <div>
                <h1>아이디</h1>
                <input
                    placeholder={id}
                    disabled={true}
                />
            </div>
            <div>
                <h1>새 비밀번호*</h1>
                <input
                    type="password"
                    placeholder={"대,소문자,특수기호,숫자 포함 12-14자리"}
                    onChange={onChangePw}
                />
            </div>
            <div>
                <h1>새 비밀번호 확인*</h1>
                <input
                    type="password"
                    placeholder={"비밀번호를 한번 더 입력해주세요"}
                    onChange={onChangePwCheck}
                />
                {isCheckPw === true ? <p>비밀번호가 일치합니다</p> :
                    (isCheckPw === false ? <p>비밀번호가 일치하지 않습니다</p> : null)}
            </div>
            <div>
                <h1>이름*</h1>
                <input
                    defaultValue={name}
                    onChange={onChangeName}
                />
            </div>
            <div>
                <h1>이메일*</h1>
                <input
                    defaultValue={email}
                    onChange={onChangeEmail}
                />
                <button onClick={() => checkDuplicatedEmail()} disabled={email===prevEmail}>중복확인</button>
                {isCheckedDuplicatedEmail === true ? <p>중복 확인 완료되었습니다</p> :
                    (isCheckedDuplicatedEmail === false ? <p>중복되는 이메일이 존재합니다</p> : null)}
            </div>
            <div>
                <h1>휴대폰*</h1>
                <input
                    value={phone}
                    onChange={onChangePhone}
                />
                <button onClick={() => sendCerifiedNum()} disabled={phone===prevPhone}>인증번호 받기</button>
                <input
                    placeholder={"인증번호 입력"}
                    onChange={onChangeCerifiedNum}
                />
                <button onClick={() => checkCerifiedNum()} disabled={phone===prevPhone} >인증번호 확인</button>
                {isPhoneCerified === true ? <p>인증 완료되었습니다</p> :
                    (isPhoneCerified === false ? <p>인증 실패했습니다</p> : null)}
            </div>
            <div>
                <div>
                    <h1>생년월일*</h1>
                    <select onChange={onChangeYear}>
                        <option value={year}>{year ? year : "년(YYYY)"}</option>
                        {years.map(year => (
                            <option key={year} value={year}>
                                {year}
                            </option>
                        ))}
                    </select>
                    <select onChange={onChangeMonth}>
                        <option value={month}>{month ? month : "월(MM)"}</option>
                        {months.map(month => (
                            <option key={month} value={month}>
                                {month}
                            </option>
                        ))}
                    </select>
                    <select onChange={onChangeDay}>
                        <option value={day}>{day ? day : "일(DD)"}</option>
                        {days.map(day => (
                            <option key={day} value={day}>
                                {day}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <h1>성별</h1>
                <div>
                    <label style={{ display: 'block' }}>
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            onChange={onChangeGender}
                        />
                        남자
                    </label>
                    <label style={{ display: 'block' }}>
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            onChange={onChangeGender}
                        />
                        여자
                    </label>
                    <label style={{ display: 'block' }}>
                        <input
                            type="radio"
                            name="gender"
                            value="NotSpecified"
                            onChange={onChangeGender}
                            defaultChecked
                        />
                        선택안함
                    </label>
                </div>
            </div>
        </div>
    )
};

export default PersonalInfoModifyInputTemplate;