import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import {TimeUtil} from "../../utils/TimeUtil";
import {AddressUtil} from "../../utils/AddressUtil";
import {redirect, useNavigate} from "react-router-dom";
import {ReservationState} from "../../utils/enums";
import Modal from "react-modal";
import {CancelReasonModalStyles} from "../../components/CancelReasonModalStyles";
import Header from "../../components/home/Header";

const ReservationListPage = () => {
    const navigate = useNavigate();
    const [reservationData, setReservationData] = useState([]);
    const [isErase, setIsErase] = useState(false);

    const [selectReservation, setSelectReservation] = useState();

    ///글 작성
    const [postContent, setPostContent] = useState("");
    const onChangePostContent = useCallback((e)=>setPostContent(e.target.value),[]);

///예약 정보 삭제
    const deleteSelect = (id)=>{
        axios.post("/api/v1/reservation/cancel",{
            id: id,
            reason: postContent,
            cancelTime: TimeUtil.now()
        }).then(()=>window.location.reload());
    };
    const handleAssurance = (data) => {
        console.log(data);
        if (data.state === ReservationState.FINISH) return;
        if (data.state === ReservationState.PENDING) return;
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
            <Header/>
            <Sidebar/>
            <HomeTemplate />
            <div>
                <div style={{display:"flex", width:"100%", height:"3.125rem", border:"1px solid #C4C4C4"}}><p style={{fontSize:"1rem", fontWeight:"700", paddingLeft:"1rem"}}>
                    • 진행중인 대관
                </p></div>
                {reservationData ? reservationData.filter((data) => TimeUtil.checkToday(data.rentDay)).map((data) => (
                    <div style={{border: "1px solid #C4C4C4", height: "6rem"}} onClick={() => handleAssurance(data)}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            height: '3.125rem',
                            flexShrink: 0,
                            background: '#FFF'
                        }}>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <p style={{
                                fontSize: "1rem",
                                fontWeight: "700",
                                paddingLeft: "1rem"
                            }}>{AddressUtil.extraction(data.address)}</p>
                        </div>
                        </div>
                        <p style={{
                            marginTop: "-0.5rem",
                            marginBottom: '0rem',
                            paddingLeft: "1rem",
                            color: "#0788FF"
                        }}>{data.name}</p>
                        <a style={{
                            marginTop: "-1rem",
                            paddingLeft: "1.1rem",
                            fontSize: "0.625rem"
                        }}>{TimeUtil.toReservationDate(data.rentDay) + " " + data.rentStartHour + "시  ~ " + data.rentEndHour + "시 "}</a>

                    </div>
                )) : null}
            </div>
            <div>
                <div style={{display: "flex", width: "100%", height: "3.125rem", border: "1px solid #C4C4C4"}}><p
                    style={{fontSize: "1rem", fontWeight:"700", paddingLeft:"1rem"}}>
                    • 예약 정보
                </p></div>
                {reservationData ? reservationData.filter((data) => !TimeUtil.checkToday(data.rentDay)).map((data) => (
                    <div style={{border: "1px solid #C4C4C4", height: "6rem"}}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%',
                            height: '3.125rem',
                            flexShrink: 0,
                            background: '#FFF'
                        }}>
                            <div style={{display: "flex", justifyContent: "space-between"}}
                                 onClick={() => navigate("/reservationViewPage", {state: data})}>
                                <p style={{
                                    fontSize: "1rem",
                                    fontWeight: "700",
                                    paddingLeft: "1rem"
                                }}>{AddressUtil.extraction(data.address)}</p>

                            </div>
                            <div>
                                <p onClick={() => {
                                    setSelectReservation(data);
                                    setIsErase(true);
                                }}
                                   style={{
                                       fontSize: '0.8rem',
                                       fontStyle: 'normal',
                                       fontWeight: '500',
                                       lineHeight: 'normal',
                                       letterSpacing: '-0.01031rem',
                                       textDecorationLine: 'underline',
                                       paddingRight: '1rem'
                                   }}>취소하기</p>
                            </div>
                        </div>
                        <p style={{marginTop: "-0.5rem", marginBottom: '0rem', paddingLeft: "1rem", color: "#0788FF"}}>{data.name}</p>
                        <a style={{marginTop: "-1rem", paddingLeft: "1.1rem", fontSize: "0.625rem"}}>{TimeUtil.toReservationDate(data.rentDay) +" " + data.rentStartHour + "시  ~ " + data.rentEndHour + "시 "}</a>
                    </div>
                )) : null}
            </div>
            <Modal isOpen={isErase} style={CancelReasonModalStyles} ariaHideApp={false}>
                <div style={{
                    display: "flex", justifyContent: "space-between", fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "0.625rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal"
                }}>
                    <a style={{textAlign: "left",}}>취소 사유를 적어주세요!</a><a style={{textAlign: "right"}}
                                                                        onClick={() => setIsErase(false)}>x</a>
                </div>
                <hr style={{height: "1px", backgroundColor: "black", marginBottom: '-0.2rem'}}/>
                <a style={{
                    textAlign: "left", fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "0.625rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal", marginTop: '-1rem', marginBottom: '1rem'
                }}>더 발전하는 포 올이 되겠습니다.</a>

                <textarea value={postContent} onChange={onChangePostContent}
                          placeholder={"취소 사유를 적어주세요"} style={{
                    fontSize: '0.875rem',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: 'normal',
                    letterSpacing: '-0.01031rem',
                    border: '1px solid' + 'rgba(0, 0, 0, 0.75)',
                    width: "95%",
                    height: "50%",
                    backgroundColor: 'rgba(217, 217, 217, 1)',
                    display: 'flex',
                    justifyContent: 'center'
                }}/>
                <div style={{
                    fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "0.625rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal"
                }}>

                    <div className="bottom_button_relative">
                        <a style={{fontSize: "0.8rem"}} onClick={() => {
                            deleteSelect(selectReservation.id);
                            setIsErase(false)
                        }}>저장 후 닫기</a>
                    </div>
                </div>
            </Modal>
        </div>
    )
};
export default ReservationListPage;