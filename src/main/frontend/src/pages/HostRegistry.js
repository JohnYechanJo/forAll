import {useState} from "react";
import "../components/Styles.css";
import { Link } from "react-router-dom";
import axios from "axios";
import Modal from "react-modal";
const HostRegistry = () => {
    const [inputCount, setInputCount] = useState(0);
    const [inputCount2, setInputCount2] = useState(0);
    const [inputCount3, setInputCount3] = useState(0);
    const [kitchen, setKitchen] = useState([]);
    const onInputHandler = (e) => {
        setInputCount(e.target.value.length);
    };
    const onInputHandler2 = (e) => {
        setInputCount2(e.target.value.length);
    }
    const onInputHandler3 = (e) => {
        setInputCount3(e.target.value.length);
    }
    return (
        <div>
            <div>
                <header style={{textAlign: "center"}}><h3>1. 공간 정보</h3></header>
                <h4>공간명을 입력해주세요.</h4>
                <hr style={{border: "none", height: "2px", color: "black"}}/>
                <h4>공간명</h4>
                <p>
                    <span>{inputCount}</span>
                    <span>/18자</span>
                </p>
                <input type="text" placeholder="오스테리아 로에로" style={{width: "75%", height: "40px"}}
                       onChange={onInputHandler} maxLength="17"/>
                <h5>❕사용 가능한 특수문자: (,),(-),(.),(@),(/)</h5>
                <h4>공간 한 줄 소개</h4>
                <p>
                    <span>{inputCount2}</span>
                    <span>/18자</span>
                </p>
                <input type="text" placeholder="이탈리아 전통 가정식을 제공하는 와인바" style={{width: "75%", height: "40px"}}
                       onChange={onInputHandler2} maxLength="17"/>
                <h4>공간 소개</h4>
                <p>
                    <span>{inputCount3}</span>
                    <span>/300자</span>
                    <span style={{color: "red"}}>(최소 20자)</span>
                </p>
                <textarea type="text" placeholder="공간에 대한 설명을 기재해주세요." style={{width: "75%", height: "200px"}}
                          onChange={onInputHandler3} maxLength="299" minLength="19"/>
                <h4>주방 특성</h4>
            </div>
        </div>

    );
};
export default HostRegistry;