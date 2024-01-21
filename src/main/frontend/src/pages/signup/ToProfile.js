import {Link, useLocation, useNavigate} from "react-router-dom";
import "../../components/Styles.css";
const ToProfilePage = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}  >
            <div style={{fontSize:"0.938rem", fontWeight:"400",gap:"7.5rem",textAlign:"center"}} >
                <p style={{fontSize:"1.25rem", fontWeight:"400"}} >다른 회원들이 유저님을 더 잘 알아볼 수 있게</p>
                <p style={{fontSize:"1.25rem", fontWeight:"400"}}>프로필등록을 진행해주세요!</p>
            </div>
            <button onClick={()=>{navigate("/guestRegistry");}} className="bottom_button" style={{backgroundColor:"black"}} >시작하기</button>
        </div>
    )
};

export default ToProfilePage;