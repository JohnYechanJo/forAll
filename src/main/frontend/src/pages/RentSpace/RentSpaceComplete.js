import {Link, useNavigate} from "react-router-dom";
import checkIcon from "../../components/icons/check.png";
import "../../components/Styles.css";
const RentSpaceComplete = () => {
    const navigate = useNavigate();
    const id = sessionStorage.getItem("user_id");
    const name = sessionStorage.getItem("name");
    const email = sessionStorage.getItem("email");
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }} >
            <img src={checkIcon} alt="check" style={{ width: "3.33rem", height: "3.33rem", flexShrink: "0" }} />
            <p style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "7.5rem" }} >{name}님 감사합니다!</p>
            <div style={{ fontSize: "0.938rem", fontWeight: "400", gap: "7.5rem", alignItems: "center", textAlign: "center" }} >
                <p>포올에서 꼼꼼히 검수 후</p>
                <p>예약 확정 결과를 알려드릴게요.</p>
                <p>12시간 이내 입금이 미완료시 예약자동 취소됩니다.</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start',flexDirection:'column',marginTop:'7.5rem' }}>
                <div  >
                    <span style={{ fontSize: "0.938rem", fontWeight: "700" }} >아이디</span>
                    <span style={{ fontSize: "0.938rem", fontWeight: "400", marginLeft: '1rem' }} >{id}</span>
                </div>
                <div style={{ marginBottom: "7.5rem",marginTop:'1rem' }} >
                    <span style={{ fontSize: "0.938rem", fontWeight: "700" }} >이메일</span>
                    <span style={{ fontSize: "0.938rem", fontWeight: "400", marginLeft: '1rem' }} >{email}</span>
                </div>
            </div>
            <button onClick={() => { navigate("/"); }} className="bottom_button" style={{ backgroundColor: "black", position: "fixed", width:"101%", height:"3.12rem", color:"white", bottom:0 }} >확인</button>
        </div>
    )
};

export default RentSpaceComplete;