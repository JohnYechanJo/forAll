
import { useState } from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import DaumPost from "../../components/DaumPost";
import { KitchenFeat } from "../../utils/enums";

import ImageInput from "../../components/ImageInput";
import Alert from "../../components/Alert";
import {ExplanationModalStyles} from "../../components/ExplanationModalStyles";
import ForAllLogo from "../../components/ForAllLogo";

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
    const [isAlertOpen, setIsAlertOpen] = useState(false);
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

        if (fullAddress === "") {
            setIsAlertOpen(true);
        } else if ((placeName !== "") && (placeIntro !== "") && (placeIntroDetail !== "") && (kitchen !== "") && (fullAddress !== "") && (placeInfo !== "") && (imgRepresent !== "") && (webSite !== "")) {
            isPublic = true;
            submit();
        } else {

            setIsModalOpen(true);
        }
    };
    const submit = () => {


        navigate("/hostRegistry2", {


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
                addressDetail: addressDetail,
                address: address,
            }
        });
    };
    return (

        <div
            className="fontForRegister"
            style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",

            }}>
                <header style={{ textAlign: "center" }}><h3>(1/4) 공간 정보</h3></header>
                <ForAllLogo/>
            <div style={{ padding: '1rem', width: '100%' }}>
                <div >
                    <h4>공간명을 입력해주세요.</h4>
                    <hr style={{ height: "2px", backgroundColor: "black" }} />
                    <div style={{display:'flex',justifyContent:'space-between'}} >
                    <h4>공간명</h4>
                    <p>
                        <span>{inputCount}</span>
                        <span>/18자</span>
                    </p>
                    </div>
                    <input type="text" placeholder="오스테리아 로에로" className="input"
                           onChange={onInputHandler} maxLength="17"/>
                    <h5>❕사용 가능한 특수문자: (,),(-),(.),(@),(/)</h5>
                    <div style={{display:'flex',justifyContent:'space-between'}} >
                    <h4>공간 한 줄 소개</h4>
                    <p>
                        <span>{inputCount2}</span>
                        <span>/18자</span>
                    </p>
                    </div>
                    <input type="text" placeholder="이탈리아 전통 가정식을 제공하는 와인바" className="input"
                        onChange={onInputHandler2} maxLength="17" />
                    <div style={{display:'flex',justifyContent:'space-between'}} >
                    <h4>공간 소개</h4>
                    <p>
                        <span>{inputCount3}</span>
                        <span>/300자</span>
                        <span style={{color: "red"}}>(최소 20자)</span>
                    </p>
                    </div>
                    <textarea type="text" placeholder="공간에 대한 설명을 기재해주세요." style={{ width: "94vw", height: "17vh" }}
                        onChange={onInputHandler3} maxLength="299" minLength="19" />
                    <div>
                        <h4>주방 특성</h4>
                        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-evenly"}}>
                            <div style={{flexDirection: "column", display: "flex"}}>
                                <div>
                                    <button className="button"


                                            name="kitchen"
                                            value={KitchenFeat.Open}
                                            style={{
                                                backgroundColor: clicked1 ? "black" : "white",
                                                color: clicked1 ? "white" : "black",
                                                width: "100px",
                                                flex: "1",
                                                marginLeft: "10px",
                                                border: "2px solid gray"
                                            }}
                                            onClick={(event) => {
                                                const selected = event.target.value;
                                                setKitchen(event.target.value);
                                                if (clicked1 === true) {
                                                    setKitchen(KitchenFeat.NotSpecified);
                                                }
                                                setClicked1(!clicked1);
                                                setClicked2(false);
                                                setClicked3(false);
                                            }}

                                    >
                                        오픈형
                                    </button>
                                </div>
                                <div>
                                    <Modal isOpen={modalIsOpen1} style={ExplanationModalStyles}>
                                        <div style={{
                                            fontFamily: "Noto Sans KR",
                                            color: " #000",
                                            fontSize: "0.625rem",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            lineHeight: "normal"
                                        }}>
                                            <br/>
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                <a style={{textAlign: "left"}}>오픈형 주방이란?</a><a
                                                style={{textAlign: "right"}}
                                                onClick={() => setModalIsOpen1(false)}>x</a>
                                            </div>
                                            <hr style={{height: "1px", backgroundColor: "black"}}/>
                                            <p style={{
                                                textAlign: 'left',
                                                paddingLeft: "1rem",
                                                paddingRight: "1rem"
                                            }}>•&ensp;주방, 홀이 하나로 결합된 형태입니다.</p>
                                            <p style={{
                                                textAlign: 'left',
                                                paddingLeft: "1rem",
                                                paddingRight: "1rem"
                                            }}>•&ensp;주방과 홀이 결합되면서 음식을 만드는 사람과 가까이할 수 있어
                                                대면형보다 더 긴밀한 커뮤니케이션이 가능하며, 요리를 하는 동시에 식사가 가능한 형태를 띕니다.
                                            </p>
                                        </div>
                                        <div class="bottom_button_fixed">
                                            <a onClick={() => setModalIsOpen1(false)}>닫기</a>
                                        </div>

                                    </Modal>
                                    <button onClick={() => setModalIsOpen1(true)}
                                            style={{border: "none", backgroundColor: "white", fontSize: "10px"}}>• 오픈형이
                                        무엇인가요?
                                    </button>
                                </div>
                            </div>
                            <div style={{flexDirection: "column"}}>
                                <div>
                                    <button className="button"
                                            name="kitchen"
                                            value={KitchenFeat.Face}
                                            style={{
                                                backgroundColor: clicked2 ? "black" : "white",
                                                color: clicked2 ? "white" : "black",
                                                width: "100px",
                                                flex: "1",
                                                marginLeft: "10px",
                                                border: "2px solid gray"
                                            }}
                                            onClick={(event) => {
                                                const selected = event.target.value;
                                                setKitchen(event.target.value);
                                                if (clicked2 === true) {
                                                    setKitchen(KitchenFeat.NotSpecified);
                                                }
                                                setClicked1(false);
                                                setClicked2(!clicked2);
                                                setClicked3(false);
                                            }}
                                    >
                                        대면형
                                    </button>
                                </div>
                                <div>
                                    <Modal
                                        isOpen={modalIsOpen2}
                                        style={ExplanationModalStyles}>

                                        <div style={{
                                            fontFamily: "Noto Sans KR",
                                            color: " #000",
                                            fontSize: "0.625rem",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            lineHeight: "normal"
                                        }}>
                                            <br/>
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                <a style={{textAlign: "left"}}>대면형 주방이란?</a><a
                                                style={{textAlign: "right"}}
                                                onClick={() => setModalIsOpen2(false)}>x</a>
                                            </div>
                                            <hr style={{height: "1px", backgroundColor: "black"}}/>
                                            <p style={{
                                                textAlign: 'left',
                                                paddingLeft: "1rem",
                                                paddingRight: "1rem"
                                            }}>•&ensp;부엌과 다이닝룸이 한 공간에 자리하는 형태입니다.</p>
                                            <p style={{
                                                textAlign: 'left',
                                                paddingLeft: "1rem",
                                                paddingRight: "1rem"
                                            }}>•&ensp;식탁이 따로 놓여 있지만, 음식을 만드는 사람의 얼굴을 보며
                                                대화를 나눌 수 있는 구조입니다.</p>
                                        </div>
                                        <div class="bottom_button_fixed">
                                            <a onClick={() => setModalIsOpen2(false)}>닫기</a>
                                        </div>
                                    </Modal>
                                    <button onClick={() => setModalIsOpen2(true)}
                                            style={{border: "none", backgroundColor: "white", fontSize: "10px"}}>• 대면형이
                                        무엇인가요?
                                    </button>
                                </div>
                            </div>
                            <div style={{flexDirection: "column"}}>
                                <div>
                                    <button className="button"
                                            name="kitchen"
                                            value={KitchenFeat.Close}
                                            style={{
                                                backgroundColor: clicked3 ? "black" : "white",
                                                color: clicked3 ? "white" : "black",
                                                width: "100px",
                                                flex: "1",
                                                marginLeft: "10px",
                                                marginRight: "10px",
                                                border: "2px solid gray",
                                            }}
                                            onClick={(event) => {
                                                const selected = event.target.value;
                                                setKitchen(event.target.value);
                                                if (clicked3 === true) {
                                                    setKitchen(KitchenFeat.NotSpecified);
                                                }
                                                setClicked1(false);
                                                setClicked2(false);
                                                setClicked3(!clicked3);
                                            }}

                                    >
                                        폐쇄형
                                    </button>
                                </div>
                                <div>
                                    <Modal
                                        isOpen={modalIsOpen3}
                                        style={ExplanationModalStyles}
                                    >
                                        <div style={{
                                            fontFamily: "Noto Sans KR",
                                            color: " #000",
                                            fontSize: "0.625rem",
                                            fontStyle: "normal",
                                            fontWeight: "400",
                                            lineHeight: "normal"
                                        }}>
                                            <br/>
                                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                                <a style={{textAlign: "left"}}>폐쇄형 주방이란?</a><a
                                                style={{textAlign: "right"}}
                                                onClick={() => setModalIsOpen3(false)}>x</a>
                                            </div>
                                            <hr style={{height: "1px", backgroundColor: "black"}}/>
                                            <p style={{
                                                textAlign: 'left',
                                                paddingLeft: "1rem",
                                                paddingRight: "1rem"
                                            }}>•&ensp;차분하게 조리와 정리에 전념할 수 있습니다.</p>
                                            <p style={{
                                                textAlign: 'left',
                                                paddingLeft: "1rem",
                                                paddingRight: "1rem"
                                            }}>•&ensp;또한, 조리할 때 발생하는 오염과 냄새, 연기, 소리 등이 거실에 비교적 전달이 되지 않습니다.
                                            </p>
                                            <p style={{
                                                textAlign: 'left',
                                                paddingLeft: "1rem",
                                                paddingRight: "1rem"
                                            }}>•&ensp;홀에서는 어수선한 모습이 보이지 않아 쾌적한 매장 환경이 만들어집니다.</p>
                                        </div>
                                        <div class="bottom_button_fixed">
                                            <a onClick={() => setModalIsOpen3(false)}>닫기</a>
                                        </div>

                                    </Modal>
                                    <button onClick={() => setModalIsOpen3(true)}
                                            style={{border: "none", backgroundColor: "white", fontSize: "10px"}}>• 폐쇄형이
                                        무엇인가요?
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h4>위치 정보</h4>
                        <hr style={{height: "2px", backgroundColor: "black"}}/>
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
                                   className="input"
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
                            <ImageInput setImg={setImgRepresent} val={imgRepresent}/>
                        </div>
                    </div>
                </div>
                <div style={{
                    position: 'fixed',
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    <button style={{
                        backgroundColor: "#FF4F4F",
                        width: '50%',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => navigate('/hostRegistryStart')}
                    >
                        이전
                    </button>
                    <button style={{
                        backgroundColor: "#525252",
                        width: '50%',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => handleButton()}>다음
                    </button>
                </div>
                <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                    <p>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <p>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                    <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                    <button onClick={() => submit()}>다음</button>
                </Modal>
                <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={"주소는 필수입력사항입니다."}/>
            </div>
        </div>
    );

}

            export default HostRegistry;