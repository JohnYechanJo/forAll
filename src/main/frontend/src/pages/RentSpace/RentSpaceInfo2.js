import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import "../../style/btnStyles.css";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import ImageViewer from "../../components/ImageViewer";

const RentSpaceInfo2 = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [isTrial, setIsTrial] = useState(false);
    const [isMorningDelivery, setIsMorningDelivery] = useState(false);
    const [isWorkIn, setIsWorkIn] = useState(false);

    useEffect(() => {
        axios.get("/api/v1/space/"+params.id)
            .then((res) => {
                setData(res.data);
                console.log(res.data);
            })
            .catch((err) => console.error(err));
    }, []);
//data에서 받아온 정보를 출력, 뭘로 호출해야 하는지 확인하고 바꿔야 함
    return (<div>
        <h2>• 공간정보</h2>
        <hr style={{width: "95%", color: "black", border:"1px solid black",backgroundColor:"black" ,height:"2px"}}/>
        <div style={{margin:"2vw", display:"flex", justifyContent:"center",flexDirection:"column",}}>  
            <div>
                <h4>주소(위치)</h4>
                <div style={{border:"2px solid gray",borderRadius:"2px",width:"100%",height:"3vh"}} >{data.address}</div>
            </div>
            <div>
                <h4>위치정보</h4>
                <div style={{border:"2px solid gray",borderRadius:"2px",width:"100%",height:"3vh"}} >{data.addressBrief}</div>
            </div>
            <div>
                <h4>웹사이트</h4>
                <div style={{border:"2px solid gray",borderRadius:"2px",width:"100%",height:"3vh"}} >{data.website}</div>
            </div>
            <div>
                <h4>대표 이미지</h4>
                <ImageViewer val={data.mainImage} />
            </div>
            <h4>이용시간</h4>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
            }}>
                <span>전일 </span>
                <span>
                <div style={{border:"2px solid gray",borderRadius:"2px",width:"30vw",height:"3vh"}} >{data.ableStartHour}</div>
                </span>
                <span> 부터, 당일 </span>
                <div style={{border:"2px solid gray",borderRadius:"2px",width:"30%",height:"3vh"}} >{data.ableFinHour}</div>
                <span> 까지</span>
            </div>
            <div>
                <h4>공간 층수</h4>
                <div style={{border:"2px solid gray",borderRadius:"2px",width:"100%",height:"3vh"}} >{data.floorNum}</div>
            </div>
            <div>
                <h4>주차 여부</h4>
                <div style={{border:"2px solid gray",borderRadius:"2px",width:"100%",height:"3vh"}} >{data.ableParking}</div>
            </div>
            <h4>엘리베이터 여부</h4>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }} className={data.haveElevator === true ? "btn_selected" : ""}>있음
                </div>

                <div
                    style={{
                        border: "2px solid lightgray",
                        borderRadius: "0.5px",
                        width: "47vw",
                        height: "3vh",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR",
                    }}
                    className={data.haveElevator === false ? "btn_selected" : ""}>없음
                </div>
            </div>
            <div>
                <h4>테이블</h4>
                <div style={{border:"2px solid gray",borderRadius:"2px",width:"100%",height:"3vh"}} >{data.tableNum}</div>
            </div>
            <div>
                <h4>좌석수</h4>
                <div style={{border:"2px solid gray",borderRadius:"2px",width:"100%",height:"3vh"}} >{data.seatNum}</div>
            </div>
            <h4 style={{padding:"0px 0px",marginBottom:"0px"}}>가능 여부</h4>
            <hr style={{width: "100%", color: "black", border:"1px solid black",backgroundColor:"black" ,height:"2px"}}/>
            <h4>트라이얼*</h4>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={data.ableTrial === true ? "btn_selected" : ""}>가능
                </div>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={data.ableTrial === false ? "btn_selected" : ""}>불가
                </div>
            </div>
            <Modal isOpen={isTrial} style={ModalStyles} >
                <header>트라이얼이란?</header>
                <button onClick={()=>setIsTrial(false)} >닫기</button>
            </Modal>
            <button onClick={() => setIsTrial(!isTrial)}
                    className="detail"
            >• 트라이얼이란?</button>
            <h4>재료 새벽 배달*</h4>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={data.ableEarlyDeliver === true ? "btn_selected" : ""}
                     >가능
                </div>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={data.ableEarlyDeliver === false ? "btn_selected" : ""}
                     >불가
                </div>
            </div>
            <Modal isOpen={isMorningDelivery} style={ModalStyles} >
                <header>새벽배달이란?</header>
                <button onClick={()=>setIsMorningDelivery(false)} >닫기</button>
            </Modal>
            <button onClick={() => setIsMorningDelivery(!isMorningDelivery)}
                    className="detail"
            >• 새벽배달이란?</button>
            <h4>워크인*</h4>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={data.ableWorkIn === true ? "btn_selected" : ""}>가능
                </div>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={data.ableWorkIn === false ? "btn_selected" : ""}>불가
                </div>
            </div>
            <Modal isOpen={isWorkIn} style={ModalStyles} >
                <header>워크인이란?</header>
                <button onClick={()=>setIsWorkIn(false)} >닫기</button>
            </Modal>
            <button onClick={() => setIsWorkIn(!isWorkIn)}
                    className="detail"
            >• 워크인이란?</button>
            <h4>주류판매 가능여부*</h4>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={data.ableDrink === true ? "btn_selected" : ""}>가능
                </div>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={data.ableDrink === false ? "btn_selected" : ""}>불가
                </div>
            </div>
        </div>
        <button onClick={() => navigate(-1)}>돌아가기</button>
    </div>)
};

export default RentSpaceInfo2;