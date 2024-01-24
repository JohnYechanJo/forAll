import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import {useEffect, useState} from "react";
import axios from "axios";
import {TimeUtil} from "../../utils/TimeUtil";
import {AddressUtil} from "../../utils/AddressUtil";
import {useNavigate} from "react-router-dom";
import {ReservationState} from "../../utils/enums";

const ReservationListPage = () => {
    const navigate = useNavigate();
    const [reservationData, setReservationData] = useState([]);

    const handleAssurance = (data) => {
        if (data.state === ReservationState.FINISH) return;
        if (data.state === ReservationState.APPROVE) navigate("/assuranceReady", {state:data});
        else{
            const rentEndTime = TimeUtil.setHour(data.rentDay, data.rentEndHour);
            if (TimeUtil.getDiffSecond(rentEndTime) < 2 * 60 * 60) navigate("/assuranceFinish", {state:data});
            else navigate("/assuranceReadyView", {state:data});
        }
    }
    useEffect(() => {
        axios.get("/api/v1/reservation/user/"+sessionStorage.getItem("user_id"))
            .then((res) => setReservationData(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                {/* <button className="button" onClick={() => navigate("/")}>
                    <img src={forAllLogo} alt="forAllLogo" style={{width:"1.875rem", height:"1.875rem"}} />
                </button> */}
                <button className="button">대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate />
            <div>
                <h1>진행 중인 대관</h1>
                {reservationData ? reservationData.filter((data) => TimeUtil.checkToday(data.rentDay)).map((data) => (
                    <div onClick={handleAssurance(data)}>
                        <h1>{AddressUtil.extraction(data.address)}</h1>
                        <p>{data.name}</p>
                    </div>
                )) : null}
            </div>
            <div>
                <h1>예약 정보</h1>
                {reservationData ? reservationData.filter((data) => !TimeUtil.checkToday(data.rentDay)).map((data) => (
                    <div>
                        <h1>{AddressUtil.extraction(data.address)}</h1>
                        <p>{data.name}</p>
                        <p>취소하기</p>
                    </div>
                )) : null}
            </div>
        </div>
    )
};
export default ReservationListPage;