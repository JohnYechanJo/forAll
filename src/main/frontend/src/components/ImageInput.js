import {useRef, useState, useCallback} from "react";
import "../components/Styles.css";
const ImageInput = ({setImg, setHidden}) => {
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const saveImgFile = () => {
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        console.log(reader.result);
        reader.onloadend = () => {
            setImgFile(reader.result);
            setImg(imgFile);
        }
    };
    const onUploadImgButtonClick = useCallback(() => {
        if (!imgRef.current) {
            return;
        }
        imgRef.current.click();
        setHidden(true);
    },[]);
    return (
        <div>
            <label>
                <input type={"file"}
                       accept="image/*"
                       onChange={() =>saveImgFile()}
                       ref={imgRef}
                       style={{ float:"right",  display: "none"}}
                /><button className="button" style={{fontSize:"14px",backgroundColor:"black",width:"100px",padding:"10px 10px", marginLeft:"10px"}} onClick={onUploadImgButtonClick} >파일 첨부</button>
            </label>
            {imgFile ?
                <img
                    src={imgFile}
                    alt={"image"}
                /> : null
            }
        </div>
    )
};

export default ImageInput;