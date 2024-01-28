import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";
import Modal from "react-modal";
import {ModalStyles} from "./ModalStyles";
import xmark from "./icons/xmark.png";
import {ExplanationModalStyles} from "./ExplanationModalStyles";
import ImageInput from "./ImageInput";
import {AddedImagesModalStyles} from "./AddedImagesModalStyles";
const ImageInputs = ({setImg, vals}) => {
    const spring_app_url = "http://localhost:8080";
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "/logo512.png";

    const [img1, setImg1] = useState("");
    const [img2, setImg2] = useState("");
    const [img3, setImg3] = useState("");
    const [img4, setImg4] = useState("");
    const [img5, setImg5] = useState("");
    const [img6, setImg6] = useState("");
    const [img7, setImg7] = useState("");
    const [img8, setImg8] = useState("");


    const [isModalOpen, setIsModalOpen] = useState(false);
    const [representImage, setRepresentImage] = useState("");
    const addImgFile = (event) => {
        const file = event.target.files[0];
        if (file == null) return;
        setImg([...(vals || []), file]);
    };
    const deleteImgFile = (index) => {
        setImg(vals.filter((_,i) => i !== index));
    };
    useEffect(() => {
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
                    src={typeof (representImage) === 'string' ? spring_app_url + "/api/v1/image/" + representImage : URL.createObjectURL(representImage)}
                    alt={"image"}
                    onError={onErrorImg}
                />
            </label>
            <Modal isOpen={isModalOpen} style={AddedImagesModalStyles} ariaHideApp={false}>
                <div style={{display: "flex", justifyContent: "space-between", width: '100%'}}>
                    <a style={{ textAlign: "left" }}>추가 사진</a><a style={{textAlign: "right"}}
                                                                 onClick={() => setIsModalOpen(false)}>x</a></div>
                    <hr style={{width: '100%', backgroundColor: 'black'}}/>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '1rem', justifyContent: 'center', marginTop: '2rem'
                    }}>
                        <div style={{display: 'flex', justifyContent: 'right'}}>
                            <div style={{display: "flex", flexDirection: "column",}}>
                                <a>사진1</a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <ImageInput setImg={setImg1} val={img1}/>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <a>사진2</a>
                            <ImageInput setImg={setImg2} val={img2}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'right'}}>

                            <div style={{display: "flex", flexDirection: "column"}}>
                                <a>사진3</a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <ImageInput setImg={setImg3} val={img3}/>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <a>사진4</a>
                            <ImageInput setImg={setImg4} val={img4}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'right'}}>
                            <div style={{display: "flex", flexDirection: "column",}}>
                                <a>사진5</a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <ImageInput setImg={setImg5} val={img5}/>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <a>사진6</a>
                            <ImageInput setImg={setImg6} val={img6}/>
                        </div>
                        <div style={{display: 'flex', justifyContent: 'right'}}>
                            <div style={{display: "flex", flexDirection: "column",}}>
                                <a>사진7</a>
                                <div style={{justifyContent: 'center', alignItems: 'flex-end'}}>
                                    <ImageInput setImg={setImg7} val={img7}/>
                                </div>
                            </div>
                        </div>
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <a>사진8</a>
                            <ImageInput setImg={setImg8} val={img8}/>
                        </div>
                    </div>

                <div style={{marginTop: '2rem', justifyContent: 'center', display: 'flex'}}>
                    <button onClick={() => setIsModalOpen(false)}>닫기</button>
</div>
            </Modal>
        </div>
    )
};

export default ImageInputs;