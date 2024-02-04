import {useNavigate} from "react-router-dom";
import checkIcon from "../../components/icons/check.png";
import "../../components/Styles.css";
import Alert from "../../components/Alert";
const ChefRegistryCheckingPage = () => {
    
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
            <img src={checkIcon} alt="check" style={{width:"3.33rem", height:"3.33rem",flexShrink:"0"}} />
            <p style={{fontSize:"1.25rem", fontWeight:"700",marginBottom:"7.5rem"}} >{name}님 감사합니다!</p>
            <div style={{fontSize:"0.938rem", fontWeight:"400",gap:"7.5rem", alignItems:"center", textAlign:"center"}} >
                <p>포올에서 꼼꼼히 검수 후</p>
                <p>셰프님의 등록 결과를 알려드릴게요.</p>
            </div>
            <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} >
            <div>
                <span style={{fontSize:"0.938rem", fontWeight:"700"}} >아이디</span>
                <span style={{fontSize:"0.938rem", fontWeight:"400",marginLeft:'1rem'}} >{id}</span>
            </div>
            <div style={{marginBottom:"7.5rem"}} >
                <span style={{fontSize:"0.938rem", fontWeight:"700"}} >이메일</span>
                <span style={{fontSize:"0.938rem", fontWeight:"400",marginLeft:'1rem'}} >{email}</span>
            </div>
            </div>
            <button onClick={()=>{navigate("/");}} className="bottom_button" style={{backgroundColor:"black",position:"fixed"}} >시작하기</button>

        </div>
    )
};

export default ChefRegistryCheckingPage;