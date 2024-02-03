import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";


import xmark from "./icons/xmark.png";
import {GetImageUri} from "../utils/GetImage";

const ImageInput = ({setImg, val}) => {
    const BaseImgSrc = "logo512.png"; // 기본 이미지 설정
    const [imgFile, setImgFile] = useState(""); // 이미지 파일 상태
    const imgRef = useRef(); // 이미지 참조

    // 이미지 압축 함수
    const compressImage = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader(); // 파일 리더 생성
            reader.readAsDataURL(file); // 데이터 URL로 파일 읽기
            reader.onload = (event) => { // 읽기 완료 후
                const img = new Image(); // 이미지 객체 생성
                img.src = event.target.result; // 이미지의 소스 설정
                img.onload = () => { // 이미지 로딩이 완료되면
                    const canvas = document.createElement("canvas"); // 캔버스 요소 생성
                    const ctx = canvas.getContext("2d"); // 캔버스 컨텍스트 생성
                    canvas.width = img.width; // 캔버스 폭을 이미지의 폭으로 설정
                    canvas.height = img.height; // 캔버스 높이를 이미지의 높이로 설정
                    ctx.drawImage(img, 0, 0); // 이미지를 캔버스에 그리기

                    canvas.toBlob((blob) => { // 캔버스의 내용을 Blob으로 변환
                        resolve(blob); // 압축된 이미지 Blob 반환
                    }, file.type, 0.7); // 이미지 타입 및 품질(0.7) 설정
                };
            };
        });
    };



    const saveImgFile = async () => {
        const file = imgRef.current.files[0]; // 파일 선택
        if (file == null) return;
        // 원본 이미지 크기 확인
        console.log("원본 이미지 크기:", file.size, "바이트");
        // 이미지 압축 수행
        const compressedImage = await compressImage(file);
        setImg(compressedImage); // 압축된 이미지 설정

        // 압축된 이미지 크기 확인
        console.log("압축된 이미지 크기:", compressedImage.size, "바이트");
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