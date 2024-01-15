import {useState, useEffect} from "react";
import "../../components/Styles.css";
import { Link, useNavigate, useLocation,useParams } from "react-router-dom";
import Modal from "react-modal";
import ImageInputs from "../../components/ImageInputs";
import ImageInput from "../../components/ImageInput";
import {ModalStyles} from "../../components/ModalStyles";
import axios from "axios";
const PlaceInfoModify2 = () => {
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
    const params = useParams();
    const data = {...location.state};
    const [dbData, setDbData] = useState({});
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
    //dbdata에 db에 저장되어 있는 정보들을 담아서 사용한다.
    const downloadData = async () => {
        let spaceid;
        await axios.get("/api/v1/space/userSpace/" + sessionStorage.getItem("user_id"))
            .then((res) => spaceid = res.data[0])
            .catch((err) => console.error(err));
        axios
            .get("/api/v1/space/" + spaceid)
            .then((res) => setDbData(res.data))
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        downloadData();
    }, []);
    const submit = () => {
        data.isPublic = data.isPublic && isPublic;
        navigate("/placeInfoModify3",{
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
    // 이미지는 하나도 구현 안 했음
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
                    <ImageInput setImg={setImgRight}/>
                </div>
                <h4>홀 좌측면</h4>
                <div>
                    <ImageInput setImg={setImgLeft}/>
                </div>
                <h4>홀 정면</h4>
                <div>
                    <ImageInput setImg={setImgFront}/>
                </div>
                <h4>홀 후면</h4>
                <div>

                    <ImageInput setImg={setImgBack}/>
                </div>
                <h4>홀 전체샷</h4>
                <div>
                    <ImageInput setImg={setImgAll}/>
                </div>
                <h4>추가사진</h4>
                <div>
                    <ImageInputs setImg={setImgAdditional}/>
                </div>
            </div>
            <div>
                <h4>주방 사진</h4>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <h4>주방 우측면</h4>
                <div>
                    <ImageInput setImg={setKitchenRight}/>
                </div>
                <h4>주방 좌측면</h4>
                <div>
                    <ImageInput setImg={setKitchenLeft}/>
                </div>
                <h4>주방 정면</h4>
                <div>
                    <ImageInput setImg={setKitchenFront}/>
                </div>
                <h4>주방 후면</h4>
                <div>
                    <ImageInput setImg={setKitchenBack}/>
                </div>
                <h4>주방 전체샷</h4>
                <div>
                    <ImageInput setImg={setKitchenAll}/>
                </div>
                <h4>추가사진</h4>
                <div>
                    <ImageInputs setImg={setKitchenAdditional}/>
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
                    <ImageInput setImg={setMenu1}/>
                </div>
                <h4>메뉴 2</h4>
                <div>
                    <ImageInput setImg={setMenu2}/>
                </div>
                <h4>메뉴 3</h4>
                <div>
                    <ImageInput setImg={setMenu3}/>
                </div>
                <h4>메뉴 4</h4>
                <div>
                    <ImageInput  setImg={setMenu4}/>
                </div>
                <h4>추가사진</h4>
                <div>
                    <ImageInputs setImg={setMenuAdditional}/>
                </div>
            </div>
            <div style={{display: "flex",justifyContent:"center", marginBottom:"6vh",marginTop:"3vh"}}>
                <Link to="/placeInfoModify2">
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
export default PlaceInfoModify2;