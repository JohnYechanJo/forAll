import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import {KitchenFeat} from "../../utils/enums";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import ImageViewer from "../../components/ImageViewer";
import ImagesViewer from "../../components/ImagesViewer";

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
        <div style={{margin:"2vw"}}>
          <h2>• 공간정보</h2>
            <hr style={{width: "95%", color: "black", border:"1px solid black",backgroundColor:"black" ,height:"2px"}}/>
          <div>
            <div>
              <h4>주방 특성</h4>
              <div style={{ display: "flex" }}>
                <button
                  className="button"
                  name="kitchen"
                  value={KitchenFeat.Open}
                  style={{
                    border:"1px solid gray",
                    backgroundColor: (data.kitchenFeat===KitchenFeat.Open) ? "black" : "white",
                    color: (data.kitchenFeat===KitchenFeat.Open) ? "white" : "black",
                    width: "100px",
                    flex: "1",
                    marginLeft: "10px",
                  }}
                >
                  오픈형
                </button>
                <button
                  className="button"
                  name="kitchen"
                  value={KitchenFeat.Face}
                  style={{
                    border:"1px solid gray",
                    backgroundColor: (data.kitchenFeat===KitchenFeat.Face) ? "black" : "white",
                    color: (data.kitchenFeat===KitchenFeat.Face) ? "white" : "black",
                    width: "100px",
                    flex: "1",
                    marginLeft: "10px",
                  }}
                >
                  대면형
                </button>
                <button
                  className="button"
                  name="kitchen"
                  value={KitchenFeat.Close}
                  style={{
                    border:"1px solid gray",
                    backgroundColor: (data.kitchenFeat===KitchenFeat.Close) ? "black" : "white",
                    color: (data.kitchenFeat===KitchenFeat.Close)  ? "white" : "black",
                    width: "100px",
                    flex: "1",
                    marginLeft: "10px",
                    marginRight: "10px",
                  }}
                >
                  폐쇄형
                </button>
              </div>
            </div>
            <div>
              <div>
                <Modal isOpen={modalIsOpen1} style={ModalStyles}>
                  <h3>오픈형 주방이란?</h3>
                  <p>내용</p>
                  <button onClick={modalClose1}>닫기</button>
                </Modal>
                <button
                  onClick={() => setModalIsOpen1(true)}
                  style={{ border: "none", backgroundColor: "white" }}
                >
                  • 오픈형이 무엇인가요?
                </button>
              </div>
              <div>
                <Modal isOpen={modalIsOpen2} style={ModalStyles}>
                  <h3>대면형 주방이란?</h3>
                  <p>내용</p>
                  <button onClick={modalClose2}>닫기</button>
                </Modal>
                <button
                  onClick={() => setModalIsOpen2(true)}
                  style={{ border: "none", backgroundColor: "white" }}
                >
                  • 대면형이 무엇인가요?
                </button>
              </div>
              <div>
                <Modal isOpen={modalIsOpen3} style={ModalStyles}>
                  <h3>폐쇄형 주방이란?</h3>
                  <p>내용</p>
                  <button onClick={modalClose3}>닫기</button>
                </Modal>
                <button
                  onClick={() => setModalIsOpen3(true)}
                  style={{ border: "none", backgroundColor: "white" }}
                >
                  • 폐쇄형이 무엇인가요?
                </button>
              </div>
            </div>
          </div>
          <div>
            <h4>화구</h4>
            <div
              style={{
                border: "2px solid gray",
                borderRadius: "2px",
                width: "100%",
                height: "3vh",
              }}
            >
              {data.fireholeNum}
            </div>
          </div>
          <div>
            <h4>확보된 주방기계</h4>
                <div style={{display:"flex", flexDirection:"row",justifyContent:"space-evenly"}}>
                    <div className={equipments.includes("튀김기") === true ? "btn_selected" : ""}>튀김기</div>
                    <div className={equipments.includes("오븐") === true ? "btn_selected" : ""}>오븐</div>
                    <div className={equipments.includes("식기세척기") === true ? "btn_selected" : ""}>식기세척기</div>
                    <div className={equipments.includes("제빙기") === true ? "btn_selected" : ""}>제빙기</div>
                </div>
          </div>
          <div>
            <h4>추가 사용 가능 기계</h4>
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
          <div>
            <h4>물컵</h4>
              <ImagesViewer vals={data.cupImage} />
            <div
              style={{
                border: "2px solid gray",
                borderRadius: "2px",
                width: "100%",
                height: "3vh",
              }}
            >
              {data.cupNum}개
            </div>
          </div>
          <div>
            <h4>앞접시</h4>
              <ImagesViewer vals={data.plateImage} />
            <div
              style={{
                border: "2px solid gray",
                borderRadius: "2px",
                width: "100%",
                height: "3vh",
              }}
            >
              {data.plateNum}개
            </div>
          </div>
          <div>
            <h4>커트러리</h4>
              <h4>앞접시</h4>
              <ImagesViewer vals={data.cutleryImage} />
            <div
              style={{
                border: "2px solid gray",
                borderRadius: "2px",
                width: "100%",
                height: "3vh",
              }}
            >
              {data.cutleryNum}개
            </div>
          </div>
          <div>
            <h4>밧드</h4>
              <h4>앞접시</h4>
              <ImagesViewer vals={data.vatImage} />
            <div
              style={{
                border: "2px solid gray",
                borderRadius: "2px",
                width: "100%",
                height: "3vh",
              }}
            >
              {data.vatNum}개
            </div>
          </div>
            <div>
                <h4>주방 사진</h4>
                <hr style={{height: "2px", backgroundColor: "black"}}/>
                <div style={{display:'flex', justifyContent:"space-evenly"}}>
                    <div style={{display:"flex",  flexDirection:"column"}} >
                        <ImageViewer val={getIdx(data.kitImage,0)}/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>

                        <ImageViewer val={getIdx(data.kitImage,1)}/>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>

                        <ImageViewer val={getIdx(data.kitImage,2)}/>
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
            <ImagesViewer vals={data.menu} />
          </div>
          <button onClick={() => navigate(-1)}>돌아가기</button>
        </div>
      );
};

export default RentSpaceInfo3;
