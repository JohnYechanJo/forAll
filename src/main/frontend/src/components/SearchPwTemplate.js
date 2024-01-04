import {useCallback, useState} from "react";

const SearchPwTemplate = ({pw,setId,setPhone,setCerifiedNum,isSendCerifiedNum,isCerified,checkCerifiedNum,sendCerifiedNum}) => {
    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    },[]);
    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    },[]);
    const onChangeCerifiedNum = useCallback((e) => {
        setCerifiedNum(e.target.value);
    }, []);
    return (
        <div>
            <h1>휴대폰 인증</h1>
            <div>
                <p>아이디</p>
                <input
                    placeholder="아이디를 입력해 주세요"
                    onChange={onChangeId}
                />
                <p>휴대폰 번호</p>
                <input
                    placeholder="휴대폰 번호를 입력해 주세요"
                    onChange={onChangePhone}
                />
                {isSendCerifiedNum? (
                    <div>
                        <input
                            placeholder="인증번호 입력"
                            onChange={onChangeCerifiedNum}
                        />
                        <button onClick={() => checkCerifiedNum()}>인증번호 확인</button>
                    </div>
                ) : <button onClick={() => sendCerifiedNum()}>인증번호 받기</button>}
                {isCerified ? (
                    <div>
                        <h1>비밀번호</h1>
                        <p>{pw}</p>
                    </div>
                ) : null
                }
            </div>
        </div>
    )
}

export default  SearchPwTemplate;