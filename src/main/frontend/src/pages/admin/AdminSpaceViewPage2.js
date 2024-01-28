import { useState, useEffect } from "react";
import "../../components/Styles.css";
import {useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import axios from "axios";
import ForAllLogo from "../../components/ForAllLogo";
import { ExplanationModalStyles } from "../../components/ExplanationModalStyles";
import ImageViewer from "../../components/ImageViewer";
import ImagesViewer from "../../components/ImagesViewer";
const AdminSpaceViewPage2 = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = { ...location.state };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const getIdx = (arr, idx) => {
        if (!arr) return null;
        else if (arr.length <= idx) return null
        else return arr[idx]
    }

    return (
        <div className="fontForRegister"
             style={{
                 display: "flex",
                 justifyContent: "space-around",
                 flexDirection: "column",
                 gap: "1.5rem"
             }}>
            <header style={{ textAlign: "center" }}><h3>(1/4) 공간 정보</h3></header>
            <div style={{ padding: '1rem', width: '100%', boxSizing: 'border-box' }} >
                <div >
                    <ForAllLogo />
                    <a className="fontForRegister" >홀 사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "1px", backgroundColor: "black",marginBottom:'0' }} />
                    <a className="fontForRegister" style={{ color: '#7B7B7B' }}>홈페이지에 노출될 사진입니다. 오너님의 공간이 돋보일 수 있도록 예쁘게 찍어주세요!</a>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'right' }} >
                            <div style={{ display: "flex", flexDirection: "column", }} >
                                <a>사진1<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                                    <ImageViewer val={getIdx(data.hallImage, 0)} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'flex-start' }}>
                            <a>사진2<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImageViewer val={getIdx(data.hallImage, 1)} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right' }}>

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <a>사진3<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}} >
                                    <ImageViewer val={getIdx(data.hallImage, 2)} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <a>추가사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImagesViewer vals={data.hallImage.slice(3)} />
                        </div>
                    </div>
                </div>
                <div>
                    <a className="fontForRegister" >주방 사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "1px", backgroundColor: "black",marginBottom:'0' }} />
                    <a className="fontForRegister" style={{ color: '#7B7B7B' }}>홈페이지에 노출될 사진입니다. 오너님의 공간이 돋보일 수 있도록 예쁘게 찍어주세요!</a>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'right' }} >
                            <div style={{ display: "flex", flexDirection: "column", }} >
                                <a>사진1<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                                    <ImageViewer  val={getIdx(data.kitImage, 0)} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'flex-start' }}>
                            <a>사진2<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImageViewer val={getIdx(data.kitImage, 1)} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right' }}>

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <a>사진3<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}} >
                                    <ImageViewer val={getIdx(data.kitImage, 2)} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <a>추가사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImagesViewer vals={data.kitImage.slice(3)} />
                        </div>
                    </div>
                </div>
                <div>
                    <a className="fontForRegister" >메뉴 사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black" }} />
                    <button style={{
                        border: "none",
                        backgroundColor: "white",
                        color: "gray",
                        fontSize: "10px",
                        marginTop: "0",
                        textUnderlineOffset: "auto",
                        textDecoration: "underline gray",
                    }} onClick={() => { setIsModalOpen2(true) }}
                    ><a style={{color:'#7B7B7B'}} >메뉴 사진이 왜 필요한가요?</a></button>
                    <Modal isOpen={isModalOpen2} style={ExplanationModalStyles} ariaHideApp={false}>
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

                                <a style={{ textAlign: "left" }}>메뉴 사진이 왜 필요한가요?</a><a style={{ textAlign: "right" }}
                                                                                       onClick={() => setIsModalOpen2(false)}>x</a>
                            </div>
                            <hr style={{ height: "2px", backgroundColor: "black" }} />
                            <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;매장에서
                                사용중인
                                메뉴를 통해 플레이트 종류를 확인할 수 있습니다.</p>
                            <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;셰프님들이
                                예약
                                시 매장의 다양한 <a style={{ textDecorationLine: "underline" }}>플레이트 종류가</a> 선택이유가 될 수 있으니, 다양한
                                메뉴를
                                올려주세요.</p>

                            <div className="bottom_button_fixed">
                                <a style={{ fontSize: "0.8rem" }} onClick={() => setIsModalOpen2(false)}>닫기</a>
                            </div>

                        </div>
                    </Modal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <div style={{display:'flex',justifyContent:'right'}}>
                            <div style={{display:'flex',flexDirection:'column'}} >
                                <a>사진1<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <ImageViewer val={getIdx(data.menu, 0)} />
                            </div>
                        </div>
                        <div >
                            <a>추가사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImagesViewer vals={data.menu.slice(1)} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100vw', margin: '0px', marginTop: '4rem' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate(-1, data)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate("/adminspaceViewPage3", {state:data})}
                >다음</button>
            </div>

        </div>
    );
}
export default AdminSpaceViewPage2;