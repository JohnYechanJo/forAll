import {Link} from "react-router-dom";
import {useState} from "react";
import "../../components/Styles.css";
const GuestHomeTemplate = () => {
    return (
        <div>
            <h1>셰프 홈페이지</h1>
            <Link to="/guestRegistryStart">
                <button>프로필 등록하기</button>
            </Link>
        </div>
)
};

export default GuestHomeTemplate;