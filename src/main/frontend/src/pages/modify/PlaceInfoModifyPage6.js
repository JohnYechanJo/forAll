import DropDown from "../../components/DropDown";
import {useCallback, useState, useEffect} from "react";
import {Form, Link, useLocation, useNavigate, useParams} from "react-router-dom";
import Modal from "react-modal";
import ImageUploader from "../../utils/imageUploader";
import axios from "axios";
import "../../components/Styles.css";
const PlaceInfoModifyPage6 =() => {
    const location = useLocation();
    const data = {...location.state};
    let isPublic = false;
    const navigate = useNavigate();
    const params = useParams();
    const [dbdata, setDbData] = useState({});

    const bankDatas = ["한국은행", "KB국민은행", "신한은행", "우리은행", "하나은행", "SC제일은행", "한국씨티은행", "케이뱅크", "카카오뱅크", "토스뱅크", "한국산업은행", "중소기업은행", "한국수출은행", "NH농협은행", "수협은행", "대구은행", "부산은행", "경남은행", "광주은행", "전북은행", "제주은행"];
    const [bank, setBank] = useState(bankDatas[0]);
    const [account, setAccount] = useState("");
    const [accountHolder, setAccountHolder] = useState();
    const [isAgree, setIsAgree] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);


    const onChangeAccount = useCallback((e) => {
        setAccount(e.target.value);
    }, []);
    const onChangeAccountHolder = useCallback((e) => {
        setAccountHolder(e.target.value);
    }, []);

    const handleButton = () => {
        if (isAgree === false) alert("환불 기준을 동의해주세요");
        else if((account !== "") && (accountHolder !== undefined)) {
            isPublic = true;
            submit();
        }
        else setIsModalOpen(true);
    };
    const downloadData = async () => {
        let spaceid;
        await axios.get("/api/v1/space/userSpace/" + sessionStorage.getItem("user_id"))
            .then((res) => spaceid = res.data[0])
            .catch((err) => console.error(err));
        axios
            .get("/api/v1/space/" + spaceid)
            .then((res) => {
                setDbData(res.data);
                setBank(res.data.bankName);
                setAccount(res.data.accountNum);
                setAccountHolder(res.data.accountHolder);
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        downloadData();
    }, []);
    const submit = async () => {
        const userId = sessionStorage.getItem("user_id");
        // 대표 이미지
        const imgRepresent = await ImageUploader(data.imgRepresent, userId);
        const hallImage = await Promise.all([data.img1, data.img2, data.img3].map(async (img) => await ImageUploader(img, userId)));
        const kitImage = await Promise.all([data.kitchen1, data.kitchen2, data.kitchen3].map(async (img) => await ImageUploader(img, userId)));

        const menu = data.menuAdditional ? await Promise.all([data.menu1, ...data.menuAdditional].map(async (img) => await ImageUploader(img, userId))) : null;

        const plateImage = data.sidePlate ? await Promise.all(data.sidePlate.map(async (img) => await ImageUploader(img, userId))) : null;
        const cupImage = data.cup ? await Promise.all(data.cup.map(async (img) => await ImageUploader(img, userId))) : null;
        const cutleryImage = data.cuttrary ? await Promise.all(data.cuttrary.map(async (img) => await ImageUploader(img, userId))) : null;
        const vatImage = data.bat ? await Promise.all(data.bat.map(async (img) => await ImageUploader(img, userId))) : null;

        const businessNum = data.registNum1 + data.registNum2 + data.registNum3;
        const businessImage = await ImageUploader(data.license, userId);
        const businessAddress = data.address + data.exactAddress;
        const payEmail = data.email1 + "@" + data.email2;
        const payPhoneNum = data.phone1 + data.phone2 + data.phone3;

        await axios.put("/api/v1/space", {
            id: dbdata.id,
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
            ableDrink: data.alcohol,
            fireholeNum: data.firePit,
            equip: data.equip,
            equipExtra: data.extraMachine,
            plateImage: plateImage,
            plateNum: data.countSidePlate,
            cupImage: cupImage,
            cupNum: data.countCup,
            cutleryImage: cutleryImage,
            cutleryNum: data.countCuttrary,
            vatImage: vatImage,
            vatNum: data.countBat,
            payWay: data.payment,
            companyName: data.tradeName,
            ceoName: data.representative,
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
            .then((res) => navigate("/"))
            .catch((err) => console.error(err));

    };
    return (
        <div>
            <h1>3.예약/정산 정보</h1>
            <div>
                <p>계좌 정보를 입력해 주세요</p>
                <hr style={{ height: "2px", backgroundColor: "black" }} />
                <p>- 법인 사업자는 법인 통장계좌를, 개인 사업자는 사업자 명의의 통장 계좌를 입력해주세요. 포 올을 통해 결제된 금액이 해당 계좌로 정산됩니다.</p>
                <p>은행명*</p>
                <DropDown dataArr={bankDatas} onChange={setBank} defaultData={dbdata.bankName} key={bank}/>
                <p>계좌번호*</p>
                <input onChange={onChangeAccount} placeholder={"454102-01-376503"} defaultValue={dbdata.accountNum}/>
                <p>예금주*</p>
                <input onChange={onChangeAccountHolder}  defaultValue={dbdata.accountHolder}/>
                <p>- 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>
                <p>- 정산 금액 입금 시, 입금자명은 "포 올"로 확인할 수 있습니다.</p>
            </div>
            <div>
                <h1>환불 기준을 동의해주세요*</h1>
                <hr style={{ height: "2px", backgroundColor: "black" }} />
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
            <hr style={{ height: "2px", backgroundColor: "black" }} />
            <label>
                <input type="checkbox" checked={isAgree} onChange={() => setIsAgree(!isAgree)}/>동의합니다
            </label>

            <div style={{display: "flex"}}>
                <Link to="/placeInfoModify5">
                    <button className="next_button" style={{backgroundColor:"red"}} >이전</button>
                </Link>
                <button className="next_button" style={{backgroundColor:"grey"}}
                            onClick={handleButton}
                >다음</button>
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

export default PlaceInfoModifyPage6;