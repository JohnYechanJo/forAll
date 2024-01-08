import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import Header from "../../components/Header";
import LoginTemplate from "../../components/signup/LoginTemplate";
import PersonalInfoModifyTemplate from "../../components/modify/PersonalInfoModifyTemplate";

//사이드바에서 개인정보수정 버튼 누르면 여기로 route되게 한 다음 여기랑 PersonalInfoModifyTemplate랑 이 파일로 로그인하게 한다.
const PersonalInfoModify = () => {
    return (
        <div>
            <Header PageName={"개인정보수정"} />
            <h1>PersonalInfoModifyPage</h1>
            <PersonalInfoModifyTemplate />
        </div>
    )
};

export default PersonalInfoModify;