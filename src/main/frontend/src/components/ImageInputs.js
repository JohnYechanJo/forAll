import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";
const ImageInputs = ({setImg, setHidden}) => {
    const [imgFiles, setImgFiles] = useState([]);
    const imgRef = useRef();
    const saveImgFiles = (event) => {
        setImgFiles([...event.target.files].map(file => URL.createObjectURL(file)));
        setImg([...event.target.files]);
    };
    const onUploadImgButtonClick = useCallback(() => {
        if (!imgRef.current) {
            return;
        }
        imgRef.current.click();
        if (setHidden) setHidden(true);
    },[]);
    return (
        <div>
            <label>
                <input type={"file"}
                       accept="image/*"
                       multiple
                       onChange={saveImgFiles}
                       ref={imgRef}
                       style={{ float:"right",  display: "none"}}
                /><button className="button" style={{fontSize:"10px",backgroundColor:"black",width:"19vw",height:"4vh",padding:"10px 10px", float:"right", marginLeft:"3vw"}} onClick={onUploadImgButtonClick} >파일 첨부</button>
            </label>

            {imgFiles.map((imgFile, index) => (
                <img key={index}
                     className="image"
                     src={imgFile}
                     alt={`image ${index}`}
                />
            ))}
        </div>
    )
};

export default ImageInputs;