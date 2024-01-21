import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";
import Modal from "react-modal";
import {ModalStyles} from "./ModalStyles";
const ImageInputs = ({setImg, vals}) => {
    const spring_app_url = "http://localhost:8080";
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "/logo512.png";

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [representImage, setRepresentImage] = useState("");
    const addImgFile = (event) => {
        const file = event.target.files[0];
        if (file == null) return;
        setImg([...vals, file]);
    };
    const deleteImgFile = (index) => {
        setImg(vals.filter((_,i) => i !== index));
    };
    useEffect(() => {
        console.log(vals);
        if ((!vals) || (!vals[0])) {
            setRepresentImage("");
        }
        else{
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
                    src={typeof(representImage) === 'string' ? spring_app_url + "/api/v1/image/"+representImage : URL.createObjectURL(representImage)}
                    alt={"image"}
                    onError={onErrorImg}
                />
            </label>

            <Modal isOpen={isModalOpen} style={ModalStyles} ariaHideApp={false}>
                {vals ? vals.map((imgFile, index) => (
                    <div>
                        <img
                            key={index+1}
                            className="image"
                            src={typeof(imgFile) === 'string' ? spring_app_url + "/api/v1/image/"+imgFile : URL.createObjectURL(imgFile)}
                            alt={`image ${index}`}
                        />
                        <button onClick={() => deleteImgFile(index)}>X</button>
                    </div>

                )) : null}
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