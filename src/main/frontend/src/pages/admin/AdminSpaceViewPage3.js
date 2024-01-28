import DropDown from "../../components/DropDown";
import { useCallback, useEffect, useState } from "react";
import "../../style/btnStyles.css";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import "../../components/Styles.css";
import axios from "axios";
import MultipleDatePicker from "react-multiple-datepicker";
import ForAllLogo from "../../components/ForAllLogo";
import {ExplanationModalStyles} from "../../components/ExplanationModalStyles";
const AdminSpaceViewPage3 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const navigate = useNavigate();
    const recommandPrice = Math.max(data.seatNum * 15000, 150000);

    const [isTrial, setIsTrial] = useState(false);
    const [isMorningDelivery, setIsMorningDelivery] = useState(false);
    const [isWorkIn, setIsWorkIn] = useState(false);
    const [isMiseen, setIsMiseen] = useState(false);

    return (
        <div className="fontForRegister"
             style={{
                 display: "flex",
                 flexDirection: "column",
                 gap: '1.5rem'
             }}>
            <header style={{ textAlign: "center" }}><h3>(2/4) 이용 안내</h3></header>
            <div disabled={true} style={{ padding: '1rem', width: '100%', boxSizing: 'border-box', gap: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <div>
                    <a>이용 정보를 입력해주세요.<span style={{ color: '#FF2929' }} >*</span></a>
                    <hr style={{ height: "1px", backgroundColor: "black", width: '100%' }} />
                </div>
                <ForAllLogo />
                <div>
                    <a>대관 가능일<span style={{ color: '#FF2929' }} >*</span></a>
                    {/*<DropDown style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}*/}
                    {/*    disabled={true} dataArr={rentWeeksData} onChange={setRentWeek} placeholder={"휴무없음"} defaultData={rentWeeksData.includes(rentWeek) ? rentWeek : "직접지정"} val={rentWeek} width='100%' />*/}
                    {/*{rentWeek === "직접지정" ?*/}
                    {/*    <MultipleDatePicker onSubmit={setRentDays} /> : (rentWeek !== "휴무없음" ?*/}
                    {/*        <div disabled={true} style={{  display: 'flex' }} >*/}
                    {/*            <div className={monDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleMonday}>월</div>*/}
                    {/*            <div className={tuesDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleTuesDay}>화</div>*/}
                    {/*            <div className={wednesDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleWednesDay}>수</div>*/}
                    {/*            <div className={thursDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleThursDay}>목</div>*/}
                    {/*            <div className={friDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleFriDay}>금</div>*/}
                    {/*            <div className={saturDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleSaturDay}>토</div>*/}
                    {/*            <div className={sunDay ? "btn_selected_square" : "btn_not_selected_square"} onClick={toggleSunDay}>일</div>*/}
                    {/*        </div>*/}
                    {/*        : null)}*/}
                    <div>{data.ableDate}</div>
                </div>

                <div>
                    <a>입•퇴실 시간<span style={{ color: '#FF2929' }} >*</span></a>
                    <div disabled={true} style={{
                        display: "flex",
                        justifyContent: "left",
                        alignItems: "center",
                    }}>
                        <span>대관 당일 </span>
                        <span style={{ }}>{data.ableStartHour}</span>
                        <span> 부터, 당일 </span>
                        <span style={{}}>{data.ableFinHour}</span>
                        <span> 까지</span>
                    </div>
                </div>

                <div>
                    <a>주차 여부<span style={{ color: '#FF2929' }} >*</span></a>
                    {/*<DropDown style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}*/}
                    {/*    dataArr={parkAvaliableData} onChange={setParkAvaliable} placeholder={"주차 여부를 선택해 주세요"} defaultData={parkAvaliable} val={parkAvaliable} width='100%' />*/}
                    {/*{parkAvaliable === "직접 입력" ? (*/}
                    {/*    <div style={{ marginTop: '0.5rem' }}>*/}
                    {/*        <div style={{ display: 'flex', alignItems: 'center' }} >*/}
                    {/*            <input disabled={true} className="input" style={{ width: '10vw' }} onChange={onChangePark} value={exactPark} />*/}
                    {/*            <a>대</a>*/}
                    {/*        </div>*/}
                    {/*        {exactPark < 5 ? <p>5 이상의 숫자만 입력하여 주세요.</p> : null}*/}
                    {/*    </div>*/}
                    {/*) : null}*/}
                    <div>{data.ableParking}</div>
                </div>
                <div>
                    <a>엘리베이터 여부<span style={{ color: '#FF2929' }} >*</span></a>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <button disabled={true}
                            style={{
                            border: "1px solid lightgray",
                            width: "50%",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }} className={data.haveElevator === true ? "btn_selected" : "btn_not_selected"}>있음
                        </button>

                        <button disabled={true}
                            style={{
                                border: "1px solid lightgray",
                                width: "50%",
                                height: "1.875rem",
                                textAlign: "center",
                                fontFamily: "Noto Sans KR",
                            }}
                            className={data.haveElevator === false ? "btn_selected" : "btn_not_selected"} >없음
                        </button>
                    </div>
                </div>
                <div>
                    <a>테이블<span style={{ color: '#FF2929' }} >*</span></a>
                    <input disabled={true} className="input fontForRegister" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: "99%", float: "left" }}
                           defaultValue={data.tableNum} />
                </div>
                <div>
                    <a>좌석 수<span style={{ color: '#FF2929' }} >*</span></a>
                    <input disabled={true} className="input fontForRegister" style={{ width: "99%", float: "left" }}
                           defaultValue={data.seatNum} />
                </div>
                <div style={{ display: "flex", flexDirection: "column" }} >
                    <a>가격 설정<span style={{ color: '#FF2929' }} >*</span></a>
                    <div>
                        <input disabled={true} className="input fontForRegister" style={{ width: "99%",  float: "left", marginRight: "2vw" }}
                               defaultValue={data.priceSet} />
                    </div>
                    <div>
                        <h3 style={{ fontSize: '0.875rem' }} >{"포 올 권장가격 : ₩"+recommandPrice}</h3 >
                    </div>
                </div>

                <div>
                    <a>가능 여부<span style={{ color: '#FF2929' }} >*</span></a>
                    <hr style={{ height: "1px", backgroundColor: "black" }} />
                </div>
                <div>
                    <a >트라이얼<span style={{ color: '#FF2929' }} >*</span></a>

                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <button disabled={true} style={{
                            border: "1px solid lightgray",
                            width: "50%",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                             className={data.ableTrial === true ? "btn_selected" : 'btn_not_selected'} >가능
                        </button>
                        <button disabled={true} style={{
                            border: "1px solid lightgray",
                            width: "50%",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR"
                        }}
                             className={data.ableTrial === false ? "btn_selected" : 'btn_not_selected'}>불가
                        </button>
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
                            <p style={{ textAlign: 'left', paddingLeft: "5%", paddingRight: "5%" }}>•&ensp;트라이얼은 대관 당일
                                기준
                                일주일 전 셰프가 업장에 방문하여 직접 요리해볼 수 있게끔 최소 3시간 정도 공간 활용을 허용하는 것을 의미합니다.
                            </p>
                            <p style={{ textAlign: 'left', paddingLeft: "5%", paddingRight: "5%" }}>•&ensp;트라이얼 시 <a
                                style={{ textDecorationLine: "underline" }}>업장 이용 인수인계 및 주의사항</a> 을 안내함으로 더욱 안전한 대관을 보장할 수
                                있습니다.
                            </p>
                            <p style={{ textAlign: 'left', paddingLeft: "5%", paddingRight: "5%" }}>•&ensp;트라이얼
                                시간은 <strong>‘셰프와 채팅’</strong>을 통해 정해주세요.</p>
                            <div class="bottom_button_relative">
                                <a style={{ fontSize: "0.8rem" }} onClick={() => setIsTrial(false)}>닫기</a>
                            </div>
                        </div>

                    </Modal>
                    <button onClick={() => setIsTrial(!isTrial)}
                            className="detail"
                    >• 트라이얼이란?
                    </button>
                </div>


                <div>
                    <a style={{}}>재료 새벽 배달<span style={{ color: '#FF2929'}} >*</span></a>
                    <div  style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <button disabled={true} style={{
                            border: "1px solid lightgray",
                            width: "50%",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR",

                        }}
                             className={data.ableEarlyDeliver === true ? "btn_selected" : "btn_not_selected"}
                             >가능
                        </button>
                        <button disabled={true} style={{
                            border: "1px solid lightgray",
                            width: "50%",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR",

                        }}
                             className={data.ableEarlyDeliver === false ? "btn_selected" : "btn_not_selected"}
                             >불가
                        </button>
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
                            <p style={{ textAlign: 'left', paddingLeft: "5%", paddingRight: "5%" }}>•&ensp;
                                식재료 대리 수령은 대관일 전날 또는 셰프와 업주 협의 하에 식재료 사전 보관이 가능한지를 의미합니다.
                            </p>
                            <p style={{ textAlign: 'left', paddingLeft: "5%", paddingRight: "5%" }}>•&ensp;팝업 당일 대관
                                이용자에게 <a
                                    style={{ textDecorationLine: "underline" }}>사용할 수 있는 냉장고</a>를 비워주어 공간 확보를 부탁드립니다.
                            </p>
                            <div class="bottom_button_fixed">
                                <a style={{ fontSize: "0.8rem" }} onClick={() => setIsMorningDelivery(false)}>닫기</a>
                            </div>
                        </div>
                    </Modal>
                    <button onClick={() => setIsMorningDelivery(!isMorningDelivery)}
                            className="detail"
                    >• 새벽배달이란?
                    </button>
                </div>

                <div>
                    <a>미장<span style={{ color: '#FF2929' }} >*</span></a>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <button disabled={true} style={{
                            border: "1px solid lightgray",
                            width: "50%",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR",

                        }}
                             className={data.ableMiseen === true ? "btn_selected" : "btn_not_selected"}>가능
                        </button>
                        <button disabled={true} style={{
                            border: "1px solid lightgray",
                            width: "50%",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR",

                        }}
                             className={data.ableMiseen === false ? "btn_selected" : "btn_not_selected"}>불가
                        </button>
                    </div>
                    <div hidden={!data.ableMiseen}>
                        <div style={{ display: "flex", justifyContent: 'left', alignItems: 'center' }}>
                            <span>대관 전일</span>
                            <span style={{ marginLeft: '1rem' }} >{data.ableMiseenStartTime}</span>
                            <span> 부터, 당일 </span>
                            <span style={{ marginLeft: '1rem' }}>{data.ableMiseenFinTime}</span>
                            <span> 까지</span>
                        </div>
                    </div>

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
                            <p style={{ textAlign: 'left', paddingLeft: "5%", paddingRight: "5%" }}>•&ensp;미장 플라세는 영업을
                                위한 사전 재료 준비를 뜻합니다.
                            </p>
                            <p style={{ textAlign: 'left', paddingLeft: "5%", paddingRight: "5%" }}>•&ensp;팝업 레스토랑에서
                                고객에게 식사를 제공하기 전에 사전 준비를 완벽하게 해야 하므로 필요한 준비과정입니다.
                            </p>
                            <div class="bottom_button_fixed">
                                <a style={{ fontSize: "0.8rem" }} onClick={() => setIsMiseen(false)}>닫기</a>
                            </div>
                        </div>
                    </Modal>
                    <button onClick={() => setIsMiseen(!isMiseen)}
                            className="detail"
                    >• 미장이란?
                    </button>
                </div>

                <div>
                    <a>워크인<span style={{ color: '#FF2929' }} >*</span></a>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",

                    }}>
                        <button disabled={true} style={{
                            border: "1px solid lightgray",
                            width: "50%",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR",

                        }}
                             className={data.ableWorkIn === true ? "btn_selected" : "btn_not_selected"} >가능
                        </button>
                        <button disabled={true} style={{
                            border: "1px solid lightgray",
                            width: "50%",
                            height: "1.875rem",
                            textAlign: "center",
                            fontFamily: "Noto Sans KR",

                        }}
                             className={data.ableWorkIn === false ? "btn_selected" : "btn_not_selected"}>불가
                        </button>
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
                            <p style={{ textAlign: 'left', paddingLeft: "5%", paddingRight: "5%" }}>•&ensp;워크인은 대관 당일
                                기준 '팝업 레스토랑' 사전 예약을 하지 않은 손님이 공간을 방문하는 경우를 의미합니다.

                            </p>
                            <p style={{ textAlign: 'left', paddingLeft: "5%", paddingRight: "5%" }}>•&ensp;<a
                                style={{ color: "red" }}>안심하세요! </a><a>팝업 레스토랑은 배너 또는 공지를 통해 공간과 무관한 영업이 진행된다는 점이 명시됩니다.
                            </a>
                            </p>
                            <div className="bottom_button_fixed">
                                <a style={{ fontSize: "0.8rem" }} onClick={() => setIsWorkIn(false)}>닫기</a>
                            </div>
                        </div>
                    </Modal>
                    <button onClick={() => setIsWorkIn(!isWorkIn)}
                            className="detail"
                    >• 워크인이란?
                    </button>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100vw', margin: '0px', marginTop: '4rem' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate(-1, data)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => navigate("/adminspaceViewPage4", {state:data})}
                >다음</button>
            </div>

        </div>
    )
};

export default AdminSpaceViewPage3;