import React, {useCallback, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import StompJs from "stompjs";
import SockJs from "sockjs-client";
import {ChatRoomCategory} from "../../utils/enums";
import ImageUploader from "../../utils/imageUploader";
import ImageViewer from "../../components/ImageViewer";
import Sidebar from "../../components/home/Sidebar";
import "../../style/ChatRoom.css"
import search from "../../components/icons/search.png";
import folder from "../../components/icons/folder.png";
import arrowleft from "../../components/icons/arrowleft.png";
import clip from "../../components/icons/clip.png";

const ChatRoomPage = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const client = useRef();
    const [isConnected, setIsConnected] = useState(false);
    const [messageSet, setMessageSet] = useState([]);
    const [partner, setPartner] = useState();
    const [partnerData, setPartnerData] = useState();
    const [inputMessage, setInputMessage] = useState("");
    const [inputImage, setInputImage] = useState();
    const [inputIsImage, setInputIsImage] = useState(false);
    const onChangeMessage = useCallback((e) => {
        setInputMessage(e.target.value);
    }, []);

    useEffect(() => {
        axios.get('/api/v1/chat/join/'+sessionStorage.getItem("user_id")+"/"+data.partner+"/"+data.category)
            .then((res) => {
                const partnerId = res.data.userId1 === sessionStorage.getItem("user_id") ? res.data.userId2 : res.data.userId1;
                setPartner(partnerId);
                setRoomId(res.data.id);
            })
            .catch((err) => console.error(err));
    }, []);
    useDidMountEffect(() => {
        axios.get('/api/v1/chat/message/'+roomId)
            .then((res) => setMessageSet(res.data))
            .catch((err) => console.error(err));
        connect();
    }, [roomId]);
    useDidMountEffect(() => {
        axios.get("/api/v1/profile/public/"+partner)
            .then((res) => setPartnerData(res.data))
            .catch((err) => console.error(err));
    }, [partner]);
    const connect = (event) => {
        const sockjs = new SockJs('/ws-stomp');
        client.current = StompJs.over(sockjs);
        client.current.connect({}, onConnected, (err) => {
            console.error(err);
        });
    };
    const onConnected = () => {
        client.current.subscribe("/sub/chat/room/"+roomId, onMessageReceived);
        // 소켓 입장
        // client.current.send("/pub/chat/enterUser", {}, JSON.stringify({
        //     "roomId": roomId,
        //     sender: chatId,
        //     type: 'ENTER'
        // }));
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
            senderId: sessionStorage.getItem("user_id"),
            targetId: data.partner,
            chatRoomId: roomId,
            sendTime:  new Date().toJSON(),
            isImage: inputIsImage
        };
        if (inputIsImage){
            chatMessage.messageContent = await ImageUploader(inputImage, sessionStorage.getItem("user_id"));
        }
        client.current.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
        setInputMessage("");
        setInputIsImage(false);

    };
    return(
        <div>
            <div style={{position:"fixed", width:"100%"}}>
                <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                    <button className="button">대관하기</button>
                    <button className="button">커뮤니티</button>
                </div>
                <Sidebar/>
                <div style={{paddingTop:"3.125rem"}}></div>
                <div className={"chat_category"}><p>{data.category === ChatRoomCategory.Reservation ? "채팅창 > 예약사항" : "채팅창 > 게시판"}</p></div>
                <div style={{height:"3.125rem", display:"flex",background:"white",justifyContent:"space-between"}}>
                    <div style={{textAlign:"left", display:"flex"}}>
                        <div onClick={()=>navigate(-1)} className={"height_align_container"}>
                            <img src={arrowleft} alt="sidebar" style={{width:"0.5rem", height:"0.9rem", paddingLeft:"0.5rem", paddingRight:"1.5rem", margin: "auto"}} />
                        </div>
                        {partnerData ? (<div className={"chat_profile_image"} onClick={()=>navigate("/profile/"+partner)}>
                            <ImageViewer val={partnerData.profilePhoto}/>
                        </div>) : null}
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
                                {partnerData ? (<div className={"chat_profile_image"}>
                                    <ImageViewer val={partnerData.profilePhoto}/>
                                </div>) : null}
                                <div>
                                    <div className={"chat_partner_id"}>{partner}</div>
                                    {message.isImage ? (
                                        <ImageViewer val={message.messageContent}/>
                                    ) : (<div className={"chat_partner_message"}>{message.messageContent}</div>)}
                                </div>
                            </div>
                        ):(
                            <div>
                                {message.isImage ? (
                                    <ImageViewer val={message.messageContent}/>
                                ) : (<div className={"chat_my_message"}>{message.messageContent}</div>)}
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
                                   setInputIsImage(true);
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
export default ChatRoomPage;