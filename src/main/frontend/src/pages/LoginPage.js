import { useState, useCallback } from "react";
import Header from "../components/Header";
import LoginTemplate from "../components/signup/LoginTemplate";
import {KAKAO_AUTH_URL} from "../utils/OAuth";

const LoginPage = () => {
    return (
        <div>
            <Header PageName={"로그인"}/>
            <h1>LoginPage</h1>
            <LoginTemplate />
            <a href="https://kauth.kakao.com/oauth/authorize/?client_id=ef3dbe29e95781d561acb3dfbcab36b1&redirect_uri=http://localhost:3000/login/oauth2/callback/kakao&response_type=code" className="kakaobtn">
                <img src={process.env.PUBLIC_URL + `kakao_login.png`} />
            </a>
        </div>
    )
};

export default LoginPage;