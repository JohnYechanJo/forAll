import {useCallback, useState} from "react";
import {Gender} from "../utils/enums";

const PersonalInfoInputTemplate = ({role, setId, setPw, setPwCheck,setName,setEmail,setPhone,setCerifiedNum,setBirthDay,setGender}) => {

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    },[]);
    const onChangePw = useCallback((e) => {
        setPw(e.target.value);
    },[]);
    const onChangePwCheck = useCallback((e) => {
        setPwCheck(e.target.value);
    },[]);
    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    },[]);
    const onChangeEmail = useCallback((e) => {
        setEmail(e.target.value);
    },[]);
    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    },[]);
    const onChangeCerifiedNum = useCallback((e) => {
        setCerifiedNum(e.target.value);
    },[]);
    const onChangeBirthDay = useCallback((e) => {
        setBirthDay(e.target.value);
    },[]);
    const onChangeGender = useCallback((e) => {
        setGender(e.target.value);
    },[]);

    return (
        <div>
            <div>
                <h1>아이디*</h1>
                <input
                    placeholder={"아이디를 입력해주세요"}
                    onChange={onChangeId}
                />
                <button>중복확인</button>
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
                <button>중복확인</button>
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
                <h1>생년월일*</h1>
                <input
                    placeholder={""}
                    onChange={onChangeBirthDay}
                />
            </div>
            <div>
                <h1>성별</h1>
                <input
                    placeholder={""}
                    onChange={onChangeGender}
                />
            </div>
        </div>
    )
};

export default PersonalInfoInputTemplate;