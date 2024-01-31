
import React, { useState } from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import iImg from "../../components/icons/i.png";
import { ModalStyles } from "../../components/ModalStyles";
import { ModalForAddress } from "../../components/ModalForAddress";
import DaumPost from "../../components/DaumPost";
import { KitchenFeat } from "../../utils/enums";
import ForAllLogo from "../../components/ForAllLogo";
import ImageInput from "../../components/ImageInput";
import Alert from "../../components/Alert";
import { ExplanationModalStyles } from "../../components/ExplanationModalStyles";
import {SmallModalStyles} from "../../components/SmallModalStyles";
import ImageUploader from "../../utils/imageUploader";
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
    const [modalOpen1, setModalOpen1] = useState(false);
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
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        const img = await ImageUploader(imgRepresent, userId);
        navigate("/hostRegistry2", {
            state: {
                placeName: placeName,
                placeIntro: placeIntro,
                placeIntroDetail: placeIntroDetail,
                kitchen: kitchen,
                fullAddress: fullAddress,
                webSite: webSite,
                placeInfo: placeInfo,
                imgRepresent: img,
                isPublic: isPublic,
                addressDetail: addressDetail,
                address: address,
            }
        });
    };
    return (

        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",

            }}>
            <header style={{ textAlign: "center",marginBottom:"-0.5rem" }}><p>(1/4) 공간 정보</p></header>
            <ForAllLogo />
            <div style={{ width: '100%', padding: '1rem', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }} >
                <div >
                    <div style={{ gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom:"-1rem" }}>
                            <a className="fontForRegister">공간명을 입력해주세요.<span style={{ color: '#FF2929' }} >*</span></a>
                            <hr style={{ height: "2px", backgroundColor: "black" }} />
                        </div>
                        <div style={{ marginBottom:"-1rem" }}>
                            <div className="fontForRegister" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <a className="fontForRegister">공간명<span style={{color: '#FF2929'}}>*</span></a>
                                <p>
                                    <span>{inputCount}</span>
                                    <span>/18자</span>
                                </p>
                            </div>

                            <input type="text" placeholder="오스테리아 로에로" className="input" style={{width: '98%'}}
                                   onChange={onInputHandler} maxLength="18"/>
                            <div style={{marginTop: '0.5rem', justifyContent: 'left', display: 'flex'}}>
                                <img src={iImg} alt="iImg"
                                     style={{width: '1rem', height: '1rem', flexShrink: 0}}/>
                                &ensp;
                                <a className="fontForRegister" style={{paddingTop: "0.05rem"}}>사용 가능한 특수문자: (,),(-),(.),(@),(/)</a>
                            </div>
                        </div>
                        <div style={{ marginBottom:"-1rem" }}>
                            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                <a className="fontForRegister">공간 한 줄 소개<span style={{ color: '#FF2929' }} >*</span></a>
                                <p className="fontForRegister">
                                    <span>{inputCount2}</span>
                                    <span>/18자</span>
                                </p>
                            </div>
                            <input type="text" placeholder="이탈리아 전통 가정식을 제공하는 와인바" className="input" style={{width: '98%'}}
                                onChange={onInputHandler2} maxLength="18" />
                        </div>
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                <a className="fontForRegister">공간 소개<span style={{ color: '#FF2929' }} >*</span></a>
                                <p className="fontForRegister">
                                    <span >{inputCount3}</span>
                                    <span>/300자</span>
                                    <span style={{ color: "red" }}>(최소 20자)</span>
                                </p>
                            </div>
                            <textarea type="text" placeholder="공간에 대한 설명을 기재해주세요." style={{ height: "6.25rem", width:" 98%" }}
                                onChange={onInputHandler3} maxLength="300" minLength="20"
                                className="input"
                            />
                        </div>
                        <div>
                            <a className="fontForRegister">주방 특성<span style={{ color: '#FF2929' }} >*</span></a>
                            <div className="fontForRegister" style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                <div style={{ flexDirection: "column", display: "flex" }}>
                                    <div className="fontForRegister">
                                        <button className="square_button"
                                            name="kitchen"
                                            value={KitchenFeat.Open}
                                            style={{
                                                backgroundColor: clicked1 ? "black" : "white",
                                                color: clicked1 ? "white" : "black",
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
                                                <br />
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <a style={{ textAlign: "left" }}>오픈형 주방이란?</a><a
                                                        style={{ textAlign: "right" }}
                                                        onClick={() => setModalIsOpen1(false)}>x</a>
                                                </div>
                                                <hr style={{ height: "1px", backgroundColor: "black" }} />
                                                <p style={{
                                                    textAlign: 'left',
                                                    paddingLeft: "5%",
                                                    paddingRight: "5%"
                                                }}>•&ensp;주방, 홀이 하나로 결합된 형태입니다.</p>
                                                <p style={{
                                                    textAlign: 'left',
                                                    paddingLeft: "5%",
                                                    paddingRight: "5%"
                                                }}>•&ensp;주방과 홀이 결합되면서 음식을 만드는 사람과 가까이할 수 있어
                                                    대면형보다 더 긴밀한 커뮤니케이션이 가능하며, 요리를 하는 동시에 식사가 가능한 형태를 띕니다.
                                                </p>
                                            </div>
                                            <div class="bottom_button_relative">
                                                <a onClick={() => setModalIsOpen1(false)}>닫기</a>
                                            </div>

                                        </Modal>
                                        <button onClick={() => setModalIsOpen1(true)}
                                            style={{ border: "none", backgroundColor: "white", fontSize: "10px" }}>• 오픈형이
                                            무엇인가요?
                                        </button>
                                    </div>
                                </div>
                                <div style={{ flexDirection: "column" }}>
                                    <div>
                                        <button className="square_button"
                                            name="kitchen"
                                            value={KitchenFeat.Face}
                                            style={{
                                                backgroundColor: clicked2 ? "black" : "white",
                                                color: clicked2 ? "white" : "black",

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
                                                <br />
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <a style={{ textAlign: "left" }}>대면형 주방이란?</a><a
                                                        style={{ textAlign: "right" }}
                                                        onClick={() => setModalIsOpen2(false)}>x</a>
                                                </div>
                                                <hr style={{ height: "1px", backgroundColor: "black" }} />
                                                <p style={{
                                                    textAlign: 'left',
                                                    paddingLeft: "5%",
                                                    paddingRight: "5%"
                                                }}>•&ensp;부엌과 다이닝룸이 한 공간에 자리하는 형태입니다.</p>
                                                <p style={{
                                                    textAlign: 'left',
                                                    paddingLeft: "5%",
                                                    paddingRight: "5%"
                                                }}>•&ensp;식탁이 따로 놓여 있지만, 음식을 만드는 사람의 얼굴을 보며
                                                    대화를 나눌 수 있는 구조입니다.</p>
                                            </div>
                                            <div class="bottom_button_relative">
                                                <a onClick={() => setModalIsOpen2(false)}>닫기</a>
                                            </div>
                                        </Modal>
                                        <button onClick={() => setModalIsOpen2(true)}
                                            style={{ border: "none", backgroundColor: "white", fontSize: "10px" }}>• 대면형이
                                            무엇인가요?
                                        </button>
                                    </div>
                                </div>
                                <div style={{ flexDirection: "column" }}>
                                    <div>
                                        <button className="square_button"
                                            name="kitchen"
                                            value={KitchenFeat.Close}
                                            style={{
                                                backgroundColor: clicked3 ? "black" : "white",
                                                color: clicked3 ? "white" : "black",

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
                                                <br />
                                                <div style={{ display: "flex", justifyContent: "space-between" }}>
                                                    <a style={{ textAlign: "left" }}>폐쇄형 주방이란?</a><a
                                                        style={{ textAlign: "right" }}
                                                        onClick={() => setModalIsOpen3(false)}>x</a>
                                                </div>
                                                <hr style={{ height: "1px", backgroundColor: "black" }} />
                                                <p style={{
                                                    textAlign: 'left',
                                                    paddingLeft: "5%",
                                                    paddingRight: "5%"
                                                }}>•&ensp;차분하게 조리와 정리에 전념할 수 있습니다.</p>
                                                <p style={{
                                                    textAlign: 'left',
                                                    paddingLeft: "5%",
                                                    paddingRight: "5%"
                                                }}>•&ensp;또한, 조리할 때 발생하는 오염과 냄새, 연기, 소리 등이 거실에 비교적 전달이 되지 않습니다.
                                                </p>
                                                <p style={{
                                                    textAlign: 'left',
                                                    paddingLeft: "5%",
                                                    paddingRight: "5%"
                                                }}>•&ensp;홀에서는 어수선한 모습이 보이지 않아 쾌적한 매장 환경이 만들어집니다.</p>
                                            </div>
                                            <div class="bottom_button_relative">
                                                <a onClick={() => setModalIsOpen3(false)}>닫기</a>
                                            </div>

                                        </Modal>
                                        <button onClick={() => setModalIsOpen3(true)}
                                            style={{ border: "none", backgroundColor: "white", fontSize: "10px" }}>• 폐쇄형이
                                            무엇인가요?
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="fontForRegister" style={{ marginTop: '1.5rem' }} >
                            <a>위치 정보<span style={{ color: '#FF2929' }} >*</span></a>
                            <hr style={{ height: "2px", backgroundColor: "black", marginBottom: '1rem' }} />
                            <a>주소(위치)<span style={{ color: '#FF2929' }} >*</span></a>
                            <div style={{ display: 'flex' ,marginBottom:"-1rem" }} >
                                <input value={address} disabled={true} placeholder="실제 서비스가 되는 공간의 주소를 입력해주세요." style={{ width: '80%',height:'1.875rem' }} className="inputForRegister" />
                                <Modal isOpen={modalOpen1} >
                                    <DaumPost setAddress={(e) => {
                                        setAddress(e);
                                        setModalOpen1(false);
                                    }} />
                                    <button onClick={() => setModalOpen1(false)}>닫기</button>
                                </Modal>
                                <button onClick={() => setModalOpen1(true)} style={{ width: "3.4375rem", height: "1.875rem", fontSize: "0.625rem", backgroundColor: "black", color: "white", borderRadius: '0.375rem', marginLeft: '0.31rem' }} >주소등록</button>
                            </div>
                            <div>
                                {/* <span>{(address !== null) ? address : null} </span> */}
                                <span>
                                    <input type="text"
                                        placeholder="상세 주소"
                                        hidden={(address === null)}
                                        onChange={(e) => {
                                            setAddressDetail(e.target.value);
                                            setFullAddress(address + " " + e.target.value);
                                        }}
                                        style={{ marginTop: '1.5rem' , width: '98%' }}
                                        className="input"
                                    />
                                </span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }} >
                                <a>
                                    • 공간 주소는 최초 등록 이후 직접 변경할 수 없습니다.
                                </a>
                                <a>
                                    • 고객센터를 통해 주소 변경을 요청해주세요.
                                </a>
                            </div>
                        </div>
                        <div className="fontForRegister">
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                <a>상세 위치 정보<span style={{ color: '#FF2929' }} >*</span></a>
                                <p>
                                    <span>{inputCount4}</span>
                                    <span>/18자</span>
                                </p>
                            </div>
                            <input type="text" placeholder="ex.성수역 4번출구 도보 1분 거리"
                                className="input" style={{width: '98%'}}
                                onChange={onInputHandler4} maxLength="18" />
                            <div style={{ display: 'flex', flexDirection: 'column' }} >
                                <a>
                                    • 작성하신 위치정보는 검색에 영향을 미치지 않습니다.
                                </a>
                            </div>
                        </div>
                        <div className="fontForRegister">
                            <a>웹사이트<span style={{ color: '#FF2929' }} >*</span></a>
                            <input type="text" placeholder="웹사이트 URL을 입력해주세요."
                                className="input" style={{width: '98%'}}
                                onChange={(e) => setWebSite(e.target.value)} />
                            <div style={{ display: 'flex', flexDirection: 'column' }} >
                                <a>
                                    • 인스타그램, 페이스북, 네이버지도, 카카오지도, 구글지도 등
                                </a>
                                <a style={{ marginLeft: "0.3rem" }}>
                                    공간을 PR할 수 있는 웹사이트면 무엇이든지 좋습니다.
                                </a>
                            </div>
                        </div>
                        <div className="fontForRegister" style={{ display: 'flex', flexDirection: 'column' }} >
                            <a>
                                <span>대표 이미지<span style={{ color: '#FF2929' }} >*</span></span>
                            </a>
                            <a style={{ color: '#C4C4C4' }} >
                                매장의 간판이 보이는 이미지를 첨부해 주세요.
                            </a>
                            <div>
                                <ImageInput setImg={setImgRepresent} val={imgRepresent} />
                            </div>
                        </div>
                    </div>

                    <Modal isOpen={isModalOpen} ariaHideApp={false} style={SmallModalStyles}>
                        <div style={{
                            justifyContent: "center", alignItems: "center",
                            fontFamily: "Noto Sans KR",
                            color: " #000",
                            fontSize: "1.25rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "normal",

                            height: "100%",
                            display: "flex",
                            flexDirection: "column",

                        }}>
                            <a style={{fontSize: '0.9375rem'}}>현재 필수 입력사항이 모두 기입되지 않았습니다.</a>
                            <p style={{fontSize: '0.9375rem'}}>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                        </div>
                        <div style={{
                            display: 'flex',
                            width: '100%',
                            margin: '0px',
                            marginTop: '4rem',
                            bottom: '0',
                            position: 'fixed',
                            fontSize: "0.9375rem",
                            fontWeight: "400"
                        }}>
                            <button style={{
                                backgroundColor: "#FF4F4F",

                                width: '50%',
                                bottom: '0',
                                height: '3.125rem',
                                color: 'white',
                                border: 'none',
                                lineHeight: '1.875rem',
                                textAlign: 'center'
                            }}
                                    onClick={() => setIsModalOpen(false)}
                            >
                                마저 입력하기
                            </button>
                            <button style={{
                                backgroundColor: "#000",

                                width: '50%',
                                bottom: '0',
                                height: '3.125rem',
                                color: 'white',
                                border: 'none',
                                lineHeight: '1.875rem',
                                textAlign: 'center'
                            }}
                                    onClick={() => submit()}
                            >
                                넘어가기
                            </button>
                        </div>
                    </Modal>
                    <Modal isOpen={pending} ariaHideApp={false} style={SmallModalStyles}>
                        <div style={{
                            justifyContent: "center", alignItems: "center",
                            fontFamily: "Noto Sans KR",
                            color: " #000",
                            fontSize: "1.25rem",
                            fontStyle: "normal",
                            fontWeight: "400",
                            lineHeight: "normal",

                            height: "100%",
                            display: "flex",
                            flexDirection: "column",

                        }}>
                            <a style={{fontSize: '0.9375rem'}}>현재 입력사항을 업로드 중입니다.</a>
                            <p style={{fontSize: '0.9375rem'}}>잠시만 기다려주세요.</p>
                        </div>
                    </Modal>
                    <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={"주소는 필수입력사항입니다."} />
                </div>
            </div>
            <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => navigate(-1)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => handleButton()}
                >다음</button>
            </div>
        </div>
    );

}

export default HostRegistry;