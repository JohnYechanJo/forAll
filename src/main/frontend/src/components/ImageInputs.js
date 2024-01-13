import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";
import Modal from "react-modal";
import {ModalStyles} from "./ModalStyles";
const ImageInputs = ({setImg}) => {
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "logo512.png";

    const [imgFiles, setImgFiles] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [representImage, setRepresentImage] = useState("");
    const addImgFile = (event) => {
        const file = event.target.files[0];
        if (file == null) return;
        setImgFiles([...imgFiles, file]);
    };
    const deleteImgFile = (index) => {
        setImgFiles(imgFiles.filter((_,i) => i !== index));
    };
    useEffect(() => {
        setImg(imgFiles);
        if (imgFiles[0] !== undefined) setRepresentImage(URL.createObjectURL(imgFiles[0]));
    }, [imgFiles]);
    const onErrorImg = (e) => {
        e.target.src = BaseImgSrc;
    }
    return (
        <div>
            <label onClick={() => setIsModalOpen(true)}>
                <img
                    className={"image"}
                    key={0}
                    src={representImage}
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
                            src={URL.createObjectURL(imgFile)}
                            alt={`image ${index}`}
                        />
                        <button onClick={() => deleteImgFile(index)}>X</button>
                    </div>

                ))}
                <label className={"image"}>
                    <img
                        src={BaseImgSrc}
                        alt={"image"}
                        onError={onErrorImg}
                    />
                    <input type={"file"}
                           accept="image/*"
                           onChange={addImgFile}
                           style={{float: "right", display: "none"}}
                    />
                </label>

                <button onClick={() => setIsModalOpen(false)}>닫기</button>
            </Modal>


        </div>
    )
};

export default ImageInputs;