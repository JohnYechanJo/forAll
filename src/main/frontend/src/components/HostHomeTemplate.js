import {useState} from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import "./Styles.css";
import {ModalStyles} from "./ModalStyles";
const HostHomeTemplate = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalIsOpen2, setModalIsOpen2] = useState(false);
    const modalClose = () => {
        setModalIsOpen(false);
    }
    const modalClose2 = () => {
        setModalIsOpen2(false);
    }
    return (
        <div>
            <h1>지금 오너님을 위한 공간 비즈니스를 시작해보세요!</h1>
            <Link to="/hostRegistry"><button className="button" style={{backgroundColor: "black"}}  >공간 등록하기</button></Link>
            <footer className="footer" >
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

export default HostHomeTemplate;