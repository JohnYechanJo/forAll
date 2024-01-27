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
    const [bank, setBank] = useState("");
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
    const activeEnter = (e) => {
        if (e.key === "Enter") {
            const temp = [...career];
            setCareer(temp.concat(e.target.value));
            e.target.value = "";
        }
    }
<<<<<<< HEAD
    return(
        <div 
             style={{paddingLeft: '2%', paddingRight: '2%', display:"flex",
                 justifyContent:"space-around", alignContent: 'center', textAlign: 'left',
                 flexDirection:"column",}}>
            <header style={{textAlign: "center"}}><h3>셰프 정보</h3></header>
            <h4 style={{marginBottom:"0"}} >경력</h4>
            <hr style={{paddingLeft: '2%', paddingRight: '2%', width: '96%', backgroundColor: 'black'}}/>
            <h4>최근 경력을 최소 1개 입력해주세요.</h4>
            <input type="text" placeholder="안심하세요! 언제든지 프로필을 수정할 수 있어요."
                   style={{width: "98%", height: "3vh"}}
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
                             width: '96%',
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
            <br/>
            <div style={{ display: "flex", flexDirection: "column", paddingLeft: '2%', paddingRight: '2%', alignItems: "flex-start", gap: "1%" }} className="fontForRegister">
                <div style={{width:"100%"}} >
                <a className="fontForRegister" >계좌 정보를 입력해 주세요.<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{width: '100%', backgroundColor: 'black'}}/>
                </div>
                <a>• 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</a>
                <div style={{display: "flex", justifyContent: "left"}} >
                    <div style={{ display: 'flex',marginTop:'1.5rem' }} >
                        <div>
                            <a>은행명<span style={{ color: "#FF2929" }} >*</span></a>
                            <DropDown dataArr={bankDatas} onChange={setBank} width='100%' />
                        </div>
                        <div style={{display:'flex',flexDirection:'column',marginLeft:'1rem'}} >
                            <a>계좌번호<span style={{ color: "#FF2929" }} >*</span></a>
                            <input onChange={onChangeAccount} className="input" style={{width:'100%'}} placeholder={"454102-01-376503"} />
                        </div>
                        <div style={{display:'flex',flexDirection:'column',marginLeft:'1rem'}}>
                            <a>예금주<span style={{ color: "#FF2929" }} >*</span></a>
                            <input onChange={onChangeAccountHolder} className="input" style={{width:'100%'}} />
                        </div>
                    </div>
                </div>
                <div style={{gap:"0px"}}>
                    <p>• 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>

=======
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
                    <hr style={{ height: "1px", backgroundColor: "black", width: "90vw" }} />
                </div>
                <div>
                    <a>최근 경력을 최소 1개 입력해주세요.</a>
                    <input type="text" placeholder="안심하세요! 언제든지 프로필을 수정할 수 있어요."
                        style={{ width: "90vw" }}
                        className="input"
                        onKeyDown={(e) => { activeEnter(e) }}
                        onChange={(e) => {
                            setInputText(e.target.value);
                        }} />
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
                            <DropDown dataArr={bankDatas} onChange={setBank} val={bank} />
                        </div>
                        <div style={{ margin: "0.62rem" }}>
                            <p>계좌번호*</p>
                            <input onChange={onChangeAccount} placeholder={"454102-01-376503"}
                                style={{ width: "9.375rem", height: "1.875rem", flexShrink: "0" }}
                            />
                        </div>
                        <div style={{ margin: "0.62rem" }}>
                            <p>예금주*</p>
                            <input onChange={onChangeAccountHolder}
                                style={{ width: "4.375rem", height: "1.875rem", flexShrink: "0" }}
                            />
                        </div>
                    </div>
                    <p>• 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>

>>>>>>> ef0ee3a ([01.26 근일]todolist 1,2,3,4,5 구현)
                    <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                        <div style={{ fontSize: '0.9375rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%' }}>현재 필수 입력사항이 모두 기입되지 않았습니다!</div>
                        <button className="bottom_button" style={{ backgroundColor: '#FF4F4F', position: 'fixed', marginBottom: '0' }} onClick={() => setIsModalOpen(false)}>마저 입력하기</button>
                    </Modal>
                </div>
            </div>
<<<<<<< HEAD

            <button onClick={handleButton} className="bottom_button"
                    style={{backgroundColor: "#FF4F4F", position: "fixed"}}>저장 후 닫기</button>
=======
            <button style={{
                backgroundColor: "#FF4F4F",
                position:'fixed',
            }}
                className="bottom_button"
                onClick={handleButton}
            >저장 후 닫기
            </button>
>>>>>>> ef0ee3a ([01.26 근일]todolist 1,2,3,4,5 구현)
        </div>
    );
}
export default ChefRegistry;