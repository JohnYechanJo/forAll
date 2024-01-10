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
            <a href={KAKAO_AUTH_URL} className="kakaobtn">
                <img src={process.env.PUBLIC_URL + `kakao_login.png`} />
            </a>
        </div>
    )
};

export default LoginPage;