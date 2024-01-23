import ImageViewer from "../../components/ImageViewer";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {ModalStyles} from "../../components/ModalStyles";
import Modal from "react-modal";
import Calendar from "../../components/Calender";
import axios from "axios";

const RentSpacePage3 = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [rentDay, setRentDay] = useState(data.rentDay);
    const [trialDay, setTrialDay] = useState(data.trialDay);
    const [chefNum, setChefNum] = useState(data.chefNum);

    const [rentDayModal, setRentDayModal] = useState(false);
    const [trialDayModal, setTrialDayModal] = useState(false);
    const [chefNumModal, setChefNumModal] = useState(false);
    const [accountData, setAccountData] = useState(false);
    const [refundModal, setRefundModal] = useState(false);
    const [isAgree, setIsAgree] = useState(false);
    const [contractModal, setContractModal] = useState(false);


    const substractChef = () => { setChefNum(chefNum-1); }
    const addChef = () => { setChefNum(chefNum+1); }

    const submit = () => {
        axios.post("/api/v1/reservation", {
            member: sessionStorage.getItem("user_id"),
            space: data.spaceId,
            rentDay: rentDay.toString(),
            trialDay: trialDay.toString(),
            chefNum: chefNum
        }).then(()=>navigate("/rentSpaceComplete"))
            .catch((err) => console.error(err));
    };
    useEffect(() => {
        if (!trialDay) return;
        setTrialDayModal(false);
    }, [trialDay]);
    useEffect(() => {
        if (!rentDay) return;
        setRentDayModal(false);
    }, [rentDay]);
    return (
        <div>
            <div>
                <button onClick={()=>navigate(-1)}>{"<"}</button>
                <h1>확인 및 결제</h1>
            </div>
            <div>
                <ImageViewer val={data.spaceImage}/>
                <p>{data.spaceAddress} | {data.spaceName}</p>
            </div>
            <div>
                <h1>예약 정보</h1>
                <p>대관 희망 날짜</p>
                <p onClick={()=>setRentDayModal(true)}>수정</p>
                <p>{rentDay ? rentDay.toString() : null}</p>
                {rentDayModal ? (<div>
                    <Calendar setDate={setRentDay}/>
                </div>) : null}
                <p>트라이얼 희망 날짜</p>
                {data.ableTrial ? (
                    <div>
                        <p onClick={()=>setTrialDayModal(true)}>수정</p>
                        <p>{trialDay ? trialDay.toString() : null}</p>
                        {trialDayModal ? (<div>
                            <Calendar setDate={setTrialDay}/>
                        </div>) : null}
                    </div>
                ) : (<p>오너가 트라이얼이 불가하다고 지정한 매장입니다.</p>)
                }

                <p>인원 수</p>
                <p onClick={()=>setChefNumModal(true)}>수정</p>
                <p>셰프 {chefNum}명</p>
            </div>
            <div>
                <h1>결제방식</h1>
                <h1>통장입금</h1>
                <p onClick={()=>setAccountData(true)}>계좌정보</p>
                {accountData ? (
                    <div>
                        <h1>계좌 정보를 숙지해 주세요</h1>
                        <p>은행명</p>
                        <input disabled={true}/>
                        <p>계좌번호</p>
                        <input disabled={true}/>
                        <p>예금주</p>
                        <input disabled={true}/>
                        <p>정확한 계좌번호로 금액을 송금해주세요.</p>
                        <p>대관 마무리 후 보증금 입금 시, 입금자명은 “포 올”로 확인할 수 있습니다.</p>
                    </div>
                ) : null
                }
            </div>
            <div>
                <h1>요금 세부 정보</h1>
                <p>{data.priceSet} | 매장대관금액</p>
                <p>{data.priceSet} | 포 올 수수료</p>
                <p>{data.priceSet} | 보증금</p>
                <p>총 합계 얼마</p>
            </div>
            <div>
                <h1>환불 정책</h1>
                <p>포 올 예약 후 취소 시점에 따라 수수료가 부과될 수 있습니다. 건전한 대관 문화 조성을 위해 패널티 제도를 운영하고 있습니다. 예약 전 취소수수료 및 패널티 제도를 반드시 확인해주세요.</p>
                <p onClick={()=>setRefundModal(true)}>자세히 알아보기</p>
            </div>
            <div>
                <h1>기본 규칙</h1>
                <p>훌륭한 셰프가 되기 위한 몇 가지 간단한 규칙을 지켜주실 것을 모든 셰프님에게 당부드리고 있습니다.</p>
                <p>매장 이용규칙을 준수하세요.</p>
                <p>오너의 매장도 자신의 매장처럼 아껴주세요!</p>
                <p>셰프님은 '원데이 오너'가 되시는 겁니다.</p>
            </div>
            <p>아래 버튼을 선택하면 포 올 이용약관, 개인정보 수집·이용 동의,  개인정보의 제3자 제공 동의 안내에 동의하며, 피해에 대한 책임이 본인에게 있을 경우 포 올이 결제 수단으로 청구의 조치를 취할 수 있다는 사실에 동의하는 것입니다.</p>
            <button onClick={()=>setIsAgree(true)}>동의 및 결제</button>

            {isAgree ?(
                <div>
                    <h1>포 올 계약서 안내</h1>
                    <p>포 올은 안전대관을 위해 계약서 제도를 도입하고 있습니다. 대관을 위해 아래 내용을 확인해주세요.</p>
                    <p onClick={()=>setContractModal(true)}>자세히</p>
                    <button onClick={submit}>동의하고 계속하기</button>
                </div>
            ) : null}

            <Modal isOpen={chefNumModal} style={ModalStyles} ariaHideApp={false}>
                <h1>셰프</h1>
                <p>이 주방의 최대 수용 셰프 수는 {data.capacity}명입니다.</p>
                <h1>셰프</h1>
                <button onClick={substractChef} disabled={chefNum <= 1}>{"-"}</button>
                <p>{chefNum}</p>
                <button onClick={addChef} disabled={chefNum >= data.capacity}>{"+"}</button>
                <button onClick={()=>setChefNumModal(false)}>저장</button>
            </Modal>
            <Modal isOpen={refundModal} style={ModalStyles} ariaHideApp={false}>
                <h1>환불 기준을 확인해 주세요</h1>
                <p>환불 기준은 아래 구분됩니다.</p>
                <p>1) 대관 14일 전 : 100% 환불</p>
                <p>2) 대관 13일 전~9일 전: 80% 환불</p>
                <p>3) 대관 8일 전~5일 전: 50% 환불</p>
                <p>4) 대관 4일 전~당일: 환불 불가</p>
                <button onClick={()=>setRefundModal(false)}>닫기</button>
            </Modal>
            <Modal isOpen={contractModal} style={ModalStyles} ariaHideApp={false}>
                <h1>For ALL 서비스 이용 계약서</h1>
                <p>계약서 전문</p>
                <button onClick={()=>setContractModal(false)}>확인</button>
            </Modal>

        </div>
    )
};
export default RentSpacePage3;