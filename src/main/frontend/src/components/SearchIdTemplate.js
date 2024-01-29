import { useCallback, useState } from "react";
import * as regularExpressions from "../utils/regularExpressions";
import axios from "axios";
import "./Styles.css";

const SearchIdTemplate = ({ id, setName, setPhone, setCerifiedNum, isSendCerifiedNum, isCerified, checkCerifiedNum, sendCerifiedNum }) => {
    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    }, []);
    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    }, []);
    const onChangeCerifiedNum = useCallback((e) => {
        setCerifiedNum(e.target.value);
    }, []);
    console.log(isSendCerifiedNum);
    return (
        <div
            className="fontForRegister"
            style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '1rem', boxSizing: 'border-box' }} >
            <p style={{ fontSize: '1.5rem', fontWeight: '700' }} >아이디 찾기</p>
            <p style={{ fontSize: '1.5rem', fontWeight: '700', textAlign: 'left', width: '100%' }}>• 휴대폰 인증</p>
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', marginTop: '2.5rem' }}>
                <a>이름<span style={{ color: '#FF2929' }} >*</span>   </a>
                <input
                    className="input"
                    placeholder="이름을 입력해 주세요"
                    onChange={onChangeName}
                    style={{ marginBottom: '1rem', paddingLeft: '0.5rem', height: '2.5rem' }}
                />
                <a>휴대폰 번호<span style={{ color: '#FF2929' }} >*</span></a>
                <input
                    className="input"
                    placeholder="휴대폰 번호를 입력해 주세요"
                    onChange={onChangePhone}
                    style={{ marginBottom: '1rem', paddingLeft: '0.5rem', height: '2.5rem' }}
                />
                {isSendCerifiedNum ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between' }} >
                        <input
                            className="inputForRegister"
                            placeholder="인증번호 입력"
                            onChange={onChangeCerifiedNum}
                            style={{ marginBottom: '1rem', paddingLeft: '0.5rem', width: '60%', height: '2.5rem' }}
                        />
                        <button className="buttonForRegister" style={{ backgroundColor: '#616161', color: 'white' }} onClick={() => checkCerifiedNum()}>인증번호 확인</button>
                    </div>
                ) : <button className="bottom_button_fixed" style={{ width: '100vw', color: 'white', backgroundColor: 'black', height: '3.125rem' }} onClick={() => sendCerifiedNum()}>인증번호 받기</button>}
                {isCerified ? (
                    <div>
                        <a>아이디<span style={{ color: '#FF2929' }} >*</span></a>
                        <input
                            className="input"
                            style={{ marginBottom: '1rem', paddingLeft: '0.5rem', height: '2.5rem' }}
                            defaultValue={id}
                        />
                        <button className="bottom_button_fixed" style={{ width: '100vw', color: 'white', backgroundColor: 'black', height: '3.125rem' }} onClick={() => window.location.href = "/login"}>로그인</button>
                    </div>
                ) : null
                }

            </div>
        </div>
    )
}

export default SearchIdTemplate;