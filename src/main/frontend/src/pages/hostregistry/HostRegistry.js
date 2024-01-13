import {useCallback, useEffect, useState} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import ImageInputs from "../../components/ImageInputs";
import {ModalStyles} from "../../components/ModalStyles";
import DaumPost from "../../components/DaumPost";
import {KitchenFeat} from "../../utils/enums";
import ImageInput from "../../components/ImageInput";
const HostRegistry = () => {
    const [inputCount, setInputCount] = useState(0);
    const [inputCount2, setInputCount2] = useState(0);
    const [inputCount3, setInputCount3] = useState(0);
    const [inputCount4, setInputCount4] = useState(0);
    const [placeName, setPlaceName] = useState("");
    const [placeIntro, setPlaceIntro] = useState("");
    const [placeIntroDetail, setPlaceIntroDetail] = useState("");
    const [kitchen, setKitchen] = useState(KitchenFeat.NotSpecified);
    const [address, setAddress] = useState(null);
    const [addressDetail, setAddressDetail] = useState("");
    const [fullAddress, setFullAddress] = useState("");
    const [placeInfo, setPlaceInfo] = useState("");
    const [webSite, setWebSite] = useState("");
    const [imgRepresent, setImgRepresent] = useState("");
    const [clicked1, setClicked1] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    const [clicked3, setClicked3] = useState(false);
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();
    let isPublic = false;
    const modalClose1 = () => {
        setModalIsOpen1(false);
    };
    const modalClose2 = () => {
        setModalIsOpen2(false);
    };
    const modalClose3 = () => {
        setModalIsOpen3(false);
    };
    const onInputHandler = (e) => {
        setInputCount(e.target.value.length);
        setPlaceName(e.target.value);
    };
    const onInputHandler2 = (e) => {
        setInputCount2(e.target.value.length);
        setPlaceIntro(e.target.value);
    }
    const onInputHandler3 = (e) => {
        setInputCount3(e.target.value.length);
        setPlaceIntroDetail(e.target.value);
    }
    const onInputHandler4 = (e) => {
        setInputCount4(e.target.value.length);
        setPlaceInfo(e.target.value);
    }
    const handleButton = () => {
        if ((placeName !== "")&&(placeIntro !== "")&&(placeIntroDetail !== "")&&(kitchen!=="")&&(fullAddress!=="")&&(placeInfo!=="")&&(imgRepresent!=="")&&(webSite!=="")){
            isPublic = true;
            submit();}
        else{
            setIsModalOpen(true);
        }
    };
    const submit = () => {
        navigate("/hostRegistry2",{
            state: {
                placeName: placeName,
                placeIntro: placeIntro,
                placeIntroDetail: placeIntroDetail,
                kitchen: kitchen,
                fullAddress: fullAddress,
                webSite: webSite,
                placeInfo: placeInfo,
                imgRepresent: imgRepresent,
                isPublic: isPublic,
            }
        });
    };
    return (
        <div className="margin"
             style={{display:"flex",
                     justifyContent:"space-around",
                     flexDirection:"column",}}>
            <div>
                <header style={{textAlign: "center"}}><h3>1. 공간 정보</h3></header>
                <h4>공간명을 입력해주세요.</h4>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <h4>공간명</h4>
                <p>
                    <span>{inputCount}</span>
                    <span>/18자</span>
                </p>
                <input type="text" placeholder="오스테리아 로에로" style={{width: "94vw", height: "3vh"}}
                       onChange={onInputHandler} maxLength="17"/>
                <h5>❕사용 가능한 특수문자: (,),(-),(.),(@),(/)</h5>
                <h4>공간 한 줄 소개</h4>
                <p>
                    <span>{inputCount2}</span>
                    <span>/18자</span>
                </p>
                <input type="text" placeholder="이탈리아 전통 가정식을 제공하는 와인바" style={{width: "94vw", height: "3vh"}}
                       onChange={onInputHandler2} maxLength="17"/>
                <h4>공간 소개</h4>
                <p>
                    <span>{inputCount3}</span>
                    <span>/300자</span>
                    <span style={{color: "red"}}>(최소 20자)</span>
                </p>
                <textarea type="text" placeholder="공간에 대한 설명을 기재해주세요." style={{width: "94vw", height: "17vh"}}
                          onChange={onInputHandler3} maxLength="299" minLength="19"/>
                <div>
                    <h4>주방 특성</h4>
                    <div style={{display: "flex"}}>
                        <button className="button"
                                name="kitchen"
                                value={KitchenFeat.Open}
                                disabled={clicked2 || clicked3}
                                style={{
                                    backgroundColor: clicked1 ? "black" : "white",
                                    color: clicked1 ? "white" : "black",
                                    width: "100px",
                                    flex: "1",
                                    marginLeft: "10px"
                                }}
                                onClick={(event) => {
                                    const selected = event.target.value;
                                    setKitchen(event.target.value);
                                    if (clicked1 === true) {
                                        setKitchen(KitchenFeat.NotSpecified);
                                    }
                                    setClicked1(!clicked1);


                                }}
                        >
                            오픈형
                        </button>
                        <button className="button"
                                name="kitchen"
                                value={KitchenFeat.Face}
                                disabled={clicked1 || clicked3}
                                style={{
                                    backgroundColor: clicked2 ? "black" : "white",
                                    color: clicked2 ? "white" : "black",
                                    width: "100px",
                                    flex: "1",
                                    marginLeft: "10px"
                                }}
                                onClick={(event) => {
                                    const selected = event.target.value;
                                    setKitchen(event.target.value);
                                    if (clicked2 === true) {
                                        setKitchen(KitchenFeat.NotSpecified);
                                    }
                                    setClicked2(!clicked2);


                                }}
                        >
                            대면형
                        </button>
                        <button className="button"
                                name="kitchen"
                                value={KitchenFeat.Close}
                                disabled={clicked1 || clicked2}
                                style={{
                                    backgroundColor: clicked3 ? "black" : "white",
                                    color: clicked3 ? "white" : "black",
                                    width: "100px",
                                    flex: "1",
                                    marginLeft: "10px",
                                    marginRight: "10px"
                                }}
                                onClick={(event) => {
                                    const selected = event.target.value;
                                    setKitchen(event.target.value);
                                    if (clicked3 === true) {
                                        setKitchen(KitchenFeat.NotSpecified);
                                    }
                                    setClicked3(!clicked3);

                                }}
                        >
                            폐쇄형
                        </button>
                    </div>
                </div>
                <div>
                    <div>
                        <Modal
                            isOpen={modalIsOpen1}
                            style={ModalStyles}
                        >
                            <h3>오픈형 주방이란?</h3>
                            <p>내용</p>
                            <button onClick={modalClose1}>닫기</button>
                        </Modal>
                        <button onClick={() => setModalIsOpen1(true)}
                                style={{border: "none", backgroundColor: "white"}}>• 오픈형이 무엇인가요?
                        </button>
                    </div>
                    <div>
                        <Modal
                            isOpen={modalIsOpen2}
                            style={ModalStyles}
                        >
                            <h3>대면형 주방이란?</h3>
                            <p>내용</p>
                            <button onClick={modalClose2}>닫기</button>
                        </Modal>
                        <button onClick={() => setModalIsOpen2(true)}
                                style={{border: "none", backgroundColor: "white"}}>• 대면형이 무엇인가요?
                        </button>
                    </div>
                    <div>
                        <Modal
                            isOpen={modalIsOpen3}
                            style={ModalStyles}
                        >
                            <h3>폐쇄형 주방이란?</h3>
                            <p>내용</p>
                            <button onClick={modalClose3}>닫기</button>
                        </Modal>
                        <button onClick={() => setModalIsOpen3(true)}
                                style={{border: "none", backgroundColor: "white"}}>• 폐쇄형이 무엇인가요?
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <h4>위치 정보</h4>
                <hr style={{height:"2px",backgroundColor:"black"}} />
                <h4>주소(위치)</h4>
                <DaumPost setAddress={setAddress}/>
                <h5>
                    <span>{(address !== null) ? address : null} </span>
                    <span>
                        <input type="text"
                               placeholder="상세 주소"
                               hidden={(address === null)}
                               onChange={(e) => {
                                   setAddressDetail(e.target.value);
                                   setFullAddress(address + " " + e.target.value);
                               }}
                        />
                    </span>
                </h5>
                <h6>
                    • 공간 주소는 최초 등록 이후 직접 변경할 수 없습니다.
                </h6>
                <h6>
                    • 고객센터를 통해 주소 변경을 요청해주세요.
                </h6>
            </div>
            <div>
                <h4>상세 위치 정보</h4>
                <p>
                    <span>{inputCount4}</span>
                    <span>/18자</span>
                </p>
                <input type="text" placeholder="ex.성수역 4번출구 도보 1분 거리" style={{width: "80vw", height: "3vh"}}
                       onChange={onInputHandler4} maxLength="17"/>
                <h6>
                    • 작성하신 위치정보는 검색에 영향을 미치지 않습니다.
                </h6>
                <h6 style={{marginTop: "0px"}}>
                    • 공간 주소를 입력하시면 반려 처리됩니다.(ex.강남구 대치동, 삼성로 141 등)
                </h6>
            </div>
            <div>
            <h4>웹사이트</h4>
                <input type="text" placeholder="웹사이트 URL을 입력해주세요." style={{width: "80vw", height: "3vh"}}
                       onChange={(e) => setWebSite(e.target.value)}/>
                <h6>
                    • 인스타그램, 페이스북, 네이버지도, 카카오지도, 구글지도 등
                </h6>
                <h6 style={{marginTop: "0px"}}>
                    공간을 PR할 수 있는 웹사이트면 무엇이든지 좋습니다.
                </h6>
            </div>
            <div>
                <h4>
                    <span>대표 이미지 </span>
                </h4>
                <div>
                    <ImageInput setImg={setImgRepresent}/>
                </div>
            </div>
            <div style={{display: "flex", justifyContent: "center", marginBottom: "6vh", marginTop: "3vh"}}>
                <Link to="/hostRegistryStart">
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
                    <p>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <p>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                    <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                    <button onClick={() => submit()}>다음</button>
                </Modal>
            </div>
        </div>
    );
}
export default HostRegistry;