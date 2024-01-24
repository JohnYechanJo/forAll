import {Link} from "react-router-dom";

const HostRegistryStartPage = () => {
    return (
        <div>
            <h1>지금 오너님을 위한 공간 비즈니스를 시작해보세요!</h1>
            <p>한식 | 일식 | 양식 | 다이닝까지 오너님의 공간을 소개해주세요</p>
            <p>1. 공간 정보를 알려주세요</p>
            <p>2. 이용안내 정보를 입력하세요</p>
            <p>3. 예약 / 정산 정보를 입력하세요</p>
            <Link to={"/hostRegistry"}>
                <button>공간 등록하기</button>
            </Link>
        </div>
    )
};

export default HostRegistryStartPage;