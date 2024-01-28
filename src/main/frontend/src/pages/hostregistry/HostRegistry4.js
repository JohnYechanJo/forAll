import DropDown from "../../components/DropDown";
import ImageInputs from "../../components/ImageInputs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import Modal from "react-modal";
import { ModalStyles } from "../../components/ModalStyles";
import ForAllLogo from "../../components/ForAllLogo";
import {SmallModalStyles} from "../../components/SmallModalStyles";
const HostRegistry4 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const navigate = useNavigate();
    let isPublic = false;
    const firePitData = ["1개", "2개", "3개", "4개", "5개", "6개", "직접 입력"];

    const [firePit, setFirePit] = useState(firePitData[0]);
    const [exactFirePit, setExactFirePit] = useState();
    const [capacity, setCapacity] = useState();
    const [fryer, setFryer] = useState(false);
    const [oven, setOven] = useState(false);
    const [dishWasher, setDishWasher] = useState(false);
    const [iceMaker, setIceMaker] = useState(false);
    const [someThing, setSomeThing] = useState(false);
    const [extraMachine, setExtraMachine] = useState("");
    const [sidePlate, setSidePlate] = useState([]);
    const [countSidePlate, setCountSidePlate] = useState();
    const [cup, setCup] = useState([]);
    const [countCup, setCountCup] = useState();
    const [cuttrary, setCuttrary] = useState([]);
    const [countCuttrary, setCountCuttrary] = useState();

    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleButton = () => {
        if ((firePit !== undefined) && (capacity !== undefined) && (sidePlate !== undefined) && (countSidePlate !== undefined) && (cup !== undefined) && (countCup !== undefined)
            && (cuttrary !== undefined) && (countCuttrary !== undefined)) {
            isPublic = true;
            submit();
        }
        else setIsModalOpen(true);
    };
    const submit = () => {
        const equip = [];
        if (fryer) equip.push("튀김기");
        if (oven) equip.push("오븐");
        if (dishWasher) equip.push("식기세척기");
        if (iceMaker) equip.push("제빙기");
        data.isPublic = data.isPublic && isPublic;
        navigate("/hostRegistry5", {
            state: {
                ...data,
                firePit: firePit === "직접 입력" ? exactFirePit : firePit.split("개")[0],
                capacity: capacity,
                equip: equip.join(","),
                extraMachine: extraMachine,
                sidePlate: sidePlate,
                countSidePlate: countSidePlate,
                cup: cup,
                countCup: countCup,
                cuttrary: cuttrary,
                countCuttrary: countCuttrary,
            }
        })
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ForAllLogo />
            <p style={{ textAlign: 'center', fontSize: '0.9375rem' }}>(2/4) 이용 안내</p>
            <div style={{
                display: "flex",
                flexDirection: "column",
                padding: '1rem',
                gap: "1rem",
                alignItems: "flex-start",
            }}
                className="fontForRegister"
            >
                <div style={{ width: '100%' }} >
                    <a>주방 정보<span style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black", width: '100%' }} />
                </div>
                <div style={{ width: '100%' }}>
                    <a>화구<span style={{ color: "#FF2929" }} >*</span></a>
                    <DropDown dataArr={firePitData} onChange={setFirePit} placeholder={"화구 개수를 선택해주세요"} width='100%' />
                    {firePit === "직접 입력" ? (
                        <div style={{display:'flex',width:'100%',alignItems:'center',marginTop:'0.5rem'}} >
                            <input onChange={onChangeFirePit} className="input" style={{ width: "10vw" }} />
                            <a>개 </a>
                            {exactFirePit < 7 ? <p>7 이상의 숫자만 입력하여주세요. 직접입력의 층수는 '지상'으로 적용됩니다</p> : null}
                        </div>
                    ) : null}
                </div>
                <div style={{ width: '95%' }}>
                    <a>주방 수용 인원 수<span style={{ color: "#FF2929" }} >*</span></a>
                    <div>
                        <span style={{ display: 'flex', alignItems: 'center' }} ><input val={capacity} onChange={onChangeCapacity} className="input" placeholder={"주방이 수용할 수 있는 최대 인원수를 입력해 주세요."} style={{ width: '100%' }} />명</span>
                    </div>
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

                <div style={{ width: '100%' }}>
                    <a>추가 사용 가능 기계<span style={{ color: "#FF2929" }} >*</span></a>
                    <textarea onChange={onChangeExtraMachine} placeholder={"사용할 수 있는 기계를 입력해주세요. ex) 수비드 기계"} className="input" style={{ height: '6.25rem' }} />
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
                        <input onChange={onChangeCountSidePlate} className="input" placeholder={"최대 개수"} style={{ width: '6.25rem' }} />
                        </div>
                    </div>
                    <div>
                        <p>물컵*</p>
                        <ImageInputs setImg={setCup} vals={cup} />
                        <input onChange={onChangeCountCup} className="input" placeholder={"최대 개수"} style={{ width: '6.25rem' }} />
                    </div>

                    <div style={{display:'flex',justifyContent:"right"}}>
                        <div>
                        <p>커트러리*</p>
                        <ImageInputs setImg={setCuttrary} vals={cuttrary} />
                        <input onChange={onChangeCountCuttrary} className="input" placeholder={"최대 개수"} style={{ width: '6.25rem' }} />
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
                            onClick={() => {
                                setIsModalOpen(false);
                            }}
                    >
                        넘어가기
                    </button>
                </div>
            </Modal>
        </div>
    )
};
export default HostRegistry4;