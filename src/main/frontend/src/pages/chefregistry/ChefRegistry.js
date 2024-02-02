import { useState, useCallback } from "react";
import "../../components/Styles.css";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import ImageInput from "../../components/ImageInput";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";
import DropDown from "../../components/DropDown";
const ChefRegistry = () => {
    const navigate = useNavigate();
    const [career, setCareer] = useState([]);
    const [sanitaryImage, setSanitaryImage] = useState("");
    const [inputText, setInputText] = useState("");
    const [bank, setBank] = useState("한국은행");
    const [account, setAccount] = useState("");
    const [accountHolder, setAccountHolder] = useState("");
    const bankDatas = ["한국은행", "KB국민은행", "신한은행", "우리은행", "하나은행", "SC제일은행", "한국씨티은행", "케이뱅크", "카카오뱅크", "토스뱅크", "한국산업은행", "중소기업은행", "한국수출은행", "NH농협은행", "수협은행", "대구은행", "부산은행", "경남은행", "광주은행", "전북은행", "제주은행"];
    const handleButton = () => {
        if ((career.length !== 0) && (sanitaryImage !== "") && (bank !== "") && (account !== "") && (accountHolder !== "")) {
            submit();
        }
        else setIsModalOpen(true);
    }
    const onChangeAccount = useCallback((e) => {
        setAccount(e.target.value);
    }, []);
    const onChangeAccountHolder = useCallback((e) => {
        setAccountHolder(e.target.value);
    }, []);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const certificate = await ImageUploader(sanitaryImage, userId);


        axios.post("/api/v1/chefProfile", {
            userId: userId,
            career: career,
            certificatePhoto: certificate,
            accountBank: bank,
            accountNum: account,

            accountHolder: accountHolder,
        }).then((res) => {
            navigate("/chefRegistryChecking");
        }).catch((err) => console.error(err));
    };

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
            }}
            className="fontForRegister"
        >
            <header style={{ textAlign: "center" }}><h3>셰프 정보</h3></header>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }} >
                <div>
                    <a style={{ marginBottom: "0" }} >경력</a>
                    <hr style={{ height: "1px", backgroundColor: "black", width: "100%"}}/>
                </div>
                <div>
                    <a>최근 경력을 최소 1개 입력해주세요.</a>
                    <div style={{display:'flex'}} >
                    <input type="text" placeholder="안심하세요! 언제든지 프로필을 수정할 수 있어요."
                        style={{ width: "80%" }}
                        className="input"
                        value={inputText}
                        onChange={(e) => {
                            setInputText(e.target.value);
                        }}
                        />
                    <button style={{height:'1.875rem',width:'4.5rem',backgroundColor:'black',color:'white',borderRadius:'0.375rem',marginLeft:'0.31rem'}} onClick={()=>{
                        const temp = [...career];
                        setCareer(temp.concat(inputText));
                        setInputText("");
                        
                    }} className="buttonForRegister" >입력하기</button>
                    </div>
                    <div>
                        {career.map((item, index) => (
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <div key={index}
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: "3vh",
                                        width: '45vw',
                                        border: '1px solid lightgray',
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
                                        right: '0%',
                                        bottom: "15%",
                                        border: 'none',
                                        backgroundColor: 'transparent',
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
                    </div>
                </div>
                <div>
                    <a style={{ marginBottom: "0" }} >보건증 사진</a>
                    <p>
                        <ImageInput setImg={setSanitaryImage} val={sanitaryImage} />
                    </p>
                    <div style={{ margin: "0", padding: "0px 0px" }} >
                        <h5 style={{ margin: "0", padding: "0px 0px" }}>• 최근 1년내의 보건증을 등록해주세요.</h5>
                        <h5 style={{ margin: "0", padding: "0px 0px" }}>• 대관에 필요한 정보이오니, <span style={{ color: "red", textDecoration: "underline", textDecorationColor: "red" }} >필히 등록해주세요!</span></h5>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.5rem" }} className="fontForRegister">
                    <div style={{ width: "100%" }} >
                        <a className="fontForRegister" >계좌 정보를 입력해 주세요.<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                        <hr style={{ height: "1px", backgroundColor: "black", width: "100%" }} />
                        <a>• 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</a>

                    </div>
                    <div style={{ display: "flex" }} >
                        <div style={{ margin: "0.62rem" }}>
                            <p>은행명*</p>
                            <DropDown  dataArr={bankDatas} onChange={setBank}   />
                        </div>
                        <div style={{ margin: "0.62rem" }}>
                            <p>계좌번호*</p>
                            <input onChange={onChangeAccount} placeholder={"454102-01-376503"}
                                style={{ width: "32vw", height: "1.5rem", flexShrink: "0" }}
                            />
                        </div>
                        <div style={{ margin: "0.62rem" }}>
                            <p>예금주*</p>
                            <input onChange={onChangeAccountHolder}
                                style={{ width: "15vw", height: "1.5rem", flexShrink: "0" }}
                            />
                        </div>
                    </div>
                    <p>• 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>

                    <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                        <div style={{ fontSize: '0.9375rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%' }}>현재 필수 입력사항이 모두 기입되지 않았습니다!</div>
                        <button className="bottom_button" style={{ backgroundColor: '#FF4F4F', position: 'fixed', marginBottom: '0' }} onClick={() => setIsModalOpen(false)}>마저 입력하기</button>
                    </Modal>
                </div>
            </div>
            <button style={{
                backgroundColor: "#FF4F4F",
                position:'fixed',
            }}
                className="bottom_button"
                onClick={handleButton}
            >저장 후 닫기
            </button>
        </div>
    );
}
export default ChefRegistry;