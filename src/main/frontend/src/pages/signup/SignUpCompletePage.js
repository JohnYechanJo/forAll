import Header from "../../components/Header";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {user_role} from "../../utils/enums";
import checkIcon from "../../components/icons/check.png";

const SignUpCompletePage = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

    sessionStorage.setItem("user_id", data.id);
    sessionStorage.setItem("role", data.role);
    sessionStorage.setItem("name", data.name);
    sessionStorage.setItem("email", data.email);
    return (
        <div style={{alignItems:"center", display:"inline-flex",flexDirection:"column",textAlign:"center" }} >
            <Header PageName={"04. 가입 완료"}/>
            <div style={{fontSize:"0.938rem", fontWeight:"400",gap:"7.5rem"}} >
                <p>축하드립니다!</p>
                <p>포올의 모든 서비스를 이용하실 수 있습니다.</p>
                <p style={{fontSize:"1.25rem", fontWeight:"400"}} >다른 회원들이 유저님을 더 잘 알아볼 수 있게</p>
                <p style={{fontSize:"1.25rem", fontWeight:"400"}}>프로필등록을 진행해주세요!</p>
            </div>
            <img src={checkIcon} alt="check" style={{width:"3.33rem", height:"3.33rem",flexShrink:"0"}} />
            <p style={{fontSize:"1.25rem", fontWeight:"700",marginBottom:"7.5rem"}} >{data.name}님 환영합니다!</p>
            <div>
                <span style={{fontSize:"0.938rem", fontWeight:"700"}} >아이디</span>
                <span style={{fontSize:"0.938rem", fontWeight:"400"}} >{data.id}</span>
            </div>
            <div style={{marginBottom:"7.5rem"}} >
                <span style={{fontSize:"0.938rem", fontWeight:"700"}} >이메일</span>
                <span style={{fontSize:"0.938rem", fontWeight:"400"}} >{data.email}</span>
            </div>
            <button onClick={()=>{navigate("/guestRegistryStart");}} >프로필 등록</button>
            

        </div>
    )
};

export default SignUpCompletePage;