import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import ImageInput from "../../components/ImageInput";
import ImageInputs from "../../components/ImageInputs";
import Alert from "../../components/Alert";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import axios from "axios";
import ImageViewer from "../../components/ImageViewer";
import ImagesViewer from "../../components/ImagesViewer";
import ImageUploader from "../../utils/imageUploader";
import {ExplanationModalStyles} from "../../components/ExplanationModalStyles";
import {ReservationModalStyles} from "../../components/ReservationModalStyles";

const AssuranceReady = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [kitImage, setKitImage] = useState();
    const [kitImages, setKitImages] = useState([]);
    const [hallImage, setHallImage] = useState();
    const [hallImages, setHallImages] = useState([]);
    const [additionImage, setAdditionImage] = useState();
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
        if(kitImage && hallImage && record && agree) submit();
        else setIsAlertOpen(true);
    };
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const readyKitImage = kitImages ? await Promise.all([kitImage, ...kitImages].map(async (img) => await ImageUploader(img, userId))) : null;
        const readyHallImage = hallImages ? await Promise.all([hallImage, ...hallImages].map(async (img) => await ImageUploader(img, userId))) : null;
        const readyAdditionalImage = await ImageUploader(additionImage, userId);

        axios.post("/api/v1/assurance", {
            reservation: data.space,
            readyKitImage: readyKitImage,
            readyHallImage: readyHallImage,
            readyAdditionalImage: readyAdditionalImage,
            readyRecord: record
        }).then(() => setCompleteModal(true))
            .catch((err) => console.error(err));
    };

    useEffect(() => {
        axios.get("/api/v1/space/" + data.space)
            .then((res) => setSpaceData(res.data))
            .catch((err) => console.error(err));
    }, []);
    return (
        <div>
            <h1>대관 준비</h1>
            <h3 onClick={()=>setIsModalOpen(true)}>꼭 해야 하나요?</h3>
            <p onClick={()=>setIsGuidOpen(true)}>오너 마감 가이드</p>
            <p>매장 내부에서 예상치 못한 흠집이나 사고 흔적을 발견했다면 반드시 촬영해주세요.</p>
            <p>대관 시작전 주방사용이 불가능한 손상이 있다면 고객센터로 문의해주세요.</p>
            <p>‘오너 마감 가이드’ 에서 명시된 내용에 따라 사진과 글을 남겨주세요.</p>
            <p>ex. 음식물 쓰레기 처리 방법이나 분리수거 방법이 적혀있다면 가이드에 맞춰서 진행해주신 후 사진을 남겨주세요..</p>

            <div>
                <p>촬영</p>
                <p>주방 내부를 가이드에 맞춰 촬영해주세요</p>
                <p>홀을 가이드에 맞춰 촬영해주세요.</p>
                <p>사진 전송 후에는 수정할 수 없습니다. </p>
            </div>
            <div>
                <p>주방 사진</p>
                <ImageInput val={kitImage} setImg={setKitImage}/>
                <p>주방 추가 사진</p>
                <ImageInputs vals={kitImages} setImg={setKitImages} />
                <p>홀 사진</p>
                <ImageInput val={hallImage} setImg={setHallImage}/>
                <p>홀 추가 사진</p>
                <ImageInputs vals={hallImages} setImg={setHallImages} />
                <p>기타 사진</p>
                <ImageInput val={additionImage} setImg={setAdditionImage} />
            </div>
            <div>
                <p>대관 진행중 기록</p>
                <p>(최소 20자)</p>
                <input value={record} onChange={onChangeRecord} placeholder={"대관을 진행하는 중 셰프님께서 발견한 특이사항을 기록해 주세요.\n" +
                    "ex. ‘오너 마감 가이드’ 숙지를 충분히 완료했다.\n" +
                    "ex. 셰프님이 찍은 사진에 대한 설명을 적어주세요."}/>
            </div>
            <div>
                <p>퇴장 2시간전 알림창 으로 ‘마감 마무리’ 창을 보내드릴 예정입니다. 확인 후 마감 마무리를 진행해 주세요.*</p>
                <input type={"checkbox"} checked={agree} onClick={toggleAgree}/>
                <p>알겠습니다.</p>
            </div>
            <button onClick={handleButton}>보내기</button>

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
                    <p style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;기록한 내용은 오너가 사고 발생에
                        대한 손해 배상 청구시 증빙자료가 됩니다.</p>
                    <p style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;<strong>‘오너 마감
                        가이드’</strong> 에서 명시된 사항을 꼭 숙지하시고, 그대로 이행해 주세요.</p>
                    <p style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;안전하고 아름다운 대관문화를
                        만드시는 셰프님이 포 올의 얼굴입니다.</p>
                    <div className="bottom_button_fixed">
                        <a style={{fontSize: "0.8rem"}} onClick={() => setIsModalOpen(false)}>닫기</a>
                    </div>
                </div>
            </Modal>
            <Alert content={"필수 요소들이 입력되어야 합니다."} isOpen={isAlertOpen} setIsOpen={setIsAlertOpen}/>
            {isGuidOpen ? (
                <div>
                    <h1>마감 안내</h1>
                    <p>오너 마감 가이드</p>
                    <p>숙지 사항</p>
                    <textarea content={spaceData.closeGuide}/>
                    <p>사진</p>
                    <ImageViewer val={spaceData.closeImage ? spaceData.closeImage[0] : null}/>
                    <p>추가 사진</p>
                    <ImagesViewer vals={spaceData.closeImage ? spaceData.closeImage.slice(1) : []}/>
                    <button onClick={() => setIsGuidOpen(false)}>닫기</button>
                </div>
            ) : null}
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
                    <a style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;꼼꼼히 확인해주셔서 감사합니다.
                    </a>
                    <a style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;안전하고 아름다운 대관 문화를
                        만드는 셰프님이
                    </a>
                    <a style={{textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem"}}>•&ensp;포 올의 얼굴입니다.</a>
                    <div className="bottom_button_relative">
                        <a style={{fontSize: "0.8rem"}} onClick={() => setCompleteModal(false)}>닫기</a>
                    </div>
                </div>
            </Modal>
        </div>
    )


};

export default AssuranceReady;