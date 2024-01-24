import {useLocation, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import ImageInput from "../../components/ImageInput";
import ImageInputs from "../../components/ImageInputs";
import Modal from "react-modal";
import axios from "axios";

const PlaceInfoModifyPage5 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    let isPublic = false;
    const [dbData, setDbData] = useState({});
    const [closeGuide, setCloseGuide] = useState("");
    const [closeImage, setCloseImage] = useState("");
    const [additionalImage, setAdditionalImage] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const onChangeGuide = useCallback((e) => {
        setCloseGuide(e.target.value);
    }, []);

    const downloadData = async () => {
        let spaceid;
        await axios.get("/api/v1/space/userSpace/" + sessionStorage.getItem("user_id"))
            .then((res) => spaceid = res.data[0])
            .catch((err) => console.error(err));
        axios
            .get("/api/v1/space/" + spaceid)
            .then((res) => {
                setDbData(res.data)
                setCloseGuide(res.data.closeGuide);
                setCloseImage(res.data.closeImage ? res.data.closeImage[0] : "");
                setAdditionalImage(res.data.closeImage ? res.data.closeImage.slice(1) : []);
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        downloadData();
    }, []);

    const handleButton = () => {
        if (closeGuide && closeImage) {
            isPublic = true;
            submit();
        }
        else setIsModalOpen(true);
    };
    const submit = () => {
        data.isPublic = data.isPublic && isPublic;
        navigate("/placeInfoModify6", {
            state: {
                ...data,
                closeGuide: closeGuide,
                closeImage: additionalImage ? [closeImage, additionalImage] : [closeImage]
            }
        });
    };

    return (
        <div>
            <h1>(3/4)마감 안내</h1>
            <div>
                <p>마감 정보</p>
                <p>오너님의 공간이 보장 받을 수 있도록 '마감 가이드'를 주느 단계입니다.</p>
                <p>마감 후 공간이 어떠한 상태였으면 좋겠는지 '글과 사진으로' 상세하게 기록해 주세요!</p>
            </div>
            <div>
                <h1>마감 사항</h1>
                <p>(최소 20자)</p>
                <input value={closeGuide} onChange={onChangeGuide} placeholder={"대관을 진행하는 셰프님들이 마감할 때 꼭 숙지해야 할 점을 기록해 주세요! ex. 음식물 쓰레기 처리방법 ex.분리수거 처리방법"}/>
            </div>
            <div>
                <p>사진</p>
                <ImageInput val={closeImage} setImg={setCloseImage} />
                <p>추가 사진</p>
                <ImageInputs vals={additionalImage} setImg={setAdditionalImage} />
            </div>
            <div style={{display: "flex"}}>
                <button onClick={()=>navigate(-1,data)} style={{backgroundColor: "red"}} className="next_button" >이전</button>
                <button style={{backgroundColor: "grey"}} className="next_button"
                        onClick={handleButton}
                >다음</button>
            </div>
            <Modal isOpen={isModalOpen} ariaHideApp={false}>
                <p>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
                <p>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                <button onClick={() => submit()}>다음</button>
            </Modal>
        </div>

    )
};

export default PlaceInfoModifyPage5;