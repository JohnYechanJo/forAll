import {useCallback, useEffect, useState} from "react";
import ImageInput from "../components/ImageInput";
import DropDown from "../components/DropDown";
import DaumPost from "../components/DaumPost";
import Modal from "react-modal";


const PlaceRegisterPage4 = () => {
    const emailDatas=  ["직접입력","naver.com", "choi.com", "dreamwiz.com", "empal.com", "gmail.com", "hanafos.com", "hanmail.net", "hanmir.com", "hitel.net", "hotmail.com", "korea.com", "lycos.co.kr", "nate.com"];
    const bankDatas = ["한국은행", "KB국민은행", "신한은행", "우리은행", "하나은행", "SC제일은행", "한국씨티은행", "케이뱅크", "카카오뱅크", "토스뱅크", "한국산업은행", "중소기업은행", "한국수출은행", "NH농협은행", "수협은행", "대구은행", "부산은행", "경남은행", "광주은행", "전북은행", "제주은행"];

    const [payment, setPayment] = useState();
    const [tradeName, setTradeName] = useState("");
    const [representative, setRepresentative] = useState("");
    const [registNum1, setRegistNum1] = useState("");
    const [registNum2, setRegistNum2] = useState("");
    const [registNum3, setRegistNum3] = useState("");
    const [license, setLicense] = useState();
    const [address, setAddress] = useState();
    const [exactAddress, setExactAddress] = useState("");
    const [email1, setEmail1] = useState("");
    const [email2, setEmail2] = useState(emailDatas[0]);
    const [phone1, setPhone1] = useState("");
    const [phone2, setPhone2] = useState("");
    const [phone3, setPhone3] = useState("");
    const [bank, setBank] = useState(bankDatas[0]);
    const [account, setAccount] = useState("");
    const [accountHolder, setAccountHolder] = useState();
    const [modalOpen, setModalOpen] = useState(false);

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
    useEffect(() => {
        if (email2 === "직접입력") setEmail2("");
    }, [email2]);
    return (
        <div>
            <h1>3. 예약/정산 정보</h1>
            <div>
                <p>결제 방식을 선택해주세요.*</p>
                <label>
                    <input type="radio" name={"payment"} onClick={() => setPayment("바로결제")}/>바로결제
                </label>
                <label>
                    <input type="radio" name={"payment"} onClick={() => setPayment("승인결제")}/>승인결제
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
                    <ImageInput setImg={setLicense}/>
                </div>
                <div>
                    <p>사업장 주소*</p>
                    {/*Todo 데이터 가져오기*/}
                    <label>
                        <input type={"checkbox"} />공간 정보와 동일
                    </label>
                    <input value={address} disabled={true}/>
                    <Modal isOpen={modalOpen}>
                        <DaumPost setAddress={(e) =>{
                            setAddress(e);
                            setModalOpen(false);
                        }} />
                        <button onClick={() => setModalOpen(false)}>닫기</button>
                    </Modal>
                    <button onClick={() => setModalOpen(true)}>주소등록</button>
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
                <h1>환불 기준을 입력해주세요</h1>
                <p>이용 8일 전 총 금액의 100% 환불</p>
                <p>이용 7일 전 총 금액의 100% 환불</p>
                <p>이용 6일 전 총 금액의 100% 환불</p>
                <p>이용 5일 전 총 금액의 100% 환불</p>
                <p>이용 4일 전 총 금액의 100% 환불</p>
                <p>이용 3일 전 총 금액의 100% 환불</p>
                <p>이용 2일 전 총 금액의 100% 환불</p>
                <p>이용 전날 총 금액의 100% 환불</p>
                <p>이용 당일 총 금액의 100% 환불</p>
                <p>- 예약 확정 직후 2시간 이내 예약 취소의 건에 대해서는 100% 환불이 적용됩니다.</p>
            </div>
            <div>
                <button>이전</button>
                <button>저장</button>
            </div>


        </div>


    )
};
export default PlaceRegisterPage4;