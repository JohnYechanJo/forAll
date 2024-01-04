import { useState, useCallback } from "react";
import Header from "../components/Header";
import LoginTemplate from "../components/LoginTemplate";

const LoginPage = () => {
    return (
        <div>
            <Header PageName={"로그인"}/>
            <h1>LoginPage</h1>
            <LoginTemplate />
        </div>
    )
};

export default LoginPage;