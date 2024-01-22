import {useState, useCallback} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import ImageInput from "../../components/ImageInput";
const ChefRegistry = () => {
    const navigate = useNavigate();
    const [career, setCareer] = useState([]);
    const [sanitaryImage, setSanitaryImage] = useState("");

    const handleButton = () => {
        if ((career.length !== 0)  && (sanitaryImage !== "") ){
            submit();
        }
        else setIsModalOpen(true);
    }
    const [isModalOpen, setIsModalOpen] = useState(false);
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const certificate = await ImageUploader(data.sanitaryImage, userId);
        axios.post("/api/v1/profile", {
            userId: userId,
            career: career,
            certificate: certificate

        }).then((res) => {
            navigate("/");
        }).catch((err) => console.error(err));
    };
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
            <header style={{textAlign: "center"}}><h3>셰프 정보</h3></header>
            <h4 style={{marginBottom:"0"}} >경력</h4>
            <hr style={{height: "2px", backgroundColor: "black", width:"95vw"}}/>
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
            <div>
                <h4 style={{marginBottom:"0"}} >보건증 사진</h4>
                <p>
                    <ImageInput setImg={setSanitaryImage} val={sanitaryImage}/>
                </p>
                <div style={{margin:"0", padding:"0px 0px"}} >
                    <h5 style={{margin:"0", padding:"0px 0px"}}>• 최근 1년내의 보건증을 등록해주세요.</h5>
                    <h5 style={{margin:"0", padding:"0px 0px"}}>• 대관에 필요한 정보이오니, <span style={{color:"red",textDecoration:"underline",textDecorationColor:"red"}} >필히 등록해주세요!</span></h5>
                </div>        
            </div>

                <button style={{
                    backgroundColor: "#FF4F4F",
                }}
                className="bottom_button"
                        onClick={handleButton}
                >저장 후 닫기
                </button>
                <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                    <p style={{fontSize: "16px"}}>필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                </Modal>

        </div>
    );
}
export default ChefRegistry;