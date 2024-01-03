import { useRef, useState } from "react";
import Modal from "react-modal";

const UseTermsTemplate = () => {
        const [modalIsOpen, setModalIsOpen] = useState(false);
        const modalClose = () => {
                setModalIsOpen(false);
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
                backgroundColor: 'rgba(0, 0, 0, 0.75)' // Add your custom styles here
            }
        };
    return (
        <div>
                <h1>이용약관</h1>
                <Modal 
                    isOpen={modalIsOpen}
                    style={customStyles}
                >
                    <h1>이용약관</h1>
                    <p>이용약관 내용</p>
                    <button onClick={modalClose}>닫기</button>
                </Modal>
                <button onClick={() => setModalIsOpen(true)}>이용약관 보기</button>
        </div>
    );
};

export default UseTermsTemplate;