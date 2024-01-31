import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../../components/home/Header";
import axios from "axios";
import ImageInput from "../../components/ImageInput";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import { KitchenFeat } from "../../utils/enums";
import ForAllLogo from "../../components/ForAllLogo";
import { ExplanationModalStyles } from "../../components/ExplanationModalStyles";
import ImageUploader from "../../utils/imageUploader";
import iImg from "../../components/icons/i.png";

const PlaceInfoModifyStart = () => {
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
  useEffect(() => {
    console.log(webSite);
  }, [webSite]);
  const [pending, setPending] = useState(false);
  const downloadData = async () => {
    let spaceid;
    await axios.get("/api/v1/space/userSpace/" + sessionStorage.getItem("user_id"))
      .then((res) => spaceid = res.data[0])
      .catch((err) => console.error(err));
    axios
      .get("/api/v1/space/" + spaceid)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
        setPlaceName(res.data.name);
        setFullAddress(res.data.address);
        setPlaceIntro(res.data.spaceBrief);
        setPlaceIntroDetail(res.data.spaceIntro);
        setKitchen(res.data.kitchenFeat);
        setPlaceInfo(res.data.addressBrief);
        setWebSite(res.data.website);
        setImgRepresent(res.data.mainImage);
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
  const submit = async () => {
    if (pending) return;
    setPending(true);
    const userId = sessionStorage.getItem("user_id");
    const img = await ImageUploader(imgRepresent, userId);
    navigate("/placeInfoModify2", {
      state: {
        ...data,
        placeName: placeName,
        placeIntro: placeIntro,
        placeIntroDetail: placeIntroDetail,
        kitchen: kitchen,
        address: fullAddress,
        website: webSite,
        placeInfo: placeInfo,
        imgRepresent: img,
        isPublic: isPublic,
      },
    });
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexDirection: "column",
      }}
    >
      <ForAllLogo />
      <header style={{ textAlign: "center" }}><p>(1/4) 공간 정보</p></header>
      <div style={{ padding: '1rem', width: '100%', boxSizing: 'border-box', gap: '1rem', display: 'flex', flexDirection: 'column' }}>
        <div>
          <div className="fontForRegister" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <a>공간명을 입력해주세요.<span style={{ color: '#FF2929' }} >*</span></a>
              <hr style={{ height: "2px", backgroundColor: "black" }} />
            </div>
            <div >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <a>공간명<span style={{ color: '#FF2929' }} >*</span></a>
                <p>
                  <span>{placeName.length}</span>
                  <span>/18자</span>
                </p>
              </div>
              <input
                type="text"
                defaultValue={data.name}
                onChange={onInputHandler}
                className="input"
                maxLength="18"
                style={{width: "98%"}}
              />
              <div style={{marginTop: '0.5rem', justifyContent: 'left', display: 'flex'}}>
                <img src={iImg} alt="iImg"
                     style={{width: '1rem', height: '1rem', flexShrink: 0}}/>
                &ensp;
                <a style={{paddingTop: "0.05rem"}}>사용 가능한 특수문자: (,),(-),(.),(@),(/)</a>
              </div>
            </div>

            <div>
              <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <a>공간 한 줄 소개<span style={{color: '#FF2929'}}>*</span></a>
                <p>
                  <span>{placeIntro.length}</span>
                  <span>/18자</span>
                </p>
              </div>
              <input
                type="text"
                defaultValue={data.spaceBrief}
                onChange={onInputHandler2}
                className="input"
                maxLength="18"
                style={{width: "98%"}}

              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                <a>공간 소개<span style={{ color: '#FF2929' }} >*</span></a>
                <p>
                  <span>{placeIntroDetail.length}</span>
                  <span>/300자</span>
                  <span style={{ color: "red" }}>(최소 20자)</span>
                </p>
              </div>
              <textarea
                type="text"
                defaultValue={data.spaceIntro}
                className="input"
                style={{ height: "6.25rem", width: '98%' }}
                onChange={onInputHandler3}
                maxLength="300"
                minLength="20"
              />
            </div>
            <div>
              <a>주방 특성<span style={{ color: '#FF2929' }} >*</span></a>
              <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
                <div style={{ flexDirection: "column", display: "flex" }}>
                  <div>
                    <button className="square_button"
                      name="kitchen"
                      value={KitchenFeat.Open}
                      style={{
                        backgroundColor: kitchen === KitchenFeat.Open || clicked1 ? "black" : "white",
                        color: kitchen === KitchenFeat.Open || clicked1 ? "white" : "black",
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
                      name="kitchen"
                      value={KitchenFeat.Face}
                      style={{
                        backgroundColor: data.kitchenFeat === KitchenFeat.Face || clicked2 ? "black" : "white",
                        color: data.kitchenFeat === KitchenFeat.Face || clicked2 ? "white" : "black",

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
                      name="kitchen"
                      value={KitchenFeat.Close}
                      style={{
                        backgroundColor: kitchen === KitchenFeat.Close || clicked3 ? "black" : "white",
                        color: kitchen === KitchenFeat.Close || clicked3 ? "white" : "black",

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
          <div className="fontForRegister" style={{ marginTop: '1.5rem' }} >
            <a>위치 정보<span style={{ color: '#FF2929' }} >*</span></a>
            <hr style={{ height: "2px", backgroundColor: "black", marginBottom: '1rem' }} />
            <a>주소(위치)<span style={{ color: '#FF2929' }} >*</span></a>
            <div >
              <span className="input" style={{ disabled: true, width:'98%' }}>{fullAddress}</span>
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
          <div className="fontForRegister" style={{ marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
              <a>상세 위치 정보<span style={{ color: '#FF2929' }} >*</span></a>
              <p>
                <span>{placeInfo.length}</span>
                <span>/18자</span>
              </p>
            </div>
            <input
              type="text"
              defaultValue={data.addressBrief}
              onChange={onInputHandler4}
              maxLength="18"
              className="input"
              style={{width: "98%"}}
            />
            <a>• 작성하신 위치정보는 검색에 영향을 미치지 않습니다.</a>

          </div>
          <div className="fontForRegister" style={{ marginTop: '1.5rem' }}>
            <a>웹사이트<span style={{ color: '#FF2929' }} >*</span></a>
            <input
              type="text"
              value={webSite}
              onChange={(e) => setWebSite(e.target.value)}
              className="input"
              style={{width: "98%"}}

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
            <div className="fontForRegister" style={{ display: 'flex', flexDirection: 'column' }} >
              <a>
                <span>대표 이미지<span style={{ color: '#FF2929' }} >*</span></span>
              </a>
              <a style={{ color: '#C4C4C4' }} >
                매장의 간판이 보이는 이미지를 첨부해 주세요.
              </a>
            </div>
            <div>
              <ImageInput setImg={setImgRepresent} val={imgRepresent} />
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
          onClick={() => handleButton()}
        >다음</button>

        <Modal isOpen={isModalOpen} ariaHideApp={false} style={ModalStyles} >
          <p style={{ fontSize: '0.9375rem' }}>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
          <p style={{ fontSize: '0.9375rem' }}>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
          <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem', borderTop: '1px solid #C4C4C4' }}>
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
    </div>
  );
};

export default PlaceInfoModifyStart;
