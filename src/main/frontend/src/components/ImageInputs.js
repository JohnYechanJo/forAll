import {useRef, useState, useCallback, useEffect} from "react";
import "../components/Styles.css";
import Modal from "react-modal";
import {ModalStyles} from "./ModalStyles";
import xmark from "./icons/xmark.png";
import {ExplanationModalStyles} from "./ExplanationModalStyles";
import ImageInput from "./ImageInput";
import { AddedImagesModalStyles } from "./AddedImagesModalStyles";
const ImageInputs = ({setImg, vals}) => {
    const spring_app_url = "http://15.165.222.15:80";
    // 기본 이미지 추후 설정 필요
    const BaseImgSrc = "/logo512.png";

    const getIdx = (arr, idx) => {
        if (!arr) return null;
        else if (arr.length <= idx) return null
        else return arr[idx]
    }

    const [img1, setImg1] = useState(getIdx(vals,0));
    const [img2, setImg2] = useState(getIdx(vals,1));
    const [img3, setImg3] = useState(getIdx(vals,2));
    const [img4, setImg4] = useState(getIdx(vals,3));



    const [isModalOpen, setIsModalOpen] = useState(false);
    const [representImage, setRepresentImage] = useState("");

    const deleteImgFile = (index) => {
        setImg(vals.filter((_,i) => i !== index));
    };
    useEffect(() => {
        const imageList=[img1, img2, img3, img4].filter((img)=>img);
        if (imageList.length>0){
            setRepresentImage(imageList[0]);
        }
        else {setRepresentImage('');}
        setImg(imageList);

    }, [img1, img2, img3, img4]);
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
                    </div>

                <div style={{marginTop: '2rem', justifyContent: 'center', display: 'flex'}}>
                    <button onClick={() => setIsModalOpen(false)}>닫기</button>
</div>
            </Modal>
        </div>
    )
};

export default ImageInputs;