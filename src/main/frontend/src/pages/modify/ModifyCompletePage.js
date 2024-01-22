import {Link} from "react-router-dom";
import Modal from "react-modal";
import {ModalStyles} from "../../components/ModalStyles";
const ModifyCompletePage = () => {
    return (
        <div>
            <Modal isOpen={true}
            style={ModalStyles}>
                <h1>수정되었습니다!</h1>
                <Link to="/">확인</Link>
            </Modal>
        </div>
    )
};

export default ModifyCompletePage;