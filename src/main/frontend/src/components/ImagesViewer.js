import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";
import Modal from "react-modal";
import {ModalStyles} from "./ModalStyles";
const ImagesViewer = ({vals}) => {
    const spring_app_url = "http://localhost:8080";
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "/logo512.png";

    const [imgFiles, setImgFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [representImage, setRepresentImage] = useState("");
    useEffect(() => {
        if (vals === undefined) setImgFiles([]);
        else{
            setImgFiles(vals);
            if (vals[0] !== undefined) setRepresentImage(vals[0]);
        }

    }, [vals]);
    const onErrorImg = (e) => {
        e.target.src = BaseImgSrc;
    }
    return (
        <div>
            <label onClick={() => setIsModalOpen(true)}>
                <img
                    className={"image"}
                    key={0}
                    src={spring_app_url + "/api/v1/image/"+representImage}
                    alt={"image"}
                    onError={onErrorImg}
                />
            </label>
            <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                {imgFiles.map((imgFile, index) => (
                    <div>
                        <img
                            key={index+1}
                            className="image"
                            src={spring_app_url + "/api/v1/image/"+imgFile}
                            alt={`image ${index}`}
                        />
                    </div>
                ))}

                <button onClick={() => setIsModalOpen(false)}>닫기</button>
            </Modal>


        </div>
    )
};

export default ImagesViewer;