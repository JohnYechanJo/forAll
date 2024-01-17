import {useCallback, useEffect, useState} from "react";
import ImageInputs from "../../components/ImageInputs";
import DropDown from "../../components/DropDown";
import DaumPost from "../../components/DaumPost";
import Modal from "react-modal";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {PayWay} from "../../utils/enums";
import ImageInput from "../../components/ImageInput";


const HostRegistry5 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    let isPublic = false;
    const emailDatas=  ["직접입력","naver.com", "choi.com", "dreamwiz.com", "empal.com", "gmail.com", "hanafos.com", "hanmail.net", "hanmir.com", "hitel.net", "hotmail.com", "korea.com", "lycos.co.kr", "nate.com"];

    const [payment, setPayment] = useState(PayWay.NotSpecified);
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

    const [modalOpen1, setModalOpen1] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleButton = () => {
        if ((tradeName==="")||(representative==="")||(registNum1==="")||(registNum2==="")||(registNum3==="")||(license==="")||(address==="")||(exactAddress==="")){
            alert("상호명, 대표자명, 사업자 등록번호, 사업자 등록증, 사업장 주소는 필수 입력사항입니다.");
        } else if ((payment !== undefined) && (tradeName !== "") && (representative !== "") && (registNum1 !== "") && (registNum2 !== "") && (registNum3 !== "")
        && (license !== undefined) && (address !== undefined) && (exactAddress !== "") && (email1 !== "")
        && (phone1 !== "") && (phone2 !== "") && (phone3 !== "")){
        isPublic = true;
        submit();
        }
        else setIsModalOpen(true);
    };
    const submit = () => {
        data.isPublic = data.isPublic && isPublic;
        navigate("/hostRegistry6", {
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
    useEffect(() => {
        if (email2 === "직접입력") setEmail2("");
    }, [email2]);
    return (
        <div>
            <h1>3. 예약/정산 정보</h1>
            <div>
                <p>결제 방식을 선택해주세요.*</p>
                <label>
                    <input type="radio" name={"payment"} onClick={() => setPayment(PayWay.QuickPay)}/>바로결제
                </label>
                <label>
                    <input type="radio" name={"payment"} onClick={() => setPayment(PayWay.ConfirmPay)}/>승인결제
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
                    <input value={tradeName} onChange={onChangeTradeName} placeholder={"상호명을 입력해주세요"}/>
                </div>
                <div>
                    <p>대표자명*</p>
                    <p>{representative.length}자/10자</p>
                    <input value={representative} onChange={onChangeRepresentative} placeholder={"대표자명을 입력해주세요"}/>
                </div>
                <div>
                    <p>사업자 등록번호*</p>
                    <input value={registNum1} onChange={onChangeRegistNum1}/>-
                    <input value={registNum2} onChange={onChangeRegistNum2}/>-
                    <input value={registNum3} onChange={onChangeRegistNum3}/>
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
                    <label>
                        <input type={"checkbox"} />공간 정보와 동일
                    </label>
                    <input value={address} disabled={true}/>
                    <Modal isOpen={modalOpen1}>
                        <DaumPost setAddress={(e) =>{
                            setAddress(e);
                            setModalOpen1(false);
                        }} />
                        <button onClick={() => setModalOpen1(false)}>닫기</button>
                    </Modal>
                    <button onClick={() => setModalOpen1(true)}>주소등록</button>
                    <input onChange={onChangeExactAddress} placeholder={"상세 주소"}/>
                </div>
                <div>
                    <p>정산용 이메일*</p>
                    <input onChange={onChangeEmail1}/>
                    @ <input value={email2} onChange={onChangeEmail2}/>
                    <DropDown dataArr={emailDatas} onChange={setEmail2}/>
                </div>
                <div>
                    <p>정산용 연락처*</p>
                    <input value={phone1} onChange={onChangePhone1}/>-
                    <input value={phone2} onChange={onChangePhone2}/>-
                    <input value={phone3} onChange={onChangePhone3}/>
                </div>
            </div>

            <div>
                <Link to="/hostRegistry4"><button>이전</button></Link>
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
export default HostRegistry5;