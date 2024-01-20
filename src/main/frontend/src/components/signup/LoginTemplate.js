import { useState, useCallback } from "react";
import "./LoginTemplate.css";
import {Link, useNavigate} from "react-router-dom";
import {user_role} from "../../utils/enums";
import axios from "axios";
const LoginTemplate = () => {
    const navigate = useNavigate();
    const [id, setId] = useState('');
    const [passwd, setPasswd] = useState('');

    const onChangeId = useCallback((e) => {
        setId(e.target.value);
    },[]);
    const onChangePw = useCallback((e) => {
        setPasswd(e.target.value);
    },[]);
    const logIn = () => {
        if (id === "") alert("아이디를 입력해주세요");
        else if(passwd === "") alert("비밀번호를 입력해주세요");
        else{
            axios.post("/api/v1/login",
                {
                    loginId: id,
                    loginPw: passwd,
                },
                {
                    headers:{
                        'Content-type': 'application/json',
                        'Accept': 'application/json'
                    }
                }
                ).then((res) => {
                sessionStorage.setItem("user_id", id);
                sessionStorage.setItem("name", res.data.name);
                sessionStorage.setItem("email", res.data.email);
                navigate('/');
            }).catch((res) => {
                alert("로그인에 실패했습니다");
            })
        }
    }
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
                <button onClick={() => logIn()}>로그인</button>
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