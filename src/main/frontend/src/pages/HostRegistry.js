import {useState} from "react";
import "../components/Styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
import ImageInput from "../components/ImageInput";
import {ModalStyles} from "../components/ModalStyles";
const HostRegistry = () => {
    const [inputCount, setInputCount] = useState(0);
    const [inputCount2, setInputCount2] = useState(0);
    const [inputCount3, setInputCount3] = useState(0);
    const [kitchen, setKitchen] = useState([]);
    const [imgRepresent, setImgRepresent] = useState("");
    const [imgRight, setImgRight] = useState("");
    const [imgLeft, setImgLeft] = useState("");
    const [imgAll, setImgAll] = useState("");
    const [imgBack, setImgBack] = useState("");
    const [imgFront, setImgFront] = useState("");
    const [imgAdditional, setImgAdditional] = useState("");
    const [kitchenRight, setKitchenRight] = useState("");
    const [kitchenLeft, setKitchenLeft] = useState("");
    const [kitchenAll, setKitchenAll] = useState("");
    const [kitchenBack, setKitchenBack] = useState("");
    const [kitchenFront, setKitchenFront] = useState("");
    const [kitchenAdditional, setKitchenAdditional] = useState("");
    const [menu1, setMenu1] = useState("");
    const [menu2, setMenu2] = useState("");
    const [menu3, setMenu3] = useState("");
    const [menu4, setMenu4] = useState("");
    const [menuAdditional, setMenuAdditional] = useState("");
    const [hiddenRight, setHiddenRight] = useState(false);
    const [hiddenLeft, setHiddenLeft] = useState(false);
    const [hiddenAll, setHiddenAll] = useState(false);
    const [hiddenBack, setHiddenBack] = useState(false);
    const [hiddenFront, setHiddenFront] = useState(false);
    const [hiddenAdditional, setHiddenAdditional] = useState(false);
    const [hiddenKRight, setHiddenKRight] = useState(false);
    const [hiddenKLeft, setHiddenKLeft] = useState(false);
    const [hiddenKAll, setHiddenKAll] = useState(false);
    const [hiddenKBack, setHiddenKBack] = useState(false);
    const [hiddenKFront, setHiddenKFront] = useState(false);
    const [hiddenKAdditional, setHiddenKAdditional] = useState(false);
    const [hiddenRepresent, setHiddenRepresent] = useState(false);
    const [hiddenMenu1, setHiddenMenu1] = useState(false);
    const [hiddenMenu2, setHiddenMenu2] = useState(false);
    const [hiddenMenu3, setHiddenMenu3] = useState(false);
    const [hiddenMenu4, setHiddenMenu4] = useState(false);
    const [hiddenMenuAdditional, setHiddenMenuAdditional] = useState(false);
    const [clicked1, setClicked1] = useState(false);
    const [clicked2, setClicked2] = useState(false);
    const [clicked3, setClicked3] = useState(false);
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);
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
    };
    const onInputHandler2 = (e) => {
        setInputCount2(e.target.value.length);
    }
    const onInputHandler3 = (e) => {
        setInputCount3(e.target.value.length);
    }

    return (
        <div>
            <div>
                <header style={{textAlign: "center"}}><h3>1. 공간 정보</h3></header>
                <h4>공간명을 입력해주세요.</h4>
                <hr/>
                <h4>공간명</h4>
                <p>
                    <span>{inputCount}</span>
                    <span>/18자</span>
                </p>
                <input type="text" placeholder="오스테리아 로에로" style={{width: "75%", height: "40px"}}
                       onChange={onInputHandler} maxLength="17"/>
                <h5>❕사용 가능한 특수문자: (,),(-),(.),(@),(/)</h5>
                <h4>공간 한 줄 소개</h4>
                <p>
                    <span>{inputCount2}</span>
                    <span>/18자</span>
                </p>
                <input type="text" placeholder="이탈리아 전통 가정식을 제공하는 와인바" style={{width: "75%", height: "40px"}}
                       onChange={onInputHandler2} maxLength="17"/>
                <h4>공간 소개</h4>
                <p>
                    <span>{inputCount3}</span>
                    <span>/300자</span>
                    <span style={{color: "red"}}>(최소 20자)</span>
                </p>
                <textarea type="text" placeholder="공간에 대한 설명을 기재해주세요." style={{width: "75%", height: "200px"}}
                          onChange={onInputHandler3} maxLength="299" minLength="19"/>
                <div>
                    <h4>주방 특성</h4>
                    <div style={{display: "flex"}}>
                        <button className="button"
                                name="kitchen"
                                value="open"
                                disabled= {clicked2 || clicked3}
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
                                    console.log(selected);
                                    setClicked1(!clicked1);
                                    if (clicked1 === false) {
                                        setKitchen("");
                                    }
                                    ;
                                }}
                        >
                            오픈형
                        </button>
                        <button className="button"
                                name="kitchen"
                                value="faced"
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
                                    console.log(selected);
                                    setClicked2(!clicked2);
                                    if (clicked2 === false) {
                                        setKitchen("");
                                    }
                                    ;
                                }}
                        >
                            대면형
                        </button>
                        <button className="button"
                                name="kitchen"
                                value="closed"
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
                                    console.log(selected);
                                    setClicked3(!clicked3);
                                    if (clicked3 === false) {
                                        setKitchen("");
                                    }
                                    ;
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
                <hr/>
            </div>
            <div>
                <h4>위치 정보</h4>
            </div>
            <div>
                <h4>
                    <span>대표 이미지 </span>
                    <span>2048•1158 권장, 최대 3MB</span>
                </h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenRepresent}/></span>
                    <ImageInput setImg={setImgRepresent} setHidden={setHiddenRepresent}/>
                </p>
                <h4>홀 사진</h4>
                <hr/>
                <h4>홀 우측면</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenRight}/></span>
                    <ImageInput setImg={setImgRight} setHidden={setHiddenRight}/>
                </p>
                <h4>홀 좌측면</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenLeft}/></span>
                    <ImageInput setImg={setImgLeft} setHidden={setHiddenLeft}/>
                </p>
                <h4>홀 정면</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenFront}/></span>
                    <ImageInput setImg={setImgFront} setHidden={setHiddenFront}/>
                </p>
                <h4>홀 후면</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenBack}/></span>
                    <ImageInput setImg={setImgBack} setHidden={setHiddenBack}/>
                </p>
                <h4>홀 전체샷</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenAll}/></span>
                    <ImageInput setImg={setImgAll} setHidden={setHiddenAll}/>
                </p>
                <h4>추가사진</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenAdditional}/></span>
                    <ImageInput setImg={setImgAdditional} setHidden={setHiddenAdditional}/>
                </p>
            </div>
            <div>
                <h4>주방 사진</h4>
                <hr/>
                <h4>주방 우측면</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenKRight}/></span>
                    <ImageInput setImg={setKitchenRight} setHidden={setHiddenKRight}/>
                </p>
                <h4>주방 좌측면</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenKLeft}/></span>
                    <ImageInput setImg={setKitchenLeft} setHidden={setHiddenKLeft}/>
                </p>
                <h4>주방 정면</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenKFront}/></span>
                    <ImageInput setImg={setKitchenFront} setHidden={setHiddenKFront}/>
                </p>
                <h4>주방 후면</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenKBack}/></span>
                    <ImageInput setImg={setKitchenBack} setHidden={setHiddenKBack}/>
                </p>
                <h4>주방 전체샷</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenKAll}/></span>
                    <ImageInput setImg={setKitchenAll} setHidden={setHiddenKAll}/>
                </p>
                <h4>추가사진</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenKAdditional}/></span>
                    <ImageInput setImg={setKitchenAdditional} setHidden={setHiddenKAdditional}/>
                </p>
            </div>
            <div>
                <h4>메뉴 사진</h4>
                <hr/>
                <h4>메뉴 1</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenMenu1}/></span>
                    <ImageInput setImg={setMenu1} setHidden={setHiddenMenu1}/>
                </p>
                <h4>메뉴 2</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenMenu2}/></span>
                    <ImageInput setImg={setMenu2} setHidden={setHiddenMenu2}/>
                </p>
                <h4>메뉴 3</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenMenu3}/></span>
                    <ImageInput setImg={setMenu3} setHidden={setHiddenMenu3}/>
                </p>
                <h4>메뉴 4</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenMenu4}/></span>
                    <ImageInput setImg={setMenu4} setHidden={setHiddenMenu4}/>
                </p>
                <h4>추가사진</h4>
                <p>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "75%", height: "40px", float: "left"}}
                                 hidden={hiddenMenuAdditional}/></span>
                    <ImageInput setImg={setMenuAdditional} setHidden={setHiddenMenuAdditional}/>
                </p>
            </div>
            <div>
                <Link to="/hostRegistryStart">
                    <button className="button" style={{backgroundColor: "black"}}>이전</button>
                </Link>

                <Link to="/placeRegisterPage3">
                    <button className="button" style={{backgroundColor: "red" }} >저장</button>
                    </Link>
            </div>
        </div>

    );
};
export default HostRegistry;