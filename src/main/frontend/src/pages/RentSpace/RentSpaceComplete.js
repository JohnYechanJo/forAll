import {Link} from "react-router-dom";

const RentSpaceComplete = () => {
    return (
        <div>
            <h1>이름님 감사합니다!</h1>
            <p>뭐시기저시기</p>
            
            <Link to={"/"}>
                <button>확인</button>
            </Link>
        </div>
    )
};

export default RentSpaceComplete;