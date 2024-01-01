import {useCallback, useState} from "react";

const SearchIdTemplate = () => {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const onChangeName = useCallback((e) => {
        setName(e.target.value);
    },[]);
    const onChangePhone = useCallback((e) => {
        setPhone(e.target.value);
    },[]);
    return (
        <div>
            <h1>휴대폰 인증</h1>
            <form>
                <p>이름</p>
                <input
                    placeholder="이름을 입력해 주세요"
                    value={name}
                    onChange={onChangeName}
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

export default  SearchIdTemplate;