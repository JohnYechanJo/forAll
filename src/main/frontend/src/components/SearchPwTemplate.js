import {useCallback, useState} from "react";

const SearchPwTemplate = () => {
    const [id, setId] = useState('');
    const [phone, setPhone] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    },[]);
    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    },[]);
    return (
        <div>
            <h1>휴대폰 인증</h1>
            <form>
                <p>아이디</p>
                <input
                    placeholder="아이디를 입력해 주세요"
                    value={id}
                    onChange={onChangeId}
                />
                <p>휴대폰 번호</p>
                <input
                    placeholder="휴대폰 번호를 입력해 주세요"
                    value={phone}
                    onChange={onChangePhone}
                />
                <button>인증번호 받기</button>
            </form>
        </div>
    )
}

export default  SearchPwTemplate;