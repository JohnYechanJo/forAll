import {Link} from "react-router-dom";
import "../../components/Styles.css";
const HostRegistryComplete = () => {
    const name = sessionStorage.getItem("name");
    return (
        <div>
            <h1>{name}님, 축하합니다!</h1>
            <h3>포 올 오너가 되신 것을 진심으로 환영합니다.</h3>
            <h3>포 올을 통해 셰프에게 놀라운 경험을</h3>
            <h3>선사하는 데 동참해주셔서 감사합니다.</h3>
            <div>
                <div style={{display: "flex", justifyContent: "center", flexDirection: "column", alignItems: "center"}}>
                    <Link to="/main">
                        <button className="button" style={{backgroundColor: "red"}}>시작하기</button>
                    </Link>
                </div>
            </div>
        </div>

    )
}
export default HostRegistryComplete;