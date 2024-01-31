import DropDown from "../../components/DropDown";
import ImageInputs from "../../components/ImageInputs";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "../../components/Styles.css";
import ForAllLogo from "../../components/ForAllLogo";
import { ModalStyles } from "../../components/ModalStyles";
import ImageUploader from "../../utils/imageUploader";
import {SmallModalStyles} from "../../components/SmallModalStyles";
const PlaceInfoModifyPage4 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const navigate = useNavigate();
    console.log(data);

    let isPublic = false;
    const firePitData = ["1개", "2개", "3개", "4개", "5개", "6개", "직접 입력"];

    const [firePit, setFirePit] = useState(data.fireholeNum ? data.fireholeNum + "개" : firePitData[0]);
    const [capacity, setCapacity] = useState(data.capacity);
    const [exactFirePit, setExactFirePit] = useState(data.fireholeNum ? data.fireholeNum : "");
    const [fryer, setFryer] = useState(data.equip ? data.equip.includes("튀김기"): false);
    const [oven, setOven] = useState(data.equip ? data.equip.includes("오븐"): false);
    const [dishWasher, setDishWasher] = useState(data.equip ? data.equip.includes("식기세척기"): false);
    const [iceMaker, setIceMaker] = useState(data.equip ? data.equip.includes("제빙기"): false);
    const [someThing, setSomeThing] = useState(data.equip ? data.equip.includes("냉장고"): false);
    const [extraMachine, setExtraMachine] = useState(data.equipExtra);
    const [sidePlate, setSidePlate] = useState(data.plateImage ? data.plateImage : []);
    const [countSidePlate, setCountSidePlate] = useState(data.plateNum);
    const [cup, setCup] = useState(data.cupImage ? data.cupImage : []);
    const [countCup, setCountCup] = useState(data.cupNum);
    const [cuttrary, setCuttrary] = useState(data.cutleryImage ? data.cutleryImage : []);
    const [countCuttrary, setCountCuttrary] = useState(data.cutleryNum);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [pending, setPending] = useState(false);

    const onChangeFirePit = useCallback((e) => {
        setExactFirePit(e.target.value);
    }, []);
    const onChangeCapacity = useCallback((e) => {
        setCapacity(e.target.value);
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
        if (someThing) setSomeThing(false);
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
    useEffect(() => {
        console.log(firePit);
    }, [firePit]);
    const handleButton = () => {
        if ((firePit) && (sidePlate) && (countSidePlate) && (cup) && (countCup)
            && (cuttrary) && (countCuttrary)) {
            isPublic = true;
            submit();
        }
        else setIsModalOpen(true);
    };
    const submit = async() => {
        if (pending) return;
        setPending(true);
        const equip = [];
        if (fryer) equip.push("튀김기");
        if (oven) equip.push("오븐");
        if (dishWasher) equip.push("식기세척기");
        if (iceMaker) equip.push("제빙기");
        if (someThing) equip.push("냉장고");
        data.isPublic = data.isPublic && isPublic;
        const userId = sessionStorage.getItem("user_id");

        const plateImage = sidePlate ? await Promise.all(sidePlate.map(async (img) => await ImageUploader(img, userId))) : null;
        const cupImage = cup ? await Promise.all(cup.map(async (img) => await ImageUploader(img, userId))) : null;
        const cutleryImage = cuttrary ? await Promise.all(cuttrary.map(async (img) => await ImageUploader(img, userId))) : null;
        console.log(cupImage);
        navigate("/placeInfoModify5", {
            state: {
                ...data,
                firePit: firePit.split("개")[0] > 6 ? exactFirePit : firePit.split("개")[0],
                capacity: capacity,
                equip: equip.join(","),
                extraMachine: extraMachine,
                plateImage: plateImage,
                countSidePlate: countSidePlate,
                cupImage: cupImage,
                countCup: countCup,
                cutleryImage: cutleryImage,
                countCuttrary: countCuttrary,
            }
        })
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ForAllLogo />
            <p style={{ textAlign: 'center'}}>(2/4) 이용 안내</p>
            <div style={{
                display: "flex",
                flexDirection: "column",
                padding: '1rem',
                gap: "1rem",
                alignItems: "flex-start",
            }}
                className="fontForRegister">
                <div style={{ width: '100%' }} >
                    <a>주방 정보<span style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black", width: '100%' }} />
                </div>
                <div style={{ width: '100%' }} >
                    <a>화구<span style={{ color: "#FF2929" }} >*</span></a>
                    <DropDown dataArr={firePitData} onChange={setFirePit} placeholder={"화구 개수를 선택해주세요"} defaultData={(firePit > 6) ? "직접 입력" : firePit + "개"} width='100%' />
                    {(firePit > 6) ? (
                        <div>
                            <span><input onChange={onChangeFirePit} defaultValue={data.fireholeNum} style={{ width: "10vw" }} />개 </span>
                            {exactFirePit < 7 ? <p>7 이상의 숫자만 입력하여주세요. 직접입력의 층수는 '지상'으로 적용됩니다</p> : null}
                        </div>
                    ) : null}
                </div>
                <div style={{ width: '95%' }} >
                    <a>주방 수용 인원 수<span style={{ color: "#FF2929" }} >*</span></a>
                    <span style={{ display: 'flex', alignItems: 'center' }}><input defaultValue={capacity} onChange={onChangeCapacity} placeholder={"주방이 수용 가능한 최대 인원 수를 입력해주세요."} style={{width: '100%' }} className="input" />명</span>
                </div>
                <div style={{ width: '100%' }}>
                    <a>주방기계<span style={{ color: "#FF2929" }} >*</span></a>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={fryer === true ? "btn_selected" : "btn_not_selected"} onClick={toggleFryer}>튀김기</button>
                        <button style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={oven === true ? "btn_selected" : "btn_not_selected"} onClick={toggleOven}>오븐</button>
                        <button style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={dishWasher === true ? "btn_selected" : "btn_not_selected"} onClick={toggleDishWasher}>식기세척기</button>
                        <button style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={iceMaker === true ? "btn_selected" : "btn_not_selected"} onClick={toggleIceMaker}>제빙기</button>
                        <button style={{ borderRadius: '0.3125rem', width: '18%', height: '1.25rem' }} className={someThing === true ? "btn_selected" : "btn_not_selected"} onClick={toggleSomeThing}>냉장고</button>
                    </div>
                </div>
                {/* 이미지 보여주는 건 다시 건드려야 함 */}
                <div style={{ width: '100%' }}>
                    <a>추가 사용 가능 기계<span style={{ color: "#FF2929" }} >*</span></a>
                    <textarea className="input" onChange={onChangeExtraMachine} placeholder={"사용 가능한 기계를 입력해주세요. ex) 수비드 기계"} defaultValue={data.equipExtra} style={{ height: '6.25rem', width: '98%' }} />
                </div>
                <div style={{ width: '100%' }} >
                    <a>매장 물품<span style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black", width: '100%' }} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', justifyContent: 'center', width: '100%' }} >
                    <div style={{display:'flex',justifyContent:"right"}}>
                        <div>
                        <p>앞접시*</p>
                        <ImageInputs setImg={setSidePlate} vals={sidePlate} />
                        <input onChange={onChangeCountSidePlate} className="input" placeholder={"최대 개수"} style={{ width: '6rem' }} defaultValue={data.plateNum} />
                        </div>
                    </div>
                    <div>
                        <p>물컵*</p>
                        <ImageInputs setImg={setCup} vals={cup} />
                        <input onChange={onChangeCountCup} className="input" placeholder={"최대 개수"} style={{ width: '6rem' }} defaultValue={data.cupNum} />
                    </div>

                    <div style={{display:'flex',justifyContent:"right"}}>
                        <div>
                        <p>커트러리*</p>
                        <ImageInputs setImg={setCuttrary} vals={cuttrary} />
                        <input onChange={onChangeCountCuttrary} className="input" placeholder={"최대 개수"} style={{ width: '6rem' }} defaultValue={data.cutleryNum} />
                        </div>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem' }}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => navigate(-1, data)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => handleButton()}
                >다음</button>
            </div>
            <Modal isOpen={isModalOpen} ariaHideApp={false} style={SmallModalStyles}>
                <div style={{
                    justifyContent: "center", alignItems: "center",
                    fontFamily: "Noto Sans KR",
                    color: " #000",
                    fontSize: "1.25rem",
                    fontStyle: "normal",
                    fontWeight: "400",
                    lineHeight: "normal",

                    height: "100%",
                    display: "flex",
                    flexDirection: "column",

                }}>
                    <a style={{fontSize: '0.9375rem'}}>현재 필수 입력사항이 모두 기입되지 않았습니다.</a>
                    <p style={{fontSize: '0.9375rem'}}>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                </div>
                <div style={{
                    display: 'flex',
                    width: '100%',
                    margin: '0px',
                    marginTop: '4rem',
                    bottom: '0',
                    position: 'fixed',
                    fontSize: "0.9375rem",
                    fontWeight: "400"
                }}>
                    <button style={{
                        backgroundColor: "#FF4F4F",

                        width: '50%',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => setIsModalOpen(false)}
                    >
                        마저 입력하기
                    </button>
                    <button style={{
                        backgroundColor: "#000",

                        width: '50%',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => submit()}
                    >
                        넘어가기
                    </button>
                </div>
            </Modal>
        </div>
    )
};
export default PlaceInfoModifyPage4;