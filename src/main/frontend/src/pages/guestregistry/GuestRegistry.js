import {useState, useCallback} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ImageInputs from "../../components/ImageInputs";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import ImageInput from "../../components/ImageInput";
const GuestRegistry = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [inputCount, setInputCount] = useState(0);
    const [inputCount2, setInputCount2] = useState(0);
    const [inputText, setInputText] = useState("");
    const [introduce, setIntroduce] = useState("");
    const [introduceDetail, setIntroduceDetail] = useState("");
    const [career, setCareer] = useState([]);
    const [profileImage, setProfileImage] = useState("");
    const [imageExplain, setImageExplain] = useState("");
    const [sanitaryImage, setSanitaryImage] = useState("");
    const text1 = "사진을 설명해주세요. \n ex.현재 근무하고 있는 업장에서 찍은 사진입니다."
    const text2="ex.한식을 새롭게 해석하는 것을 좋아하는 조리학과 대학생입니다.\n" +
        "한식을 만들 때 전통적인 한식에 국한되어 있는 것을 좋아하지 않고 양식, 일식, 중식 등 " +
        "다양한 나라의 요리와 접목시키는 것을 좋아합니다."
    const handleButton = () => {
        if ((introduce !== "") && (introduceDetail !== "") && (career.length !== 0) && (profileImage !== "") && (sanitaryImage !== "") ){
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
                imageExplain: imageExplain
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
    const handleInput = useCallback((e) => {
        setImageExplain(e.target.value);
    },[])
    const activeEnter = (e) => {
        if (e.key==="Enter"){
            const temp =[...career];
            setCareer(temp.concat(e.target.value));
            e.target.value="";
        }
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
            <textarea placeholder={text2} className="white-space"
                      style={{width: "94vw", height: "17vh", fontFamily: "Noto Sans KR", fontSize:"10px"}}
                      onChange={onInputHandler2} maxLength="299" minLength="19"/>
            <h4>최근 경력을 최소 1개 입력해주세요.</h4>
            <input type="text" placeholder="안심하세요! 언제든지 프로필을 수정할 수 있어요."
                   style={{width: "94vw", height: "3vh"}}
                   onKeyDown={(e) => {activeEnter(e)}}
                    onChange={(e)=>{
                    setInputText(e.target.value);
            }}/>
            {career.map((item, index) => (
                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div key={index}
                         style={{
                             display: 'flex',
                             justifyContent: 'center',
                             alignItems: 'center',
                             height: "3vh",
                             width: '45vw',
                             border: '2px solid lightgray',
                             backgroundColor: 'white',
                             borderRadius: '7px',
                             marginTop: '5px',
                             cursor: 'pointer'
                         }}
                    >
                        {item}
                    </div>
                    <button
                        style={{
                            position: 'absolute',
                            right: '47%',
                            bottom:"15%",
                            border: 'none',
                            backgroundColor: 'white',
                        }}
                        onClick={() => {
                            const newCareer = [...career];
                            newCareer.splice(index, 1);
                            setCareer(newCareer);
                        }}
                    >
                        x
                    </button>
                </div>
            ))}
            <h4 style={{marginBottom:"0"}} >프로필 등록 사진</h4>
            <p>
                <ImageInput setImg={setProfileImage}/>
            </p>
            <textarea placeholder={text1} onChange={handleInput} className="white-space"
                      style={{width: "94vw", height: "17vh", fontFamily: "Noto Sans KR"}}/>
            <div>
                <h4 style={{marginBottom:"0"}} >보건증 사진</h4>
                <p>
                    <ImageInput setImg={setSanitaryImage}/>
                </p>
                <div style={{margin:"0", padding:"0px 0px"}} >
                    <h5 style={{margin:"0", padding:"0px 0px"}}>• 최근 1년내의 보건증을 등록해주세요.</h5>
                    <h5 style={{margin:"0", padding:"0px 0px"}}>• 대관에 필요한 정보이오니, <span style={{color:"red",textDecoration:"underline",textDecorationColor:"red"}} >필히 등록해주세요!</span></h5>
                </div>        
            </div>
            <div style={{display: "flex", justifyContent: "center", marginBottom: "6vh", marginTop: "3vh"}}>
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
                >저장
                </button>
                <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                    <p style={{fontSize: "16px"}}>필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                </Modal>
            </div>
        </div>
    );
}
export default GuestRegistry;