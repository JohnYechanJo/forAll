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
    const onInputHandler = (e) => {
        setInputCount(e.target.value.length);
        setIntroduce(e.target.value);
    };
    const onInputHandler2 = (e) => {
        setInputCount2(e.target.value.length);
        setIntroduceDetail(e.target.value);
    }
    return(
        <div>
            <header style={{textAlign: "center"}}><h3>1. 자기소개</h3></header>
            <h4>경력</h4>
            <hr style={{height: "2px", backgroundColor: "black"}}/>
            <h4>본인 한 줄 소개</h4>
            <p>
                <span>{inputCount}</span>
                <span>/18자</span>
            </p>
            <input type="text" placeholder="ex.한식 만드는 것을 좋아하는 조리학과 대학생입니다." style={{width: "94vw", height: "3vh"}}
                   onChange={onInputHandler} maxLength="17"/>
            <h4>본인 세부소개</h4>
            <p>
                <span>{inputCount2}</span>
                <span>/300자</span>
                <span style={{color: "red"}}>(최소 20자)</span>
            </p>
            <textarea placeholder="공간에 대한 설명을 기재해주세요." style={{width: "94vw", height: "17vh"}}
                      onChange={onInputHandler2} maxLength="299" minLength="19"/>
            <h4>최근 경력을 최소 1개 입력해주세요.</h4>
            <input type="text" placeholder="안심하세요! 언제든지 프로필을 수정할 수 있어요." style={{width: "94vw", height: "3vh"}}/>
            <h4>프로필 등록 사진</h4>
            <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hidden}/></span>
                <ImageInput setImg={setProfileImage} setHidden={setHidden}/>
            </p>
            <textarea placeholder="사진을 설명해주세요. ex.현재 근무하고 있는 업장에서 찍은 사진입니다." style={{width: "94vw", height: "17vh"}}/>
        </div>
    );
}
export default GuestRegistry;