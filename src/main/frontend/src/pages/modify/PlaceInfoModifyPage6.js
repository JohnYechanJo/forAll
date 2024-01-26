import { useCallback, useEffect, useState } from "react";
import DropDown from "../../components/DropDown";
import Modal from "react-modal";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ImageInput from "../../components/ImageInput";
import "../../components/Styles.css";
import axios from "axios";
import ImageUploader from "../../utils/imageUploader";
import Alert from "../../components/Alert";
import { ModalStyles } from "../../components/ModalStyles";
import ForAllLogo from "../../components/ForAllLogo";
const PlaceInfoModifyPage6 = () => {
    const location = useLocation();
    const data = { ...location.state };
    const navigate = useNavigate();
    const [dbdata, setDbData] = useState({});

    let isPublic = false;
    const emailDatas = ["직접입력", "naver.com", "choi.com", "dreamwiz.com", "empal.com", "gmail.com", "hanafos.com", "hanmail.net", "hanmir.com", "hitel.net", "hotmail.com", "korea.com", "lycos.co.kr", "nate.com"];

    const [tradeName, setTradeName] = useState("");
    const [representative, setRepresentative] = useState("");
    const [registNum1, setRegistNum1] = useState("");
    const [registNum2, setRegistNum2] = useState("");
    const [registNum3, setRegistNum3] = useState("");
    const [license, setLicense] = useState("");
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

    const businessNum = dbdata.businessNum;
    const onChangeTradeName = useCallback((e) => {
        if (e.target.value.length <= 28) setTradeName(e.target.value);
    }, []);
    const onChangeRepresentative = useCallback((e) => {
        if (e.target.value.length <= 10) setRepresentative(e.target.value);
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
        setAccount(e.target.value);
    }, []);
    const onChangeAccountHolder = useCallback((e) => {
        setAccountHolder(e.target.value);
    }, []);
    const handleButton = () => {
        if (isAgree === false) setIsAlertOpen(true);
        else if ((phone1 !== "") && (phone2 !== "") && (phone3 !== "") && (account !== "") && (accountHolder !== undefined)) {
            isPublic = true;
            submit();
        }
        else setIsModalOpen(true);
    };
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        // 대표 이미지
        const imgRepresent = await ImageUploader(data.imgRepresent, userId);
        const hallImage = await Promise.all([data.img1, data.img2, data.img3, ...data.imgAdditional].map(async (img) => await ImageUploader(img, userId)));
        const kitImage = await Promise.all([data.kitchen1, data.kitchen2, data.kitchen3, ...data.kitchenAdditional].map(async (img) => await ImageUploader(img, userId)));

        const menu = data.menuAdditional ? await Promise.all([data.menu1, ...data.menuAdditional].map(async (img) => await ImageUploader(img, userId))) : null;

        const plateImage = data.sidePlate ? await Promise.all(data.sidePlate.map(async (img) => await ImageUploader(img, userId))) : null;
        const cupImage = data.cup ? await Promise.all(data.cup.map(async (img) => await ImageUploader(img, userId))) : null;
        const cutleryImage = data.cuttrary ? await Promise.all(data.cuttrary.map(async (img) => await ImageUploader(img, userId))) : null;

        const businessNum = registNum1 + registNum2 + registNum3;
        const businessImage = await ImageUploader(license, userId);
        const businessAddress = address + exactAddress;
        const payPhoneNum = phone1 + phone2 + phone3;

        await axios.put("/api/v1/space", {
            id: dbdata.id,
            userId: userId,
            name: data.placeName,
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
            ableMiseenStartTime: data.miseenTimeFrom,
            ableMiseenFinTime: data.miseenTimeTo,
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
            capacity: data.capacity,
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
            payPhoneNum: payPhoneNum,
            bankName: bank,
            accountNum: account,
            accountHolder: accountHolder,
            isPublic: data.isPublic && isPublic
        })
            .then((res) => navigate("/"))
            .catch((err) => console.error(err));

    };
    const downloadData = async () => {
        let spaceid;
        await axios.get("/api/v1/space/userSpace/" + sessionStorage.getItem("user_id"))
            .then((res) => spaceid = res.data[0])
            .catch((err) => console.error(err));
        axios
            .get("/api/v1/space/" + spaceid)
            .then((res) => {
                setDbData(res.data)
                console.log(res.data);
                setTradeName(res.data.companyName);
                setRepresentative(res.data.ceoName);
                setRegistNum1(res.data.businessNum.slice(0, 3));
                setRegistNum2(res.data.businessNum.slice(3, 5));
                setRegistNum3(res.data.businessNum.slice(5, 10));
                setLicense(res.data.businessImage);
                setAddress(res.data.businessAddress);
                setPhone1(res.data.payPhoneNum.slice(0, 3));
                setPhone2(res.data.payPhoneNum.slice(3, 7));
                setPhone3(res.data.payPhoneNum.slice(7, 11));
                setBank(res.data.bankName);
                setAccount(res.data.accountNum);
                setAccountHolder(res.data.accountHolder);
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        downloadData();
    }, []);
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <ForAllLogo />
            <p style={{ textAlign: 'center', fontSize: '0.9375rem' }}>(4/4) 예약 및 정산 정보</p>
            <div >
                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start", gap: "1.5rem" }} className="fontForRegister" >
                    <div style={{ width: "100%" }} >
                        <a>정산 정보를 입력해 주세요<span style={{ color: "#FF2929" }} >*</span></a>
                        <hr style={{ height: "1px", backgroundColor: "black", width: "100%" }} />
                    </div>
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between" }} >
                            <p>상호(개인/법인)<span style={{ color: "#FF2929" }} >*</span></p>
                            <p>{tradeName.length}자/28자</p>
                        </div>
                        <input value={tradeName} defaultValue={dbdata.companyName} disabled={true} className="input" />
                    </div>
                    <div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <p>대표자명<span style={{ color: "#FF2929" }} >*</span></p>
                            <p>{representative.length}자/10자</p>
                        </div>
                        <input value={representative} defaultValue={dbdata.ceoName} disabled={true} className="input" />
                    </div>
                    <div>
                        <p>사업자 등록번호<span style={{ color: "#FF2929" }} >*</span></p>
                        <input defaultValue={businessNum} disabled={true} className="input" />
                        <div style={{ padding: "0px 0px", display: "inline-block" }} >
                            <div style={{ padding: "0px 0px", display: "flex", flexDirection: 'column' }} >
                                <a style={{ color: "red" }} >• 사업자 등록번호는 필수 입력입니다.</a>
                                <a>• 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</a>
                                <a>• 추후, 사업자 정보가 수정된다면 반드시 온라인 상담을 통해 변경 내용을 알려주셔야 합니다.</a>

                            </div>
                        </div>
                    </div>
                    <div style={{ height: "9rem" }} >
                        <p>사업자 등록증 첨부<span style={{ color: "#FF2929" }} >*</span></p>
                        <ImageInput setImg={setLicense} val={license} />
                    </div>
                    <div>
                        <a>사업장 주소<span style={{ color: "#FF2929" }} >*</span></a>
                        <input defaultValue={dbdata.businessAddress} disabled={true} className="input" />
                    </div>
                    <div>
                        <p>정산용 연락처<span style={{ color: "#FF2929" }} >*</span></p>
                        <div style={{ display: "flex", alignItems: 'center' }} >
                            <input value={phone1} defaultValue={phone1} onChange={onChangePhone1} className="input" style={{ width: "30%" }} />-
                            <input value={phone2} defaultValue={phone2} onChange={onChangePhone2} className="input" style={{ width: "30%" }} />-
                            <input value={phone3} defaultValue={phone3} onChange={onChangePhone3} className="input" style={{ width: "30%" }} />
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start", gap: "1.5rem" }} className="fontForRegister">
                    <div style={{ width: "100%" }} >
                        <a className="fontForRegister" >계좌 정보를 입력해 주세요.<span className="fontForRegister" style={{ color: "#FF2929" }} >*</span></a>
                        <hr style={{ height: "1px", backgroundColor: "black", width: "100%" }} />
                        <a style={{ fontSize: '0.4375rem' }}>• 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</a>
                    </div>
                    <div>
                        <div style={{ display: "flex" }} >
                            <div>
                                <p>은행명<span style={{ color: "#FF2929" }} >*</span></p>
                                <DropDown dataArr={bankDatas} onChange={setBank} defaultData={dbdata.bankName} val={bank} width='6.875rem' />
                            </div>
                            <div>
                                <p>계좌번호<span style={{ color: "#FF2929" }} >*</span></p>
                                <input onChange={onChangeAccount} placeholder={"454102-01-376503"} defaultValue={dbdata.accountNum} className="input"
                                    style={{ width: "9.375rem", height: "1.875rem", flexShrink: "0", marginLeft: '0.63rem' }}
                                />
                            </div>
                            <div>
                                <p>예금주<span style={{ color: "#FF2929" }} >*</span></p>
                                <input onChange={onChangeAccountHolder} defaultValue={dbdata.accountHolder} className="input"
                                    style={{ width: "4.375rem", height: "1.875rem", flexShrink: "0", marginLeft: '0.63rem' }}
                                />
                            </div>
                        </div>
                        <div style={{ fontSize: '0.4375rem', display: 'flex', flexDirection: 'column' }}>
                            <a>- 정확한 정보를 입력했는지 다시 한번 확인해 주세요.</a>
                            <a>- 정산 금액 입금 시, 입금자명은 "포 올"로 확인할 수 있습니다.</a>
                        </div>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", padding: "1rem", alignItems: "flex-start" }} className="fontForRegister">
                    <p>환불 기준을 동의해 주세요<span style={{ color: "#FF2929" }} >*</span></p>
                    <hr style={{ height: "1px", backgroundColor: "black", width: "100%", marginTop: '0' }} />
                    <div style={{ display: 'flex', flexDirection: 'column' }} >
                        <a>• 셰프 환불 기준은 아래와 같이 구분됩니다.</a>
                        <a>• 1) 대관 14일 전:100% 환불</a>
                        <a>• 2) 대관 13일 전~9일 전:80% 환불</a>
                        <a>• 3) 대관 8일 전~5일 전:50% 환불</a>
                        <a>• 4) 대관 4일 전~당일:환불 불가</a>
                    </div>
                    <hr style={{ height: "1px", backgroundColor: "black", width: "100%" }} />
                </div>
                <input type="checkbox" id="agree" checked={isAgree} onChange={() => setIsAgree(!isAgree)} />
                <label for='agree' style={{ marginLeft: '1rem', display: 'flex', alignItems: 'center' }}>
                    <em></em><a>동의합니다</a>
                </label>

            </div>
            <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem', bottom: '0'}}>
                <button style={{ marginLeft: 'auto', backgroundColor: "#FF4F4F", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => navigate(-1, data)}
                >
                    이전</button>
                <button style={{ marginLeft: 'auto', backgroundColor: "#525252", width: '50%', bottom: '0', height: '3.125rem', color: 'white', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                    onClick={() => handleButton()}
                >다음</button>
            </div>
            <Modal isOpen={isModalOpen} ariaHideApp={false} style={ModalStyles} >
                <p style={{ fontSize: '0.9375rem' }}>현재 필수 입력사항이 모두 기입되지 않았습니다.</p>
                <p style={{ fontSize: '0.9375rem' }}>이 경우 해당 공간은 '비공개' 상태로 등록되며, 게스트들에게 노출되지 않습니다.</p>
                <div style={{ display: 'flex', width: '100%', margin: '0px', marginTop: '4rem', borderTop: '1px solid #C4C4C4' }}>
                    <button style={{ marginLeft: 'auto', backgroundColor: "white", width: '50%', bottom: '0', height: '3.125rem', color: 'black', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => setIsModalOpen(false)}
                    >
                        뒤로</button>
                    <button style={{ marginLeft: 'auto', backgroundColor: "white", width: '50%', bottom: '0', height: '3.125rem', color: 'black', border: 'none', lineHeight: '1.875rem', textAlign: 'center' }}
                        onClick={() => submit()}
                    >다음</button>
                </div>
            </Modal>
            <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                    <path
                        d="M22.0832 28.7503L17.5519 24.2191C17.17 23.8371 16.7012 23.6462 16.1457 23.6462C15.5901 23.6462 15.104 23.8545 14.6873 24.2712C14.3054 24.6531 14.1144 25.1392 14.1144 25.7295C14.1144 26.3198 14.3054 26.8059 14.6873 27.1878L20.6248 33.1253C21.0068 33.5073 21.4929 33.6982 22.0832 33.6982C22.6735 33.6982 23.1596 33.5073 23.5415 33.1253L35.3644 21.3024C35.7464 20.9205 35.9373 20.4517 35.9373 19.8962C35.9373 19.3406 35.729 18.8545 35.3123 18.4378C34.9304 18.0559 34.4443 17.8649 33.854 17.8649C33.2637 17.8649 32.7776 18.0559 32.3957 18.4378L22.0832 28.7503ZM24.9998 45.8337C22.1179 45.8337 19.4096 45.2864 16.8748 44.192C14.3401 43.0989 12.1353 41.6149 10.2603 39.7399C8.38525 37.8649 6.90123 35.66 5.80817 33.1253C4.71373 30.5906 4.1665 27.8823 4.1665 25.0003C4.1665 22.1184 4.71373 19.41 5.80817 16.8753C6.90123 14.3406 8.38525 12.1357 10.2603 10.2607C12.1353 8.38574 14.3401 6.90102 16.8748 5.80658C19.4096 4.71352 22.1179 4.16699 24.9998 4.16699C27.8818 4.16699 30.5901 4.71352 33.1248 5.80658C35.6596 6.90102 37.8644 8.38574 39.7394 10.2607C41.6144 12.1357 43.0984 14.3406 44.1915 16.8753C45.2859 19.41 45.8332 22.1184 45.8332 25.0003C45.8332 27.8823 45.2859 30.5906 44.1915 33.1253C43.0984 35.66 41.6144 37.8649 39.7394 39.7399C37.8644 41.6149 35.6596 43.0989 33.1248 44.192C30.5901 45.2864 27.8818 45.8337 24.9998 45.8337Z"
                        fill="black" />
                </svg>
                <p style={{
                    color: "#000", fontFamily: "Noto Sans KR", fontSize: "0.9375rem",
                    fontStyle: "normal", fontWeight: "400", lineHeight: "normal"

                }}>공간정보가 수정되었습니다!</p>

                <hr />
                <button onClick={() => navigate("/")}>확인</button>
            </Modal>
            <Alert isOpen={isAlertOpen} setIsOpen={setIsAlertOpen} content={"환불 기준에 동의해 주세요"} />
        </div>


    )
};
export default PlaceInfoModifyPage6;