import { useRef, useState, useEffect } from "react";
import Modal from "react-modal";

const UseTermsTemplate = ({setIsUseTermsChecked}) => {
        const [modalIsOpen1, setModalIsOpen1] = useState(false);
        const [modalIsOpen2, setModalIsOpen2] = useState(false);
        const [modalIsOpen3, setModalIsOpen3] = useState(false);
        const [checkbox1, setCheckbox1] = useState(false);
        const [checkbox2, setCheckbox2] = useState(false);
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
        const [infoCollect, setInfoCollect] = useState(false);
        const [infoThird, setInfoThird] = useState(false);
        const [infoCoupon, setInfoCoupon] = useState(false);
        const [ageOver14, setAgeOver14] = useState(false);
        const handleCheckBox = () => {
            setEveryBox(!everyBox);
            setCheckbox1(!everyBox);
            setCheckbox2(!everyBox);
            setInfoCollect(!everyBox);
            setInfoThird(!everyBox);
            setInfoCoupon(!everyBox);
            setAgeOver14(!everyBox);
        };
        const customStyles = {
            content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'lightgrey', 
                color: 'black', 
                width: '80%',
                height: '50%',
                textAlign: 'center',
            },
            overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)' 
            }
        };

    useEffect(() => {
        if (checkbox1 && checkbox2 && infoCollect && infoThird && ageOver14){
            setIsUseTermsChecked(true);
        }
    }, [checkbox1,checkbox2,infoCollect,infoThird,ageOver14]);
    return (
        <div>
                <h1>이용약관동의*</h1>
                <h2>전체 동의
                    <input type="checkbox" checked={everyBox} onChange={handleCheckBox} />
                </h2>
                <div>
                    <text>
                        <input type="checkbox" checked={checkbox1 && checkbox2} //useTerms 없이 체크박스 1&2로 구현
                        onChange={() => {
                            setCheckbox1(!checkbox1);
                            setCheckbox2(!checkbox2);
                        }} />
                        <Modal 
                        isOpen={modalIsOpen1}
                        style={customStyles}
                    >
                        <h1>이용약관</h1>
                        <p>이용약관 내용</p>
                        <div>
                            <label><input type="checkbox" checked={checkbox1} onChange={() => setCheckbox1(!checkbox1)} />포 올 매장대여약관</label> 
                        </div>    
                        <div>
                            <label><input type="checkbox" checked={checkbox2} onChange={() => setCheckbox2(!checkbox2)} />포 올 이용약관</label> 
                        </div>
                        <button onClick={modalClose1} disabled={!checkbox1 || !checkbox2} >확인</button>
                        </Modal>
                        <button onClick={()=>setModalIsOpen1(true)}>이용약관 보기</button>
                    </text>
                </div>
                <div>
                    <text>
                        <input type="checkbox" checked={infoCollect} onChange={() => setInfoCollect(!infoCollect)} />
                        <Modal 
                        isOpen={modalIsOpen2}
                        style={customStyles}
                    >
                        <h1>개인정보 수집,이용 동의</h1>
                        <p>내용</p>
                        <button onClick={modalClose2}>닫기</button>
                        </Modal>
                        <button onClick={() => setModalIsOpen2(true)}>개인정보 수집,이용 동의</button>
                    </text>
                </div>
                <div>
                    <text>
                        <input type="checkbox" checked={infoThird} onChange={() => setInfoThird(!infoThird)} />
                        <Modal 
                        isOpen={modalIsOpen3}
                        style={customStyles}
                        >
                        <h1>개인정보 제3자 제공 동의</h1>
                        <p>내용</p>
                        <button onClick={modalClose3}>닫기</button>
                        </Modal>
                        <button onClick={() => setModalIsOpen3(true)}>개인정보 제3자 제공 동의</button>
                        </text>
                </div>
                <div>
                    <text>
                        <input type="checkbox" checked={infoCoupon} onChange={() => setInfoCoupon(!infoCoupon)} />
                        할인쿠폰 등 혜택/정보 수신 동의
                    </text>
                </div>
                <div>
                        <input type="checkbox" checked={ageOver14} onChange={() => setAgeOver14(!ageOver14)} />
                        만 14세 이상입니다.
                </div>
                <button disabled={!checkbox1 || !checkbox2 || !infoCollect || !infoThird || !ageOver14} >확인</button>
        </div>
    );
};

export default UseTermsTemplate;