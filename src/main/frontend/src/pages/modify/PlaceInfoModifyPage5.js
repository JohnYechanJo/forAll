import {useCallback, useEffect, useState} from "react";
import ImageInputs from "../../components/ImageInputs";
import DropDown from "../../components/DropDown";
import Modal from "react-modal";
import {Link, useLocation, useNavigate,useParams} from "react-router-dom";
import {PayWay} from "../../utils/enums";
import ImageInput from "../../components/ImageInput";
import "../../components/Styles.css";
import axios from "axios";
const PlaceInfoModifyPage5 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const params = useParams();
    const [dbdata, setDbData] = useState({});

    let isPublic = false;
    const emailDatas=  ["직접입력","naver.com", "choi.com", "dreamwiz.com", "empal.com", "gmail.com", "hanafos.com", "hanmail.net", "hanmir.com", "hitel.net", "hotmail.com", "korea.com", "lycos.co.kr", "nate.com"];

    const [payment, setPayment] = useState(PayWay.NotSpecified);
    const [tradeName, setTradeName] = useState("");
    const [representative, setRepresentative] = useState("");
    const [registNum1, setRegistNum1] = useState("");
    const [registNum2, setRegistNum2] = useState("");
    const [registNum3, setRegistNum3] = useState("");
    const [license, setLicense] = useState("");
    const [address, setAddress] = useState("");
    const [exactAddress, setExactAddress] = useState("");
    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState(emailDatas[0]);
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");

    const [modalOpen1, setModalOpen1] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const businessNum=dbdata.businessNum;
    const onChangeTradeName = useCallback((e) => {
        if (e.target.value.length <= 28) setTradeName(e.target.value);
    },[]);
    const onChangeRepresentative = useCallback((e) => {
        if (e.target.value.length <= 10) setRepresentative(e.target.value);
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

    const handleButton = () => {
        if ((payment !== undefined) && (email1 !== "")
            && (phone1 !== "") && (phone2 !== "") && (phone3 !== "")){
            isPublic = true;
            submit();
        }
        else setIsModalOpen(true);
    };
    const submit = () => {
        data.isPublic = data.isPublic && isPublic;
        navigate("/placeInfoModify6", {
            state: {
                ...data,
                payment:payment,
                tradeName:tradeName,
                representative:representative,
                registNum1:registNum1,
                registNum2:registNum2,
                registNum3:registNum3,
                license:license,
                address:address,
                exactAddress:exactAddress,
                email1:email1,
                email2:email2,
                phone1:phone1,
                phone2:phone2,
                phone3:phone3
            }
        })
    };
    const downloadData = async () => {
        let spaceid;
        await axios.get("/api/v1/space/userSpace/" + sessionStorage.getItem("user_id"))
            .then((res) => spaceid = res.data[0])
            .catch((err) => console.error(err));
        axios
            .get("/api/v1/space/" + spaceid)
            .then((res) => {
                console.log(res.data);
                setDbData(res.data)
                setPayment(res.data.payWay);
                setTradeName(res.data.companyName);
                setRepresentative(res.data.ceoName);
                setRegistNum1(res.data.businessNum.slice(0,3));
                setRegistNum2(res.data.businessNum.slice(3,5));
                setRegistNum3(res.data.businessNum.slice(5,10));
                setLicense(res.data.businessImage);
                setAddress(res.data.businessAddress);
                setEmail1(res.data.payEmail.split("@")[0]);
                setEmail2(res.data.payEmail.split("@")[1]);
                setPhone1(res.data.payPhoneNum.slice(0,3));
                setPhone2(res.data.payPhoneNum.slice(3,7));
                setPhone3(res.data.payPhoneNum.slice(7,11));
            })
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        downloadData();
    }, []);
    useEffect(() => {
        if (email2 === "직접입력") setEmail2("");
    }, [email2]);
    return (
        <div>
            <h1>3. 예약/정산 정보</h1>
            <div>
                <p>결제 방식을 선택해주세요.*</p>
                <label>
                    <input type="radio" name={"payment"}  defaultChecked={(payment===PayWay.QuickPay)} key={payment} onClick={() => setPayment(PayWay.QuickPay)}/>바로결제
                </label>
                <label>
                    <input type="radio" name={"payment"}  defaultChecked={(payment===PayWay.ConfirmPay)} key={payment} onClick={() => setPayment(PayWay.ConfirmPay)}/>승인결제
                </label>
            </div>
            <div>
                <p>정산 정보를 입력해주세요*</p>
                {/*Todo 데이터 가져오기*/}
                <label>
                    <input type={"checkbox"} />최근 정산 정보와 동일
                </label>
                <div>
                    <p>상호명(개인/법인)*</p>
                    <p>{tradeName.length}자/28자</p>
                    <input value={tradeName} defaultValue={dbdata.companyName} disabled={true} className="input"/>
                </div>
                <div>
                    <p>대표자명*</p>
                    <p>{representative.length}자/10자</p>
                    <input value={representative} defaultValue={dbdata.ceoName} disabled={true} className="input"/>
                </div>
                <div>
                    <p>사업자 등록번호*</p>
                     <input defaultValue={registNum1+'-'+registNum2+'-'+registNum3} disabled={true} className="input" key={0}/> 
                    <p>- 사업자 등록번호는 필수 입력입니다.</p>
                    <p>- 정확한 정보를 입력했는지 다시 한 번 확인해주세요.</p>
                    <p>- 추후, 사업자 정보가 수정된다면 반드시 온라인 상담을 통해 변경 내용을 알려주셔야 합니다.</p>
                </div>
                <div>
                    <p>사업자 등록증 첨부*</p>
                    <ImageInput setImg={setLicense} val={license}/>
                </div>
                <div>
                    <p>사업장 주소*</p>
                    {/*Todo 데이터 가져오기*/}
                    
                    <input defaultValue={dbdata.businessAddress} disabled={true} className="input"/>
                </div>
                <div>
                    <p>정산용 이메일*</p>
                    <input onChange={onChangeEmail1} defaultValue={email1}/>
                    @ <input value={email2} defaultValue={email2} onChange={onChangeEmail2}/>
                    <DropDown dataArr={emailDatas} onChange={setEmail2}/>
                </div>
                <div>
                    <p>정산용 연락처*</p>
                    <input value={phone1} defaultValue={phone1} onChange={onChangePhone1}/>-
                    <input value={phone2}  defaultValue={phone2} onChange={onChangePhone2}/>-
                    <input value={phone3} defaultValue={phone3} onChange={onChangePhone3}/>
                </div>
            </div>

            <div>
                <Link to="/placeInfoModify4"><button>이전</button></Link>
                <button onClick={handleButton}>저장</button>
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
export default PlaceInfoModifyPage5;