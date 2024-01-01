import { useState, useCallback } from "react";
import "./LoginTemplate.css";
import {Link} from "react-router-dom";
import {user_role} from "../utils/enums";
const LoginTemplate = () => {
    const [role, setRole] = useState(user_role["GUEST"]);
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
                <div onClick={()=>setRole(user_role["GUEST"])}>
                    <span className={role === user_role["GUEST"] ? "selected" : ""}>게스트 로그인</span>
                </div>
                <div onClick={()=>setRole(user_role["HOST"])}>
                    <span className={role === user_role["HOST"] ? "selected" : ""}>호스트 로그인</span>
                </div>
            </div>
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
                <button>로그인</button>
                <Link to="/signUp">
                    <button>회원가입</button>
                </Link>

            </div>
            <div>
                <Link to="/searchId"><span>아이디 찾기</span></Link>
                <span>|</span>
                <Link to="/searchPw"><span>비밀번호 찾기</span></Link>
            </div>
        </div>
    )
}

export default LoginTemplate;