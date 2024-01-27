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
<<<<<<< HEAD
=======
<<<<<<< HEAD
            {/*<div>*/}
            {/*    <p style={{fontSize:"0.9375rem",fontWeight:"400",textAlign:"center",marginBottom:'4rem'}} >카카오로 간편하게 시작하세요</p>*/}
            {/*</div>*/}
            {/*<a href={KAKAO_AUTH_URL} className="kakaobtn">*/}
            {/*    <button className="bottom_button" style={{backgroundColor:'#FFE147',color:'black',width:'21.875rem'}}>카카오로 시작하기</button>*/}
            {/*</a>*/}
=======
>>>>>>> ef0ee3a ([01.26 근일]todolist 1,2,3,4,5 구현)
            {/* <div>
                <p style={{fontSize:"0.9375rem",fontWeight:"400",textAlign:"center",marginBottom:'4rem'}} >카카오로 간편하게 시작하세요</p>
            </div>
            <a href={KAKAO_AUTH_URL} className="kakaobtn">
                <button className="bottom_button" style={{backgroundColor:'#FFE147',color:'black',width:'21.875rem'}}>카카오로 시작하기</button>
            </a> */}
<<<<<<< HEAD
=======
>>>>>>> 3b72131 ([01.26 근일]todolist 1,2,3,4,5 구현)
>>>>>>> ef0ee3a ([01.26 근일]todolist 1,2,3,4,5 구현)
        </div>
    )
};

export default LoginPage;