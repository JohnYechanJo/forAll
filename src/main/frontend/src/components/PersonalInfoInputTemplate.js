import {useCallback, useEffect, useState} from "react";
import { Gender } from "../utils/enums";
import axios from "axios";

const PersonalInfoInputTemplate = ({ role, setId, setPw, setPwCheck, setName, setEmail, setPhone, setCerifiedNum, setYear,setMonth,setDay, setGender, checkDuplicatedId, checkDuplicatedEmail, isCheckedDuplicatedId, isCheckedDuplicatedEmail, isCheckPw, gender }) => {

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    }, []);
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
    const onChangeBirthDay = useCallback((e) => {
        setBirthDay(e.target.value);
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
    const years = [...Array(121).keys()].map(i => i + 1900).reverse();
    const months = [...Array(12).keys()].map(i => i + 1);
    const days = [...Array(31).keys()].map(i => i + 1);


    return (
        <div>
            <div>
                <h1>아이디*</h1>
                <input
                    placeholder={"아이디를 입력해주세요"}
                    onChange={onChangeId}
                />
                <button onClick={() => checkDuplicatedId()}>중복확인</button>
                {isCheckedDuplicatedId === true ? <p>중복 확인 완료되었습니다</p> :
                    (isCheckedDuplicatedId === false ? <p>중복되는 아이디가 존재합니다</p> : null)}
            </div>
            <div>
                <h1>비밀번호*</h1>
                <input
                    type="password"
                    placeholder={"대,소문자,특수기호,숫자 포함 12-14자리"}
                    onChange={onChangePw}
                />
            </div>
            <div>
                <h1>비밀번호 확인*</h1>
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
                    placeholder={"이름을 입력해 주세요"}
                    onChange={onChangeName}
                />
            </div>
            <div>
                <h1>이메일*</h1>
                <input
                    placeholder={"예:forall@forall.com"}
                    onChange={onChangeEmail}
                />
                <button onClick={() => checkDuplicatedEmail()}>중복확인</button>
                {isCheckedDuplicatedEmail === true ? <p>중복 확인 완료되었습니다</p> :
                    (isCheckedDuplicatedEmail === false ? <p>중복되는 이메일이 존재합니다</p> : null)}
            </div>
            <div>
                <h1>휴대폰*</h1>
                <input
                    placeholder={"숫자만 입력해주세요"}
                    onChange={onChangePhone}
                />
                <button>인증번호 받기</button>
                <input
                    placeholder={"인증번호 입력"}
                    onChange={onChangeCerifiedNum}
                />
                <button>인증번호 확인</button>
            </div>
            <div>
            <div>
                <h1>생년월일*</h1>
                <select onChange={onChangeYear}>
                    <option value="">년(YYYY)</option>
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
                <select onChange={onChangeMonth}>
                    <option value="">월(MM)</option>
                    {months.map(month => (
                        <option key={month} value={month}>
                            {month}
                        </option>
                    ))}
                </select>
                <select onChange={onChangeDay}>
                    <option value="">일(DD)</option>
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
                            value="Not Specified"
                            onChange={onChangeGender}
                        />
                        선택안함
                    </label>
                </div>
            </div>
        </div>
    )
};

export default PersonalInfoInputTemplate;