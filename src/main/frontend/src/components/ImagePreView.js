const ImagePreView = ({img}) => {
    const spring_app_url = "http://localhost:8080";
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "/logo512.png";
    const onErrorImg = (e) => {
        // 기본 이미지 추후 설정 필요
        e.target.src = BaseImgSrc;
    }
    return(
        <img
            style={{width:'90%'}}
            src={typeof(img) === "string" ? spring_app_url + "/api/v1/image/"+img : URL.createObjectURL(img)}
            alt={"image"}
            onError={onErrorImg}
        />
    )
};

export default ImagePreView;