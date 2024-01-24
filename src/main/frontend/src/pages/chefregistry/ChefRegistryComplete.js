import "../../components/Styles.css";
import { Link } from "react-router-dom";

const ChefRegistryComplete = () => {
    const name = sessionStorage.getItem("name");
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }}>
            <div style={{padding:"1rem",gap:"0.5rem", alignItems:"flex-start",display:"flex",flexDirection:"column"}} >
            <p style={{fontSize:"1.25rem",fontWeight:"700",}} >{name}님, 축하합니다!</p>
            <div  style={{fontSize:"0.9375rem",fontWeight:"400",color:"#A0A0A0"}} >
                <p>포 올 셰프가 되신 것을 진심으로 환영합니다.</p>
                <p>포 올을 통해 세상에 놀라운 경험을 선사해 주세요.</p>
            </div>
            <div>
                <Link to="/">
                    <button className="bottom_button" style={{backgroundColor:"#FF4F4F",position:"fixed"}} >시작하기</button>
                </Link>
            </div>
            </div>
        </div>
    )
}
export default ChefRegistryComplete;