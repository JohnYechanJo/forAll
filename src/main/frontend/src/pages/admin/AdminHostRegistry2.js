import { useState, useEffect } from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation, useParams } from "react-router-dom";
import Modal from "react-modal";
import ImageInputs from "../../components/ImageInputs";
import ImageInput from "../../components/ImageInput";
import { ModalStyles } from "../../components/ModalStyles";
import axios from "axios";
import ForAllLogo from "../../components/ForAllLogo";
import { ExplanationModalStyles } from "../../components/ExplanationModalStyles";
import ImageViewer from "../../components/ImageViewer";
import ImagesViewer from "../../components/ImagesViewer";
const AdminHostRegistry2 = () => {
    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [imgAdditional, setImgAdditional] = useState([]);

    const [kitchen1, setKitchen1] = useState("");
    const [kitchen2, setKitchen2] = useState("");
    const [kitchen3, setKitchen3] = useState("");
    const [kitchenAdditional, setKitchenAdditional] = useState([]);

    const [menu1, setMenu1] = useState("");
    const [menuAdditional, setMenuAdditional] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const data = { ...location.state };
    const [dbData, setDbData] = useState({});
    let isPublic = false;
    const getIdx = (arr, idx) => {
        if (!arr) return null;
        else if (arr.length <= idx) return null
        else return arr[idx]
    }
    const handleButton = () => {
        if ((img1 !== "") && (img2 !== "") && (img3 !== "") && (kitchen1 !== "") && (kitchen2 !== "") && (kitchen3 !== "") && (menu1 !== "") && (menuAdditional !== "")) {
            isPublic = true;
            submit();
        }
        else {
            setIsModalOpen(true);
        }
    };
    //dbdata에 db에 저장되어 있는 정보들을 담아서 사용한다.
    const downloadData = async () => {
        let spaceid;
        await axios.get("/api/v1/space/userSpace/" + sessionStorage.getItem("user_id"))
            .then((res) => spaceid = res.data[0])
            .catch((err) => console.error(err));
        axios
            .get("/api/v1/space/" + spaceid)
            .then((res) => {
                setDbData(res.data)
                setImg1(getIdx(res.data.hallImage, 0));
                setImg2(getIdx(res.data.hallImage, 1));
                setImg3(getIdx(res.data.hallImage, 2));
                setImgAdditional(res.data.hallImage.slice(3));
                setKitchen1(getIdx(res.data.kitImage, 0));
                setKitchen2(getIdx(res.data.kitImage, 1));
                setKitchen3(getIdx(res.data.kitImage, 2));
                setKitchenAdditional(res.data.kitImage.slice(3));
                setMenu1(getIdx(res.data.menu, 0));
                setMenuAdditional(res.data.menu.slice(1));
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        downloadData();
    }, []);
    const submit = () => {
        data.isPublic = data.isPublic && isPublic;
        navigate("/placeInfoModify3", {
            state: {
                ...data,
                img1: img1,
                img2: img2,
                img3: img3,
                imgAdditional: imgAdditional,
                kitchen1: kitchen1,
                kitchen2: kitchen2,
                kitchen3: kitchen3,
                kitchenAdditional: kitchenAdditional,
                menu1: menu1,
                menuAdditional: menuAdditional,
            }
        });
    };
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
                                    <ImageViewer setImg={setImg1} val={img1} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'flex-start' }}>
                            <a>사진2<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImageViewer setImg={setImg2} val={img2} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right' }}>

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <a>사진3<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}} >
                                    <ImageViewer setImg={setImg3} val={img3} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <a>추가사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImagesViewer setImg={setImgAdditional} vals={imgAdditional} />
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
                                    <ImageViewer setImg={setKitchen1} val={kitchen1} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'center', alignItems: 'flex-start' }}>
                            <a>사진2<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImageViewer setImg={setKitchen2} val={kitchen2} />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'right' }}>

                            <div style={{ display: "flex", flexDirection: "column" }}>
                                <a>사진3<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}} >
                                    <ImageViewer setImg={setKitchen3} val={kitchen3} />
                                </div>
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                            <a>추가사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImagesViewer setImg={setKitchenAdditional} vals={kitchenAdditional} />
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
                                <ImageViewer setImg={setMenu1} val={menu1} />
                            </div>
                        </div>
                        <div >
                            <a>추가사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                            <ImagesViewer setImg={setMenuAdditional} vals={menuAdditional} />
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

        </div>
    );
}
export default AdminHostRegistry2;