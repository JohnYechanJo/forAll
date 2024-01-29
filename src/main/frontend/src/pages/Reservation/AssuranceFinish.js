import {useLocation, useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useState} from "react";
import ImageUploader from "../../utils/imageUploader";
import axios from "axios";
import ImageInput from "../../components/ImageInput";
import ImageInputs from "../../components/ImageInputs";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import Alert from "../../components/Alert";
import ImageViewer from "../../components/ImageViewer";
import ImagesViewer from "../../components/ImagesViewer";
import {ReservationModalStyles} from "../../components/ReservationModalStyles";
import {ExplanationModalStyles} from "../../components/ExplanationModalStyles";
import {BigModalStyles} from "../../components/BigModalStyles";

const AssuranceFinish = () => {
    const [assuranceData, setAssuranceData] = useState({});
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [kitImage, setKitImage] = useState();
    const [kitImages, setKitImages] = useState([]);
    const [hallImage, setHallImage] = useState();
    const [hallImages, setHallImages] = useState([]);
    const [additionImage, setAdditionImage] = useState();
    const [additionImages, setAdditionImages] = useState();
    const [closeImage, setCloseImage] = useState("");
    const [additionalImage, setAdditionalImage] = useState([]);

    const [closeGuide, setCloseGuide] = useState("");

    const [record, setRecord] = useState("");
    const [agree, setAgree] = useState(false);

    const [spaceData, setSpaceData] = useState({});
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isGuidOpen, setIsGuidOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [completeModal, setCompleteModal] = useState(false);

    const onChangeRecord = useCallback((e) => setRecord(e.target.value), []);
    const toggleAgree = () => setAgree(!agree);
    const handleButton = () => {
        if(kitImage && hallImage && record && agree){
            submit();
        }
        else setIsAlertOpen(true);
    };

    const onChangeGuide = useCallback((e) => {
        setCloseGuide(e.target.value);
    }, []);
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const finKitImage = kitImages ? await Promise.all([kitImage, ...kitImages].map(async (img) => await ImageUploader(img, userId))) : null;
        const finHallImage = hallImages ? await Promise.all([hallImage, ...hallImages].map(async (img) => await ImageUploader(img, userId))) : null;
        const finAdditionalImage = await ImageUploader(additionImage, userId);

        axios.put("/api/v1/assurance", {
            id: assuranceData.id,
            reservation: assuranceData.reservation,
            readyKitImage: assuranceData.readyKitImage,
            readyHallImage: assuranceData.readyHallImage,
            readyAdditionalImage: assuranceData.readyAdditionalImage,
            readyRecord: assuranceData.readyRecord,
            finKitImage: finKitImage,
            finHallImage: finHallImage,
            finAdditionalImage: finAdditionalImage,
            finRecord: record
        }).then(() => setCompleteModal(true))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        axios.get("/api/v1/space/" + data.space)
            .then((res) => setSpaceData(res.data))
            .catch((err) => console.error(err));
        axios.get("/api/v1/assurance/reservation/" + data.id)
            .then((res) => {
                console.log(res.data);
                setAssuranceData(res.data);
            })
            .catch((err) => console.error(err));
    }, []);
    return (
        <div style={{paddingLeft: "2%", paddingRight: "2%"}}>
            <br/>
            <h1>•&ensp;대관 마무리</h1>
            <h3 style={{textDecorationLine: "underline"}} onClick={() => setIsModalOpen(true)}>꼭 해야 하나요?</h3>
            <p onClick={() => setIsGuidOpen(true)}><strong style={{textDecorationLine: "underline"}}>‘오너 마감
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
                            <ImageViewer val={assuranceData.readyKitImage ? assuranceData.readyKitImage[0]:""}/>
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

                <div>
                    <div style={{paddingLeft: "2%", paddingRight: "2%"}}>
                        <br/>
                        <div style={{
                            fontSize: '0.625rem',
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        <a>대관 마무리 촬영<span style={{color: "#FF2929"}}>*</span></a>
                        </div>
                            <h3 style={{marginTop: "-0.1rem"}}><strong>•&ensp;대관 준비과정에서 찍었던 사진과 '똑같은 각도'로 사진 촬영을 진행해 주세요.</strong></h3>
                        <div>
                            <p style={{fontSize: "0.625rem", marginTop: "-0.5rem"}}>•&ensp;주방 내부를 가이드에 맞춰 촬영해주세요</p>
                            <p style={{fontSize: "0.625rem", marginTop: "-0.5rem"}}>•&ensp;홀을 가이드에 맞춰 촬영해주세요.</p>
                            <p style={{fontSize: "0.625rem", marginTop: "-0.5rem"}}>•&ensp;사진 전송 후에는 수정할 수 없습니다. </p>
                        </div>
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(2, 1fr)',
                            gap: '1rem',
                            justifyContent: 'center',
                            marginTop: '2rem',
                            fontSize: '0.9375rem',
                            width: "100%"
                        }}>
                            <div style={{display: 'flex', justifyContent: 'right'}}>
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <a>주방 사진<span className="fontForRegister" style={{color: "#FF2929"}}>*</span></a>
                                    <div style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                                        <ImageInput setImg={setKitImage} val={kitImage}/>
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
                                <ImageInputs setImg={setKitImages} vals={kitImages}/>
                            </div>
                            <div style={{display: 'flex', justifyContent: 'right'}}>

                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <a>홀 사진<span className="fontForRegister" style={{color: "#FF2929"}}>*</span></a>
                                    <div style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                                        <ImageInput setImg={setHallImage} val={hallImage}/>
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
                                <ImageInputs setImg={setHallImages} vals={hallImages}/>
                            </div>


                        </div>
                        <div style={{
                            display: "flex",
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <div style={{justifyContent:'right'}}>
                                <a>기타 사진</a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-start'}}>
                                    <ImageInputs setImg={setAdditionImage} vals={additionImage}/>
                                </div>
                            </div>

                        </div>

                        <div>
                            <div style={{paddingLeft: '2%', paddingRight: '2%'}}>
                                <div style={{
                                    fontSize: '0.625rem',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <a>대관 마무리 기록<span style={{color: "#FF2929"}}>*</span></a>
                                    <p style={{color: '#FF2929', paddingRight: '2%'}}>(최소 20자)</p>
                                </div>
                                <textarea className="input" style={{height: '6.25rem', letterSpacing: '-0.0255rem'}}
                                          value={record} onChange={onChangeRecord} placeholder={
                                    "대관을 진행하는 중 셰프님께서 발견한 특이사항을 기록해 주세요.\n" +
                                    "ex. ‘오너 마감 가이드’ 숙지를 충분히 완료했다.\n" +
                                    "ex. 셰프님이 찍은 사진에 대한 설명을 적어주세요."
                                }/>
                            </div>
                        </div>
                        <div>
                            <a><strong style={{paddingLeft: '2%', fontSize: "0.75rem"}}>퇴실 전 '오너 마감 가이드' 속 놓친 부분은 없으신가요?</strong></a>
                            <p style={{marginTop: '-0.5rem'}}>
                                <strong style={{paddingLeft: '2%', fontSize: "0.75rem"}}>다시 한 번 확인 후 퇴실해 주세요.<span className="fontForRegister" style={{color: "#FF2929"}}>*</span></strong>
                            </p>
                            <p>
                                <input type="checkbox" checked={agree} id='agreed' onChange={toggleAgree}/>
                                <label htmlFor="agreed" style={{marginTop:"0.5rem", paddingLeft: "2%", fontWeight: '500'}}><em
                                    style={{height: '1rem'}}></em><span style={{height: '1rem', marginTop: '-50px'}}>
                            <a>확인했습니다.<span style={{color: '#7B7B7B'}}>(필수)</span></a>
                    </span></label>
                            </p>
                        </div>
                        <br/>
                        <br/>
                        <button onClick={handleButton} className="bottom_button"
                                style={{backgroundColor: "black", position: "fixed"}}>보내기</button>

                    <Modal isOpen={isModalOpen} style={ReservationModalStyles} ariaHideApp={false}>
                        <div style={{
                            fontFamily: "Noto Sans KR",
                            color: " #000",
                            fontSize: "0.625rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "normal"
                        }}>
                            <br/>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <a style={{textAlign: "left"}}>꼭 해야하나요?</a><a style={{textAlign: "right"}}
                                                                              onClick={() => setIsModalOpen(false)}>x</a>
                            </div>
                            <hr style={{height: "1px", backgroundColor: "black"}}/>
                            <p style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;네. <strong>마감
                                기록</strong>을 상세히 기록할 수록 셰프님의 대관이 확실히 보장 받을 수 있습니다.
                            </p>
                            <p style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;기록한 내용은 오너가
                                사고 발생에 대한 손해 배상 청구시 증빙자료가 됩니다.</p>
                            <p style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;<strong>‘오너
                                마감 가이드’</strong> 에서 명시된 사항을 꼭 숙지하시고, 그대로 이행해 주세요.</p>
                            <p style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;안전하고 아름다운
                                대관문화를 만드시는 셰프님이 포 올의 얼굴입니다.</p>
                            <div class="bottom_button_fixed">
                                <a style={{fontSize: "0.8rem"}} onClick={() => setIsModalOpen(false)}>닫기</a>
                            </div>
                        </div>
                    </Modal>

                    <Alert content={"필수 요소들이 입력되어야 합니다."} isOpen={isAlertOpen} setIsOpen={setIsAlertOpen}/>
                        <Modal isOpen={isGuidOpen} style={BigModalStyles} ariaHideApp={false}>

                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                padding: '1rem',
                                gap: "1rem",
                                alignItems: "flex-start",
                            }}
                                 className="fontForRegister">
                                <div style={{width: '100%', textAlign: 'left'}}>
                                    <a style={{}}>오너 마감 가이드<span style={{color: "#FF2929"}}>*</span></a>
                                    <hr style={{width: '100%', backgroundColor: 'black'}}/>
                                </div>
                                <div>
                                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                        <a>숙지 사항<span style={{color: "#FF2929"}}>*</span></a>
                                        <p style={{color: '#FF2929'}}>(최소 20자)</p>
                                    </div>
                                    <textarea disabled={true} className="input"
                                              style={{height: '6.25rem', letterSpacing: '-0.0255rem', width: '70vw'}}
                                              value={closeGuide} onChange={onChangeGuide} placeholder={
                                        `대관을 진행하는 셰프님들이 마감할 때 꼭 숙지해야 할 점을 기록해 주세요! 
• 홀 마감은 이렇게 해주세요. 
• 주방 마감은 이렇게 해주세요. 
ex. 음식물 쓰레기 처리방법 
ex.분리수거 처리방법
ex.이 물건은 꼭 손대지 말아주세요.
`
                                    }/>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'center', width: '100%', gap: '1rem'}}>
                                    <div>
                                        <p>사진<span style={{color: "#FF2929"}}>*</span></p>
                                        <ImageViewer val={closeImage} setImg={setCloseImage}/>
                                    </div>
                                    <div>
                                        <p>추가 사진</p>
                                        <ImagesViewer vals={additionalImage} setImg={setAdditionalImage}/>
                                    </div>
                                </div>
                            </div>

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
                                        setIsGuidOpen(false)
                                    }}>닫기</a>
                                </div>
                            </div>
                        </Modal>
                    <Modal isOpen={completeModal} style={ExplanationModalStyles} ariaHideApp={false}>
                        <div style={{
                            fontFamily: "Noto Sans KR",
                            color: " #000",
                            fontSize: "0.625rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "normal"
                        }}>
                            <br/>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <a style={{textAlign: "left"}}>감사합니다.</a><a style={{textAlign: "right"}}
                                                                            onClick={() => setCompleteModal(false)}>x</a>
                            </div>
                            <hr style={{height: "1px", backgroundColor: "black"}}/>
                            <a style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;꼼꼼히 확인해주셔서
                                감사합니다.
                            </a>
                            <a style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;안전하고 아름다운
                                대관 문화를 만드는 셰프님이
                            </a>
                            <a style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;포 올의
                                얼굴입니다.</a>
                            <div className="bottom_button_relative">
                                <a style={{fontSize: "0.8rem"}} onClick={() => navigate("/")}>닫기</a>
                            </div>
                        </div>
                    </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default AssuranceFinish;