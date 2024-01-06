import DropDown from "../components/DropDown";
import {useCallback, useEffect, useState} from "react";
import "../style/btnStyles.css";
import ImageInput from "../components/ImageInput";
import {Link} from "react-router-dom";
const HostRegistry2 = () => {
    const [rentWeek, setRentWeek] = useState("");
    const [rentDays, setRentDays] = useState([]);
    const [rentTimeFrom, setRentTimeFrom] = useState("");
    const [rentTimeTo, setRentTimeTo] = useState("");
    const [floor, setFloor] = useState("");
    const [exactFloor, setExactFloor] = useState();
    const [parkAvaliable, setParkAvaliable] = useState("");
    const [exactPark, setExactPark] = useState();
    const [elevator, setElevator] = useState();
    const [table, setTable] = useState(0);
    const [seat, setSeat] = useState(0);
    const [price, setPrice] = useState(0);
    const [trial, setTrial] = useState();
    const [morningDelivery, setMorningDelivery] = useState();
    const [workIn, setWorkIn] = useState();
    const [alcohol, setAlcohol] = useState();
    const [firePit, setFirePit] = useState();
    const [exactFirePit, setExactFirePit] = useState();
    const [fryer, setFryer] = useState(false);
    const [oven, setOven] = useState(false);
    const [dishWasher, setDishWasher] = useState(false);
    const [iceMaker, setIceMaker] = useState(false);
    const [someThing, setSomeThing] = useState(false);
    const [extraMachine, setExtraMachine] = useState("");
    const [sidePlate, setSidePlate] = useState();
    const [countSidePlate, setCountSidePlate] = useState();
    const [cup, setCup] = useState();
    const [countCup, setCountCup] = useState();
    const [cuttrary, setCuttrary] = useState();
    const [countCuttrary, setCountCuttrary] = useState();
    const [bat, setBat] = useState();
    const [countBat, setCountBat] = useState();

    const rentWeeksData = ["휴무없음", "매주", "격주(홀수주)", "격주(짝수주)", "매월 첫째주", "매월 둘째주", "매월 셋째주", "매월 넷째주", "매월 마지막주", "매월 말일", "매월(직접지정)"];
    const days = [...Array(31).keys()].map(i => (i + 1)+"일");
    const rentTimeFromData = [...Array(25).keys()].map(i => i+"시");
    const rentTimeToData = [...Array(25).keys()].map(i => i+"시");
    const floorData = ["지상1층", "지상2층", "지상3층", "지하1층", "지하2층", "지하3층", "직접 입력"];
    const parkAvaliableData = ["주차불가", "1대", "2대", "3대", "4대", "직접 입력"];
    const firePitData = ["1개","2개","3개","4개","5개","6개","직접 입력"];

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
    const onChangeFirePit = useCallback((e) => {
        setExactFirePit(e.target.value);
    }, []);
    const toggleFryer = useCallback(() => {
        if (fryer === true) setFryer(false);
        else setFryer(true);
    }, [fryer]);
    const toggleOven = useCallback(() => {
        if (oven) setOven(false);
        else setOven(true);
    }, [oven]);
    const toggleDishWasher = useCallback(() => {
        if (dishWasher) setDishWasher(false);
        else setDishWasher(true);
    }, [dishWasher]);
    const toggleIceMaker = useCallback(() => {
        if (iceMaker) setIceMaker(false);
        else setIceMaker(true);
    }, [iceMaker]);
    const toggleSomeThing = useCallback(() => {
        if(someThing) setSomeThing(false);
        else setSomeThing(true);
    }, [someThing]);
    const onChangeExtraMachine = useCallback((e) => {
        setExtraMachine(e.target.value);
    }, []);
    const onChangeCountSidePlate = useCallback((e) => {
        setCountSidePlate(e.target.value);
    }, []);
    const onChangeCountCup = useCallback((e) => {
        setCountCup(e.target.value);
    }, []);
    const onChangeCountCuttrary = useCallback((e) => {
        setCountCuttrary(e.target.value);
    }, []);
    const onChangeCountBat = useCallback((e) => {
        setCountBat(e.target.value);
    }, []);

    return (
        <div>
            <h1>2. 이용 안내</h1>
            <p>이용 정보를 입력해주세요</p>
            <div>
                <p>대관 가능일*</p>
                <DropDown dataArr={rentWeeksData} onChange={setRentWeek} placeholder={"휴무없음"}/>
                {rentWeek === "매월(직접지정)" ? <DropDown dataArr={days} onChange={setRentDays} placeholder={"1일"}/> : (rentWeek !== "" ?
                    <div>
                        {/*Todo 버튼으로 rentDay 변경*/}
                        <button>월</button>
                        <button>화</button>
                        <button>수</button>
                        <button>목</button>
                        <button>금</button>
                        <button>토</button>
                        <button>일</button>
                    </div>
                    : null)}
            </div>
            <div>
                <p>이용시간*</p>
                <p>전일</p>
                <DropDown dataArr={rentTimeFromData} onChange={setRentTimeFrom} placeholder={"00시"}/>
                <p>부터, 당일</p>
                <DropDown dataArr={rentTimeToData} onChange={setRentTimeTo} placeholder={"24시"} />
                <p>까지</p>
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
                        {exactPark < 5  ? <p>5 이상의 숫자만 입력하여 주세요. 직접 입력의 층수는 '지상'으로 적용됩니다</p> : null}
                    </div>
                ) : null}
            </div>
            <div>
                <p>엘리베이터 여부*</p>
                <div className={elevator === true ? "btn_selected" : ""} onClick={() => setElevator(true)}>있음</div>
                <div className={elevator === false? "btn_selected" : ""} onClick={() => setElevator(false)}>없음</div>
            </div>
            <div>
                <p>테이블</p>
                <input onChange={onChangeTable} placeholder={"최대 테이블 수를 기준으로 입력해주세요"}/>
            </div>
            <div>
                <p>좌석수</p>
                <input onChange={onChangeSeat} placeholder={"최대 좌석수를 기준으로 입력해주세요"}/>
            </div>
            <div>
                <p>가격 설정*</p>
                <input onChange={onChangePrice} placeholder={"포 올 권장기준에 참고하여 가격을 설정해주세요"}/>
                <h1>포올 권장 가격: {seat}개 * 1,5000={seat*15000}</h1>
                <p>포 올 권장가격보다 높이 측정할 경우, 원데이 오너들이 부담스럽게 느낄 수 있어요.</p>
            </div>

            <div>
                <p>가능 여부*</p>
            </div>
            <div>
                <p>트라이얼</p>
                <div className={trial === true ? "btn_selected" : ""} onClick={() => setTrial(true)}>가능</div>
                <div className={trial === false? "btn_selected" : ""} onClick={() => setTrial(false)}>불가</div>
                <p>트라이얼이란?</p>
            </div>
            <div>
                <p>재료 새벽 배달*</p>
                <div className={morningDelivery === true ? "btn_selected" : ""} onClick={() => setMorningDelivery(true)}>가능</div>
                <div className={morningDelivery === false? "btn_selected" : ""} onClick={() => setMorningDelivery(false)}>불가</div>
                <p>새벽배달이란?</p>
            </div>
            <div>
                <p>위크인*</p>
                <div className={workIn === true ? "btn_selected" : ""} onClick={() => setWorkIn(true)}>가능</div>
                <div className={workIn === false? "btn_selected" : ""} onClick={() => setWorkIn(false)}>불가</div>
                <p>워크인이란?</p>
            </div>
            <div>
                <p>주류판매 가능여부*</p>
                <div className={alcohol === true ? "btn_selected" : ""} onClick={() => setAlcohol(true)}>가능</div>
                <div className={alcohol === false? "btn_selected" : ""} onClick={() => setAlcohol(false)}>불가</div>
            </div>

            <div>
                <p>주방 정보*</p>
            </div>
            <div>
                <p>화구</p>
                <DropDown dataArr={firePitData} onChange={setFirePit} placeholder={"화구 개수를 선택해주세요"}/>
                {firePit === "직접 입력" ? (
                    <div>
                        <input onChange={onChangeFirePit}/>
                        <p>개</p>
                        {exactFirePit < 7 ? <p>7 이상의 숫자만 입력하여주세요. 직접입력의 층수는 '지상'으로 적용됩니다</p> : null}
                    </div>
                ) : null}
            </div>
            <div>
                <p>주방기계*</p>
                <div className={fryer === true ? "btn_selected" : ""} onClick={toggleFryer}>튀김기</div>
                <div className={oven === true ? "btn_selected" : ""} onClick={toggleOven}>오븐</div>
                <div className={dishWasher === true ? "btn_selected" : ""} onClick={toggleDishWasher}>식기세척기</div>
                <div className={iceMaker === true ? "btn_selected" : ""} onClick={toggleIceMaker}>제빙기</div>
                <div className={someThing === true ? "btn_selected" : ""} onClick={toggleSomeThing}>내용</div>

            </div>

            <div>
                <p>추가 사용 가능 기계*</p>
                <input onChange={onChangeExtraMachine} placeholder={"사용 가능한 기계를 입력해주세요. ex) 수비드 기계"}/>
            </div>

            <div>
                <p>앞접시*</p>
                <ImageInput setImg={setSidePlate}/>
                <input onChange={onChangeCountSidePlate} placeholder={"최대 개수를 기준으로 입력해주세요"}/>
            </div>
            <div>
                <p>물컵*</p>
                <ImageInput setImg={setCup}/>
                <input onChange={onChangeCountCup} placeholder={"최대 개수를 기준으로 입력해주세요"}/>
            </div>
            <div>
                <p>커트러리*</p>
                <ImageInput setImg={setCuttrary}/>
                <input onChange={onChangeCountCuttrary} placeholder={"최대 개수를 기준으로 입력해주세요"}/>
            </div>
            <div>
                <p>밧드*</p>
                <ImageInput setImg={setBat}/>
                <input onChange={onChangeCountBat} placeholder={"최대 개수를 기준으로 입력해주세요"}/>
            </div>
            
            <div>
                <Link to="/hostRegistry"><button>이전</button></Link>
                <Link to="/hostRegistry3"><button>다음</button></Link>
            </div>
        </div>
    )
};

export default HostRegistry2;