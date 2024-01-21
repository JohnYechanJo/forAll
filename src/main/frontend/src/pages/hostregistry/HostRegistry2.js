import {useState} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import ImageInputs from "../../components/ImageInputs";
import ImageInput from "../../components/ImageInput";
import {ModalStyles} from "../../components/ModalStyles";
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
    const data = {...location.state};
    let isPublic = false;
    const handleButton = () => {
        if ((img1 !== "")&&(img2 !== "")&&(img3 !== "") && (kitchen1 !== "") && (kitchen2 !== "") && (kitchen3 !== "") && (menu1 !== "") && (menuAdditional !== "")) {
            isPublic = true;
            submit();
        }
        else {
            setIsModalOpen(true);
        }
    };

    const submit = () => {
        data.isPublic = data.isPublic && isPublic;
        navigate("/hostRegistry3",{
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
        <div className="margin"
             style={{display:"flex",
                 justifyContent:"space-around",
                 flexDirection:"column",
                 gap:"1.5rem"
                 }}>
            <div>
                <header style={{textAlign: "center"}}><h3>1. 공간 정보</h3></header>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <a className="fontForRegister" >홀 사진<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <div style={{display:'flex', justifyContent:"space-around"}}>
                    <div style={{display:"flex",  flexDirection:"column"}} >
                        
                        <ImageInput setImg={setImg1} val={img1}/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        
                        <ImageInput setImg={setImg2} val={img2}/>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:"space-around"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <ImageInput setImg={setImg3} val={img3}/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <ImageInputs setImg={setImgAdditional} vals={imgAdditional}/>
                    </div>
                </div>
            </div>
            <div>
            <a className="fontForRegister" >주방 사진<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <div style={{display:'flex', justifyContent:"space-around"}}>
                    <div style={{display:"flex",  flexDirection:"column"}} >
                        <ImageInput setImg={setKitchen1} val={kitchen1}/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        
                        <ImageInput setImg={setKitchen2} val={kitchen2}/>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:"space-around"}}>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        
                        <ImageInput setImg={setKitchen3} val={kitchen3}/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <ImageInputs setImg={setKitchenAdditional} vals={kitchenAdditional}/>
                    </div>
                </div>
            </div>
            <div>
            <a className="fontForRegister" >메뉴 사진<span className="fontForRegister" style={{color:"#FF2929"}} >*</span></a>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <button style={{border:"none",
                    backgroundColor:"white",
                    color:"gray",
                    fontSize:"10px",
                    marginTop:"0",
                    textUnderlineOffset:"auto",
                    textDecoration:"underline gray",
                    }} onClick={() => {setIsModalOpen2(true)}}
                ><h5>메뉴 사진이 왜 필요한가요?</h5></button>
                <Modal isOpen={isModalOpen2} style={ModalStyles} ariaHideApp={false}>
                    <h3>내용</h3>
                    <button onClick={()=>setIsModalOpen2(false)}>닫기</button>
                </Modal>
                <div style={{display:'flex', justifyContent:"space-around"}}>
                    <div style={{display:"flex",  flexDirection:"column"}} >
                        <ImageInput setImg={setMenu1} val={menu1}/>
                    </div>
                    <div style={{display:"flex"}}>
                        <ImageInputs setImg={setMenuAdditional} vals={menuAdditional}/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex"}}>
                <Link to="/hostRegistry">
                    <button style={{backgroundColor: "#FF4F4F"}} className="next_button" >이전</button>
                </Link>
                <button style={{backgroundColor: "#525252"}} className="next_button"
                            onClick={handleButton}
                >다음</button>
            </div>
            <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                <p>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
                <p>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                <button onClick={() => submit()}>다음</button>
            </Modal>
        </div>
    );
}
export default HostRegistry2;