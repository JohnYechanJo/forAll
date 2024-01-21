import Modal from "react-modal";

const Alert = ({isOpen, setIsOpen, content}) => {
    return (
        <Modal isOpen={isOpen}>
            <p>{content}</p>
            <button onClick={()=>setIsOpen(false)}>확인</button>
        </Modal>
    )
};
export default Alert;