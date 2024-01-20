import { useState, useCallback } from "react";
import LoginTemplate from "../components/signup/LoginTemplate";
import {KAKAO_AUTH_URL} from "../utils/OAuth";

// 아래 <a href={KAKAO_AUTH_URL} className="kakaobtn">로 수정
const LoginPage = () => {
    return (
        <div>
            <p style={{fontSize:"1.5625rem",lineHeight:"1.375rem",textAlign:"center"}} >로그인</p>
            <LoginTemplate />
            <a href={KAKAO_AUTH_URL} className="kakaobtn">
                <img src={process.env.PUBLIC_URL + `kakao_login.png`} />
            </a>
        </div>
    )
};

export default LoginPage;