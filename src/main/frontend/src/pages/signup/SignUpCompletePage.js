
import { useLocation, useNavigate } from "react-router-dom";

import checkIcon from "../../components/icons/check.png";
import "../../components/Styles.css";
const SignUpCompletePage = () => {
    const location = useLocation();
    const data = { ...location.state };
    const navigate = useNavigate();

    sessionStorage.setItem("profileImg", data.profileImg);
    sessionStorage.setItem("user_id", data.id);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("email", data.email);

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            position: "relative",
        }} >
            <header style={{ top: '2.75rem', position: 'absolute', fontSize: '0.9375rem' }} >4. 가입완료
            </header>
            <img src={checkIcon} alt="check" style={{ width: "3.33rem", height: "3.33rem", flexShrink: "0", marginTop: '7.5rem' }} />
            <p style={{ fontSize: "1.25rem", fontWeight: "700", }} >{data.name}님 환영합니다!</p>
            <div style={{ fontSize: "0.938rem", fontWeight: "400", gap: "7.5rem", alignItems: "center", textAlign: "center", marginBottom: "7.5rem" }} >
                <p>축하드립니다!</p>
                <p>포올의 모든 서비스를 이용하실 수 있습니다.</p>
            </div>

            <div>
                <div style={{ display: 'flex', justifyContent: 'flex-start' }} >
                    <span style={{ fontSize: "0.938rem", fontWeight: "700" }} >아이디</span>
                    <span style={{ fontSize: "0.938rem", fontWeight: "400", marginLeft: '1rem' }} >{data.id}</span>
                </div>
                <div style={{ marginBottom: "7.5rem", display: 'flex', justifyContent: 'flex-start' }} >
                    <span style={{ fontSize: "0.938rem", fontWeight: "700" }} >이메일</span>
                    <span style={{ fontSize: "0.938rem", fontWeight: "400", marginLeft: '1rem' }} >{data.email}</span>
                </div>
            </div>
            <button onClick={() => { navigate("/"); }} className="bottom_button" style={{ backgroundColor: "black", position: "fixed" }} >시작하기</button>


        </div>
    )
};

export default SignUpCompletePage;