import {useCallback, useState} from "react";
import * as regularExpressions from "../utils/regularExpressions";
import axios from "axios";

const SearchIdTemplate = ({id,setName,setPhone,setCerifiedNum,isSendCerifiedNum,isCerified,checkCerifiedNum,sendCerifiedNum}) => {
    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    },[]);
    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    },[]);
    const onChangeCerifiedNum = useCallback((e) => {
        setCerifiedNum(e.target.value);
    }, []);
    console.log(isSendCerifiedNum);
    return (
        <div>
            <h1>휴대폰 인증</h1>
            <div>
                <p>이름</p>
                <input
                    placeholder="이름을 입력해 주세요"
                    onChange={onChangeName}
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
                        <h1>아이디</h1>
                        <p>{id}</p>
                    </div>
                ) : null
                }

            </div>
        </div>
    )
}

export default  SearchIdTemplate;