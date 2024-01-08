import {useState} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ImageInput from "../../components/ImageInput";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
const GuestRegistry = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [inputCount, setInputCount] = useState(0);
    const [inputCount2, setInputCount2] = useState(0);
    const [introduce, setIntroduce] = useState("");
    const [introduceDetail, setIntroduceDetail] = useState("");
    const [career, setCareer] = useState("");
    const [profileImage, setProfileImage] = useState("");
    const [hidden, setHidden] = useState(false);
    const text1 = "사진을 설명해주세요. \n ex.현재 근무하고 있는 업장에서 찍은 사진입니다."
    const handleButton = () => {
        if ((introduce !== "") && (introduceDetail !== "") && (career !== "") && (profileImage !== "")){
            submit();
        }
        else setIsModalOpen(true);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const submit = () => {
        navigate("/guestRegistry2", {
            state: {
                introduce: introduce,
                introduceDetail: introduceDetail,
                career: career,
                profileImage: profileImage,
            }

        });
    }
    const onInputHandler = (e) => {
        setInputCount(e.target.value.length);
        setIntroduce(e.target.value);
    };
    const onInputHandler2 = (e) => {
        setInputCount2(e.target.value.length);
        setIntroduceDetail(e.target.value);
    }
    return(
        <div className="margin"
             style={{display:"flex",
                 justifyContent:"space-around",
                 flexDirection:"column",}}>
            <header style={{textAlign: "center"}}><h3>1. 자기소개</h3></header>
            <h4 style={{marginBottom:"0"}} >경력</h4>
            <hr style={{height: "2px", backgroundColor: "black", width:"95vw"}}/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h4 style={{textAlign: "left"}}>본인 한 줄 소개</h4>
                <p style={{textAlign: "right"}}>
                    <span>{inputCount}</span>
                    <span>/18자</span>
                </p>
            </div>
            <input type="text" placeholder="ex.한식 만드는 것을 좋아하는 조리학과 대학생입니다." style={{width: "94vw", height: "3vh"}}
                   onChange={onInputHandler} maxLength="17"/>
            <div style={{display: "flex", justifyContent: "space-between"}}>
                <h4 style={{textAlign: "left"}}>본인 세부소개</h4>
                <p  style={{textAlign: "right"}}>
                    <span>{inputCount2}</span>
                    <span>/300자</span>
                    <span style={{color: "red"}}>(최소 20자)</span>
                </p>
            </div>
            <textarea placeholder="공간에 대한 설명을 기재해주세요."
                      style={{width: "94vw", height: "17vh", fontFamily: "Noto Sans KR"}}
                      onChange={onInputHandler2} maxLength="299" minLength="19"/>
            <h4>최근 경력을 최소 1개 입력해주세요.</h4>
            <input type="text" placeholder="안심하세요! 언제든지 프로필을 수정할 수 있어요." style={{width: "94vw", height: "3vh"}}/>
            <h4 style={{marginBottom:"0"}} >프로필 등록 사진</h4>
            <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hidden}/></span>
                <ImageInput setImg={setProfileImage} setHidden={setHidden}/>
            </p>
            <textarea placeholder={text1} className="white-space"
                      style={{width: "94vw", height: "17vh", fontFamily: "Noto Sans KR"}}/>
            <div style={{marginTop:"5vh"}} >
                <Link to="/guestRegistryStart">
                    <button style={{
                        backgroundColor: "black",
                        color: "white",
                        flex: "1",
                        border: "none",
                        width: "50vw",
                        height: "8vh"
                    }}>이전
                    </button>
                </Link>
                <button style={{
                    backgroundColor: "red",
                    color: "white",
                    flex: "1",
                    border: "none",
                    width: "50vw",
                    height: "8vh"
                }}
                        onClick={handleButton}
                >다음</button>
                <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                    <p style={{fontSize:"16px"}} >필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                </Modal>
            </div>
        </div>
    );
}
export default GuestRegistry;