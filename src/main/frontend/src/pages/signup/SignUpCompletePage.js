import Header from "../../components/Header";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {user_role} from "../../utils/enums";
import checkIcon from "../../components/icons/check.png";
import "../../components/Styles.css";
const SignUpCompletePage = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

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
            <header style={{top:'2.75rem',position: 'absolute',fontSize:'0.9375rem'}} >4. 가입완료
            </header>
            <div style={{fontSize:"0.938rem", fontWeight:"400",gap:"7.5rem", alignItems:"center", textAlign:"center"}} >
                <p>축하드립니다!</p>
                <p>포올의 모든 서비스를 이용하실 수 있습니다.</p>
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
            <button onClick={()=>{navigate("/");}} className="bottom_button" style={{backgroundColor:"black",position:"fixed"}} >시작하기</button>
            

        </div>
    )
};

export default SignUpCompletePage;