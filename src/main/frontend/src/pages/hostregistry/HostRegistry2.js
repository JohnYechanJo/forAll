import {useState} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Modal from "react-modal";
import ImageInput from "../../components/ImageInput";
import {ModalStyles} from "../../components/ModalStyles";
const HostRegistry2 = () => {
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
    const [hiddenMenu1, setHiddenMenu1] = useState(false);
    const [hiddenMenu2, setHiddenMenu2] = useState(false);
    const [hiddenMenu3, setHiddenMenu3] = useState(false);
    const [hiddenMenu4, setHiddenMenu4] = useState(false);
    const [hiddenMenuAdditional, setHiddenMenuAdditional] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const data = {...location.state};
    const handleButton = () => {
        if ((imgRight !== "")&&(imgLeft !== "")&&(imgFront !== "") && (imgBack !== "") && (imgAll !== "") && (imgAdditional !== "")
            && (kitchenRight !== "")&&(kitchenLeft !== "")&&(kitchenFront !== "") && (kitchenBack !== "") && (kitchenAll !== "") && (kitchenAdditional !== "")
            && (menu1 !== "")&&(menu2 !== "")&&(menu3 !== "") && (menu4 !== "") && (menuAdditional !== "")){
            submit();
        }
        else {
            setIsModalOpen(true);
        }
    };
    const submit = () => {
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
                <h4>홀 우측면</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenRight}/></span>
                    <ImageInput setImg={setImgRight} setHidden={setHiddenRight}/>
                </div>
                <h4>홀 좌측면</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenLeft}/></span>
                    <ImageInput setImg={setImgLeft} setHidden={setHiddenLeft}/>
                </div>
                <h4>홀 정면</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenFront}/></span>
                    <ImageInput setImg={setImgFront} setHidden={setHiddenFront}/>
                </div>
                <h4>홀 후면</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenBack}/></span>
                    <ImageInput setImg={setImgBack} setHidden={setHiddenBack}/>
                </div>
                <h4>홀 전체샷</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenAll}/></span>
                    <ImageInput setImg={setImgAll} setHidden={setHiddenAll}/>
                </div>
                <h4>추가사진</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenAdditional}/></span>
                    <ImageInput setImg={setImgAdditional} setHidden={setHiddenAdditional}/>
                </div>
            </div>
            <div>
                <h4>주방 사진</h4>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <h4>주방 우측면</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenKRight}/></span>
                    <ImageInput setImg={setKitchenRight} setHidden={setHiddenKRight}/>
                </div>
                <h4>주방 좌측면</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenKLeft}/></span>
                    <ImageInput setImg={setKitchenLeft} setHidden={setHiddenKLeft}/>
                </div>
                <h4>주방 정면</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenKFront}/></span>
                    <ImageInput setImg={setKitchenFront} setHidden={setHiddenKFront}/>
                </div>
                <h4>주방 후면</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenKBack}/></span>
                    <ImageInput setImg={setKitchenBack} setHidden={setHiddenKBack}/>
                </div>
                <h4>주방 전체샷</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenKAll}/></span>
                    <ImageInput setImg={setKitchenAll} setHidden={setHiddenKAll}/>
                </div>
                <h4>추가사진</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenKAdditional}/></span>
                    <ImageInput setImg={setKitchenAdditional} setHidden={setHiddenKAdditional}/>
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
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenMenu1}/></span>
                    <ImageInput setImg={setMenu1} setHidden={setHiddenMenu1}/>
                </div>
                <h4>메뉴 2</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenMenu2}/></span>
                    <ImageInput setImg={setMenu2} setHidden={setHiddenMenu2}/>
                </div>
                <h4>메뉴 3</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenMenu3}/></span>
                    <ImageInput setImg={setMenu3} setHidden={setHiddenMenu3}/>
                </div>
                <h4>메뉴 4</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenMenu4}/></span>
                    <ImageInput setImg={setMenu4} setHidden={setHiddenMenu4}/>
                </div>
                <h4>추가사진</h4>
                <div>
                    <span><input type="text" placeholder="이미지 파일을 추가해주세요."
                                 style={{width: "70vw", height: "3vh", float: "left"}}
                                 hidden={hiddenMenuAdditional}/></span>
                    <ImageInput setImg={setMenuAdditional} setHidden={setHiddenMenuAdditional}/>
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