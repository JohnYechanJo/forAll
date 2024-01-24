import "../../components/Styles.css";
import { Link } from "react-router-dom";

const HostRegistryComplete = () => {
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
                <p>포 올 오너가 되신 것을 진심으로 환영합니다.</p>
                <p>포 올을 통해 셰프에게 놀라운 경험을</p>
                <p>선사하는 데 동참해주셔서 감사합니다.</p>
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
export default HostRegistryComplete;