import { useState, useCallback, useEffect } from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import ImageInput from "../../components/ImageInput";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";
import DropDown from "../../components/DropDown";
const ChefInfoModifyPage = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState("");
    const [career, setCareer] = useState([]);
    const [sanitaryImage, setSanitaryImage] = useState("");
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
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const certificate = await ImageUploader(sanitaryImage, userId);
        axios.put("/api/v1/chefProfile", {
            userId: userId,
            career: career,
            certificatePhoto: certificate,
            accountBank: bank,
            accountNum: account,
            accountHolder: accountHolder,
        }).then((res) => {
            setIsModalOpen2(true);
        }).catch((err) => console.error(err));
    };
    useEffect(() => {
        const userId = sessionStorage.getItem("user_id");
        axios.get("/api/v1/chefProfile/user/" + userId)
            .then((res) => {
                setCareer(res.data.career ? res.data.career : []);
                setSanitaryImage(res.data.certificatePhoto);
                setBank(res.data.accountBank);
                setAccount(res.data.accountNum);
                setAccountHolder(res.data.accountHolder);
            })
            .catch(() => {
                navigate("/error");
            })
    }, [])
    return (
        <div className="fontForRegister"
            style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
            }}>
            <header style={{ textAlign: "center" }}><h3>셰프 정보</h3></header>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', padding: '1rem' }} >
                <div>
                    <a style={{ marginBottom: "0" }} >경력</a>
                    <hr style={{ height: "1px", backgroundColor: "black", width: "100%" }} />
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
                        }} />
                    <button style={{height:'1.875rem',width:'3.4375rem',backgroundColor:'black',color:'white',borderRadius:'0.375rem',marginLeft:'0.31rem'}} onClick={()=>{
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
                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: "1.5rem", boxSizing: 'border-box' }} className="fontForRegister">
                    <div style={{ width: "100%" }} >
                        <a className="fontForRegister" >계좌 정보를 입력해 주세요.<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                        <hr style={{ height: "1px", backgroundColor: "black", width: "100%" }} />
                        <a>• 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</a>
                    </div>
                    <div style={{ display: "flex" }} >
                        <div style={{ margin: "0.62rem" }}>
                            <p>은행명*</p>
                            <DropDown dataArr={bankDatas} onChange={setBank} defaultData={bank} val={bank} key={bank} />
                        </div>
                        <div style={{ margin: "0.62rem" }}>
                            <p>계좌번호*</p>
                            <input onChange={onChangeAccount} placeholder={"454102-01-376503"} value={account} defaultData={account}
                                style={{ width: "32vw", height: "1.5rem", flexShrink: "0" }}
                            />
                        </div>
                        <div style={{ margin: "0.62rem" }}>
                            <p>예금주*</p>
                            <input onChange={onChangeAccountHolder} value={accountHolder} placeholder={"홍길동"} defaultData={accountHolder}
                                style={{ width: "15vw", height: "1.5rem", flexShrink: "0" }}
                            />
                        </div>
                    </div>
                    <div style={{ gap: "0px" }}>
                        <p>• 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>
                    </div>
                    <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                        <div style={{ fontSize: '0.9375rem', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '80%' }}>현재 필수 입력사항이 모두 기입되지 않았습니다!</div>
                        <button className="bottom_button" style={{ backgroundColor: '#FF4F4F', position: 'fixed', marginBottom: '0' }} onClick={() => setIsModalOpen(false)}>마저 입력하기</button>
                    </Modal>
                </div>
            </div>
            <Modal isOpen={isModalOpen2} style={ModalStyles} ariaHideApp={false}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path
                        d="M22.0832 28.7503L17.5519 24.2191C17.17 23.8371 16.7012 23.6462 16.1457 23.6462C15.5901 23.6462 15.104 23.8545 14.6873 24.2712C14.3054 24.6531 14.1144 25.1392 14.1144 25.7295C14.1144 26.3198 14.3054 26.8059 14.6873 27.1878L20.6248 33.1253C21.0068 33.5073 21.4929 33.6982 22.0832 33.6982C22.6735 33.6982 23.1596 33.5073 23.5415 33.1253L35.3644 21.3024C35.7464 20.9205 35.9373 20.4517 35.9373 19.8962C35.9373 19.3406 35.729 18.8545 35.3123 18.4378C34.9304 18.0559 34.4443 17.8649 33.854 17.8649C33.2637 17.8649 32.7776 18.0559 32.3957 18.4378L22.0832 28.7503ZM24.9998 45.8337C22.1179 45.8337 19.4096 45.2864 16.8748 44.192C14.3401 43.0989 12.1353 41.6149 10.2603 39.7399C8.38525 37.8649 6.90123 35.66 5.80817 33.1253C4.71373 30.5906 4.1665 27.8823 4.1665 25.0003C4.1665 22.1184 4.71373 19.41 5.80817 16.8753C6.90123 14.3406 8.38525 12.1357 10.2603 10.2607C12.1353 8.38574 14.3401 6.90102 16.8748 5.80658C19.4096 4.71352 22.1179 4.16699 24.9998 4.16699C27.8818 4.16699 30.5901 4.71352 33.1248 5.80658C35.6596 6.90102 37.8644 8.38574 39.7394 10.2607C41.6144 12.1357 43.0984 14.3406 44.1915 16.8753C45.2859 19.41 45.8332 22.1184 45.8332 25.0003C45.8332 27.8823 45.2859 30.5906 44.1915 33.1253C43.0984 35.66 41.6144 37.8649 39.7394 39.7399C37.8644 41.6149 35.6596 43.0989 33.1248 44.192C30.5901 45.2864 27.8818 45.8337 24.9998 45.8337Z"
                        fill="black" />
                </svg>
                <p style={{
                    color: "#000", fontFamily: "Noto Sans KR", fontSize: "0.9375rem",
                    fontStyle: "normal", fontWeight: "400", lineHeight: "normal"

                }}>셰프정보가 수정되었습니다!</p>
                <hr />
                <button style={{ width: '100%', height: '3.125rem', backgroundColor: 'white', border: 'none' }} onClick={() => navigate("/")}>확인</button>
            </Modal>
            <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem', position: 'fixed', bottom: '0' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '100%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => handleButton()}
                >저장 후 닫기</button>
            </div>
        </div>
    );
}
export default ChefInfoModifyPage;