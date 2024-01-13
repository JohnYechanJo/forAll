import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import Header from "../components/Header";
import LoginTemplate from "../components/LoginTemplate";
import PersonalInfoModifyTemplate from "../components/PersonalInfoModifyTemplate";

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