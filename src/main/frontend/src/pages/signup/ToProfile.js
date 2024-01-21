import Header from "../../components/Header";
import {Link, useLocation, useNavigate} from "react-router-dom";

const ToProfilePage = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

    return (
        <div style={{alignItems:"center", display:"inline-flex",flexDirection:"column",textAlign:"center" }} >
            
            <div style={{fontSize:"0.938rem", fontWeight:"400",gap:"7.5rem"}} >
                <p style={{fontSize:"1.25rem", fontWeight:"400"}} >다른 회원들이 유저님을 더 잘 알아볼 수 있게</p>
                <p style={{fontSize:"1.25rem", fontWeight:"400"}}>프로필등록을 진행해주세요!</p>
            </div>
            <button onClick={()=>{navigate("/guestRegistry");}} >시작하기</button>
        </div>
    )
};

export default ToProfilePage;