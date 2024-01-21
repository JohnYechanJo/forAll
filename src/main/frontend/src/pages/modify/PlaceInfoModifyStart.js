import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import axios from "axios";
import ImageInput from "../../components/ImageInput";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import { KitchenFeat } from "../../utils/enums";
const PlaceInfoModifyStart = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [inputCount, setInputCount] = useState(0);
  const [inputCount2, setInputCount2] = useState(0);
  const [inputCount3, setInputCount3] = useState(0);
  const [inputCount4, setInputCount4] = useState(0);
  const [placeName, setPlaceName] = useState("");
  const [placeIntro, setPlaceIntro] = useState("");
  const [placeIntroDetail, setPlaceIntroDetail] = useState("");
  const [kitchen, setKitchen] = useState(KitchenFeat.NotSpecified);
  const [fullAddress, setFullAddress] = useState("");
  const [placeInfo, setPlaceInfo] = useState("");
  const [webSite, setWebSite] = useState("");
  const [imgRepresent, setImgRepresent] = useState("");
  const [clicked1, setClicked1] = useState(false);
  const [clicked2, setClicked2] = useState(false);
  const [clicked3, setClicked3] = useState(false);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const downloadData = async () => {
    let spaceid;
    await axios.get("/api/v1/space/userSpace/" + sessionStorage.getItem("user_id"))
        .then((res) => spaceid = res.data[0])
        .catch((err) => console.error(err));
    axios
        .get("/api/v1/space/" + spaceid)
        .then((res) =>{ 
          setData(res.data)
          setPlaceName(res.data.name)
          setFullAddress(res.data.address)
          setPlaceIntro(res.data.spaceBrief)
          setPlaceIntroDetail(res.data.spaceIntro)
          setKitchen(res.data.kitchenFeat)
          setPlaceInfo(res.data.addressBrief)
          setWebSite(res.data.website)
          setImgRepresent(res.data.mainImage)
        })
        .catch((err) => console.error(err));
  };
  useEffect(() => {
    downloadData();
  }, []);
  let isPublic = false;
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
    setPlaceName(e.target.value);
  };
  const onInputHandler2 = (e) => {
    setInputCount2(e.target.value.length);
    setPlaceIntro(e.target.value);
  };
  const onInputHandler3 = (e) => {
    setInputCount3(e.target.value.length);
    setPlaceIntroDetail(e.target.value);
  };
  const onInputHandler4 = (e) => {
    setInputCount4(e.target.value.length);
    setPlaceInfo(e.target.value);
  };
  const handleButton = () => {
    if (
      placeName !== "" &&
      placeIntro !== "" &&
      placeIntroDetail !== "" &&
      kitchen !== "" &&
      placeInfo !== "" &&
      imgRepresent !== "" &&
      webSite !== ""
    ) {
      isPublic = true;
      submit();
    } else {
      setIsModalOpen(true);
    }
  };
  const submit = () => {
    navigate("/placeInfoModify2", {
      state: {
        placeName: placeName,
        placeIntro: placeIntro,
        placeIntroDetail: placeIntroDetail,
        kitchen: kitchen,
        address: fullAddress,
        webSite: webSite,
        placeInfo: placeInfo,
        imgRepresent: imgRepresent,
        isPublic: isPublic,
      },
    });
  };
  return (
    <div
      className="margin"
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <div>
        <header style={{ textAlign: "center" }}>
          <h3>1. 공간 정보</h3>
        </header>
        <h4>공간명을 입력해주세요.</h4>
        <hr style={{ height: "2px", backgroundColor: "black" }} />
        <h4>공간명</h4>
        <p>
          <span>{placeName.length}</span>
          <span>/18자</span>
        </p>
        <input
          type="text"
          defaultValue={data.name}
          style={{ width: "94vw", height: "3vh" }}
          onChange={onInputHandler}
          maxLength="17"
        />
        <h5>❕사용 가능한 특수문자: (,),(-),(.),(@),(/)</h5>
        <h4>공간 한 줄 소개</h4>
        <p>
          <span>{placeIntro.length}</span>
          <span>/18자</span>
        </p>
        <input
          type="text"
          defaultValue={data.spaceBrief}
          style={{ width: "94vw", height: "3vh" }}
          onChange={onInputHandler2}
          maxLength="17"
        />
        <h4>공간 소개</h4>
        <p>
          <span>{placeIntroDetail.length}</span>
          <span>/300자</span>
          <span style={{ color: "red" }}>(최소 20자)</span>
        </p>
        <textarea
          type="text"
          defaultValue={data.spaceIntro}
          style={{ width: "94vw", height: "17vh" }}
          onChange={onInputHandler3}
          maxLength="299"
          minLength="19"
        />
        <div>
                    <h4>주방 특성</h4>
                    <div style={{display: "flex",flexDirection:"row", justifyContent:"space-evenly"}}>
                        <div style={{flexDirection:"column", display:"flex"}} >
                            <div>
                                <button className="button"
                                        name="kitchen"
                                        value={KitchenFeat.Open}
                                        style={{
                                            backgroundColor: (kitchen === KitchenFeat.Open)||clicked1 ? "black" : "white",
                                            color: (kitchen === KitchenFeat.Open)||clicked1 ? "white" : "black",
                                            width: "100px",
                                            flex: "1",
                                            marginLeft: "10px",
                                            border: "2px solid gray"
                                        }}
                                        onClick={(event) => {
                                            const selected = event.target.value;
                                            setKitchen(event.target.value);
                                            if (clicked1 === true) {
                                                setKitchen(KitchenFeat.NotSpecified);
                                            }
                                            setClicked1(!clicked1);
                                            setClicked2(false);
                                            setClicked3(false);
                                        }}
                                >
                                    오픈형
                                </button>
                            </div>
                            <div>
                                <Modal
                                    isOpen={modalIsOpen1}
                                    style={ModalStyles}
                                >
                                    <h3 style={{margin:"0px", textAlign:"left"}}>오픈형 주방이란?</h3>
                                    <hr style={{height: "2px", backgroundColor: "black", width:"100%"}}/>
                                    <div style={{textAlign:'left', fontSize:'14px'}} >
                                        <p>• 주방, 홀이 하나로 결합된 형태입니다.</p>
                                        <p>• 주방과 홀이 결합되면서 음식을 만드는 사람과 가까이할 수 있어
                                            대면형보다 더 긴밀한 커뮤니케이션이 가능하며, 요리를 하는 동시에 식사가 가능한 형태를 띕니다.
                                        </p>
                                    </div>
                                    <button onClick={modalClose1} >닫기</button>
                                </Modal>
                                <button onClick={() => setModalIsOpen1(true)}
                                        style={{border: "none", backgroundColor: "white", fontSize:"10px"}}>• 오픈형이 무엇인가요?
                                </button>
                            </div>
                        </div>
                        <div style={{flexDirection:"column"}} >
                            <div>
                                <button className="button"
                                        name="kitchen"
                                        value={KitchenFeat.Face}
                                        style={{
                                            backgroundColor: (kitchen === KitchenFeat.Face)||clicked2 ? "black" : "white",
                                            color: (kitchen === KitchenFeat.Face)||clicked2 ? "white" : "black",
                                            width: "100px",
                                            flex: "1",
                                            marginLeft: "10px",
                                            border: "2px solid gray"
                                        }}
                                        onClick={(event) => {
                                            const selected = event.target.value;
                                            setKitchen(event.target.value);
                                            if (clicked2 === true) {
                                                setKitchen(KitchenFeat.NotSpecified);
                                            }
                                            setClicked1(false);
                                            setClicked2(!clicked2);
                                            setClicked3(false);
                                        }}
                                >
                                    대면형
                                </button>
                            </div>
                            <div>
                                <Modal
                                    isOpen={modalIsOpen2}
                                    style={ModalStyles}
                                >
                                    <h3 style={{margin:"0px", textAlign:"left"}} >대면형 주방이란?</h3>
                                    <hr style={{height: "2px", backgroundColor: "black", width:"100%"}}/>
                                    <div style={{textAlign:'left', fontSize:'14px'}} >
                                        <p>• 부엌과 다이닝룸이 한 공간에 자리하는 형태입니다.</p>
                                        <p>• 식탁이 따로 놓여 있지만, 음식을 만드는 사람의 얼굴을 보며
                                            대화를 나눌 수 있는 구조입니다.
                                        </p>
                                    </div>
                                    <button onClick={modalClose2}>닫기</button>
                                </Modal>
                                <button onClick={() => setModalIsOpen2(true)}
                                        style={{border: "none", backgroundColor: "white", fontSize:"10px"}}>• 대면형이 무엇인가요?
                                </button>
                            </div>
                        </div>
                        <div style={{flexDirection:"column"}} >
                            <div>
                                <button className="button"
                                        name="kitchen"
                                        value={KitchenFeat.Close}
                                        style={{
                                            backgroundColor: (kitchen === KitchenFeat.Close)||clicked3 ? "black" : "white",
                                            color: (kitchen === KitchenFeat.Close)||clicked3 ? "white" : "black",
                                            width: "100px",
                                            flex: "1",
                                            marginLeft: "10px",
                                            marginRight: "10px",
                                            border: "2px solid gray",
                                        }}
                                        onClick={(event) => {
                                            const selected = event.target.value;
                                            setKitchen(event.target.value);
                                            if (clicked3 === true) {
                                                setKitchen(KitchenFeat.NotSpecified);
                                            }
                                            setClicked1(false);
                                            setClicked2(false);
                                            setClicked3(!clicked3);
                                        }}
                                >
                                    폐쇄형
                                </button>
                            </div>
                            <div>
                                <Modal
                                    isOpen={modalIsOpen3}
                                    style={ModalStyles}
                                >
                                    <h3 style={{margin:"0px", textAlign:"left"}} >폐쇄형 주방이란?</h3>
                                    <hr style={{height: "2px", backgroundColor: "black", width:"100%"}}/>
                                    <div style={{textAlign:'left', fontSize:'14px'}} >
                                        <p>• 차분하게 조리와 정리에 전념할 수 있습니다.</p>
                                        <p>• 또한, 조리할 때 발생하는 오염과 냄새, 연기, 소리 등이 거실에 비교적 전달이 되지 않습니다.
                                        </p>
                                        <p>• 홀에서는 어수선한 모습이 보이지 않아 쾌적한 매장 환경이 만들어집니다.</p>
                                    </div>
                                    <button onClick={modalClose3}>닫기</button>
                                </Modal>
                                <button onClick={() => setModalIsOpen3(true)}
                                        style={{border: "none", backgroundColor: "white", fontSize:"10px"}}>• 폐쇄형이 무엇인가요?
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
      </div>
      <div>
        <h4>위치 정보</h4>
        <hr style={{ height: "2px", backgroundColor: "black" }} />
        <h4>주소(위치)</h4>
        <h5>
          <span style={{ disabled: true }}>{fullAddress}</span>
        </h5>
        <h6>• 공간 주소는 최초 등록 이후 직접 변경할 수 없습니다.</h6>
        <h6>• 고객센터를 통해 주소 변경을 요청해주세요.</h6>
      </div>
      <div>
        <h4>상세 위치 정보</h4>
        <p>
          <span>{placeInfo.length}</span>
          <span>/18자</span>
        </p>
        <input
          type="text"
          defaultValue={data.addressBrief}
          style={{ width: "80vw", height: "3vh" }}
          onChange={onInputHandler4}
          maxLength="17"
        />
        <h6>• 작성하신 위치정보는 검색에 영향을 미치지 않습니다.</h6>
        <h6 style={{ marginTop: "0px" }}>
          • 공간 주소를 입력하시면 반려 처리됩니다.(ex.강남구 대치동, 삼성로 141
          등)
        </h6>
      </div>
      <div>
        <h4>웹사이트</h4>
        <input
          type="text"
          defaultValue={data.website}
          style={{ width: "80vw", height: "3vh" }}
          onChange={(e) => setWebSite(e.target.value)}
        />
        <h6>• 인스타그램, 페이스북, 네이버지도, 카카오지도, 구글지도 등</h6>
        <h6 style={{ marginTop: "0px" }}>
          공간을 PR할 수 있는 웹사이트면 무엇이든지 좋습니다.
        </h6>
      </div>
      <div>
        <h4>
        {/* 이미지 부분은 보류 */}
          <span>대표 이미지 </span> 
        </h4>
        <div>
          <ImageInput setImg={setImgRepresent} val={imgRepresent}/>
        </div>
      </div>
      <div style={{display: "flex"}}>
                <Link to="/">
                    <button style={{backgroundColor: "red"}} className="next_button" >이전</button>
                </Link>
                <button style={{backgroundColor: "grey"}} className="next_button"
                            onClick={handleButton}
                >다음</button>
        <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
          <p>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
          <p>
            이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지
            않습니다.
          </p>
          <button onClick={() => setIsModalOpen(false)}>뒤로</button>
          <button onClick={() => submit()}>다음</button>
        </Modal>
      </div>
    </div>
  );
};

export default PlaceInfoModifyStart;