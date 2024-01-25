import { useNavigate } from "react-router-dom";
const AlreadyChef = () => {
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
            <div style={{ fontSize: "0.938rem", fontWeight: "400", gap: "0.5rem", alignItems: "center", textAlign: "center" }} >
            <p style={{ fontSize: "1.25rem", fontWeight: "700", marginBottom: "2rem" }} >{name}님, 이미 셰프로 등록되셨습니다!</p>
                <div style={{ color: '#A0A0A0', fontSize: '0.9375rem',textAlign:'left' }} >
                    <p>포 올 셰프가 되신 것을 진심으로 환영합니다.</p>
                    <p>포 올을 통해 세상에 놀라운 경험을 선사해 주세요.</p>
                </div>
                <div style={{display:'flex',flexDirection:'column',justifyContent:'flex-start'}} >
                <svg xmlns="http://www.w3.org/2000/svg" width="134" height="72" viewBox="0 0 134 72" fill="none">
<path d="M7.19831 70.4437C11.4217 62.6467 18.8855 56.7786 25.3924 50.9789C41.8976 36.2677 59.5701 22.8276 77.0289 9.27697C79.727 7.18282 82.8049 3.82591 85.9093 2.2737C90.0251 0.215803 81.3711 10.3208 78.5306 13.941C72.44 21.7035 64.3103 28.5826 58.9792 36.8569C56.9775 39.9637 63.433 38.1121 64.3219 37.8099C70.8928 35.5762 78.2832 30.7153 85.2162 30.0991C88.6777 29.7914 80.5857 35.2963 78.5306 38.0987C77.7457 39.169 86.3543 37.4928 86.8768 37.3767C96.5811 35.2202 106.432 34.3155 116.363 34.3155C118.692 34.3155 121.022 34.3269 123.352 34.3155C124.623 34.3092 134.745 33.631 130.774 33.5357C87.8614 32.5058 44.764 29.1172 2 29.1172" stroke="black" stroke-width="3" stroke-linecap="round"/>
</svg>
                <a style={{textAlign:'left',marginTop:'0.5rem'}}>김대원 포 올 CEO</a>
                </div>
            </div>
            <button onClick={() => { navigate("/"); }} className="bottom_button" style={{ backgroundColor: "#FF4F4F", position: "fixed" }} >시작하기</button>

        </div>
    )
};
export default AlreadyChef;
