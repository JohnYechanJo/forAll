import DropDown from "../../components/DropDown";
import {useCallback, useEffect, useState} from "react";
import "../../style/btnStyles.css";
import ImageInputs from "../../components/ImageInputs";
import {json, Link, useLocation, useNavigate} from "react-router-dom";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
import "../../components/Styles.css";
const HostRegistry3 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

    const rentWeeksData = ["휴무없음", "매주", "격주(홀수주)", "격주(짝수주)", "매월 첫째주", "매월 둘째주", "매월 셋째주", "매월 넷째주", "매월 마지막주", "매월 말일", "매월(직접지정)"];
    const days = [...Array(31).keys()].map(i => (i + 1)+"일");
    const rentTimeFromData = [...Array(25).keys()].map(i => i+"시");
    const rentTimeToData = [...Array(25).keys()].map(i => i+"시");
    const floorData = ["지상1층", "지상2층", "지상3층", "지하1층", "지하2층", "지하3층", "직접 입력"];
    const parkAvaliableData = ["주차불가", "1대", "2대", "3대", "4대", "직접 입력"];

    const [rentWeek, setRentWeek] = useState(rentWeeksData[0]);
    const [rentDays, setRentDays] = useState();
    const [monDay, setMonDay] = useState(false);
    const [tuesDay, setTuesDay] = useState(false);
    const [wednesDay, setWednesDay] = useState(false);
    const [thursDay, setThursDay] = useState(false);
    const [friDay, setFriDay] = useState(false);
    const [saturDay, setSaturDay] = useState(false);
    const [sunDay, setSunDay] = useState(false);
    const [rentTimeFrom, setRentTimeFrom] = useState("");
    const [rentTimeTo, setRentTimeTo] = useState("");
    const [floor, setFloor] = useState("");
    const [exactFloor, setExactFloor] = useState();
    const [parkAvaliable, setParkAvaliable] = useState("");
    const [exactPark, setExactPark] = useState();
    const [elevator, setElevator] = useState();
    const [table, setTable] = useState();
    const [seat, setSeat] = useState();
    const [price, setPrice] = useState();
    const [trial, setTrial] = useState();
    const [morningDelivery, setMorningDelivery] = useState();
    const [workIn, setWorkIn] = useState();
    const [alcohol, setAlcohol] = useState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isTrial, setIsTrial] = useState(false);
    const [isMorningDelivery, setIsMorningDelivery] = useState(false);
    const [isWorkIn, setIsWorkIn] = useState(false);
    let recommendedPrice = seat * 15000;
    let priceString = recommendedPrice.toString();
    let firstDigits = priceString.slice(0, -4);
    let randomFourDigits = Math.floor(1000 + Math.random() * 9000);
    let finalPrice = parseInt(firstDigits + randomFourDigits.toString());
    const formattedPrice = "₩" + finalPrice.toLocaleString();
    const onChangeFloor = useCallback((e) => {
        setExactFloor(e.target.value);
    }, []);
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
            && (floor !== "") && (parkAvaliable !== "") && (elevator !== undefined) && (table !== undefined)
            && (seat !== undefined) && (price !== undefined) && (trial !== undefined) && (morningDelivery !== undefined)
            && (workIn !== undefined) && (alcohol !== undefined)){
            submit();
        }
        else setIsModalOpen(true);
    }

    const submit = () => {
        navigate("/hostRegistry4",{
            state: {
                ...data,
                rentWeek: rentWeek,
                rentTimeFrom: rentTimeFrom,
                rentTimeTo: rentTimeTo,
                floor: floor,
                exactFloor: exactFloor,
                parkAvaliable: parkAvaliable,
                exactPark: exactPark,
                elevator: elevator,
                table: table,
                seat: seat,
                price: price,
                trial: trial,
                morningDelivery: morningDelivery,
                workIn: workIn,
                alcohol: alcohol
            }
        });
    };
    return (
        <div style={{
            display: "flex",
            marginLeft: "2vw",
            flexDirection: "column",
        }}>
            <h1>2. 이용 안내</h1>
            <p>이용 정보를 입력해주세요</p>
            <div>
                <p>대관 가능일*</p>
                <DropDown dataArr={rentWeeksData} onChange={setRentWeek} placeholder={"휴무없음"}/>
                {rentWeek === "매월(직접지정)" ?
                    <DropDown dataArr={days} onChange={setRentDays} placeholder={"1일"}/> : (rentWeek !== "휴무없음" ?
                        <div>
                            {/*Todo 버튼으로 rentDay 변경*/}
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
            <p>이용시간*</p>
            <div style={{
                display: "flex",
                justifyContent: "left",
                alignItems: "center",
            }}>
                <span>전일 </span>
                <span><DropDown dataArr={rentTimeFromData} onChange={setRentTimeFrom} placeholder={"00시"}/></span>
                <span> 부터, 당일 </span>
                <span><DropDown dataArr={rentTimeToData} onChange={setRentTimeTo} placeholder={"24시"}/></span>
                <span> 까지</span>
            </div>
            <div>
                <p>공간 층수*</p>
                <DropDown dataArr={floorData} onChange={setFloor} placeholder={"층수 여부를 선택해주세요."}/>
                {floor === "직접 입력" ? (
                    <div>
                        <input onChange={onChangeFloor}/>
                        <p>층</p>
                        {exactFloor < 4 ? <p>4 이상의 숫자만 입력하여주세요. 직접입력의 층수는 '지상'으로 적용됩니다</p> : null}
                    </div>
                ) : null}
            </div>
            <div>
                <p>주차 여부*</p>
                <DropDown dataArr={parkAvaliableData} onChange={setParkAvaliable} placeholder={"주차 여부를 선택"}/>
                {parkAvaliable === "직접 입력" ? (
                    <div>
                        <input onChange={onChangePark}/>
                        <p>대</p>
                        {exactPark < 5 ? <p>5 이상의 숫자만 입력하여 주세요. 직접 입력의 층수는 '지상'으로 적용됩니다</p> : null}
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
            <div>
                <p>가격 설정*</p>
                <input style={{width: "90vw", height: "3vh", float: "left", marginRight: "2vw"}}
                       onChange={onChangePrice} placeholder={"포 올 권장기준에 참고하여 가격을 설정해주세요"}/>
                <h3>
                    {(seat===undefined || seat === "") ? "포 올 권장가격 : ₩" : (seat<=10) ? "포 올 권장가격 : ₩150,000원" :"포 올 권장가격 :" + formattedPrice + "원"}
                </h3>
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
            <Modal isOpen={isTrial} style={ModalStyles} >
                <header>트라이얼이란?</header>
                <button onClick={()=>setIsTrial(false)} >닫기</button>
            </Modal>
            <button onClick={() => setIsTrial(!isTrial)}
                    className="detail"
            >• 트라이얼이란?</button>
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
            <Modal isOpen={isMorningDelivery} style={ModalStyles} >
                <header>새벽배달이란?</header>
                <button onClick={()=>setIsMorningDelivery(false)} >닫기</button>
            </Modal>
            <button onClick={() => setIsMorningDelivery(!isMorningDelivery)}
                    className="detail"
            >• 새벽배달이란?</button>
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
            <Modal isOpen={isWorkIn} style={ModalStyles} >
                <header>워크인이란?</header>
                <button onClick={()=>setIsWorkIn(false)} >닫기</button>
            </Modal>
            <button onClick={() => setIsWorkIn(!isWorkIn)}
                    className="detail"
            >• 워크인이란?</button>
            <p>주류판매 가능여부*</p>
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
                     className={alcohol === true ? "btn_selected" : ""} onClick={() => setAlcohol(true)}>가능
                </div>
                <div style={{
                    border: "2px solid lightgray",
                    borderRadius: "0.5px",
                    width: "47vw",
                    height: "3vh",
                    textAlign: "center",
                    fontFamily: "Noto Sans KR"
                }}
                     className={alcohol === false ? "btn_selected" : ""} onClick={() => setAlcohol(false)}>불가
                </div>
            </div>

            <div>
                <Link to="/hostRegistry2">
                    <button>이전</button>
                </Link>
                <button onClick={handleButton}>다음</button>
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