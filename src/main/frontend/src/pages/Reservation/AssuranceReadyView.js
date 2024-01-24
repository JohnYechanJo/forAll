import ImageInput from "../../components/ImageInput";
import ImageInputs from "../../components/ImageInputs";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import Alert from "../../components/Alert";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
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
        <div>
            <h1>대관 준비</h1>

            <div>
                <p>주방 사진</p>
                <ImageViewer val={assuranceData.readyKitImage ? assuranceData.readyKitImage[0] : null}/>
                <p>주방 추가 사진</p>
                <ImagesViewer vals={assuranceData.readyKitImage ? assuranceData.readyKitImage.slice(1) : []}/>
                <p>홀 사진</p>
                <ImageViewer val={assuranceData.readyHallImage ? assuranceData.readyHallImage[0] : null}/>
                <p>홀 추가 사진</p>
                <ImagesViewer vals={assuranceData.readyHallImage ? assuranceData.readyHallImage.slice(1) : []}/>
                <p>기타 사진</p>
                <ImageViewer val={assuranceData.readyAdditionalImage} />
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