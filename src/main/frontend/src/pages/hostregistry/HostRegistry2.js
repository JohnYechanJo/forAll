import {useState} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import ImageInputs from "../../components/ImageInputs";
import ImageInput from "../../components/ImageInput";
import {ModalStyles} from "../../components/ModalStyles";
const HostRegistry2 = () => {
    const [imgRight, setImgRight] = useState("");
    const [imgLeft, setImgLeft] = useState("");
    const [imgAll, setImgAll] = useState("");
    const [imgBack, setImgBack] = useState("");
    const [imgFront, setImgFront] = useState("");
    const [imgAdditional, setImgAdditional] = useState([]);
    const [kitchenRight, setKitchenRight] = useState("");
    const [kitchenLeft, setKitchenLeft] = useState("");
    const [kitchenAll, setKitchenAll] = useState("");
    const [kitchenBack, setKitchenBack] = useState("");
    const [kitchenFront, setKitchenFront] = useState("");
    const [kitchenAdditional, setKitchenAdditional] = useState([]);
    const [menu1, setMenu1] = useState("");
    const [menu2, setMenu2] = useState("");
    const [menu3, setMenu3] = useState("");
    const [menu4, setMenu4] = useState("");
    const [menuAdditional, setMenuAdditional] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const data = {...location.state};
    let isPublic = false;
    const handleButton = () => {
        if ((imgRight !== "")&&(imgLeft !== "")&&(imgFront !== "") && (imgBack !== "") && (imgAll !== "") && (imgAdditional !== "")
            && (kitchenRight !== "")&&(kitchenLeft !== "")&&(kitchenFront !== "") && (kitchenBack !== "") && (kitchenAll !== "") && (kitchenAdditional !== "")
            && (menu1 !== "")&&(menu2 !== "")&&(menu3 !== "") && (menu4 !== "") && (menuAdditional !== "")){
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
                imgRight: imgRight,
                imgLeft: imgLeft,
                imgFront: imgFront,
                imgBack: imgBack,
                imgAll: imgAll,
                imgAdditional: imgAdditional,
                kitchenLeft: kitchenLeft,
                kitchenRight: kitchenRight,
                kitchenFront: kitchenFront,
                kitchenBack: kitchenBack,
                kitchenAll: kitchenAll,
                kitchenAdditional: kitchenAdditional,
                menu1: menu1,
                menu2: menu2,
                menu3: menu3,
                menu4: menu4,
                menuAdditional: menuAdditional,
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
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <h4>홀 사진</h4>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <div style={{display:'flex', justifyContent:"space-evenly"}}>
                    <div style={{display:"flex",  flexDirection:"column"}} >
                        <h4>홀 우측면</h4>
                        <ImageInput setImg={setImgRight} val={imgRight}/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <h4>홀 좌측면</h4>
                        <ImageInput setImg={setImgLeft} val={imgLeft}/>
                    </div>
                </div>
                <h4>홀 정면</h4>
                <div>
                    <ImageInput setImg={setImgFront} val={imgFront}/>
                </div>
                <h4>홀 후면</h4>
                <div>

                    <ImageInput setImg={setImgBack} val={imgBack}/>
                </div>
                <h4>홀 전체샷</h4>
                <div>
                    <ImageInput setImg={setImgAll} val={imgAll}/>
                </div>
                <h4>추가사진</h4>
                <div>
                    <ImageInputs setImg={setImgAdditional} vals={imgAdditional}/>
                </div>
            </div>
            <div>
                <h4>주방 사진</h4>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <h4>주방 우측면</h4>
                <div>
                    <ImageInput setImg={setKitchenRight} val={kitchenRight}/>
                </div>
                <h4>주방 좌측면</h4>
                <div>
                    <ImageInput setImg={setKitchenLeft} val={kitchenLeft}/>
                </div>
                <h4>주방 정면</h4>
                <div>
                    <ImageInput setImg={setKitchenFront} val={kitchenFront}/>
                </div>
                <h4>주방 후면</h4>
                <div>
                    <ImageInput setImg={setKitchenBack} val={kitchenBack}/>
                </div>
                <h4>주방 전체샷</h4>
                <div>
                    <ImageInput setImg={setKitchenAll} val={kitchenAll}/>
                </div>
                <h4>추가사진</h4>
                <div>
                    <ImageInputs setImg={setKitchenAdditional} vals={kitchenAdditional}/>
                </div>
            </div>
            <div>
                <h4>메뉴 사진</h4>
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
                <h4>메뉴 1</h4>
                <div>
                    <ImageInput setImg={setMenu1} val={menu1}/>
                </div>
                <h4>메뉴 2</h4>
                <div>
                    <ImageInput setImg={setMenu2} val={menu2}/>
                </div>
                <h4>메뉴 3</h4>
                <div>
                    <ImageInput setImg={setMenu3} val={menu3}/>
                </div>
                <h4>메뉴 4</h4>
                <div>
                    <ImageInput  setImg={setMenu4} val={menu4}/>
                </div>
                <h4>추가사진</h4>
                <div>
                    <ImageInputs setImg={setMenuAdditional} vals={menuAdditional}/>
                </div>
            </div>
            <div style={{display: "flex",justifyContent:"center", marginBottom:"6vh",marginTop:"3vh"}}>
                <Link to="/hostRegistry">
                    <button style={{backgroundColor: "black",color:"white", flex:"1",border:"none", width:"50vw",height:"8vh"}}>이전</button>
                </Link>
                <button style={{backgroundColor: "red",color:"white" ,flex:"1",border:"none", width:"50vw",height:"8vh"}}
                            onClick={handleButton}
                >저장</button>
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