import { useNavigate } from "react-router-dom";
const HostRegistryFirst = () => {
    const navigate = useNavigate();
    const name = sessionStorage.getItem("name");
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"
        }} >
            <div style={{  alignItems: "center", textAlign: "left",display:'flex',flexDirection:'column' }} >
            <a style={{ fontSize: "1.25rem", fontWeight: "700", }} >{name}님, 대관을 위해서 공간 등록을</a>
            <a style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "2rem",width:'100%' }} >먼저 부탁드립니다!</a>
                <div style={{ color: '#A0A0A0', fontSize: '0.9375rem',textAlign:'left',display:'flex',flexDirection:'column' }} >
                    <a>공간 등록을 하신 후</a>
                    <a>포 올을 통해 세상에 놀라운 경험을 선사해 주세요.</a>
                </div>
            </div>
            <button onClick={() => { navigate("/hostRegistry"); }} className="bottom_button" style={{ backgroundColor: "#FF4F4F", position: "fixed" }} >공간 등록하기</button>

        </div>
    )
};
export default HostRegistryFirst;
