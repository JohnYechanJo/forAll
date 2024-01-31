import {useEffect, useRef, useState} from "react";
import {GetImageUri} from "../utils/GetImage";

const ImageViewer = ({val, style, isfixed=false}) => {
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
                    src={GetImageUri(val)}
                    alt={"image"}
                    onError={onErrorImg}
                    style ={isfixed ? { width: "100%", height:"33vh"}: style}
                />
            </label>
        </div>
    )
};

export default ImageViewer;