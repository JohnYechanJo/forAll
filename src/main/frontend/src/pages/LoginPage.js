import { useState, useCallback } from "react";
import Header from "../components/Header";
import LoginTemplate from "../components/LoginTemplate";
import Sidebar from "../components/Sidebar";

const LoginPage = () => {
    return (
        <div>
            <Header PageName={"로그인"}/>
            <h1>LoginPage</h1>
            <LoginTemplate />
            <Sidebar width={400} />
        </div>
    )
};

export default LoginPage;