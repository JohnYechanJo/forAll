import { useState, useCallback } from "react";
import {Link} from "react-router-dom";
const PersonTemplate = () => {
    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    },[]);
    const onChangePw = useCallback((e) => {
        setPasswd(e.target.value);
    },[]);
    return (
        <div>
            <div>
                <input
                    placeholder="아이디 입력"
                    value={id}
                    onChange={onChangeId}
                />
                <input
                    placeholder="비밀번호 입력"
                    value={passwd}
                    onChange={onChangePw}
                />
            </div>
            <div>
                <Link to="/personalInfoModify2">
                    <button>확인</button>
                </Link>

            </div>
        </div>
    )
}

export default PersonTemplate;