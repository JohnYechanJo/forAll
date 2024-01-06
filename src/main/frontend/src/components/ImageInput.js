import {useRef, useState} from "react";

const ImageInput = ({setImg}) => {
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
    return (
        <div>
            <label>
                <input type={"file"}
                       accept="image/*"
                       onChange={() =>saveImgFile()}
                       ref={imgRef}
                />파일첨부
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