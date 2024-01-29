import Sidebar from "../../components/home/Sidebar";
import HomeTemplate from "../../components/home/HomeTemplate";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {TimeUtil} from "../../utils/TimeUtil";
import {AddressUtil} from "../../utils/AddressUtil";
import {useLocation, useNavigate} from "react-router-dom";
import {ReservationState} from "../../utils/enums";
import ImageInput from "../../components/ImageInput";
import ImageViewer from "../../components/ImageViewer";

const AdminPlaceReservationCheck = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

    return (
        <div>
            <header style={{textAlign: "center", marginTop: "1rem", marginBottom: "-2rem"}}><h3>• 확인 및 결제</h3></header>
            <div style={{
                width: "100%",
                fontSize: "1.875rem",
                fontWeight: "700",
                marginTop: "3.125rem",
                boxShadow: '-4px 4px 4px 0px rgba(0, 0, 0, 0.25) inset, 4px -4px 4px 0px rgba(0, 0, 0, 0.25) inset',
                display: "flex",
                flexDirection: "column"
            }}>
                <p>
                    <ImageViewer style={{marginTop: '-2rem', height: "15rem", width: "100%"}}  val={data.image} />
                    <p style={{marginTop: "1rem", fontSize: "1.25rem", marginLeft: "1rem", marginBottom: "-1rem"}}>
                        {AddressUtil.extraction(data.address) + " | " + data.name}
                    </p>
                </p>
            </div>
            <div>
                <div style={{display: "flex", width: "100%", height: "3.125rem", border: "1px solid #C4C4C4"}}><p
                    style={{fontSize: "1rem", fontWeight: "700", paddingLeft: "1rem"}}>
                    • 예약 정보<span className="fontForRegister" style={{color: "#FF2929"}}>*</span>
                </p></div>
            </div>
            <p style={{fontSize: '0.875rem', justifyContent: "space-between", display: "flex"}}><strong
                style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                대관 희망 날짜
            </strong>
                <a style={{
                    textAlign: 'left',
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    color: '#A0A0A0',
                    fontSize: '0.875rem'
                }}>{TimeUtil.toReservationDate(data.rentDay) +" " + data.rentStartHour + "시 부터 ~ " + data.rentEndHour + "시 까지"}</a>
            </p>
            <p style={{fontSize: '0.875rem', justifyContent: "space-between", display: "flex"}}><strong
                style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                트라이얼 희망 날짜
            </strong>
                <a style={{
                    textAlign: 'left',
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    color: '#A0A0A0',
                    fontSize: '0.875rem'
                }}>{TimeUtil.toReservationDate(data.trialDay)}</a>
            </p>
            <p style={{fontSize: '0.875rem', justifyContent: "space-between", display: "flex"}}><strong
                style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                인원 수
            </strong>
                <a style={{
                    textAlign: 'left',
                    paddingLeft: "5%",
                    paddingRight: "5%",
                    color: '#A0A0A0',
                    fontSize: '0.875rem'
                }}>{"셰프 " + data.chefNum + "명"}</a>
            </p>
            <div>
                <div style={{display: "flex", width: "100%", height: "3.125rem", border: "1px solid #C4C4C4"}}><p
                    style={{fontSize: "1rem", fontWeight: "700", paddingLeft: "1rem"}}>
                    • 요금 세부 정보<span className="fontForRegister" style={{color: "#FF2929"}}>*</span>
                </p></div>
                <p style={{fontSize: '0.875rem', justifyContent: "space-between", display: "flex"}}>
                    <strong style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                        매장 대관 금액
                    </strong>
                    <strong style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                        {data.priceSet + "원"}
                    </strong>
                </p>
                <p style={{fontSize: '0.875rem', justifyContent: "space-between", display: "flex"}}>
                    <strong style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                        포 올 수수료
                    </strong>
                    <strong style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                        {Math.floor(data.priceSet * 0.18) + "원"}
                    </strong>
                </p>
                <p style={{fontSize: '0.875rem', justifyContent: "space-between", display: "flex"}}>
                    <strong style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                        보증금
                    </strong>
                    <strong style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                        {Math.floor(data.priceSet * 0.1) > 50000 ? Math.floor(data.priceSet * 0.1) : 50000}원
                    </strong>
                </p>
                <p style={{fontSize: '0.875rem', justifyContent: "space-between", display: "flex"}}>
                    <strong style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                        총 합계
                    </strong>
                    <strong style={{textAlign: 'left', paddingLeft: "5%", paddingRight: "5%"}}>
                        {Math.floor(data.priceSet * 1.28) + "원"}
                    </strong>
                </p>
            </div>
            <button onClick={()=>navigate("/admin",{state:data})} className="bottom_button"
                    style={{backgroundColor: "#FF4F4F", position: "fixed"}}>돌아가기
            </button>
        </div>
    )
};
export default AdminPlaceReservationCheck;