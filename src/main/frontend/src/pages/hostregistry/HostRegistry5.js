import {useCallback, useEffect, useState} from "react";
import ImageInputs from "../../components/ImageInputs";
import DropDown from "../../components/DropDown";
import DaumPost from "../../components/DaumPost";
import Modal from "react-modal";
import {Link, useLocation, useNavigate} from "react-router-dom";
import ImageInput from "../../components/ImageInput";
import Alert from "../../components/Alert";
import ImageUploader from "../../utils/imageUploader";
import axios from "axios";

const HostRegistry5 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    let isPublic = false;
    const emailDatas=  ["직접입력","naver.com", "choi.com", "dreamwiz.com", "empal.com", "gmail.com", "hanafos.com", "hanmail.net", "hanmir.com", "hitel.net", "hotmail.com", "korea.com", "lycos.co.kr", "nate.com"];

    const [tradeName, setTradeName] = useState("");
    const [representative, setRepresentative] = useState("");
    const [registNum1, setRegistNum1] = useState("");
    const [registNum2, setRegistNum2] = useState("");
    const [registNum3, setRegistNum3] = useState("");
    const [license, setLicense] = useState();
    const [address, setAddress] = useState("");
    const [exactAddress, setExactAddress] = useState("");
    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState(emailDatas[0]);
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

    const onChangeTradeName = useCallback((e) => {
        if (e.target.value.length <= 28) setTradeName(e.target.value);
    },[]);
    const onChangeRepresentative = useCallback((e) => {
        if (e.target.value.length <= 10) setRepresentative(e.target.value);
    },[]);
    const onChangeRegistNum1 = useCallback((e) => {
        if (e.target.value.length <= 3) setRegistNum1(e.target.value);
    },[]);
    const onChangeRegistNum2 = useCallback((e) => {
        if (e.target.value.length <= 2) setRegistNum2(e.target.value);
    },[]);
    const onChangeRegistNum3 = useCallback((e) => {
        if (e.target.value.length <= 5) setRegistNum3(e.target.value);
    },[]);
    const onChangeExactAddress = useCallback((e) => {
        setExactAddress(e.target.value);
    }, []);
    const onChangeEmail1 = useCallback((e) => {
        setEmail1(e.target.value);
    }, []);
    const onChangeEmail2 = useCallback((e) => {
        setEmail2(e.target.value);
    }, []);
    const onChangePhone1 = useCallback((e) => {
        if (e.target.value.length <= 3) setPhone1(e.target.value);
    },[]);
    const onChangePhone2 = useCallback((e) => {
        if (e.target.value.length <= 4) setPhone2(e.target.value);
    },[]);
    const onChangePhone3 = useCallback((e) => {
        if (e.target.value.length <= 4) setPhone3(e.target.value);
    },[]);
    const onChangeAccount = useCallback((e) => {
        setAccount(e.target.value);
    }, []);
    const onChangeAccountHolder = useCallback((e) => {
        setAccountHolder(e.target.value);
    }, []);

    const handleButton = () => {
        if ((tradeName==="")||(representative==="")||(registNum1==="")||(registNum2==="")||(registNum3==="")||(license==="")||(address==="")||(exactAddress==="")||(isAgree === false)){
            setIsAlertOpen(true);
        } else if ((tradeName !== "") && (representative !== "") && (registNum1 !== "") && (registNum2 !== "") && (registNum3 !== "")
        && (license !== undefined) && (address !== undefined) && (exactAddress !== "") && (email1 !== "")
        && (phone1 !== "") && (phone2 !== "") && (phone3 !== "")&&(account !== "") && (accountHolder !== undefined)){
        isPublic = true;
        submit();
        }
        else setIsModalOpen(true);
    };
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        // 대표 이미지
        const imgRepresent = await ImageUploader(data.imgRepresent, userId) ;
        const hallImage = await Promise.all([data.img1, data.img2, data.img3, ...data.imgAdditional ].filter((img) => typeof(img) === 'object').map(async (img) => await ImageUploader(img, userId)));
        const kitImage = await Promise.all([data.kitchen1, data.kitchen2, data.kitchen3, ...data.kitchenAdditional].filter((img) => typeof(img) === 'object').map(async (img) => await ImageUploader(img, userId)));
        const menu = await Promise.all([data.menu1, ...data.menuAdditional].filter((img) => typeof(img) === 'object').map(async (img) => await ImageUploader(img, userId)));

        const plateImage = await Promise.all(data.sidePlate.map(async (img) => await ImageUploader(img, userId)));
        const cupImage = await Promise.all(data.cup.map(async (img) => await ImageUploader(img, userId)));
        const cutleryImage = await Promise.all(data.cuttrary.map(async (img) => await ImageUploader(img, userId)));

        const businessNum = registNum1 + registNum2 + registNum3;
        const businessImage = await ImageUploader(license, userId);
        const businessAddress = address + exactAddress;
        const payEmail = email1 + "@" + email2;
        const payPhoneNum = phone1 + phone2 + phone3;

        await axios.post("/api/v1/space", {
            userId : userId,
            name : data.placeName,
            spaceBrief: data.placeIntro,
            spaceIntro: data.placeIntroDetail,
            kitchenFeat: data.kitchen,
            address: data.fullAddress,
            addressBrief: data.placeInfo,
            website: data.webSite,
            mainImage: imgRepresent,
            hallImage: hallImage,
            kitImage: kitImage,
            menu: menu,
            ableDate: data.rentWeek,
            ableStartHour: data.rentTimeFrom,
            ableFinHour: data.rentTimeTo,
            floorNum: data.floor,
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
            equip: data.equip,
            equipExtra: data.extraMachine,
            plateImage: plateImage,
            plateNum: data.countSidePlate,
            cupImage: cupImage,
            cupNum: data.countCup,
            cutleryImage: cutleryImage,
            cutleryNum: data.countCuttrary,
            companyName: tradeName,
            ceoName: representative,
            businessNum: businessNum,
            businessImage: businessImage,
            businessAddress: businessAddress,
            payEmail: payEmail,
            payPhoneNum: payPhoneNum,
            bankName: bank,
            accountNum: account,
            accountHolder: accountHolder,
            isPublic: data.isPublic && isPublic
        })
            .then((res) => navigate("/hostRegistryComplete"))
            .catch((err) => console.error(err));

    };
    useEffect(() => {
        if (email2 === "직접입력") setEmail2("");
    }, [email2]);
    const handleCheckBox = () => {
        if(address === "") {
            setAddress(data.address);
            setExactAddress(data.addressDetail);
        }
        else {
            setAddress("");
            setExactAddress("");
        }
    };
    return (
        <div>
            <h1>3. 예약/정산 정보</h1>
            <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start", gap: "1.5rem" }} className="fontForRegister">
                <div style={{width:"100%"}} >
                <p>정산 정보를 입력해주세요*</p>
                <hr style={{ height: "2px", backgroundColor: "black",width:"100%" }} />
                </div>
                <div>
                    <div style={{display:"flex",justifyContent:"space-between"}} >
                    <p>상호명<span style={{ color: "#FF2929" }} >*</span></p>
                    <p>{tradeName.length}자/28자</p>
                    </div>
                    <input value={tradeName} onChange={onChangeTradeName} placeholder={"상호명을 입력해주세요"} className="inputForRegister"/>
                </div>
                <div>
                    <div style={{display:"flex",justifyContent:"space-between"}}>
                    <p>대표자명<span style={{ color: "#FF2929" }} >*</span></p>
                    <p>{representative.length}자/10자</p>
                    </div>
                    <input value={representative} onChange={onChangeRepresentative} placeholder={"대표자명을 입력해주세요"} className="inputForRegister"/>
                </div>
                <div>
                <p>사업자 등록번호<span style={{ color: "#FF2929" }} >*</span></p>
                    <div style={{display:"flex"}} >
                        <input value={registNum1} onChange={onChangeRegistNum1} style={{width:"30%"}} />-
                        <input value={registNum2} onChange={onChangeRegistNum2} style={{width:"30%"}}/>-
                        <input value={registNum3} onChange={onChangeRegistNum3} style={{width:"30%"}}/>
                    </div>
                    <div style={{padding: "0px 0px", display: "inline-block" }} >
                        <p style={{ color: "red" }} >• 사업자 등록번호는 필수 입력입니다.</p>
                        <p>• 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>
                        <p>• 추후, 사업자 정보가 수정된다면 반드시 온라인 상담을 통해 변경 내용을 알려주셔야 합니다.</p>
                    </div>
                </div>
                <div style={{height:"9rem"}}>
                    <p>사업자 등록증 첨부*</p>
                    <ImageInput setImg={setLicense} val={license}/>
                </div>
                <div>
                    <div style={{display:"flex"}} >
                        <p>사업장 주소*</p>
                        <label style={{display:"flex",  justifyContent:"center",marginLeft:"5vw"}} >
                            <input type={"checkbox"} onClick={handleCheckBox} />
                            <p>공간 정보와 동일</p>
                        </label>
                    </div>
                    <input value={address} disabled={true} style={{height:"3vh", width:"80vw"}} className="inputForRegister"/>
                    <Modal isOpen={modalOpen1}>
                        <DaumPost setAddress={(e) =>{
                            setAddress(e);
                            setModalOpen1(false);
                        }} />
                        <button onClick={() => setModalOpen1(false)}>닫기</button>
                    </Modal>
                    <button onClick={() => setModalOpen1(true)} className="button" style={{width:"12vw",height:"3vh",fontSize:"12px",backgroundColor:"black",color:"white"}} >주소등록</button>
                    <div>
                        <input onChange={onChangeExactAddress} placeholder={"상세 주소"} value={exactAddress} className="inputForRegister" />
                    </div>
                </div>
                <div>
                    <p>정산용 이메일*</p>
                    <input onChange={onChangeEmail1}/>
                    @ <input value={email2} onChange={onChangeEmail2}/>
                    <DropDown dataArr={emailDatas} onChange={setEmail2}/>
                </div>
                <div>
                    <p>정산용 연락처*</p>
                    <div style={{display:"flex"}} >
                        <input value={phone1} onChange={onChangePhone1} style={{width:"30%"}}/>-
                        <input value={phone2} onChange={onChangePhone2} style={{width:"30%"}}/>-
                        <input value={phone3} onChange={onChangePhone3} style={{width:"30%"}}/>
                    </div>
                </div>
            </div>
            <h1>3.예약/정산 정보</h1>
            <div>
                <p>계좌 정보를 입력해 주세요</p>
                <p>- 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</p>
                <p>은행명*</p>
                <DropDown dataArr={bankDatas} onChange={setBank}/>
                <p>계좌번호*</p>
                <input onChange={onChangeAccount} placeholder={"454102-01-376503"}/>
                <p>예금주*</p>
                <input onChange={onChangeAccountHolder}/>
                <p>- 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>
                <p>- 정산 금액 입금 시, 입금자명은 "포 올"로 확인할 수 있습니다.</p>
            </div>
            <div>
                <h1>환불 기준을 동의해주세요*</h1>
                <p>{"<업장 휴무일 대관>"}</p>
                <p>- 셰프 환불 기준은 트라이얼 진행 전과 후로 구분됩니다.</p>
                <p>1. 트라이얼 전: 100% 환불</p>
                <p>2. 트라이얼 후</p>
                <p>1. 대관 7일전: 80% 환불</p>
                <p>2. 대관 6일전 ~ 3일전: 50% 환불</p>
                <p>3. 대관 2일전 ~ 당일: 환불 불가</p>
                <p>{"<업장 영업일 대관>"}</p>
                <p>a. 대관 14일 전: 100% 환불</p>
                <p>b. 대관 7일 전: 50% 환불</p>
                <p>c. 대관 6일전 ~ 당일 : 환불 불가</p>
            </div>
            <label>
                <input type="checkbox" checked={isAgree} onChange={() => setIsAgree(!isAgree)}/>동의합니다
            </label>
            <div style={{display: "flex"}}>
                <Link to="/hostRegistry4">
                    <button style={{backgroundColor: "red"}} className="next_button" >이전</button>
                </Link>
                <button style={{backgroundColor: "grey"}} className="next_button"
                            onClick={handleButton}
                >다음</button>
            </div>
            <Modal isOpen={isModalOpen} ariaHideApp={false}>
                <p>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
                <p>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                <button onClick={() => setIsModalOpen(false)}>뒤로</button>
                <button onClick={() => submit()}>다음</button>
            </Modal>
            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={"상호명, 대표자명, 사업자 등록번호, 사업자 등록증, 사업장 주소는 필수 입력사항입니다."} />


        </div>


    )
};
export default HostRegistry5;