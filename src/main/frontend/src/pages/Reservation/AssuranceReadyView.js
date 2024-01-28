import ImageInput from "../../components/ImageInput";
import ImageInputs from "../../components/ImageInputs";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import Alert from "../../components/Alert";
import {useLocation, useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ImageViewer from "../../components/ImageViewer";
import ImagesViewer from "../../components/ImagesViewer";

const AssuranceReadyView = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [assuranceData, setAssuranceData] = useState({});

    useEffect(() => {
        axios.get("/api/v1/assurance/reservation/" + data.id)
            .then((res) => setAssuranceData(res.data))
            .catch((err) => console.error(err));
    }, []);

    return (
        <div style={{paddingLeft: "2%", paddingRight: "2%"}}>
            <br/>
            <h1>•&ensp;대관 마무리</h1>
            <h3 style={{textDecorationLine: "underline"}}>꼭 해야 하나요?</h3>
            <p ><strong style={{textDecorationLine: "underline"}}>‘오너 마감
                가이드’</strong> 따라 대관을 진행해주세요.</p>
            <p style={{fontSize: "0.625rem"}}>•&ensp;매장 내부에서 예상치 못한 흠집이나 사고 흔적을 발견했다면 반드시 촬영해주세요.</p>
            <p style={{fontSize: "0.625rem", marginTop: "-0.5rem"}}>•&ensp;대관 시작전 주방사용이 불가능한 손상이 있다면 고객센터로 문의해주세요.</p>
            <p style={{fontSize: "0.625rem", marginTop: "-0.5rem"}}>•&ensp;<strong
                style={{textDecorationLine: "underline"}}>‘오너 마감 가이드’</strong> 에서 명시된 내용에 따라 사진과 글을 남겨주세요.</p>
            <p style={{fontSize: "0.625rem", marginTop: "-0.5rem", paddingLeft: "0"}}>ex. 음식물 쓰레기 처리 방법이나 분리수거 방법이 적혀있다면
                가이드에 맞춰서 진행해주신 후 사진을 남겨주세요..</p>

            <p style={{fontSize: "0.625rem"}}>대관 준비 사진<span className="fontForRegister"
                                                            style={{color: "#FF2929"}}>*</span></p>

            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                justifyContent: 'center',
                marginTop: '1rem',
                fontSize: '0.9375rem',
                width: "100%"
            }}>
                <div style={{display: 'flex', justifyContent: 'right'}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <a>주방 사진<span className="fontForRegister" style={{color: "#FF2929"}}>*</span></a>
                        <div style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                            <ImageViewer val={assuranceData.readyKitImage ? assuranceData.readyKitImage[0] : null}/>
                        </div>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                    <a>주방 사진 추가</a>
                    <ImagesViewer vals={assuranceData.readyKitImage ? assuranceData.readyKitImage.slice(1) : []}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'right'}}>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <a>홀 사진<span className="fontForRegister" style={{color: "#FF2929"}}>*</span></a>
                        <div style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                            <ImageViewer val={assuranceData.readyHallImage ? assuranceData.readyHallImage[0]:""}/>
                        </div>
                    </div>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start'
                }}>
                    <a>홀 사진 추가</a>
                    <ImagesViewer vals={assuranceData.readyHallImage ? assuranceData.readyHallImage.slice(1) : []}/>
                </div>
                <div style={{display: 'flex', justifyContent: 'right'}}>

                    <div style={{display: "flex", flexDirection: "column"}}>
                        <a>사고/손상/기타</a>
                        <div style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                            <ImagesViewer  vals={assuranceData.readyAdditionalImage ? assuranceData.readyAdditionalImage : []}/>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <p>대관 진행중 기록</p>
                <p>(최소 20자)</p>
                <input value={assuranceData.readyRecord} disabled={true}/>
            </div>
            <div>
                <p>퇴장 2시간전 알림창 으로 ‘마감 마무리’ 창을 보내드릴 예정입니다. 확인 후 마감 마무리를 진행해 주세요.*</p>
            </div>
            <button onClick={()=> navigate(-1)}>닫기</button>
        </div>
    )
};
export default AssuranceReadyView;