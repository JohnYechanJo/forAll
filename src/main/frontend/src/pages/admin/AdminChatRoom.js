import {useLocation, useNavigate} from "react-router-dom";
import React, {useCallback, useEffect, useRef, useState} from "react";
import axios from "axios";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import SockJs from "sockjs-client";
import StompJs from "stompjs";
import ImageUploader from "../../utils/imageUploader";
import Header from "../../components/home/Header";
import Sidebar from "../../components/home/Sidebar";
import arrowleft from "../../components/icons/arrowleft.png";
import search from "../../components/icons/search.png";
import folder from "../../components/icons/folder.png";
import ImageViewer from "../../components/ImageViewer";
import clip from "../../components/icons/clip.png";

const AdminChatRoom = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const data = { ...location.state };
    console.log(data);
    const [roomId, setRoomId] = useState(data.id);
    const client = useRef();
    const [partner, setPartner] = useState(data.userId1);
    const [isConnected, setIsConnected] = useState(false);
    const [messageSet, setMessageSet] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [inputImage, setInputImage] = useState();
    const onChangeMessage = useCallback((e) => {
        setInputMessage(e.target.value);
    }, []);
    useEffect(() => {
        axios.get('/api/v1/chat/message/'+roomId)
            .then((res) => setMessageSet(res.data))
            .catch((err) => console.error(err));
        connect();
    }, []);
    const connect = (event) => {
        const sockjs = new SockJs('/ws-stomp');
        client.current = StompJs.over(sockjs);
        client.current.connect({}, onConnected, (err) => {
            console.error(err);
        });
    };
    const onConnected = () => {
        client.current.subscribe("/sub/chat/room/"+roomId, onMessageReceived);
        setIsConnected(true);
    };
    const onMessageReceived = (payload) => {
        const message = JSON.parse(payload.body);
        axios.get("/api/v1/chat/check/"+message.id);
        setMessageSet(prev =>[...prev, message]);
    };
    const sendMessage =  async () => {
        if (!isConnected) return;
        const chatMessage = {
            messageContent: inputMessage,
            senderId: "Service Center",
            targetId: partner,
            chatRoomId: roomId,
            sendTime:  new Date().toJSON(),
            isImage: false
        };
        client.current.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
        setInputMessage("");
    };
    const sendImage = async () => {
        if (!isConnected) return;
        const chatMessage = {
            messageContent: await ImageUploader(inputImage, sessionStorage.getItem("user_id")),
            senderId: "Service Center",
            targetId: partner,
            chatRoomId: roomId,
            sendTime:  new Date().toJSON(),
            isImage: true
        };
        client.current.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
    };
    useDidMountEffect(() => {
        sendImage();
    }, [inputImage]);
    return(
        <div>
            <div style={{position:"fixed", width:"100%"}}>
                <Header/>
                <Sidebar/>
                <div style={{paddingTop:"3.125rem"}}></div>
                <div className={"chat_category"}><p>{"고객센터"}</p></div>
                <div style={{height:"3.125rem", display:"flex",background:"white",justifyContent:"space-between"}}>
                    <div style={{textAlign:"left", display:"flex"}}>
                        <div onClick={()=>navigate(-1)} className={"height_align_container"}>
                            <img src={arrowleft} alt="sidebar" style={{width:"0.5rem", height:"0.9rem", paddingLeft:"0.5rem", paddingRight:"1.5rem", margin: "auto"}} />
                        </div>
                        <div style={{alignItems:"center", display:"flex"}}>
                            <div className={"chat_partner_id"}>{partner}</div>
                        </div>

                    </div>
                    <div style={{textAlign:"right", display:"flex"}}>
                        {/*Todo 찾기, 파일함 기능구현*/}
                        <img src={search} alt="sidebar" style={{width:"1.125rem", height:"1.125rem", paddingRight:"0.6rem", margin: "auto"}} />
                        <img src={folder} alt="sidebar" style={{width:"1.26rem", height:"1rem", paddingRight:"0.6rem",margin: "auto"}} />
                    </div>
                </div>
            </div>
            <div style={{paddingTop:"9.375rem"}}></div>
            <div className={"chat_container"}>
                {messageSet ?messageSet.map((message, idx) => (
                    <div key={idx}>
                        {message.senderId === partner ? (
                            <div className={"chat_message_container"}>
                                <div>
                                    <div className={"chat_partner_id"}>{partner}</div>
                                    {message.isImage ? (
                                        <ImageViewer val={message.messageContent}/>
                                    ) : (<div className={"chat_partner_message"}><a>{message.messageContent}</a></div>)}
                                </div>
                            </div>
                        ):(
                            <div className={"chat_message_container"} style={{justifyContent:"right"}}>
                                {message.isImage ? (
                                    <ImageViewer val={message.messageContent}/>
                                ) : (<div className={"chat_my_message"}><a>{message.messageContent}</a></div>)}
                            </div>
                        )}
                    </div>
                )) :null}
            </div>

            <div className={"chat_submit_area"}>
                <textarea className={"chat_input"} value={inputMessage} onChange={onChangeMessage}/>
                <div style={{display:"flex",justifyContent:"space-between"}}>
                    <label>
                        <input type={"file"}
                               accept="image/*"
                               onChange={(e) => {
                                   setInputImage(e.target.files[0]);
                               }}
                               style={{display: "none"}}
                        />
                        <img src={clip} alt="sidebar" style={{width:"1.5rem", height:"1.5rem", paddingLeft:"0.5rem", margin: "auto"}} />
                    </label>
                    <div style={{textAlign:"right"}}>
                        <div className={"chat_submit_button"} onClick={sendMessage}>전송</div>
                    </div>

                </div>

            </div>
        </div>
    )
};
export default AdminChatRoom;