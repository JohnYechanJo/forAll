import {useState} from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "../../components/Styles.css";
import {ModalStyles} from "../../components/ModalStyles";
const HostRegistryStart = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const modalClose = () => {
        setModalIsOpen(false);
    }
    const modalClose2 = () => {
        setModalIsOpen2(false);
    }
    return (
        <div >
            <h1>지금 오너님을 위한 공간 비즈니스를 시작해보세요!</h1>
            <h1>한식 | 일식 | 양식 | 다이닝까지</h1>
            <h1>오너님의 공간을 소개해주세요</h1>
            <h1>1. 공간 정보를 알려주세요</h1>
            <h1>2. 이용안내 정보를 입력하세요</h1>
            <h1>3. 예약/정산 정보를 입력하세요</h1>
            <div style={{display:"flex", justifyContent:"center", flexDirection:"column", alignItems:"center"}} >
                <div><Link to="/hostRegistry">
                    <button className="button" style={{backgroundColor: "black", color:"white", width:"300px"}}>공간 등록하기</button>
                </Link></div>

                <div><Link to="/main">
                    <button className="button" style={{backgroundColor: "red", color:"white", width:"300px"}}>둘러보기</button>
                </Link></div>
            </div>
            <footer className="footer">
                <Modal isOpen={modalIsOpen} style={ModalStyles}>
                    <h1>등록제안서 내용</h1>
                    <button onClick={modalClose}>닫기</button>
                </Modal>
                <button onClick={() => setModalIsOpen(true)}>등록제안서</button>
                <Modal isOpen={modalIsOpen2} style={ModalStyles}>
                    <h1>계약서 내용</h1>
                    <button onClick={modalClose2}>닫기</button>
                </Modal>
                <button onClick={() => setModalIsOpen2(true)}>계약서</button>
            </footer>
        </div>

    )
};

export default HostRegistryStart;