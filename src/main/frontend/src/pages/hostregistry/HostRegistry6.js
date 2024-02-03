import React, { useCallback, useEffect, useState } from "react";
import ImageInputs from "../../components/ImageInputs";
import DropDown from "../../components/DropDown";
import DaumPost from "../../components/DaumPost";
import Modal from "react-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageInput from "../../components/ImageInput";
import Alert from "../../components/Alert";
import ImageUploader from "../../utils/imageUploader";
import axios from "axios";
import ForAllLogo from "../../components/ForAllLogo";
import { ModalStyles } from "../../components/ModalStyles";
import { ModalForAddress } from "../../components/ModalForAddress";
import {SmallModalStyles} from "../../components/SmallModalStyles";
const HostRegistry6 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const navigate = useNavigate();
    console.log(data);
    let isPublic = false;
    const emailDatas = ["직접입력", "naver.com", "choi.com", "dreamwiz.com", "empal.com", "gmail.com", "hanafos.com", "hanmail.net", "hanmir.com", "hitel.net", "hotmail.com", "korea.com", "lycos.co.kr", "nate.com"];

    const [tradeName, setTradeName] = useState("");
    const [representative, setRepresentative] = useState("");
    const [registNum1, setRegistNum1] = useState("");
    const [registNum2, setRegistNum2] = useState("");
    const [registNum3, setRegistNum3] = useState("");
    const [license, setLicense] = useState();
    const [address, setAddress] = useState("");
    const [exactAddress, setExactAddress] = useState("");
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const bankDatas = ["한국은행", "KB국민은행", "신한은행", "우리은행", "하나은행", "SC제일은행", "한국씨티은행", "케이뱅크", "카카오뱅크", "토스뱅크", "한국산업은행", "중소기업은행", "한국수출은행", "NH농협은행", "수협은행", "대구은행", "부산은행", "경남은행", "광주은행", "전북은행", "제주은행"];
    const [bank, setBank] = useState(bankDatas[0]);
    const [account, setAccount] = useState("");
    const [accountHolder, setAccountHolder] = useState();
    const [isAgree, setIsAgree] = useState(false);
    const [modalOpen1, setModalOpen1] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isPhoneOpen, setIsPhoneOpen]=useState(false);

    const [pending, setPending] = useState(false);

    const onChangeTradeName = useCallback((e) => {
        if (e.target.value.length <= 28) setTradeName(e.target.value);
    }, []);
    const onChangeRepresentative = useCallback((e) => {
        if (e.target.value.length <= 10) setRepresentative(e.target.value);
    }, []);
    const onChangeRegistNum1 = useCallback((e) => {
        if (e.target.value.length <= 3) setRegistNum1(e.target.value);
    }, []);
    const onChangeRegistNum2 = useCallback((e) => {
        if (e.target.value.length <= 2) setRegistNum2(e.target.value);
    }, []);
    const onChangeRegistNum3 = useCallback((e) => {
        if (e.target.value.length <= 5) setRegistNum3(e.target.value);
    }, []);
    const onChangeExactAddress = useCallback((e) => {
        setExactAddress(e.target.value);
    }, []);

    const onChangePhone1 = useCallback((e) => {
        if (e.target.value.length <= 3) setPhone1(e.target.value);
    }, []);
    const onChangePhone2 = useCallback((e) => {
        if (e.target.value.length <= 4) setPhone2(e.target.value);
    }, []);
    const onChangePhone3 = useCallback((e) => {
        if (e.target.value.length <= 4) setPhone3(e.target.value);
    }, []);
    const onChangeAccount = useCallback((e) => {
        // const filteredValue = e.target.value.replace(/[^0-9-]/g, '');
        const reg = /^[0-9-]*$/;
        if (reg.test(e.target.value))
            setAccount(e.target.value);
    }, []);
    const onChangeAccountHolder = useCallback((e) => {
        setAccountHolder(e.target.value);
    }, []);

    const regPhone1 = /^01[016789]$/;
    const regPhone2 = /^\d{3,4}$/;
    const regPhone3 = /^\d{4}$/;

    const handleButton = () => {
        if ((tradeName === "") || (representative === "") || (registNum1 === "") || (registNum2 === "") || (registNum3 === "") || (license === "") || (address === "") || (exactAddress === "") || (isAgree === false)) {
            setIsAlertOpen(true);
        } else if ((tradeName !== "") && (representative !== "") && (registNum1 !== "") && (registNum2 !== "") && (registNum3 !== "")
            && (license !== undefined) && (address !== undefined) && (exactAddress !== "") && (accountHolder !== undefined)
            && (regPhone1.test(phone1)) && (regPhone2.test(phone2)) && (regPhone3.test(phone3))){
            isPublic = true;
            submit();
        }else if (!(regPhone1.test(phone1)) || !(regPhone2.test(phone2)) || !(regPhone3.test(phone3))){
            setIsPhoneOpen(true);
        }
        else setIsModalOpen(true);
    };
    const submit = async () => {
        if(pending) return;
        setPending(true);
        const userId = sessionStorage.getItem("user_id");

        const closeImage = await Promise.all(data.closeImage.map(async (img) => await ImageUploader(img, userId)));
        const businessNum = registNum1 + registNum2 + registNum3;
        const businessImage = await ImageUploader(license, userId);
        const businessAddress = address + exactAddress;

        const payPhoneNum = phone1 + phone2 + phone3;

        await axios.post("/api/v1/space", {
            userId: userId,
            name: data.placeName,
            spaceBrief: data.placeIntro,
            spaceIntro: data.placeIntroDetail,
            kitchenFeat: data.kitchen,
            address: data.fullAddress,
            addressBrief: data.placeInfo,
            website: data.webSite,
            mainImage: data.imgRepresent,
            hallImage: data.hallImage,
            kitImage: data.kitImage,
            menu: data.menu,
            ableDate: data.rentWeek,
            ableStartHour: data.rentTimeFrom,
            ableFinHour: data.rentTimeTo,
            ableMiseenStartTime: data.miseenTimeFrom,
            ableMiseenFinTime: data.miseenTimeTo,
            ableParking: data.parkAvaliable,
            haveElevator: data.elevator,
            tableNum: data.table,
            seatNum: data.seat,
            priceSet: data.price,
            ableTrial: data.trial,
            ableEarlyDeliver: data.morningDelivery,
            ableWorkIn: data.workIn,
            ableMiseen: data.miseen,
            fireholeNum: data.firePit,
            capacity: data.capacity,
            equip: data.equip,
            equipExtra: data.extraMachine,
            plateImage: data.plateImage,
            plateNum: data.countSidePlate,
            cupImage: data.cupImage,
            cupNum: data.countCup,
            cutleryImage: data.cutleryImage,
            cutleryNum: data.countCuttrary,
            companyName: tradeName,
            ceoName: representative,
            businessNum: businessNum,
            businessImage: businessImage,
            businessAddress: businessAddress,
            payPhoneNum: payPhoneNum,
            bankName: bank,
            accountNum: account,
            accountHolder: accountHolder,
            closeGuide: data.closeGuide,
            closeImage: closeImage,
            isPublic: data.isPublic && isPublic
        })
            .then((res) => navigate("/hostRegistryChecking"))
            .catch((err) => console.error(err));

    };

    const handleCheckBox = () => {
        if (address === "") {
            setAddress(data.address);
            setExactAddress(data.addressDetail);
        }
        else {
            setAddress("");
            setExactAddress("");
        }
    };
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ForAllLogo />
            <p style={{ textAlign: 'center'}}>(4/4) 예약 및 정산 정보</p>
            <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start", gap: "1.5rem" }} className="fontForRegister">
                <div style={{ width: "100%", marginBottom:"-1rem" }} >
                    <a>정산 정보를 입력해 주세요<span style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black", width: "100%" }} />
                </div>
                <div style={{ marginBottom:"-1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }} >
                        <p>상호(개인/법인)<span style={{ color: "#FF2929" }} >*</span></p>
                        <p>{tradeName.length}자/28자</p>
                    </div>
                    <input maxLength="28" value={tradeName} onChange={onChangeTradeName} placeholder={"상호를 입력해주세요"} className="input" style={{width:"92vw"}}/>
                </div>
                <div style={{ marginBottom:"-1rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <p>대표자명<span style={{ color: "#FF2929" }} >*</span></p>
                        <p>{representative.length}자/10자</p>
                    </div>
                    <input maxLength="10" value={representative} onChange={onChangeRepresentative} placeholder={"대표자명을 입력해 주세요"} className="input" style={{width:"92vw"}}/>
                </div>
                <div style={{ marginBottom:"-1rem" }}>
                    <p>사업자 등록번호<span style={{ color: "#FF2929" }} >*</span></p>
                    <div style={{ display: "flex",alignItems:'center',justifyContent:'space-between' }} >
                        <input type="number" value={registNum1} onChange={onChangeRegistNum1} className="input" style={{ width: "30%" }} />-
                        <input type="number" value={registNum2} onChange={onChangeRegistNum2} className="input" style={{ width: "30%" }} />-
                        <input type="number" value={registNum3} onChange={onChangeRegistNum3} className="input" style={{ width: "30%" }} />
                    </div>
                    <div style={{ padding: "0px 0px", display: "flex", flexDirection: 'column' }} >
                        <a style={{ color: "red" }} >• 사업자 등록번호는 필수 입력입니다.</a>
                        <a>• 정확한 정보를 입력했는지 다시 한번 확인해 주세요.</a>
                        <a>• 추후, 사업자 정보가 수정된다면 반드시 온라인 상담을 통해 변경 내용을 알려주셔야 합니다.</a>
                    </div>
                </div>
                <div style={{ height: "9rem" }}>
                    <p >사업자 등록증 첨부<span style={{ color: "#FF2929" }} >*</span></p>
                    <ImageInput setImg={setLicense} val={license} />
                </div>
                <div style={{marginBottom: "-1rem"}}>
                    <div style={{ display: "flex" , marginBottom: "0.1rem"}} >
                        <a>사업장 주소<span style={{ color: "#FF2929" }} >*</span></a>
                        <input type={"checkbox"} onClick={handleCheckBox} id="chkbox" />
                        <label for='chkbox' style={{ display: "flex", marginLeft: "5vw"}} >
                            <em></em>공간 정보와 동일
                        </label>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between'}} >
                    <input value={address} disabled={true} placeholder="실제 서비스가 되는 공간의 주소를 입력해주세요." style={{ width: '80%' }} className="input" />
                    <Modal isOpen={modalOpen1}>
                        <DaumPost setAddress={(e) => {
                            setAddress(e);
                            setModalOpen1(false);
                        }} />
                        <button onClick={() => setModalOpen1(false)}>닫기</button>
                    </Modal>
                    <button onClick={() => setModalOpen1(true)} style={{ width: "3.4375rem", height: "1.875rem", fontSize: "0.625rem", backgroundColor: "black", color: "white", borderRadius: '0.375rem', }} >주소등록</button>
                    </div>
                    <p>
                        <input onChange={onChangeExactAddress} placeholder={"상세 주소"} style={{ marginTop: '0.62rem',width:'92vw' }} value={exactAddress} className="input" />
                    </p>
                </div>
                <div>
                    <p>정산용 연락처<span style={{color: "#FF2929"}}>*</span></p>
                    <div style={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
                        <input value={phone1} type="number" onChange={onChangePhone1} className="input" style={{width: "30%"}}/>-
                        <input value={phone2} type="number" onChange={onChangePhone2} className="input" style={{width: "30%"}}/>-
                        <input value={phone3} type="number" onChange={onChangePhone3} className="input" style={{width: "30%"}}/>
                    </div>
                </div>
            </div>
            <div style={{display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start"}}
                 className="fontForRegister">
                <div style={{width: "100%"}}>
                <a>계좌 정보를 입력해 주세요<span style={{ color: "#FF2929" }} >*</span></a>
                    <hr style={{ height: "2px", backgroundColor: "black", width: "100%" }} />
                    <a style={{fontSize:'0.4375rem'}} >• 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</a>
                </div>
                <div style={{ display: 'flex',marginTop:'1.5rem' }} >
                    <div>
                        <a>은행명<span style={{ color: "#FF2929" }} >*</span></a>
                        <DropDown dataArr={bankDatas} onChange={setBank} width='100%' />
                    </div>
                    <div style={{display:'flex',flexDirection:'column',marginLeft:'1rem'}} >
                        <a>계좌번호<span style={{ color: "#FF2929" }} >*</span></a>
                        <input onChange={onChangeAccount} value={account}  className="input" style={{width:'100%'}} placeholder={"454102-01-376503"} />
                    </div>
                    <div style={{display:'flex',flexDirection:'column',marginLeft:'1rem'}}>
                        <a>예금주<span style={{ color: "#FF2929" }} >*</span></a>
                        <input onChange={onChangeAccountHolder} className="input" style={{width:'97%'}} />
                    </div>
                </div>
                <div style={{fontSize:'0.4375rem', display: 'flex', flexDirection: 'column' }}>
                    <a>- 정확한 정보를 입력했는지 다시 한번 확인해 주세요.</a>
                    <a>- 정산 금액 입금 시, 입금자명은 "포 올"로 확인할 수 있습니다.</a>
                </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start"}} className="fontForRegister">
                <p>환불 기준을 동의해 주세요<span style={{ color: "#FF2929" }} >*</span></p>
                <hr style={{ height: "2px", backgroundColor: "black", width: "100%",marginTop:'0' }} />
                <div style={{display:'flex',flexDirection:'column'}} >
                <a>• 셰프 환불 기준은 아래와 같이 구분됩니다.</a>
                <a>• 1) 대관 14일 전:100% 환불</a>
                <a>• 2) 대관 13일 전~9일 전:80% 환불</a>
                <a>• 3) 대관 8일 전~5일 전:50% 환불</a>
                <a>• 4) 대관 4일 전~당일:환불 불가</a>
                </div>
                <hr style={{ height: "2px", backgroundColor: "black", width: "100%" }} />
            </div>
            <input type="checkbox" id="agree" checked={isAgree} onChange={() => setIsAgree(!isAgree)} />
            <label for='agree' style={{marginLeft:'1rem',display:'flex',alignItems:'center'}}>
                <em></em><a>동의합니다</a>
            </label>
            <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem', bottom: '0'}}>
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
            <Modal isOpen={isPhoneOpen} ariaHideApp={false} style={SmallModalStyles}>
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
                    <a style={{fontSize: '0.9375rem'}}>유효한 연락처를 입력하지 않았습니다.</a>
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

                        width: '100%',
                        bottom: '0',
                        height: '3.125rem',
                        color: 'white',
                        border: 'none',
                        lineHeight: '1.875rem',
                        textAlign: 'center'
                    }}
                            onClick={() => setIsPhoneOpen(false)}
                    >
                        마저 입력하기
                    </button>
                </div>
            </Modal>
            <Modal isOpen={pending} ariaHideApp={false} style={SmallModalStyles}>
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
                    <a style={{fontSize: '0.9375rem'}}>현재 입력사항을 업로드 중입니다.</a>
                    <p style={{fontSize: '0.9375rem'}}>잠시만 기다려주세요.</p>
                </div>
            </Modal>
            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={"상호명, 대표자명, 사업자 등록번호, 사업자 등록증, 사업장 주소는 필수 입력사항입니다."} />


        </div>


    )
};
export default HostRegistry6;