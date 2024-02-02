import {useEffect, useState} from "react";
import {ChefState, ReservationState, SpaceState} from "../../utils/enums";
import axios from "axios";
import "./AdminMainPage.css";
import {redirect, useLocation, useNavigate} from "react-router-dom";

const AdminMainPage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pagedata = { ...location.state };
    const [tableName, setTableName] = useState("대기중");
    const [category, setCategory] = useState(pagedata.category ? pagedata.category : "space");
    const [state, setState] = useState(pagedata.state ? pagedata.state : SpaceState.PENDING);
    const [dataList, setDataList] = useState([]);
    useEffect(() => {
        if (category === "service"){
            axios.get("/api/v1/admin/chatList")
                .then((res) => setDataList(res.data))
                .catch((err) => console.error(err));
        }
        else{
            axios.get("/api/v1/admin/" + category+"List/"+state).then((res) => setDataList(res.data))
                .catch((err) => console.error(err));
        }
        if (state === "Pending") setTableName("대기중");
        else if(state === "Approve") setTableName("승인");
        else if(state === "Reject") setTableName("거절");
    }, [category, state]);
    const confirmObject = (id, state) => {
        axios.post("/api/v1/admin/"+category, {
            id: id,
            state: state,
        }).then(()=>redirect("/admin"))
            .catch((err) => console.error(err));
    };
    const setStates = (category, state) => {
        setCategory(category);
        setState(state);
    };
    const handleViewPage = (data) => {
        if (category === "service"){
            navigate("/adminChatRoom", {state: data})
        }
        else{
            navigate("/admin"+category+"ViewPage1", {state: {
                    ...data,
                    category: category,
                    state: state
                }});
        }
    }
    return(
        <div style={{display:"flex"}}>
            <div className={"sidebar"}>
                <a className="font-weight-bold" style={{}} >포 올 관리자 페이지</a>

                <div>
                    <a className="font-normal" >공간 등록</a>
                    <p onClick={()=>setStates("space", SpaceState.PENDING)}>대기중</p>
                    <p onClick={()=>setStates("space", SpaceState.APPROVE)}>승인한 매장</p>
                    <p onClick={()=>setStates("space", SpaceState.REJECT)}>거절한 매장</p>
                </div>
                <div>
                    <a className="font-normal" >셰프 등록</a>
                    <p onClick={()=>setStates("chef", ChefState.PENDING)}>대기중</p>
                    <p onClick={()=>setStates("chef", ChefState.APPROVE)}>승인한 셰프</p>
                    <p onClick={()=>setStates("chef", ChefState.REJECT)}>거절한 셰프</p>
                </div>
                <div>
                    <a className="font-normal" >예약 확정</a>
                    <p onClick={()=>setStates("reservation", ReservationState.PENDING)}>대기중</p>
                    <p onClick={()=>setStates("reservation", ReservationState.APPROVE)}>승인한 예약</p>
                    <p onClick={()=>setStates("reservation", ReservationState.REJECT)}>거절한 예약</p>
                </div>
                <div>
                    <a className="font-normal" onClick={()=>setStates("reservation", ReservationState.CANCEL)} >예약 취소</a>
                </div>
                <div>
                    <a onClick={()=>setStates("service")} className="font-normal" >고객 센터</a>
                </div>
            </div>
            <div className={"container"}>
                <p style={{fontSize:'1.875rem',fontWeight:'600'}} >• {tableName}</p>
                <div className={"table_header"}>
                    <div className={"table_header"}>
                        <p style={{marginLeft:'2rem'}} >이름</p>
                        <p>상세 정보</p>
                        <p style={{marginRight:'4.5rem'}} >승인/거절</p>
                    </div>
                </div>
                {dataList ? (
                    dataList.map((data, idx) => (
                        <div key={idx} className={"row"}>
                            <p style={{marginLeft:'2rem'}} >{data.name ? data.name : data.userId1}</p>
                            <p onClick={() => handleViewPage(data)}
                                style={{color:'table_gray',textDecorationLine:'underline'}}
                                >더보기</p>
                            {state === "Pending" ? (
                                <div className={"button-set"} style={{marginRight:'2rem'}} >
                                    <div className={"button-approve"} onClick={()=>confirmObject(data.id, "Approve")}>
                                        <p>승인</p>
                                    </div>
                                    <div className={"button-reject"} onClick={()=>confirmObject(data.id,"Reject")}>
                                        <p>거절</p>
                                    </div>
                                </div>
                            ) : tableName === "승인" ? (
                                <div className="button-approve" style={{marginRight:'4rem'}} >
                                    <p>승인</p>
                                </div>) : (<div className="button-reject" style={{marginRight:'4rem'}} >
                                <p>거절</p>
                            </div>)
                            
                            }
                        </div>
                    ))
                ) : null}
            </div>
        </div>
    )
};
export default AdminMainPage