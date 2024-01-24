import { useState } from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import ImageInputs from "../../components/ImageInputs";
import ImageInput from "../../components/ImageInput";
import { ModalStyles } from "../../components/ModalStyles";
import ForAllLogo from "../../components/ForAllLogo";
const HostRegistry2 = () => {
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
    let isPublic = false;
    const handleButton = () => {
        if ((img1 !== "") && (img2 !== "") && (img3 !== "") && (kitchen1 !== "") && (kitchen2 !== "") && (kitchen3 !== "") && (menu1 !== "") && (menuAdditional !== "")) {
            isPublic = true;
            submit();
        }
        else {
            setIsModalOpen(true);
        }
    };

    const submit = () => {
        data.isPublic = data.isPublic && isPublic;
        navigate("/hostRegistry3", {
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
        <div
            style={{
                display: "flex",
                justifyContent: "space-around",
                flexDirection: "column",
                gap: "1.5rem"
            }}>
                <ForAllLogo/>
                <header style={{ textAlign: "center" }}><p>(1/4) 공간 정보</p></header>
            <div style={{padding:'1rem'}}>
            <div >
                <a className="fontForRegister" >홀 사진<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                <hr style={{ height: "2px", backgroundColor: "black" }} />
                <a className="fontForRegister" style={{ color: '#7B7B7B' }}>홈페이지에 노출될 사진입니다. 오너님의 공간이 돋보일 수 있도록 예쁘게 찍어주세요!</a>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem',justifyContent:'center',marginTop:'2rem' }}>
                    <div style={{ display: "flex", flexDirection: "column", }} >
                        <ImageInput setImg={setImg1} val={img1} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <ImageInput setImg={setImg2} val={img2} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column",}}>
                        <ImageInput setImg={setImg3} val={img3} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <ImageInputs setImg={setImgAdditional} vals={imgAdditional} />
                    </div>
                </div>
            </div>
            <div>
                <a className="fontForRegister" >주방 사진<span className="fontForRegister" style={{ color: "#FF2929"}} >*</span></a>
                <hr style={{ height: "2px", backgroundColor: "black" }} />
                <a className="fontForRegister" style={{ color: '#7B7B7B' }}>홈페이지에 노출될 사진입니다. 오너님의 공간이 돋보일 수 있도록 예쁘게 찍어주세요!</a>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem',justifyContent:'center',marginTop:'2rem' }}>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <ImageInput setImg={setKitchen1} val={kitchen1} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>

                        <ImageInput setImg={setKitchen2} val={kitchen2} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>

                        <ImageInput setImg={setKitchen3} val={kitchen3} />
                    </div>
                    <div style={{ display: "flex", flexDirection: "column" }}>
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
                ><h5>메뉴 사진이 왜 필요한가요?</h5></button>
                <Modal isOpen={isModalOpen2} style={ModalStyles} ariaHideApp={false}>
                    <h3>내용</h3>
                    <button onClick={() => setIsModalOpen2(false)}>닫기</button>
                </Modal>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem',justifyContent:'center',marginTop:'2rem'  }}>
                    <div style={{ display: "flex", flexDirection: "column" }} >
                        <ImageInput setImg={setMenu1} val={menu1} />
                    </div>
                    <div style={{ display: "flex" }}>
                        <ImageInputs setImg={setMenuAdditional} vals={menuAdditional} />
                    </div>
                </div>
            </div>
            </div>
            <div style={{display:'flex',width:'100%',margin:'0px',marginTop:'4rem'}}>
                <button style={{marginLeft:'auto',backgroundColor:"#FF4F4F",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
                onClick={() => navigate(-1,data)}
                >
                    이전</button>
                <button style={{marginLeft:'auto',backgroundColor:"#525252",width:'50%',bottom:'0',height:'3.125rem',color:'white',border:'none',lineHeight:'1.875rem',textAlign:'center'}}
                    onClick={()=>handleButton()}
                >다음</button>
                </div>
                <Modal isOpen={isModalOpen} ariaHideApp={false} style={ModalStyles} >
                    <p style={{ fontSize: '0.9375rem' }}>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
                    <p style={{ fontSize: '0.9375rem' }}>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                    <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem',borderTop:'1px solid #C4C4C4' }}>
                        <button style={{ marginLeft: 'auto', backgroundColor: "white", width: '50%', bottom: '0', height: '3.125rem', color: 'black', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                            onClick={() => setIsModalOpen(false)}
                        >
                            뒤로</button>
                        <button style={{ marginLeft: 'auto', backgroundColor: "white", width: '50%', bottom: '0', height: '3.125rem', color: 'black', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                            onClick={() => submit()}
                        >다음</button>
                    </div>
                </Modal>
        </div>
    );
}
export default HostRegistry2;