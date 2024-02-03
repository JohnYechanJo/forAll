import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";


import xmark from "./icons/xmark.png";
import {GetImageUri} from "../utils/GetImage";

const ImageInput = ({setImg, val}) => {
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "logo512.png";
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        if (file == null) return;
        setImg(file);
    };
    useEffect(() => {
        if (!val) setImgFile("");
        else setImgFile(typeof(val) === "string" ? GetImageUri(val) : URL.createObjectURL(val));
    }, [val]);
    const handleButton = () => {
        setImgFile("");
    }
    const onErrorImg = (e) => {
        // 기본 이미지 추후 설정 필요
        e.target.src = BaseImgSrc;
    }

    return (
        <div style={{display:'flex',width:'8rem'}}>
            <label
            >
                <img
                    className="image"
                    src={imgFile}
                    alt={"image"}
                    onError={onErrorImg}
                />
                <input type={"file"}
                       accept="image/*"
                       onChange={() =>saveImgFile()}
                       ref={imgRef}
                       style={{display: "none"}}
                />
            </label>
            <a onClick={handleButton}>
                <img src={xmark} alt="xmark" style={{width:"1.5rem", height:"1.5rem"}} />
            </a>

        </div>
    )
};

export default ImageInput;