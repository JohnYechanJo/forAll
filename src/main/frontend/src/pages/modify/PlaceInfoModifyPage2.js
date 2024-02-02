import React, { useState, useEffect } from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Modal from "react-modal";
import ImageInputs from "../../components/ImageInputs";
import ImageInput from "../../components/ImageInput";
import { ModalStyles } from "../../components/ModalStyles";
import axios from "axios";
import ForAllLogo from "../../components/ForAllLogo";
import { ExplanationModalStyles } from "../../components/ExplanationModalStyles";
import ImageUploader from "../../utils/imageUploader";
import {SmallModalStyles} from "../../components/SmallModalStyles";
const PlaceInfoModify2 = () => {
    const getIdx = (arr, idx) => {
        if (!arr) return null;
        else if (arr.length <= idx) return null
        else return arr[idx]
    }
    const navigate = useNavigate();
    const location = useLocation();
    const data = { ...location.state };
    const [img1, setImg1] = useState(getIdx(data.hallImage, 0));
    const [img2, setImg2] = useState(getIdx(data.hallImage, 1));
    const [img3, setImg3] = useState(getIdx(data.hallImage, 2));
    const [imgAdditional, setImgAdditional] = useState(data.hallImage ? data.hallImage.slice(3) : []);

    const [kitchen1, setKitchen1] = useState(getIdx(data.kitImage, 0));
    const [kitchen2, setKitchen2] = useState(getIdx(data.kitImage, 1));
    const [kitchen3, setKitchen3] = useState(getIdx(data.kitImage, 2));
    const [kitchenAdditional, setKitchenAdditional] = useState(data.kitImage ? data.kitImage.slice(3) : []);

    const [menu1, setMenu1] = useState(getIdx(data.menu, 0));
    const [menuAdditional, setMenuAdditional] = useState(data.menu ? data.menu.slice(1) : []);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    let isPublic = false;
    const [pending, setPending] = useState(false);
    const handleButton = () => {
        if ((img1) && (img2) && (img3) && (kitchen1) && (kitchen2) && (kitchen3) && (menu1)) {
            isPublic = true;
            submit();
        }
        else {
            setIsModalOpen(true);
        }
    };
    const submit = async () => {
        if(pending) return;
        setPending(true);
        data.isPublic = data.isPublic && isPublic;
        const userId = sessionStorage.getItem("user_id");
        const [hallImage, kitImage, menu] = await Promise.all(
            [
                Promise.all([img1, img2, img3, ...imgAdditional].filter((img) => typeof (img) === 'object').map( (img) =>  ImageUploader(img, userId))),
                Promise.all([kitchen1, kitchen2, kitchen3, ...kitchenAdditional].filter((img) => typeof (img) === 'object').map( (img) =>  ImageUploader(img, userId))),
                Promise.all([menu1, ...menuAdditional].filter((img) => typeof (img) === 'object').map( (img) =>  ImageUploader(img, userId)))
            ]
        )
        navigate("/placeInfoModify3", {
            state: {
                ...data,
                hallImage:hallImage,
                kitImage:kitImage,
                menu:menu
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
            <header style={{ textAlign: "center", marginBottom:'-1rem' }}><p>(1/4) 공간 정보</p></header>
            <div style={{ padding: '1rem', width: '100%', boxSizing: 'border-box' }} >
                <div >
                    <ForAllLogo />
                    <a className="fontForRegister" >홀 사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black",marginBottom:'0' }} />
                    <a className="fontForRegister" style={{ color: '#7B7B7B' }}>홈페이지에 노출될 사진입니다. 오너님의 공간이 돋보일 수 있도록 예쁘게 찍어주세요!</a>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'right' }} >
                            <div style={{ display: "flex", flexDirection: "column", }} >
                                <a>사진1<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                                    <ImageInput setImg={setImg1} val={img1} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'flex-start' }}>
                            <a>사진2<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImageInput setImg={setImg2} val={img2} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right' }}>
                            
                            <div style={{ display: "flex", flexDirection: "column" }}>
                            <a>사진3<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}} >
                                <ImageInput setImg={setImg3} val={img3} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <a>추가사진</a>
                            <ImageInputs setImg={setImgAdditional} vals={imgAdditional} />
                        </div>
                    </div>
                </div>
                <div>
                    <a className="fontForRegister" >주방 사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black",marginBottom:'0' }} />
                    <a className="fontForRegister" style={{ color: '#7B7B7B' }}>홈페이지에 노출될 사진입니다. 오너님의 공간이 돋보일 수 있도록 예쁘게 찍어주세요!</a>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'right' }} >
                            <div style={{ display: "flex", flexDirection: "column", }} >
                                <a>사진1<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{ justifyContent: 'center', alignItems: 'flex-end' }} >
                                    <ImageInput setImg={setKitchen1} val={kitchen1} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'flex-start' }}>
                            <a>사진2<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImageInput setImg={setKitchen2} val={kitchen2} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right' }}>
                            
                            <div style={{ display: "flex", flexDirection: "column" }}>
                            <a>사진3<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}} >
                                <ImageInput setImg={setKitchen3} val={kitchen3} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <a>추가사진</a>
                            <ImageInputs setImg={setKitchenAdditional} vals={kitchenAdditional} />
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

                            <div className="bottom_button_relative">
                                <a style={{ fontSize: "0.8rem" }} onClick={() => setIsModalOpen2(false)}>닫기</a>
                            </div>

                        </div>
                    </Modal>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyContent: 'center', marginTop: '2rem' }}>
                        <div style={{display:'flex',justifyContent:'right'}}>
                            <div style={{display:'flex',flexDirection:'column'}} >
                            <a>사진1<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImageInput setImg={setMenu1} val={menu1} />
                            </div>
                        </div>
                        <div >
                            <a>추가사진</a>
                            <ImageInputs setImg={setMenuAdditional} vals={menuAdditional} />
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
                    onClick={() => handleButton()}
                >다음</button>
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
        </div>
    );
}
export default PlaceInfoModify2;