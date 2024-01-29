import {useEffect, useState} from "react";
import {ChefState, ReservationState, SpaceState} from "../../utils/enums";
import axios from "axios";
import "./AdminMainPage.css";
import {useNavigate} from "react-router-dom";

const AdminMainPage = () => {
    const navigate = useNavigate();
    const [tableName, setTableName] = useState("대기중");
    const [category, setCategory] = useState("space");
    const [state, setState] = useState(SpaceState.PENDING);
    const [dataList, setDataList] = useState([]);
    const [confirm, setConfirm] = useState(false);
    useEffect(() => {
        axios.get("/api/v1/admin/" + category+"List/"+state).then((res) => setDataList(res.data))
            .catch((err) => console.error(err));
    }, [category, state]);
    const confirmObject = (id, state) => {
        axios.post("/api/v1/admin/"+category, {
            id: id,
            state: state,
        }).then(()=>window.location.reload())
            .catch((err) => console.error(err));
    };
    const setStates = (category, state) => {
        setCategory(category);
        setState(state);
    };
    return(
        <div style={{display:"flex"}}>
            <div className={"sidebar"}>
                <h1>포 올 관리자 페이지</h1>

                <div>
                    <h1>공간 등록</h1>
                    <p onClick={()=>setStates("space", SpaceState.PENDING)}>대기중</p>
                    <p onClick={()=>setStates("space", SpaceState.APPROVE)}>승인한 매장</p>
                    <p onClick={()=>setStates("space", SpaceState.REJECT)}>거절한 매장</p>
                </div>
                <div>
                    <h1>셰프 등록</h1>
                    <p onClick={()=>setStates("chef", ChefState.PENDING)}>대기중</p>
                    <p onClick={()=>setStates("chef", ChefState.APPROVE)}>승인한 셰프</p>
                    <p onClick={()=>setStates("chef", ChefState.REJECT)}>거절한 셰프</p>
                </div>
                <div>
                    <h1>예약 확정</h1>
                    <p onClick={()=>setStates("reservation", ReservationState.PENDING)}>대기중</p>
                    <p onClick={()=>setStates("reservation", ReservationState.APPROVE)}>승인한 예약</p>
                    <p onClick={()=>setStates("reservation", ReservationState.REJECT)}>거절한 예약</p>
                </div>
                <div>
                    <h1>예약 취소</h1>
                    <p onClick={()=>setStates("reservation", ReservationState.CANCELPENDING)}>대기중</p>
                    <p onClick={()=>setStates("reservation", ReservationState.CANCELAPPROVE)}>승인한 예약취소</p>
                    <p onClick={()=>setStates("reservation", ReservationState.CANCELREJECT)}>거절한 예약취소</p>
                </div>
                <div>
                    <h1>고객 센터</h1>
                </div>
            </div>
            <div className={"container"}>
                <h1>{tableName}</h1>
                <div className={"data_table"}>
                    <div className={"table_header"}>
                        <p>이름</p>
                        <p>상세 정보</p>
                        <p>승인/거절</p>
                    </div>
                </div>
                {dataList ? (
                    dataList.map((data, idx) => (
                        <div key={idx} className={"row"}>
                            <p>{data.name}</p>
                            <p onClick={()=>navigate("/admin"+category+"ViewPage1", {state:data})}>더보기</p>
                            {state === "Pending" ? (
                                <div className={"button-set"}>
                                    <div className={"button-approve"} onClick={()=>confirmObject(data.id, "Approve")}>
                                        <p>승인</p>
                                    </div>
                                    <div className={"button-reject"} onClick={()=>confirmObject(data.id,"Reject")}>
                                        <p>거절</p>
                                    </div>
                                </div>
                            ) :null}
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    )
};
export default AdminMainPage