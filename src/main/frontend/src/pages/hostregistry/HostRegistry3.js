import DropDown from "../../components/DropDown";
import {useCallback, useEffect, useState} from "react";
import "../../style/btnStyles.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import "../../components/Styles.css";
import MultipleDatePicker from "react-multiple-datepicker";
import {ExplanationModalStyles} from "../../components/ExplanationModalStyles";

const HostRegistry3 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

    const rentWeeksData = ["휴무없음", "매주", "격주(홀수주)", "격주(짝수주)", "매월 첫째주", "매월 둘째주", "매월 셋째주", "매월 넷째주", "매월 마지막주", "매월 말일", "직접지정"];
    const days = [...Array(31).keys()].map(i => (i + 1)+"일");
    const rentTimeFromData = [...Array(25).keys()].map(i => i+"시");
    const rentTimeToData = [...Array(25).keys()].map(i => i+"시");
    const parkAvaliableData = ["주차불가", "1대", "2대", "3대", "4대", "직접 입력"];

    const [rentWeek, setRentWeek] = useState(rentWeeksData[0]);
    const [rentDays, setRentDays] = useState([]);
    const [monDay, setMonDay] = useState(false);
    const [tuesDay, setTuesDay] = useState(false);
    const [wednesDay, setWednesDay] = useState(false);
    const [thursDay, setThursDay] = useState(false);
    const [friDay, setFriDay] = useState(false);
    const [saturDay, setSaturDay] = useState(false);
    const [sunDay, setSunDay] = useState(false);
    const [rentTimeFrom, setRentTimeFrom] = useState("");
    const [rentTimeTo, setRentTimeTo] = useState("");
    const [parkAvaliable, setParkAvaliable] = useState();
    const [exactPark, setExactPark] = useState();
    const [elevator, setElevator] = useState();
    const [table, setTable] = useState();
    const [seat, setSeat] = useState();
    const [price, setPrice] = useState();
    const [trial, setTrial] = useState();
    const [morningDelivery, setMorningDelivery] = useState();
    const [workIn, setWorkIn] = useState();
    const [miseen, setMiseen] = useState();
    const [miseenTimeFrom, setMiseenTimeFrom] = useState("");
    const [miseenTimeTo, setMiseenTimeTo] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrial, setIsTrial] = useState(false);
    const [isMorningDelivery, setIsMorningDelivery] = useState(false);
    const [isWorkIn, setIsWorkIn] = useState(false);
    const [isMiseen, setIsMiseen] = useState(false);
    const [formattedPrice, setFormattedPrice] = useState();
    let isPublic = false;


    const onChangePark = useCallback((e) => {
        setExactPark(e.target.value);
    }, []);
    const onChangeTable = useCallback((e) => {
        setTable(e.target.value);
    }, []);
    const onChangeSeat = useCallback((e) => {
        setSeat(e.target.value);
    }, []);
    const onChangePrice = useCallback((e) => {
        setPrice(e.target.value);
    }, []);

    const toggleMonday = useCallback((e) => {
        setMonDay(!monDay);
    }, [monDay]);
    const toggleTuesDay = useCallback((e) => {
        setTuesDay(!tuesDay);
    }, [tuesDay]);
    const toggleWednesDay = useCallback((e) => {
        setWednesDay(!wednesDay);
    }, [wednesDay]);
    const toggleThursDay = useCallback((e) => {
        setThursDay(!thursDay);
    }, [thursDay]);
    const toggleFriDay = useCallback((e) => {
        setFriDay(!friDay);
    }, [friDay]);
    const toggleSaturDay = useCallback((e) => {
        setSaturDay(!saturDay);
    }, [saturDay]);
    const toggleSunDay = useCallback((e) => {
        setSunDay(!sunDay);
    }, [sunDay]);


    const handleButton = () => {
        if ((rentWeek !== "") && (rentTimeFrom !== "") && (rentTimeTo !== "")
            && (parkAvaliable) && (elevator !== undefined) && (table !== undefined)
            && (seat !== undefined) && (price !== undefined) && (trial !== undefined) && (morningDelivery !== undefined)
            && (workIn !== undefined) && (miseen !== undefined)&&(miseenTimeFrom !== "") && (miseenTimeTo !== "")){
            isPublic = true;
            submit();
        }
        else setIsModalOpen(true);
    }

    const submit = () => {
        const rentDayString = [];
        if (monDay) rentDayString.push("월");
        if (tuesDay) rentDayString.push("화");
        if (wednesDay) rentDayString.push("수");
        if (thursDay) rentDayString.push("목");
        if (friDay) rentDayString.push("금");
        if (saturDay) rentDayString.push("토");
        if (sunDay) rentDayString.push("일");
        
        const rentDaysdata = rentDays.map((day) => day.toString().split(" ").slice(0,4).join(" ")).join(",");
        const rentData = rentWeek !== "직접지정" ? rentWeek + " " +rentDayString.join(",") : rentDaysdata;
        const park = parkAvaliableData.includes(parkAvaliable) ? parkAvaliable : exactPark+"대";
        data.isPublic = data.isPublic && isPublic;
        navigate("/hostRegistry4",{
            state: {
                ...data,
                rentWeek: rentData,
                rentTimeFrom: rentTimeFrom !== "" ? rentTimeFrom.split("시")[0] : "",
                rentTimeTo: rentTimeTo !== "" ? rentTimeTo.split("시")[0] : "",
                miseenTimeFrom: miseenTimeFrom !== "" ? miseenTimeFrom.split("시")[0] : "",
                miseenTimeTo: miseenTimeTo !== "" ? miseenTimeTo.split("시")[0] : "",
                parkAvaliable: park,
                elevator: elevator,
                table: table,
                seat: seat,
                price: price,
                trial: trial,
                morningDelivery: morningDelivery,
                workIn: workIn,
                miseen: miseen
            }
        });
    };
    useEffect(() => {
        let recommendedPrice = seat * 15000;
        let priceString = recommendedPrice.toString();
        let firstDigits = priceString.slice(0, -4);
        let randomFourDigits = Math.floor(1000 + Math.random() * 9000);
        let finalPrice = parseInt(firstDigits + randomFourDigits.toString());
        const formattedPrice = "₩" + finalPrice.toLocaleString();
        setFormattedPrice(formattedPrice);
    }, [seat]);
    return (
        <div style={{
            display: "flex",
            marginLeft: "2vw",
            flexDirection: "column",
        }}>
            <h1>(2/4) 이용 안내</h1>
            <p>이용 정보를 입력해주세요</p>
            <div>
                <p>대관 가능일*</p>
                <DropDown dataArr={rentWeeksData} onChange={setRentWeek} placeholder={"휴무없음"}/>
                {rentWeek === "직접지정" ?
                     <MultipleDatePicker onSubmit={setRentDays}/>: (rentWeek !== "휴무없음" ?
                        <div>
                            <div className={monDay ?"btn_selected" : ""} onClick={toggleMonday}>월</div>
                            <div className={tuesDay ?"btn_selected" : ""} onClick={toggleTuesDay}>화</div>
                            <div className={wednesDay ?"btn_selected" : ""} onClick={toggleWednesDay}>수</div>
                            <div className={thursDay ?"btn_selected" : ""} onClick={toggleThursDay}>목</div>
                            <div className={friDay ?"btn_selected" : ""} onClick={toggleFriDay}>금</div>
                            <div className={saturDay ?"btn_selected" : ""} onClick={toggleSaturDay}>토</div>
                            <div className={sunDay ?"btn_selected" : ""} onClick={toggleSunDay}>일</div>
                        </div>
                        : null)}
            </div>
            <p>입•퇴실 시간*</p>

            <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
            }}>
                <span>대관 당일 </span>
                <span><DropDown dataArr={rentTimeFromData} onChange={setRentTimeFrom} placeholder={"00시"}/></span>
                <span> 부터, 당일 </span>
                <span><DropDown dataArr={rentTimeToData} onChange={setRentTimeTo} placeholder={"24시"}/></span>
                <span> 까지</span>
            </div>
            <div>
                <p>주차 여부*</p>
                <DropDown dataArr={parkAvaliableData} onChange={setParkAvaliable} placeholder={"주차 여부를 선택"}/>
                {parkAvaliable === "직접 입력" ? (
                    <div>
                        <input onChange={onChangePark}/>
                        <p>대</p>
                        {exactPark < 5 ? <p>5 이상의 숫자만 입력하여 주세요.</p> : null}
                    </div>
                ) : null}
            </div>
            <p>엘리베이터 여부*</p>
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
                }} className={elevator === true ? "btn_selected" : ""} onClick={() => setElevator(true)}>있음
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
                    className={elevator === false ? "btn_selected" : ""} onClick={() => setElevator(false)}>없음
                </div>
            </div>
            <div>
                <p>테이블</p>
                <input style={{width: "90vw", height: "3vh", float: "left"}} onChange={onChangeTable}
                       placeholder={"최대 테이블 수를 기준으로 입력해주세요"}/>
            </div>
            <div>
                <p>좌석수</p>
                <input style={{width: "90vw", height: "3vh", float: "left"}} onChange={onChangeSeat}
                       placeholder={"최대 좌석수를 기준으로 입력해주세요"}/>
            </div>
            <div style={{display:"flex", flexDirection:"column"}}>
                <p>가격 설정*</p>
                <input style={{width: "90vw", height: "3vh", float: "left", marginRight: "2vw"}}
                       onChange={onChangePrice} placeholder={"포 올 권장기준에 참고하여 가격을 설정해주세요"}/>
                <h3>{(seat===undefined || seat === "") ? "포 올 권장가격 : ₩" : (seat<=10) ? "포 올 권장가격 : ₩150,000원" :"포 올 권장가격 :" + formattedPrice + "원"}</h3>
                <p>포 올 권장가격보다 높이 측정할 경우, 원데이 오너들이 부담스럽게 느낄 수 있어요.</p>
            </div>

            <div>
                <p>가능 여부*</p>
            </div>
            <p>트라이얼</p>
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
                     className={trial === true ? "btn_selected" : ""} onClick={() => setTrial(true)}>가능
                </div>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={trial === false ? "btn_selected" : ""} onClick={() => setTrial(false)}>불가
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
                    <br/>
                    <a style={{textAlign: "left"}}>트라이얼이란?</a><a style={{textAlign: "right"}} onClick={() => setIsTrial(false)}>x</a>
                    <hr style={{ height: "1px", backgroundColor: "black" }}/>
                    <p style={{textAlign: 'left', paddingLeft: "1.5rem", paddingRight: "1.5rem"}}>•&ensp;트라이얼은 대관 당일 기준
                        일주일 전 셰프가 업장에 방문하여 직접 요리해볼 수 있게끔 최소 3시간 정도 공간 활용을 허용하는 것을 의미합니다.
                    </p>
                    <p style={{textAlign: 'left', paddingLeft: "1.5rem", paddingRight: "1.5rem"}}>•&ensp;트라이얼 시 <a
                        style={{textDecorationLine: "underline"}}>업장 이용 인수인계 및 주의사항</a> 을 안내함으로 더욱 안전한 대관을 보장할 수 있습니다.
                    </p>
                    <p style={{textAlign: 'left', paddingLeft: "1.5rem", paddingRight: "1.5rem"}}>•&ensp;트라이얼
                        시간은 <strong>‘셰프와 채팅’</strong>을 통해 정해주세요.</p>
                    <div class="bottom_button">
                        <a style={{ fontSize: "0.8rem"}} onClick={() => setIsTrial(false)}>닫기</a>
                    </div>
                </div>

            </Modal>

            <button onClick={() => setIsTrial(!isTrial)}
                    className="detail"
            >• 트라이얼이란?
            </button>

            <p>재료 새벽 배달*</p>
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
                     className={morningDelivery === true ? "btn_selected" : ""}
                     onClick={() => setMorningDelivery(true)}>가능
                </div>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={morningDelivery === false ? "btn_selected" : ""}
                     onClick={() => setMorningDelivery(false)}>불가
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
                    <br/>
                    <a style={{textAlign: "left"}}>새벽배달이란?</a> <a style={{textAlign: "right"}} onClick={() => setIsMorningDelivery(false)}>x</a>
                    <hr style={{ height: "1px", backgroundColor: "black" }}/>
                    <p style={{textAlign: 'left', paddingLeft: "1.5rem", paddingRight: "1.5rem"}}>•&ensp;
                        식재료 대리 수령은 대관일 전날 또는 셰프와 업주 협의 하에 식재료 사전 보관이 가능한지를 의미합니다.
                    </p>
                    <p style={{textAlign: 'left', paddingLeft: "1.5rem", paddingRight: "1.5rem"}}>•&ensp;팝업 당일 대관 이용자에게 <a
                        style={{textDecorationLine: "underline"}}>사용할 수 있는 냉장고</a>를 비워주어 공간 확보를 부탁드립니다.
                    </p>
                    <div class="bottom_button">
                        <a style={{ fontSize: "0.8rem"}} onClick={() => setIsMorningDelivery(false)}>닫기</a>
                    </div>
                </div>
            </Modal>
            <button onClick={() => setIsMorningDelivery(!isMorningDelivery)}
                    className="detail"
            >• 새벽배달이란?
            </button>
            <p>미장*</p>
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
                     className={miseen === true ? "btn_selected" : ""} onClick={() => setMiseen(true)}>가능
                </div>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={miseen === false ? "btn_selected" : ""} onClick={() => setMiseen(false)}>불가
                </div>
            </div>
            <div hidden={!miseen}>
                <div  style={{display:"flex"}}>
                    <span>대관 전일</span>
                    <span><DropDown dataArr={rentTimeFromData} onChange={setMiseenTimeFrom} placeholder={"00시"} width="5.25rem"/></span>
                    <span> 부터, 당일 </span>
                    <span><DropDown dataArr={rentTimeToData} onChange={setMiseenTimeTo} placeholder={"24시"} width="5.25rem"/></span>
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
                    <br/>
                    <a style={{textAlign: "left"}}>미장이란?</a><a style={{textAlign: "right"}}
                                                                 onClick={() => setIsMiseen(false)}>x</a>
                    <hr style={{ height: "1px", backgroundColor: "black" }}/>
                    <p style={{textAlign: 'left', paddingLeft: "1.5rem", paddingRight: "1.5rem"}}>•&ensp;미장 플라세는 영업을 위한 사전 재료 준비를 뜻합니다.
                    </p>
                    <p style={{textAlign: 'left', paddingLeft: "1.5rem", paddingRight: "1.5rem"}}>•&ensp;팝업 레스토랑에서 고객에게 식사를 제공하기 전에 사전 준비를 완벽하게 해야 하므로 필요한 준비과정입니다.
                    </p>
                    <div class="bottom_button">
                        <a style={{ fontSize: "0.8rem"}} onClick={() => setIsMiseen(false)}>닫기</a>
                    </div>
                </div>
            </Modal>
            <button onClick={() => setIsMiseen(!isMiseen)}
                    className="detail"
            >• 미장이란?
            </button>
            <p>워크인*</p>
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
                     className={workIn === true ? "btn_selected" : ""} onClick={() => setWorkIn(true)}>가능
                </div>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={workIn === false ? "btn_selected" : ""} onClick={() => setWorkIn(false)}>불가
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
                    <br/>
                    <a style={{textAlign: "left"}}>워크인이란?</a><a style={{textAlign: "right"}}
                                                               onClick={() => setIsWorkIn(false)}>x</a>
                    <hr style={{ height: "1px", backgroundColor: "black" }}/>
                    <p style={{textAlign: 'left', paddingLeft: "1.5rem", paddingRight: "1.5rem"}}>•&ensp;워크인은 대관 당일 기준 '팝업 레스토랑' 사전 예약을 하지 않은 손님이 공간을 방문하는 경우를 의미합니다.

                    </p>
                    <p style={{textAlign: 'left', paddingLeft: "1.5rem", paddingRight: "1.5rem"}}>•&ensp;<a style={{color: "red"}}>안심하세요! </a><a>팝업 레스토랑은 배너 또는 공지를 통해 공간과 무관한 영업이 진행된다는 점이 명시됩니다.
                    </a>
                    </p>
                    <div className="bottom_button">
                        <a style={{ fontSize: "0.8rem"}} onClick={() => setIsWorkIn(false)}>닫기</a>
                    </div>
                </div>
            </Modal>
            <button onClick={() => setIsWorkIn(!isWorkIn)}
                    className="detail"
            >• 워크인이란?
            </button>
            <div style={{display: "flex"}}>
                <button onClick={() => navigate(-1, data)} style={{backgroundColor: "red"}} className="next_button">이전
                </button>
                <button style={{backgroundColor: "grey"}} className="next_button"
                        onClick={handleButton}
                >다음
                </button>
            </div>
            <Modal isOpen={isModalOpen} ariaHideApp={false}>
                <p>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
                <p>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                <button onClick={() => submit()}>다음</button>
            </Modal>
        </div>
    )
};

export default HostRegistry3;