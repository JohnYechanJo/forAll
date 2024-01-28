import {Link, useLocation, useNavigate, useParams} from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/home/Header";
import axios from "axios";
import ImageInput from "../../components/ImageInput";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import { KitchenFeat } from "../../utils/enums";
import ForAllLogo from "../../components/ForAllLogo";
import {ExplanationModalStyles} from "../../components/ExplanationModalStyles";
import ImageViewer from "../../components/ImageViewer";
const AdminSpaceViewPage1 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = { ...location.state };
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);

    return (
        <div
            className="fontForRegister"
            style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
            }}
        >
            <ForAllLogo />
            <header style={{ textAlign: "center" }}><h3>(1/4) 공간 정보</h3></header>
            <div style={{ padding: '1rem', width: '100%', boxSizing: 'border-box', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
                <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div>
                            <a>공간명을 입력해주세요.<span style={{ color: '#FF2929' }} >*</span></a>
                            <hr style={{ height: "2px", backgroundColor: "black" }} />
                        </div>
                        <div >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <a>공간명<span style={{ color: '#FF2929' }} >*</span></a>
                                <p>
                                    <span>{data.name.length}</span>
                                    <span>/18자</span>
                                </p>
                            </div>
                            <input
                                disabled={true}
                                type="text"
                                defaultValue={data.name}
                                className="input"
                                maxLength="17"
                            />
                            <a>❕사용 가능한 특수문자: (,),(-),(.),(@),(/)</a>
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                <a>공간 한 줄 소개<span style={{ color: '#FF2929' }} >*</span></a>
                                <p>
                                    <span>{data.spaceBrief.length}</span>
                                    <span>/18자</span>
                                </p>
                            </div>
                            <input
                                disabled={true}
                                type="text"
                                defaultValue={data.spaceBrief}
                                className="input"
                                maxLength="17"
                            />
                        </div>

                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                                <a>공간 소개<span style={{ color: '#FF2929' }} >*</span></a>
                                <p>
                                    <span>{data.spaceIntro.length}</span>
                                    <span>/300자</span>
                                    <span style={{ color: "red" }}>(최소 20자)</span>
                                </p>
                            </div>
                            <textarea
                                disabled={true}
                                type="text"
                                defaultValue={data.spaceIntro}
                                className="input"
                                style={{ height: "6.25rem" }}
                                maxLength="299"
                                minLength="19"
                            />
                        </div>
                        <div>
                            <a>주방 특성<span style={{ color: '#FF2929' }} >*</span></a>
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                                <div style={{ flexDirection: "column", display: "flex" }}>
                                    <div>
                                        <button className="square_button"
                                                disabled={true}
                                                name="kitchen"
                                                value={KitchenFeat.Open}
                                                style={{
                                                    backgroundColor: data.kitchenFeat === KitchenFeat.Open ? "black" : "white",
                                                    color: data.kitchenFeat === KitchenFeat.Open ? "white" : "black",
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
                                            <div class="bottom_button_fixed">
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
                                                disabled={true}
                                                name="kitchen"
                                                value={KitchenFeat.Face}
                                                style={{
                                                    backgroundColor: data.kitchenFeat === KitchenFeat.Face ? "black" : "white",
                                                    color: data.kitchenFeat === KitchenFeat.Face ? "white" : "black",

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
                                            <div class="bottom_button_fixed">
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
                                                disabled={true}
                                                name="kitchen"
                                                value={KitchenFeat.Close}
                                                style={{
                                                    backgroundColor: data.kitchenFeat === KitchenFeat.Close ? "black" : "white",
                                                    color: data.kitchenFeat === KitchenFeat.Close ? "white" : "black",
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
                                            <div class="bottom_button_fixed">
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
                    </div>
                    <div style={{ marginTop: '1.5rem' }} >
                        <a>위치 정보<span style={{ color: '#FF2929' }} >*</span></a>
                        <hr style={{ height: "1px", backgroundColor: "black", marginBottom: '1rem' }} />
                        <a>주소(위치)<span style={{ color: '#FF2929' }} >*</span></a>
                        <div>
                            <span className="input">{data.address}</span>
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
                    <div style={{ marginTop: '1.5rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                            <a>상세 위치 정보<span style={{ color: '#FF2929' }} >*</span></a>
                            <p>
                                <span>{data.addressBrief.length}</span>
                                <span>/18자</span>
                            </p>
                        </div>
                        <input
                            disabled={true}
                            type="text"
                            defaultValue={data.addressBrief}
                            maxLength="17"
                            className="input"
                        />
                        <a>• 작성하신 위치정보는 검색에 영향을 미치지 않습니다.</a>

                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                        <a>웹사이트<span style={{ color: '#FF2929' }} >*</span></a>
                        <input
                            disabled={true}
                            type="text"
                            defaultValue={data.website}
                            className="input"
                        />
                        <div style={{ display: 'flex', flexDirection: 'column' }} >
                            <a>
                                • 인스타그램, 페이스북, 네이버지도, 카카오지도, 구글지도 등
                            </a>
                            <a style={{ marginLeft: "0.3rem" }}>
                                공간을 PR할 수 있는 웹사이트면 무엇이든지 좋습니다.
                            </a>
                        </div>
                    </div>
                    <div style={{ marginTop: '1.5rem' }}>
                        <div style={{display:'flex',flexDirection:'column'}} >
                            <a>
                                <span>대표 이미지<span style={{ color: '#FF2929' }} >*</span></span>
                            </a>
                            <a style={{ color: '#C4C4C4' }} >
                                매장의 간판이 보이는 이미지를 첨부해 주세요.
                            </a>
                        </div>
                        <div>
                            <ImageViewer val={data.mainImage} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100vw', margin: '0px', marginTop: '4rem' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate(-1)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={()=>navigate("/adminspaceViewPage2", {state:data})}
                >다음</button>
            </div>
        </div>
    );
};

export default AdminSpaceViewPage1;