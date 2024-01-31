import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../../style/btnStyles.css";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import ImageViewer from "../../components/ImageViewer";
import "../../components/Styles.css";
import { ExplanationModalStyles } from "../../components/ExplanationModalStyles";
const RentSpaceInfo2 = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [isTrial, setIsTrial] = useState(false);
    const [isMorningDelivery, setIsMorningDelivery] = useState(false);
    const [isWorkIn, setIsWorkIn] = useState(false);
const [isMiseen, setIsMiseen] = useState(false);
    useEffect(() => {
        axios.get("/api/v1/space/" + params.id)
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => console.error(err));
    }, []);
    //data에서 받아온 정보를 출력, 뭘로 호출해야 하는지 확인하고 바꿔야 함
    return (<div className="fontForRegister" >
        <h2 style={{ textAlign:'center' ,fontSize:'0.9375rem',fontWeight:'500'}} >공간정보</h2>
        <hr style={{ width: "90vw", color: "black", border: "1px solid black", backgroundColor: "black", height: "0.5px" }} />
        <div style={{ display: "flex", justifyContent: "center", flexDirection: "column", gap: '1rem', padding: '1rem' }}>
            <div>
                <a>주소(위치)</a>
                <div className="input" style={{width:"90vw"}}>{data.address}</div>
            </div>
            <div>
                <a>위치정보</a>
                <div className="input" style={{width:"90vw"}}>{data.addressBrief}</div>
            </div>
            <div>
                <a>웹사이트</a>
                <div className="input" style={{width:"90vw"}}>{data.website}</div>
            </div>
            <div style={{ height: '8rem' }} >
                <a>대표 이미지</a>
                <ImageViewer val={data.mainImage} />
            </div>
            <a style={{marginBottom:'-1rem'}}>이용시간</a>
            <div style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                width:"90vw"
            }}
                className="input"
            >
                <span>전일 </span>
                <span style={{ marginLeft: '0.63rem' }} >
                    {data.ableStartHour}시
                </span>
                <span> 부터, 당일 </span>
                <span style={{ marginLeft: '0.63rem' }} >
                    {data.ableFinHour}시
                </span>
                <span> 까지</span>
            </div>
            <div>
                <a>주차 여부</a>
                <div className="input" style={{width:"90vw"}}>{data.ableParking}</div>
            </div>
            <a>엘리베이터 여부</a>
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

            }}>
                <div style={{
                    width: "47vw",
                    height: "1.875rem",
                    border: "1px solid lightgray",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }} className={data.haveElevator === true ? "btn_selected" : "btn_not_selected"}>있음
                </div>

                <div
                    style={{
                        width: "47vw",
                        height: "1.875rem",
                        border: "1px solid lightgray",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR",
                    }}
                    className={data.haveElevator === false ? "btn_selected" : "btn_not_selected"}>없음
                </div>
            </div>
            <div>
                <a>테이블</a>
                <div className="input" style={{width:"90vw"}}>{data.tableNum}</div>
            </div>
            <div>
                <a>좌석수</a>
                <div className="input" style={{width:"90vw"}}>{data.seatNum}</div>
            </div>
            <div>
            <a style={{ padding: "0px 0px", marginBottom: "0px" }}>가능 여부</a>
            <hr style={{ width: "100%", color: "black", border: "1px solid black", backgroundColor: "black", height: "0.5px" }} />
            </div>
            <div>
                <a>트라이얼*</a>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <div style={{
                        border: "1px solid lightgray",
                        width: "47vw",
                        height: "1.875rem",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR"
                    }}
                        className={data.ableTrial === true ? "btn_selected" : "btn_not_selected"}>가능
                    </div>
                    <div style={{
                        border: "1px solid lightgray",
                        width: "47vw",
                        height: "1.875rem",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR"
                    }}
                        className={data.ableTrial === false ? "btn_selected" : "btn_not_selected"}>불가
                    </div>
                </div>
                <Modal isOpen={isTrial} style={ExplanationModalStyles}>
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
                                <a style={{ textAlign: "left" }}>트라이얼이란?</a><a style={{ textAlign: "right" }}
                                    onClick={() => setIsTrial(false)}>x</a>
                            </div>
                            <hr style={{ height: "1px", backgroundColor: "black" }} />
                            <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;트라이얼은 대관 당일
                                기준
                                일주일 전 셰프가 업장에 방문하여 직접 요리해볼 수 있게끔 최소 3시간 정도 공간 활용을 허용하는 것을 의미합니다.
                            </p>
                            <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;트라이얼 시 <a
                                style={{ textDecorationLine: "underline" }}>업장 이용 인수인계 및 주의사항</a> 을 안내함으로 더욱 안전한 대관을 보장할 수
                                있습니다.
                            </p>
                            <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;트라이얼
                                시간은 <strong>‘셰프와 채팅’</strong>을 통해 정해주세요.</p>
                            <div class="bottom_button_relative">
                                <a style={{ fontSize: "0.8rem" }} onClick={() => setIsTrial(false)}>닫기</a>
                            </div>
                        </div>

                    </Modal>
                <button onClick={() => setIsTrial(!isTrial)}
                    className="detail"
                >• 트라이얼이란?</button>
            </div>
            <div>
                <a>재료 새벽 배달*</a>

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <div style={{
                        border: "1px solid lightgray",
                        width: "47vw",
                        height: "1.875rem",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR"
                    }}
                        className={data.ableEarlyDeliver === true ? "btn_selected" : "btn_not_selected"}
                    >가능
                    </div>
                    <div style={{
                        border: "1px solid lightgray",
                        width: "47vw",
                        height: "1.875rem",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR"
                    }}
                        className={data.ableEarlyDeliver === false ? "btn_selected" : "btn_not_selected"}
                    >불가
                    </div>
                </div>
                <Modal isOpen={isMorningDelivery} style={ExplanationModalStyles}>
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
                            <a style={{ textAlign: "left" }}>새벽배달이란?</a> <a style={{ textAlign: "right" }}
                                onClick={() => setIsMorningDelivery(false)}>x</a>
                        </div>
                        <hr style={{ height: "1px", backgroundColor: "black" }} />
                        <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;
                            식재료 대리 수령은 대관일 전날 또는 셰프와 업주 협의 하에 식재료 사전 보관이 가능한지를 의미합니다.
                        </p>
                        <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;팝업 당일 대관
                            이용자에게 <a
                                style={{ textDecorationLine: "underline" }}>사용할 수 있는 냉장고</a>를 비워주어 공간 확보를 부탁드립니다.
                        </p>
                        <div class="bottom_button_relative">
                            <a style={{ fontSize: "0.8rem" }} onClick={() => setIsMorningDelivery(false)}>닫기</a>
                        </div>
                    </div>
                </Modal>
                <button onClick={() => setIsMorningDelivery(!isMorningDelivery)}
                    className="detail"
                >• 새벽배달이란?</button>
            </div>
            <div>
                <a>워크인*</a>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <div style={{
                        border: "1px solid lightgray",
                        width: "47vw",
                        height: "1.875rem",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR"
                    }}
                        className={data.ableWorkIn === true ? "btn_selected" : "btn_not_selected"}>가능
                    </div>
                    <div style={{
                        border: "1px solid lightgray",
                        width: "47vw",
                        height: "1.875rem",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR"
                    }}
                        className={data.ableWorkIn === false ? "btn_selected" : "btn_not_selected"}>불가
                    </div>
                </div>
                <Modal isOpen={isWorkIn} style={ExplanationModalStyles}>
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
                                <a style={{ textAlign: "left" }}>워크인이란?</a><a style={{ textAlign: "right" }}
                                    onClick={() => setIsWorkIn(false)}>x</a>
                            </div>
                            <hr style={{ height: "1px", backgroundColor: "black" }} />
                            <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;워크인은 대관 당일
                                기준 '팝업 레스토랑' 사전 예약을 하지 않은 손님이 공간을 방문하는 경우를 의미합니다.

                            </p>
                            <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;<a
                                style={{ color: "red" }}>안심하세요! </a><a>팝업 레스토랑은 배너 또는 공지를 통해 공간과 무관한 영업이 진행된다는 점이 명시됩니다.
                                </a>
                            </p>
                            <div className="bottom_button_relative">
                                <a style={{ fontSize: "0.8rem" }} onClick={() => setIsWorkIn(false)}>닫기</a>
                            </div>
                        </div>
                    </Modal>
                <button onClick={() => setIsWorkIn(!isWorkIn)}
                    className="detail"
                >• 워크인이란?</button>
            </div>
            <div>
                <a>미장*</a>
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",

                }}>
                    <div style={{
                        border: "1px solid lightgray",
                        width: "47vw",
                        height: "1.875rem",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR"
                    }}
                        className={data.ableMiseen === true ? "btn_selected" : "btn_not_selected"}>가능
                    </div>
                    <div style={{
                        border: "1px solid lightgray",
                        width: "47vw",
                        height: "1.875rem",
                        textAlign: "center",
                        fontFamily: "Noto Sans KR"
                    }}
                        className={data.ableMiseen === false ? "btn_selected" : "btn_not_selected"}>불가
                    </div>
                </div>
                {data.ableMiseen ? (
                    <div className="input" >
                        <div style={{ display: "flex" }}>
                            <span>대관 전일</span>
                            <span style={{ marginLeft: '0.15rem' }} >{data.ableMiseenStartTime}시</span>
                            <span> 부터, 당일 </span>
                            <span style={{ marginLeft: '0.15rem' }}>{data.ableMiseenFinTime}시</span>
                            <span> 까지</span>
                        </div>
                    </div>
                ) : null}
                <Modal isOpen={isMiseen} style={ExplanationModalStyles}>
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
                                <a style={{ textAlign: "left" }}>미장이란?</a><a style={{ textAlign: "right" }}
                                    onClick={() => setIsMiseen(false)}>x</a>
                            </div>
                            <hr style={{ height: "1px", backgroundColor: "black" }} />
                            <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;미장 플라세는 영업을
                                위한 사전 재료 준비를 뜻합니다.
                            </p>
                            <p style={{ textAlign: 'left', paddingLeft: "1rem", paddingRight: "1rem" }}>•&ensp;팝업 레스토랑에서
                                고객에게 식사를 제공하기 전에 사전 준비를 완벽하게 해야 하므로 필요한 준비과정입니다.
                            </p>
                            <div class="bottom_button_relative">
                                <a style={{ fontSize: "0.8rem" }} onClick={() => setIsMiseen(false)}>닫기</a>
                            </div>
                        </div>
                    </Modal>
                    <button onClick={() => setIsMiseen(!isMiseen)}
                        className="detail"
                    >• 미장이란?
                    </button>
            </div>

        </div>
        <button className="bottom_button" style={{backgroundColor:'black',marginTop:'4rem'}}  onClick={() => navigate(-1)}>돌아가기</button>
    </div>)
};

export default RentSpaceInfo2;