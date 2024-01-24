import { useState, useCallback } from "react";
import LoginTemplate from "../components/signup/LoginTemplate";
import {KAKAO_AUTH_URL} from "../utils/OAuth";
import "../components/Styles.css";
// 아래 <a href={KAKAO_AUTH_URL} className="kakaobtn">로 수정
const LoginPage = () => {
    return (
        <div>
            <p style={{fontSize:"1.5625rem",lineHeight:"1.375rem",textAlign:"center"}} >로그인</p>
            <LoginTemplate />
            <div>
                <p style={{fontSize:"0.9375rem",fontWeight:"400",textAlign:"center",marginBottom:'4rem'}} >카카오로 간편하게 시작하세요</p>
            </div>
            <a href={KAKAO_AUTH_URL} className="kakaobtn">
                <button className="bottom_button" style={{backgroundColor:'#FFE147',color:'black',width:'21.875rem'}}>카카오로 시작하기</button>
            </a>
        </div>
    )
};

export default LoginPage;