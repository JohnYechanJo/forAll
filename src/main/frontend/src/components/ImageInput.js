import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";
const ImageInput = ({setImg, setHidden}) => {
    const [imgFile, setImgFile] = useState("");
    const imgRef = useRef();
    const saveImgFile = () => {
        console.log(imgRef.current);
        const file = imgRef.current.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onloadend = () => {
            setImgFile(reader.result);
        }
    };
    const onUploadImgButtonClick = useCallback(() => {
        if (!imgRef.current) {
            return;
        }
        imgRef.current.click();
        if (setHidden) setHidden(true);
    },[]);

    useEffect(() => {
        setImg(imgFile);
    }, [imgFile]);
    return (
        <div>
            <label>
                <input type={"file"}
                       accept="image/*"
                       onChange={() =>saveImgFile()}
                       ref={imgRef}
                       style={{ float:"right",  display: "none"}}
                /><button className="button" style={{fontSize:"10px",backgroundColor:"black",width:"19vw",height:"4vh",padding:"10px 10px", float:"right", marginLeft:"1vw"}} onClick={onUploadImgButtonClick} >파일 첨부</button>
            </label>
            {imgFile ?
                <img className="image"
                    src={imgFile}
                    alt={"image"}
                /> : null
            }
        </div>
    )
};

export default ImageInput;