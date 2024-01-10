import { Link } from "react-router-dom";
import "../../components/Styles.css";
const GuestRegistryStart = () => {
    return (
        <div>
            <h1>지금 셰프님을 위한 프로필을 등록해보세요!</h1>
            <h4>셰프님이 돋보일 수 있게 셰프님의 스토리를 소개해주세요</h4>
            <footer className="footer">
                <Link to="/guestRegistry">
                    <button className="button" style={{backgroundColor: "red"}}>프로필 등록하기</button>
                </Link>
            </footer>
        </div>

    )
};

export default GuestRegistryStart;