import {useEffect, useRef, useState} from "react";

const ImageViewer = ({val, style, isfixed=false}) => {
    const spring_app_url = "http://localhost:8080";
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "/logo512.png";
    const onErrorImg = (e) => {
        e.target.src = BaseImgSrc;
    }
    return (
        <div>
            <label>
                <img
                    className="image"
                    src={spring_app_url + "/api/v1/image/"+val}
                    alt={"image"}
                    onError={onErrorImg}
                    style ={isfixed ? { width: "100%"}: style}
                />
            </label>
        </div>
    )
};

export default ImageViewer;