import DropDown from "../components/DropDown";
import {useCallback, useState} from "react";
import {Form, Link, useLocation, useNavigate} from "react-router-dom";
import Modal from "react-modal";
import ImageUploader from "../utils/imageUploader";

const HostRegistry6 =() => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();

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
        else if((account !== "") && (accountHolder !== undefined)) submit();
        else setIsModalOpen(true);
    };
    const submit = async () => {
        const log = await ImageUploader(data.license, sessionStorage.getItem("user_id"));
        console.log(log);

    };
    return (
        <div>
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

            <div>
                <Link to="/hostRegistry2"><button>이전</button></Link>
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

export default HostRegistry6;