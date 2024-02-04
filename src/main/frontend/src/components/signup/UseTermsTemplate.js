import {useRef, useState, useEffect} from "react";
import Modal from "react-modal";
import "../Styles.css";
import {ModalStyles} from "../ModalStyles";
import arrowIcon from "../../components/icons/arrowright.png";
import {CompleteModalStyles} from "../CompleteModalStyles";
import {BigModalStyles} from "../BigModalStyles";
import {SmallModalStyles} from "../SmallModalStyles";


const UseTermsTemplate = ({setIsUseTermsChecked}) => {
    const [modalIsOpen1, setModalIsOpen1] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const [modalIsOpen3, setModalIsOpen3] = useState(false);
    const modalClose1 = () => {
        setModalIsOpen1(false);
    };
    const modalClose2 = () => {
        setModalIsOpen2(false);
    };
    const modalClose3 = () => {
        setModalIsOpen3(false);
    };
    const [everyBox, setEveryBox] = useState(false);
    const [userAgree, setUserAgree] = useState(false);
    const [infoCollect, setInfoCollect] = useState(false);
    const [infoThird, setInfoThird] = useState(false);
    const [ageOver14, setAgeOver14] = useState(false);
    const handleCheckBox = () => {
        setEveryBox(!everyBox);
        setUserAgree(!everyBox);
        setInfoCollect(!everyBox);
        setInfoThird(!everyBox);
        setAgeOver14(!everyBox);
    };

    useEffect(() => {
        if (userAgree && infoCollect && infoThird && ageOver14) {
            setIsUseTermsChecked(true);
            setEveryBox(true);
        }
        else{
            setIsUseTermsChecked(false);
            setEveryBox(false);
        }
    }, [userAgree, infoCollect, infoThird, ageOver14]);
    return (
        <div className="fontForRegister" style={{
            fontWeight: '350',
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: "flex-start",
            width: "100%"
        }}>
            <p style={{paddingLeft: "2%"}} className="fontForRegister">이용약관동의<span style={{color: '#FF2929'}}>*</span>
            </p>
            <p style={{marginBottom: '2rem'}}>
                <div style={{display: 'flex', alignItems: "end"}}>
                    <input type="checkbox" checked={everyBox} id="checkbox" onChange={handleCheckBox}/>
                    <label htmlFor="checkbox" style={{paddingLeft: "2%", fontWeight: '500'}}><em
                        style={{height: '1rem'}}></em><span
                        style={{height: '1rem', marginTop: '-50px'}}>전체 동의합니다.</span>
                    </label>
                </div>

            </p>
            <div>
                <p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        <div>
                            <input type="checkbox" checked={userAgree} id="checkbox1"
                                   onChange={() => {
                                       setUserAgree(!userAgree);
                                   }}/>
                            <label htmlFor="checkbox1" style={{paddingLeft: "2%", fontWeight: '500'}}><em
                                style={{height: '1rem'}}></em><span style={{height: '1rem', marginTop: '-50px'}}>
                            <a>이용약관 동의<span style={{color: '#7B7B7B'}}>(필수)</span></a>
                            </span>
                            </label>

                        </div>
                        <img src={arrowIcon} style={{width: '0.4375rem', height: '0.875rem'}}
                             onClick={() => setModalIsOpen1(true)}/>
                    </div>
                    <Modal
                        isOpen={modalIsOpen1}
                        style={BigModalStyles}
                    >
                        <pre style={{fontSize: '0.9375rem', fontWeight: '700', textAlign: 'left'}}>포 올 이용약관</pre>
                        <div style={{textAlign: 'left', wordWrap: 'break-word', width: '100%'}}>
                            <p style={{fontSize: '0.6325rem', fontWeight: '700'}}>• 제 1장 총칙</p>
                            <p style={{fontSize: '0.625rem'}}>

                                **제1조 목적** <br/>

                                본 약관은 포 올(이하 “회사” 라 함)이 제공하는 “팝업 레스토랑 공간 플랫폼”(이하 "서비스"라 함)과 관련하여 "회사"와 “오너”, “셰프”(이하
                                “오너”와 “셰프’를 “회원”라 함) 간의 권리, 의무, 책임사항 및 "서비스" 사용 절차에 관한 사항을 규정함을 목적으로 합니다.
                                <br/> <br/>

                                **제2조 용어의 정의**
                                <br/>

                                1. "서비스"라 함은 구현되는 단말기 (PC, 휴대형단말기 등의 각종 유무선장치를 포함)와 상관없이 서비스를 제공받는 고객이 사용할 수 있는 서비스로,
                                어플리케이션, 웹페이지, 통화, 이메일 등 회사에서 제공하는 모든 기능, 용역, 재화 등을 의미합니다. <br/>

                                2. 서비스는 “대관하기”와 “커뮤니티”로 나눌 수 있습니다. “대관하기”는 “오너”의 공간을 유료로 대관하여 사용할 수 있는 일체의 행위를 의미하며,
                                “커뮤니티”는 “회원”이 팝업, 레시피, 잡담과 관련된 모든 행위를 무료로 할 수 있는 것을 의미합니다. <br/>

                                3. "회원"이란 회사의 서비스에 접속하여 이 약관에 따라 회사와 사용계약을 체결하고 회원으로 등록한 자로서 회사가 제공하는 서비스를 사용하는 사람 또는
                                단체를 의미합니다. <br/>

                                4. "오너"란 공간(이하 “공간”이라 함)을 소유하고 회사와 서비스 이용계약을 맺고 “셰프”에게 소유한 상품을 유료로 제공하는 사람이나 단체를 의미합니다.
                                위 항에서 정의되지 않은 이 약관 상의 용어의 의미는 일반적인 거래관행에 의합니다. <br/> <br/>


                                **제3조 약관 등의 명시와 설명 및 개정** <br/>

                                1. 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 인터넷 사이트에 공지합니다. 다만, 약관의 내용은 회원이 연결 화면을 통하여 볼 수 있도록 할 수
                                있습니다. <br/>

                                2. 회사는 “약관의 규제에 관한 법률”, “정보 통신망 사용 촉진 및 정보보호 등에 관한 법률” 등 관련법을 위배하지 않는 범위에서 본 약관을 개정할 수
                                있습니다. <br/>

                                3. 회원이 약관이 개정된 후에도 명시적으로 거부의 의사표시를 하지 않거나 계속하여 본 서비스를 사용할 경우 변경 후의 약관에 대해 동의를 한 것으로
                                간주됩니다. <br/> <br/>


                                **제4조 약관의 해석** <br/>

                                1. 회사는 서비스운영을 위해 별도의 운영정책을 마련하여 운영할 수 있으며, 회사는 인터넷 사이트에 사전 공지 후 적용합니다. <br/>

                                2. 회사와 회원이 별도의 서비스 이용 계약을 체결하는 경우, 계약의 내용이 본 이용 약관보다 우선할 수 있습니다. <br/>

                                3. 본 약관에서 정하지 아니한 사항이나 해석에 대해서는 별도의 운영정책, 관계법령 또는 상관례에 따릅니다. <br/> <br/>


                                **제5조 회원에 대한 통지** <br/>

                                1. 회사는 이메일, 이동전화 단문메시지서비스(SMS), 푸시 알림(App push)등으로 회원에게 통지할 수 있습니다. <br/>

                                2. 회사는 불특정다수 회원에 대한 통지의 경우 공지사항으로 게시함으로써 개별 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을
                                미치는 사항에 대하여는 개별통지를 합니다. <br/> <br/>


                                **제6조 서비스의 제공 및 변경** <br/>

                                1. 회사가 제공하는 서비스는 다음과 같습니다. <br/>

                                1) 오너가 제공하는 서비스에 관한 정보제공 서비스 <br/>

                                2) 오너가 제공하는 서비스의 예약 대행 서비스 <br/>


                                3) 오너가 제공하는 서비스의 결제/환불 서비스 <br/>

                                4) 셰프가 결제한 예약 정보 제공 서비스 <br/>

                                2. 회사가 제공하는 서비스의 내용을 기술적 사양의 변경 등의 이유로 변경할 경우에는 그 사유를 회원에게 통지하거나, 회원이 알아볼 수 있도록 공지사항으로
                                게시합니다. <br/> <br/>


                                **제7조 예약 정책** <br/>

                                1. 회사는 회원이 실시간 결제 또는 승인 결제를 통하여 예약을 요청하는 경우, 오너에게 셰프의 개인정보 및 예약 정보를 전달하고 오너의 응답에 따라 셰프에게
                                예약 결과를 전달하는 중개자 역할을 합니다. <br/>

                                2. 셰프의 휴대전화번호 변경 등 셰프가 서비스 가입시에 입력한 전화번호와 예약 시 사용중인 전화번호가 일치하지 않거나, 본인인증서비스를 완료하지 않을
                                경우에는 가입 혹은 예약이 불가 하거나 자동적으로 취소될 수 있습니다. <br/>

                                3. 서비스를 사용하는 모든 회원은 회원으로 등록되어야 하며, 회사는 셰프들의 예약 및 사용 내역에 대한 정보를 오너에게 제출할 수 있습니다. <br/>

                                4. 회원이 예약 정책에 관한 위 사항들을 지키지 않음으로 발생한 모든 불이익에 대한 책임은 회원에게 있습니다. <br/> <br/>


                            </p>
                            <p>• 제 2장 사용계약 및 정보보호</p>
                            <p style={{fontSize: '0.625rem'}}>

                                **제8조 회원가입 및 회원정보의 변경** <br/>

                                1. 회원은 회사가 정한 가입 양식에 따라 회원정보를 기입한 후 본 약관 등에 동의한다는 의사표시를 함으로서 회원가입을 신청합니다. <br/>

                                2. 회사는 제1항과 같이 회원으로 가입할 것을 신청한 회원이자 중 다음 각 호에 해당하지 않는 한 회원으로 등록합니다. <br/>

                                1) 등록 내용에 허위, 기재 누락, 오기가 있는 경우 <br/>

                                2) 가입신청자가 이전에 회원자격을 상실한 적이 있는 경우(다만 회원자격 상실 후 회사가 필요하다고 판단하여 회원재가입 승낙을 얻은 경우에는 예외로
                                합니다.) <br/>

                                3) 회사로부터 회원자격 정지 조치 등을 받은 회원이 그 조치 기간 중에 사용계약을 임의 해지하고 재사용 신청을 하는 경우 <br/>

                                4) 기타 회원으로 등록하는 것이 서비스 및 기술상 현저히 지장이 있다고 판단되는 경우 <br/>

                                5) 본 약관에 위배되거나 위법 또는 부당한 사용신청임이 확인된 경우 및 회사가 합리적인 판단에 의하여 필요하다고 인정하는 경우 <br/>

                                3. 회원 가입 계약의 성립시기는 회사의 승낙이 회원에게 도달한 시점으로 합니다. <br/>

                                4. 회원은 회원 가입 신청 시 기재한 사항이 변경되었을 경우 온라인으로 수정을 하거나 전자우편 기타 방법으로 회사에 그 변경사항을 알려야 합니다. <br/>

                                5. 제4항의 변경사항을 회사에 알리지 않아 발생한 불이익에 대하여 회사는 책임지지 않습니다. <br/>

                                6. 회원가입은 반드시 본인의 진정한 정보를 통하여만 가입할 수 있으며 회사는 회원이 등록한 정보에 대하여 확인 조치를 할 수 있습니다. 회원은 회사의 확인
                                조치에 대하여 적극 협력하여야 하며, 만일 이를 준수하지 아니할 경우 회사는 회원이 등록한 정보가 부정한 것으로 처리할 수 있습니다. <br/>

                                7. 회사는 회원을 등급별로 구분하여 서비스 이용 방법, 정보 제공 등의 차등을 둘 수 있습니다. <br/>
                                <br/>


                                **제9조 사용 계약의 종료**
                                1. 회사의 해지 <br/>

                                1) 회사는 다음과 같은 사유가 발생하거나 확인된 경우 사용계약을 해지할 수 있습니다. <br/>

                                ①다른 회원 또는 오너의 권리나 명예, 신용 기타 정당한 이익을 침해하거나 대한민국 법령 또는 공서양속에 위배되는 행위를 한 경우 <br/>

                                ②회사가 제공하는 서비스의 원활한 진행을 방해하는 행위를 하거나 시도한 경우 <br/>

                                ③제8조 제2항의 승낙 거부 사유가 발견된 경우 <br/>

                                ④회사가 정한 서비스 운영정책을 이행하지 않거나 위반한 경우 <br/>

                                ⑤기타 회사가 합리적인 판단으로 서비스의 제공을 거부할 필요가 있다고 인정할 경우 <br/>

                                2) 회사는 제9조 제1항 제1호의 ③, ④, ⑤의 사유가 발생한 경우 “회원”에게 사전 통보 후 계약을 해지할 수 있으며, ①, ②의 사유가 발생한 경우에는
                                사전통보 없이 계약을 해지할 수 있습니다. 이때 회사는 오너에게 이메일, 전화, 기타의 방법을 통하여 해지 사유를 밝혀 해지 의사를 통지합니다. <br/>

                                3) 본 항에서 정한 바에 따라 사용계약이 종료될 시에는 회사는 회원에게 부가적으로 제공한 각종 혜택을 회수할 수 있습니다. 사용계약의 종료와 관련하여 발생한
                                손해는 사용계약이 종료된 해당 회원이 책임을 부담하여야 하고, 회사는 일체의 책임을 지지 않습니다. <br/>

                                4) 본 항에서 정한 바에 따라 사용계약이 종료된 경우에는, 회원의 재사용 신청에 대하여 회사는 이에 대한 승낙을 거절할 수 있습니다 <br/>

                                3. 회원이 계약을 해지하는 경우, 관련법 및 개인정보 취급 방침에 따라 회사가 회원정보를 보유하는 경우를 제외하고는 해지 즉시 회원의 모든 데이터는
                                소멸됩니다. <br/> <br/>


                                **제10조 개인정보보호** <br/>

                                1. 회사는 “정보통신망법”등 관계 법령이 정하는 바에 따라 회원의 개인정보를 보호하기 위해 노력합니다. 개인정보의 보호 및 사용에 대해서는 관련 법령 및
                                회사의 개인정보처리방침이 적용됩니다. 단, 회사의 인터넷 사이트 또는 어플리케이션 이외에 링크된 인터넷 사이트, 어플리케이션 및 기타 온라인 서비스에 대해서는
                                회사의 개인정보처리방침이 적용되지
                                않습니다. <br/>

                                2. 회사가 개인정보의 보호를 위하여 상당한 주의를 기울였음에도 불구하고, 오너가 관련 법령 및 “오너 이용 약관”을 위반하여 회원의 개인정보를 유출 또는
                                유용한 경우 회사는 그에 대하여 아무런 책임을 지지 않습니다. <br/> <br/>


                                **제11조 정보의 제공 및 광고의 게재** <br/>

                                1. 회사는 회원이 서비스 사용 중 필요하다고 인정되는 다양한 정보를 서비스 내 공지사항, 서비스 화면, 전자우편 등의 방법으로 회원에게 제공할 수 있습니다.
                                다만, 회원은 관련법에 따른 거래관련 정보 및 고객문의 등에 대한 답변 등을 제외하고는 언제든지 위 정보제공에 대해서 수신 거절을 할 수 있습니다. <br/>

                                2. 회사는 서비스의 운영과 관련하여 회사가 제공하는 서비스의 화면 및 홈페이지 등에 광고를 게재할 수 있습니다. <br/> <br/>


                            </p>
                            <p>• 제 3장 서비스의 사용</p>
                            <p style={{fontSize: '0.625rem'}}>

                                **제12조 상품의 구매** <br/>

                                1. 회원은 본 약관 및 회사가 정한 규정에 따라 아래와 같이 상품의 구매를 신청합니다. <br/>

                                1) 회원 정보 입력 <br/>

                                2) 오너 공간의 선택 <br/>

                                3) 회사에서 요청하는 예약 정보 입력 <br/>

                                4) 결제정보 (결제수단, 방법 등) 입력 <br/>

                                5) 오너 공간의 예약 확인 <br/>

                                6) 회원 정보의 제3자 제공 및 취급 위탁에 동의한다는 마우스 클릭 등의 표시. (단, 개인정보 제 3자 제공 및 취급 위탁이 필요한 경우에 한함 <br/>

                                7) 재화 등의 구매신청 및 이에 관한 확인 <br/>

                                2. 승인 결제의 경우, 회원이 예약 정보를 입력하고 회사 또는 오너의 승인을 받아야만 결제정보를 입력하고 결제 및 구매 확정이 가능합니다. <br/>

                                3. 상품의 구매가 확정되면 회사는 회원이 구매한 상품의 상세 내역을 인터넷 사이트 또는 모바일 어플리케이션 개인화 페이지를 통하여 제공합니다. <br/>

                                4. 회사는 회원이 예약 정보 입력 또는 구매 확정을 완료한 후에도, 회사가 정한 양식에 따라 회원정보 및 예약 정보를 추가 입력하거나 수정할 것을 요구할 수
                                있고, 회사는 회원의 정보제공 및 동의에 따라 회원에게 별도 서비스를 제공할 수 있습니다. <br/>

                                5. 마케팅 정보 수신 동의를 한 회원은 타 회원과 함께 공동으로 상품을 구매할 수 있습니다. <br/>

                                6. 회사는 공동으로 구매 가능한 상품, 구매 가능 시간, 구매 가능 목표 인원, 할인율을 설정하여 회원에게 제공할 수 있습니다. <br/>
                                <br/>


                                **제13조 사용 가능한 결제 수단** <br/>

                                1. 셰프는 회사에서 구매한 상품 등에 대한 대금지급을 하나로 합니다. <br/>

                                1) 카카오페이, kbpay 등 다양한 방식의 온라인 입금 <br/>

                                2. 셰프가 대금의 결제와 관련하여 입력한 정보 및 그 정보와 관련하여 발생한 책임과 불이익은 전적으로 셰프가 부담합니다. <br/> <br/>


                                **제14조 공간의 구매 변경 및 취소** <br/>

                                1. 회사는 상품의 구매 변경 및 취소 규정에 대하여 전자상거래 등에서의 소비자보호에 관한 법률 등 관련 법령을 준수합니다. <br/>

                                2. 셰프가 대관한 공간을 취소하는 경우 회사 또는 오너의 환불정책, 회사와 회원 사이에 체결한 계약서에 따라 환불 업무가 진행됩니다. <br/>

                                3. 셰프의 단순 변심에 의한 상품의 변경 및 취소일 경우, 처리에 발생하는 수수료 및 위약금은 회원이 부담합니다. <br/>

                                4. 미성년자가 상품을 구매한 경우, 미성년자의 법정대리인은 미성년자의 구매를 취소할 수 있으며 구체적인 내용은 민법 상 미성년자의 법률행위 취소 규정에
                                따릅니다. <br/>

                                5. 셰프가 타인의 신용카드나 휴대전화번호 또는 계좌번호, 기타 구매에 필요한 결제정보를 도용하여 부당한 이익을 편취하였다고 의심되는 경우 회사는 셰프에게
                                소명 자료를 요청하고 환불을 보류할 수 있습니다. <br/>

                                6. 기타 이 약관, 인터넷 사이트, 모바일 어플리케이션의 사용안내에 규정되지 않은 취소 및 환불에 대한 사항에 대해서는 소비자 피해보상 규정에서 정한 바에
                                따릅니다. <br/> <br/>


                                **제15조 상품 사용료의 반환 일정** <br/>

                                1. 공간 대관료의 반환 권한이 오너에게 있는 경우, 대관료의 반환은 해당 오너가 직접 진행하며 대관료 반환 일정은 해당 오너에게 문의할 수
                                있습니다. <br/>

                                2. 공간 대관료의 반환 권한이 회사에 있는 경우, 대관료의 반환은 환불 접수 처리일로부터 14일 이내에 진행됩니다. <br/> <br/>


                                **제16조 공간 대관 시 주의 의무** <br/>

                                1.셰프는 회사 또는 오너의 정당한 지시에 응하여야 하며, 셰프로서 주의 및 의무를 다하여야 합니다. <br/>

                                1)회사를 통하여 결제가 완료된 서비스 이용 권한을 타인에게 양도할 수 없습니다. <br/>

                                2)서비스 이용 시, 모든 이용자는 회원으로 등록되어야 합니다. 단, 회원으로 등록하지 않은 이용자의 경우 서비스 이용에 제한이 있을 수 있습니다. <br/>

                                3)서비스 이용 시, 회사 또는 호스트의 별도 요청 및 이용 규정을 준수하여야 합니다. <br/>

                                4) 승인 결제의 경우, 회사는 별도의 문서로 작성된 계약서를 회원에게 요청할 수 있으며, 회원은 계약서의 이용 규정을 준수하여야 합니다. <br/>

                                2. 셰프가 공간의 상품을 훼손, 망실하였을 때에는 이를 즉시 원상 복구하거나 그 손해를 배상하여야 합니다. <br/>

                                3. 회원의 과실로 인하여 발생한 사고에 대하여는 회원이 책임을 집니다.. <br/>

                                4. 셰프가 본 이용 약관을 위반할 경우, 회사 또는 오너는 서비스 이용에 대한 금지 및 재제를 가할 수 있으며, 그로 인해 발생하는 회사 또는 오너의 손해에
                                대한 배상 책임은 셰프에게 있습니다. <br/>
                                <br/>


                                **제17조 서비스의 중단** <br/>

                                1. 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신의 두절 등의 사유가 발생한 경우에는 서비스의 제공을 일시적으로 중단할 수
                                있습니다. <br/>

                                2. 사업 종목의 전환, 사업의 포기, 업체 간의 통합 등의 이유로 서비스를 제공할 수 없게 되는 경우에는 회사는 회원에게 통지하거나, 회원이 알아볼 수
                                있도록 공지사항으로 게시합니다. <br/>
                                <br/>


                            </p>
                            <p>• 제 4장 책임</p>
                            <p style={{fontSize: '0.625rem'}}>

                                **제18조 회사의 의무** <br/>

                                1. 회사는 법령과 이 약관이 금지하거나 공서양속에 반하는 행위를 하지 않으며 이 약관이 정하는 바에 따라 지속적이고, 안정적으로 회원에게 서비스를 제공하기
                                위해 최선을 다합니다. <br/>

                                **제19조 회원의 아이디 및 비밀번호에 대한 의무** <br/>

                                1. 아이디와 비밀번호에 관한 관리책임은 회원에게 있습니다. <br/>

                                2. 회원은 자신의 아이디 및 비밀번호를 제3자에게 알려주거나 사용하게 해서는 안 됩니다. <br/>

                                3. 회원이 자신의 아이디 및 비밀번호를 도난당하거나 제3자가 사용하고 있음을 인지한 경우에는 바로 회사에 통보하고 회사의 안내가 있는 경우에는 그에 따라야
                                합니다. <br/>


                                **제20조 회원의 의무** <br/>

                                1. 회원은 다음 각호의 행위를 하여서는 안됩니다. 만약 다음 각호와 같은 행위가 확인되면 회사는 해당 회원에게 서비스 사용에 대한 제재를 가할 수 있으며
                                민형사상의 책임을 물을 수 있습니다. <br/>

                                1) 회사 서비스의 운영을 고의 및 과실로 방해하는 경우 <br/>

                                2) 신청 또는 변경 시 허위 내용의 등록. <br/>

                                3) 타인의 정보 도용 <br/>

                                4) 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시. <br/>

                                5) 회사 및 기타 제3자의 저작권 등 지적재산권에 대한 침해. <br/>

                                6) 회사 및 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위 <br/>

                                7) 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위 <br/>

                                8)사기 및 악성 글 등록 등 건전한 거래 문화 활성에 방해되는 행동 <br/>

                                9)기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이 부적당하다고 인정하는 경우 <br/>

                                2. 회사는 전항의 규정에 의하여 서비스의 사용을 제한하거나 중지할 수 있는 모든 권한을 갖고 있습니다. 회사는 회사 정책에 위반한 행동을 하는 특정 회원에
                                대하여 제9조 제2항에 따라 사용계약을 해지할 수 있고,
                                ID를 삭제 및 사용 중지 등의 모든 서비스 제한 조치를 회원에게 통보 없이 직권으로 할 수 있습니다. <br/>

                                3. 회사는 회사의 정책에 따라서 회원 간의 차별화된 유료 서비스를 언제든지 제공할 수 있습니다. 만약 회원이 비용을 지불하지 않고 사용을 할 경우 회사는
                                특정 회원에게 서비스 중지 및 특정 서비스 제한을 할 수 있습니다. <br/> <br/>


                                **제21조 저작권의 귀속 및 사용제한** <br/>

                                1. 서비스에 대한 저작권 및 지적재산권은 회사에 귀속됩니다. 단, 회원이 서비스를 이용하여 작성한 저작물에 대한 저작권은 해당 회원에게
                                귀속됩니다. <br/>

                                2. 회원은 서비스를 사용함으로써 얻은 정보 중 회사에게 지적재산권이 귀속된 정보를 회사의 사전 승낙 없이 복제, 송신, 출판, 배포, 방송 기타 방법에
                                의하여 영리목적으로 사용하거나 제3자에게 사용하게 하여서는 안됩니다. <br/>


                                **제22조 책임의 한계** <br/>

                                “회사”, “회사”의 임직원 그리고 대리인은 고의 또는 과실이 없는 한 다음의 사항에 대하여 책임을 지지 않습니다. <br/>

                                1. 회사는 무료로 제공하는 정보 및 서비스에 관하여 개인정보취급방침 또는 관계법령의 벌칙, 과태료 규정 등 강행규정에 위배되지 않는 한 원칙적으로 손해를
                                배상할 책임이 없습니다. <br/>

                                2. 회사는 천재지변, 불가항력, 서비스용 설비의 보수, 교체, 점검, 공사 등 기타 이에 준하는 사항으로 정보 및 서비스를 제공할 수 없는 경우에 이에 대한
                                책임을 지지 않습니다. <br/>

                                3. 회사는 회원의 귀책사유로 인한 정보 및 서비스 사용의 장애에 관한 책임을 지지 않습니다 <br/>

                                4. 회사는 회원이 게재한 정보, 자료, 사실의 신뢰도, 정확성 등의 내용에 관하여는 책임을 지지 않습니다 <br/>

                                5. 회사는 회원에 의한 사기, 연락 불능 등으로 인하여 발생하는 손해에 대해 책임을 지지 않습니다. <br/>

                                6. 회사는 회원의 거래를 중개하는 플랫폼 서비스만을 제공할 뿐 회원과 오너 상호간의 거래에 있어서 어떠한 보증 및 분쟁해결을 제공하지 않습니다. 따라서 회원
                                및 오너 상호간 거래 행위에서
                                발생하는 문제 및 손실에 대해서 회사는 일체의 책임을 부담하지 않으며, 거래 당사자간에 직접 해결해야 합니다. 다만, 회사는 회원간에 서비스 사용과 관련하여
                                발생한 분쟁에 대해 고객 또는
                                호스트의 피해구제 신청이 있는 경우, 공정거래위원회 또는 관할 기관이 의뢰하는 분쟁조정기관의 조정에 회부할 수 있습니다. <br/> <br/>


                                **제23조 손해배상** <br/>

                                1. 회사는 회원이 서비스를 사용함에 있어 회사의 고의 또는 과실로 인해 손해가 발생한 경우에는 민법 등 관련 법령이 규율하는 범위 내에서 그 손해를
                                배상합니다. <br/>

                                2. 회원은 본 약관을 위반하거나 관계 법령을 위반하여 회사에 손해가 발생한 경우에는 회사에 그 손해를 배상하여야 합니다. <br/>

                                3. 회원이 본 약관을 위반하거나 관계 법령을 위반하여 제3자가 회사를 상대로 민형사상의 법적 조치를 취하는 경우에는 회원은 자신의 비용과 책임으로 회사를
                                면책 시켜야 하며, 이로 인해 발생하는 손해에 대해 배상하여야 합니다. <br/> <br/>


                                **제26조 재판권 및 준거법** <br/>

                                1. 회사와 회원간 제기된 소송은 대한민국법을 준거법으로 합니다. <br/>

                                2. 회사와 회원간 발생한 분쟁에 관한 소송은 민사소송법 상의 관할법원에 제소합니다. <br/>


                            </p>
                        </div>
                        <div onClick={() => {
                            modalClose1();
                            setUserAgree(true);
                        }} style={{
                            position: "sticky",
                            right: "5%",
                            bottom: "5%",
                            fontSize: '0.9375rem',
                            fontWeight: '700',
                            textDecorationLine: 'underline',
                            textAlign: 'right'
                        }}>확인
                        </div>
                    </Modal>
                </p>
            </div>
            <div>
                <p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        <div>
                            <input type="checkbox" checked={infoCollect} id="infoCollect"
                                   onChange={() => {
                                       setInfoCollect(!infoCollect);
                                   }}/>
                            <label htmlFor="infoCollect" style={{paddingLeft: "2%", fontWeight: '500'}}><em
                                style={{height: '1rem'}}></em><span style={{height: '1rem', marginTop: '-50px'}}>
                            <a>개인정보 수집,이용 동의<span style={{color: '#7B7B7B'}}>(필수)</span></a>
                            </span>
                            </label>
                        </div>
                        <img src={arrowIcon} style={{width: '0.4375rem', height: '0.875rem'}}
                             onClick={() => setModalIsOpen2(true)}/>
                    </div>
                    <Modal
                        isOpen={modalIsOpen2}
                        style={BigModalStyles}
                    >
                        <pre style={{
                            fontSize: '0.9375rem',
                            fontWeight: '700',
                            textAlign: 'left'
                        }}>개인정보 수집,이용 동의(필수)</pre>
                        <div style={{textAlign: 'left', wordWrap: 'break-word', width: '100%'}}>
                                <p style={{fontSize: '0.625rem'}}>1.수집 목적 : 회원 가입의사 확인, 이용자 식별 및 본인여부, 회원자격 유지·관리, 계약 이행 및 약관변경 고지를 위한 연락, 본인의사 화인 및 민원 처리,
                                    부정이용 방지, 비인가 사용방지, 서비스 제공 및 계약의 이행,서비스 이용 및 상담, 문의, 후기를 위한 원활한 의사소통 경로 확보, 맞춤형 서비스 제공, 거점 기반 서비스 제공</p>
                            <p style={{fontSize: '0.625rem'}}>
                                2.수집 항목 : 이름, 아이디, 비밀번호, 휴대폰 번호, 이메일, 성별</p>
                            <p style={{fontSize: '0.625rem'}}>3.보유기간 : 회원 탈퇴 즉시 파기, 부정이용 방지를 위하여 3개월 동안 보관(아이디, 휴대폰 번호) 후 파기</p>
                            <p style={{fontSize: '0.625rem'}}>4.수집 목적 : 서비스방문 및 이용기록 분석, 부정이용 방지를 위한 기록 관리, 앰 서비스 이용자 식별, 맞춤형 서비스 제공</p>
                            <p style={{fontSize: '0.625rem'}}>5.수집 항목 : 서비스 이용 과정 중 자동 수집*- 서비스 이용기록, 방문 기록, 불량 이용기록, IP주소, 쿠키, MAC주소,
                                모바일 기기정보(앱 버전, OS버전, Device ID), ADID/IDFA(광고식별자)</p>
                            <p style={{fontSize: '0.625rem'}}>6.보유기간 : 회원 탈퇴 즉시 또는 이용 목적 달성 즉시 파기</p>
                            <p style={{fontSize: '0.625rem'}}>
                                *단, 회원 탈퇴와 별개로 분쟁 조정, 고객문의 대응 및 법령 준수 이력 증빙을위하여 이메일, 문자 알림톡 발송이력은 발송일로부터 6개월 보관후 파기합니다
                                </p>
                        </div>
                        <div onClick={() => {
                            modalClose2();
                            setInfoCollect(true);
                        }} style={{
                            position: "sticky",
                            right: "5%",
                            bottom: "5%",
                            fontSize: '0.9375rem',
                            fontWeight: '700',
                            textDecorationLine: 'underline',
                            textAlign: 'right'
                        }}>확인
                        </div>
                    </Modal>
                </p>
            </div>
            <div>
                <p>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: "center",
                        textAlign: "center"
                    }}>
                        <div>
                            <input type="checkbox" checked={infoThird} id="infoThird"
                                   onChange={() => {
                                       setInfoThird(!infoThird);
                                   }}/>
                            <label htmlFor="infoThird" style={{paddingLeft: "2%", fontWeight: '500'}}><em
                                style={{height: '1rem'}}></em><span style={{height: '1rem', marginTop: '-50px'}}>
                            <a>개인정보 제 3자 제공 동의<span style={{color: '#7B7B7B'}}>(필수)</span></a>
                            </span>
                            </label>
                        </div>
                        <img src={arrowIcon} style={{width: '0.4375rem', height: '0.875rem'}}
                             onClick={() => setModalIsOpen3(true)}/>
                    </div>
                    <Modal
                        isOpen={modalIsOpen3}
                        style={ModalStyles}
                    >
                        <pre style={{
                            fontSize: '0.9375rem',
                            fontWeight: '700',
                            textAlign: 'left'
                        }}>개인정보의 제 3자 제공 동의 안내</pre>
                        <div style={{textAlign: 'left', wordWrap: 'break-word', width: '100%'}}>
                            <p style={{fontSize: '0.625rem'}}>

                                1.개인정보를 제공받는 자. <br/>
                                - 계약관계에 있는 오너와 셰프 <br/>

                                2.개인정보의 제공 목적 <br/>
                                - 본인 확인 및 채팅 오픈 <br/>


                                3.제공하는 개인정보의 항목 <br/>
                                - 성명, 휴대폰번호 <br/>


                                4.개인정보 제공기간- 개인정보 제공 목적 달성 시<br/>
                                - 또는 참여자의 삭제 요청 시까지 <br/>


                            </p>
                        </div>
                        <div onClick={() => {
                            modalClose3();
                            setInfoThird(true);
                        }} style={{
                            position: "sticky",
                            right: "5%",
                            bottom: "5%",
                            fontSize: '0.9375rem',
                            fontWeight: '700',
                            textDecorationLine: 'underline',
                            textAlign: 'right'
                        }}>확인
                        </div>
                    </Modal>
                </p>
            </div>
            <div>
                <p>
                    <input type="checkbox" checked={ageOver14} onChange={() => setAgeOver14(!ageOver14)}
                           id="ageOver14"/>
                    <label htmlFor="ageOver14" style={{paddingLeft: "2%", fontWeight: '500'}}><em
                        style={{height: '1rem'}}></em><span style={{height: '1rem', marginTop: '-50px'}}>
                            <a>본인은 만 14세 이상입니다.<span style={{color: '#7B7B7B'}}>(필수)</span></a>
                            </span>
                    </label>
                </p>
            </div>
        </div>
    );
};

export default UseTermsTemplate;
