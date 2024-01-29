import {ReservationState} from "../utils/enums";
import {useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import {TimeUtil} from "../utils/TimeUtil";
import axios from "axios";
import HomeTemplate from "../components/home/HomeTemplate";
import Sidebar from "../components/home/Sidebar";
import {AddressUtil} from "../utils/AddressUtil";
import ToolBar from "../components/home/ToolBar";
import ArticleListTemplate from "../components/board/ArticleListTemplate";
import Modal from "react-modal";
import {SmallModalStyles} from "../components/SmallModalStyles";


const AllNotifications = () => {
    const navigate = useNavigate();
    const [alarmList, setAlarmList] = useState([]);
    const [isEraseAll, setIsEraseAll] = useState(false);

    const deleteAll = useCallback(()=>{
        alarmList.forEach((alarm) => {
            if(alarm.id) axios.get("/api/v1/alarm/check/"+alarm.id);
        });
        window.location.reload();
    },[]);
    const deleteAlarm = (alarm) => {
        if(alarm.id) axios.get("/api/v1/alarm/check/"+alarm.id).then(()=>window.location.reload());
    }
    // const handleAssurance = (data) => {
    //     if (data.state === ReservationState.FINISH) return;
    //     if (data.state === ReservationState.APPROVE) navigate("/assuranceReady", {state:data});
    //     else{
    //         const rentEndTime = TimeUtil.setHour(data.rentDay, data.rentEndHour);
    //         if (TimeUtil.getDiffSecond(rentEndTime) < 2 * 60 * 60) navigate("/assuranceFinish", {state:data});
    //         else navigate("/assuranceReadyView", {state:data});
    //     }
    // }
    useEffect(() => {
        axios.get("/api/v1/alarm/list/"+sessionStorage.getItem("user_id"))
            .then((res) => setAlarmList(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <div className="header" style={{backgroundColor: "white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                {/* <button className="button" onClick={() => navigate("/")}>
                    <img src={forAllLogo} alt="forAllLogo" style={{width:"1.875rem", height:"1.875rem"}} />
                </button> */}
                <button className="button">대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <HomeTemplate/>
            <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                width: '100%', height: '3.125rem', flexShrink: 0, border: '1px solid #C4C4C4', background: '#FFF'
            }}>
            <div>
                <div style={{display: "flex", width: "100%", height: "3.125rem"}}><p
                    style={{fontSize: "1rem", fontWeight: "700", paddingLeft: "1rem"}}>
                    • 알림
                </p></div>
            </div>
            <Modal
                isOpen={isEraseAll}
                style={SmallModalStyles}
                ariaHideApp={false}
            >
                <div style={{
                    justifyContent: "center", alignItems: "center" + "10px",
                    fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "1.25rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",

                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                }}>
                    <a style={{marginTop: "-30px"}}>전체 삭제 하시겠습니까?</a>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    margin: '0px',
                    marginTop: '4rem',
                    bottom: '0',
                    position: 'fixed',
                    fontSize: "0.9375rem",
                    fontWeight: "400"
                }}>
                    <button style={{

                        backgroundColor: "#000",
                        width: '50%',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => setIsEraseAll(false)}
                    >
                        취소
                    </button>
                    <button style={{

                        backgroundColor: "#FF4F4F",
                        width: '50%',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => {
                                deleteAll();
                                setIsEraseAll(false);
                            }}
                    >
                        확인
                    </button>
                </div>
            </Modal>
            <p onClick={() => setIsEraseAll(true)}
               style={{
                   fontSize: '0.625rem', fontStyle: 'normal', fontWeight: '500',
                   lineHeight: 'normal', letterSpacing: '-0.01031rem', textDecorationLine: 'underline',
                   marginRight: '0.5rem'
               }}>전체 삭제</p>
            </div>
            {alarmList ? (alarmList.map((alarm, idx) => {
                let category;
                if (alarm.category === "Chef") category = "셰프 등록";
                else if(alarm.category === "Space") category = "공간 등록";
                else if(alarm.category === "Reservation") category = "예약 확정";
                else if(alarm.category === "Chat") category = "채팅";

                return(
                    <div key={idx}>
                        <div style={{border: "1px solid #C4C4C4", height: "6rem"}}>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <p style={{
                                    fontSize: "1rem",
                                    fontWeight: "700",
                                    paddingLeft: "1rem"
                                }}>{category}</p>
                            </div>

                            <p style={{margin: 0, paddingLeft: "1rem", color: "#0788FF"}}>{alarm.alarmInfo}</p>

                        </div>
                    </div>
                )
                }
            )) :null}


            <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                width: '8.5625rem', height: '4.3125rem', fontSize: '1rem', fontStyle: 'normal',
                fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem',
                marginLeft: '1.5rem', marginTop: '4.5rem'
            }}>
                <a onClick={() => navigate("/")}>• 자주 묻는 질문</a>
                <a onClick={() => navigate("/")}>• 입점 및 제휴 문의</a>
            </div>
            <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
                width: '12.4375rem', height: '5rem', fontSize: '0.4375rem', fontStyle: 'normal',
                fontWeight: '700', lineHeight: 'normal', letterSpacing: '-0.01031rem', marginLeft: '1.5rem',
                marginTop: '2.5rem'
            }}>
                <p style={{margin: '0.1rem 0'}}>주식회사 포 올</p>
                <p style={{margin: '0.1rem 0'}}>대표 : 김대원 | 개인정보관리 책임자 : 김대원</p>
                <p style={{margin: '0.1rem 0'}}>이메일 : for.official.all@gmail.com | 대표번호 : 010-9019-7733</p>
                <p style={{margin: '0.1rem 0'}}>주소 : 서울시 관악구 관악로 17길</p>
                <p style={{margin: '0.1rem 0'}}>사업자등록번호 :</p>
            </div>
        </div>
    )
};
export default AllNotifications;