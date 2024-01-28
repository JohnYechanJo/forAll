import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { KitchenFeat } from "../../utils/enums";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import ImageViewer from "../../components/ImageViewer";
import ImagesViewer from "../../components/ImagesViewer";
import "../../components/Styles.css";
import { ExplanationModalStyles } from "../../components/ExplanationModalStyles";
const RentSpaceInfo3 = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  const [equipments, setEquipments] = useState([]);
  useEffect(() => {
    axios
      .get("/api/v1/space/" + params.id)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => console.error(err));
  }, []);
  useEffect(() => {
    setEquipments(data.equip ? data.equip.split(",") : []);
  }, [data]);
  const [modalIsOpen1, setModalIsOpen1] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = useState(false);
  const [modalIsOpen3, setModalIsOpen3] = useState(false);
  const modalClose1 = () => {
    setModalIsOpen1(false);
  };
  const modalClose2 = () => {
    setModalIsOpen2(false);
  };
  const modalClose3 = () => {
    setModalIsOpen3(false);
  };
  const getIdx = (arr, idx) => {
    if (!arr) return null;
    else if (arr.length <= idx) return null
    else return arr[idx]
  }
  return (
    <div className="fontForRegister">
      <h2 style={{ marginLeft: '1rem' }} >• 공간정보</h2>
      <hr style={{ width: "90vw", color: "black", border: "1px solid black", backgroundColor: "black", height: "0.5px" }} />
      <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: '1rem', padding: '1rem' }}>
        <div  >
          <div>
            <a>주방 특성</a>
            <div style={{ display: "flex" }}>
              <div style={{ display: 'flex', flexDirection: 'column' }} >
                <div>
                  <button
                    className="square_button"
                    name="kitchen"
                    value={KitchenFeat.Open}
                    style={{
                      backgroundColor: (data.kitchenFeat === KitchenFeat.Open) ? "black" : "white",
                      color: (data.kitchenFeat === KitchenFeat.Open) ? "white" : "black",
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
                        paddingLeft: "1rem",
                        paddingRight: "1rem"
                      }}>•&ensp;주방, 홀이 하나로 결합된 형태입니다.</p>
                      <p style={{
                        textAlign: 'left',
                        paddingLeft: "1rem",
                        paddingRight: "1rem"
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
              <div style={{ display: 'flex', flexDirection: 'column' }} >
                <div>
                  <button
                    className="square_button"
                    name="kitchen"
                    value={KitchenFeat.Face}
                    style={{
                      backgroundColor: (data.kitchenFeat === KitchenFeat.Face) ? "black" : "white",
                      color: (data.kitchenFeat === KitchenFeat.Face) ? "white" : "black",
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
                        paddingLeft: "1rem",
                        paddingRight: "1rem"
                      }}>•&ensp;부엌과 다이닝룸이 한 공간에 자리하는 형태입니다.</p>
                      <p style={{
                        textAlign: 'left',
                        paddingLeft: "1rem",
                        paddingRight: "1rem"
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

              <div style={{ display: 'flex', flexDirection: 'column' }} >
                <div>
                  <button
                    className="square_button"
                    name="kitchen"
                    value={KitchenFeat.Close}
                    style={{
                      backgroundColor: (data.kitchenFeat === KitchenFeat.Close) ? "black" : "white",
                      color: (data.kitchenFeat === KitchenFeat.Close) ? "white" : "black",
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
                        paddingLeft: "1rem",
                        paddingRight: "1rem"
                      }}>•&ensp;차분하게 조리와 정리에 전념할 수 있습니다.</p>
                      <p style={{
                        textAlign: 'left',
                        paddingLeft: "1rem",
                        paddingRight: "1rem"
                      }}>•&ensp;또한, 조리할 때 발생하는 오염과 냄새, 연기, 소리 등이 거실에 비교적 전달이 되지 않습니다.
                      </p>
                      <p style={{
                        textAlign: 'left',
                        paddingLeft: "1rem",
                        paddingRight: "1rem"
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
        <div>
          <a>화구</a>
          <div
            className="input"
          >
            {data.fireholeNum}
          </div>
        </div>
        <div>
          <p>수용 가능 주방 인원 수</p>
          <p className="input" >{data.capacity}</p>
        </div>
        <div>
          <a>확보된 주방기계</a>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <button style={{ borderRadius: '0.3125rem', width: '4.375rem', height: '1.25rem' }} className={equipments.includes("튀김기") === true ? "btn_selected" : "btn_not_selected"}>튀김기</button>
            <button style={{ borderRadius: '0.3125rem', width: '4.375rem', height: '1.25rem' }} className={equipments.includes("오븐") === true ? "btn_selected" : "btn_not_selected"}>오븐</button>
            <button style={{ borderRadius: '0.3125rem', width: '4.375rem', height: '1.25rem' }}className={equipments.includes("식기세척기") === true ? "btn_selected" : "btn_not_selected"}>식기세척기</button>
            <button style={{ borderRadius: '0.3125rem', width: '4.375rem', height: '1.25rem' }}className={equipments.includes("제빙기") === true ? "btn_selected" : "btn_not_selected"}>제빙기</button>
            <button style={{ borderRadius: '0.3125rem', width: '4.375rem', height: '1.25rem' }} className={equipments.includes('냉장고') === true ? "btn_selected" : "btn_not_selected"}>냉장고</button>
          </div>
        </div>
        <div>
          <a>추가 사용 가능 기계</a>
          <div
            style={{
              border: "2px solid gray",
              borderRadius: "2px",
              width: "100%",
              height: "10vh",
            }}
          >
            {data.equipExtra}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }} >
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', alignItems: 'flex-end' }} >
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <a>물컵</a>
              <ImagesViewer vals={data.cupImage} />
              <div
                className="input"
                style={{
                  border: "1px solid lightgray",
                  width: "6.25rem",
                  height: "1.875rem",
                }}
              >
                {data.cupNum}개
              </div>
            </div>
          </div>
          <div>
            <a>앞접시</a>
            <ImagesViewer vals={data.plateImage} />
            <div
              className="input"
              style={{
                border: "1px solid lightgray",
                width: "6.25rem",
                height: "1.875rem",
              }}
            >
              {data.plateNum}개
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'right', alignItems: 'flex-end' }} >
            <div style={{ display: 'flex', flexDirection: 'column' }} >
              <a>커트러리</a>
              <ImagesViewer vals={data.cutleryImage} />
              <div
                className="input"
                style={{
                  border: "1px solid lightgray",
                  width: "6.25rem",
                  height: "1.875rem",
                }}
              >
                <span>{data.cutleryNum}개</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <h4>주방 사진</h4>
          <hr style={{ height: "2px", backgroundColor: "black" }} />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}>
            <div style={{ display: "flex", flexDirection: "column", justifyContent: 'right', alignItems: 'flex-end' }} >
              <ImageViewer val={getIdx(data.kitImage, 0)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column" }}>

              <ImageViewer val={getIdx(data.kitImage, 1)} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: 'flex-end' }}>

              <ImageViewer val={getIdx(data.kitImage, 2)} />
            </div>
          </div>
        </div>
        <div>
          <h4>메뉴 사진</h4>
          <hr
            style={{
              width: "95%",
              color: "black",
              border: "1px solid black",
              backgroundColor: "black",
              height: "2px",
            }}
          />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1rem' }}
          >
            <div style={{ display: "flex", flexDirection: "column", justifyContent: 'right', alignItems: 'flex-end' }} >
              <ImagesViewer vals={data.menu} />
            </div>
          </div>
        </div>
      </div>
      <button  className="bottom_button" style={{backgroundColor:'#FF4F4F',marginTop:'4rem'}} onClick={() => navigate(-1)}>돌아가기</button>
    </div>
  );
};

export default RentSpaceInfo3;
