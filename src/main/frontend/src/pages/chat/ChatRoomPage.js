import {useCallback, useEffect, useRef, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import useDidMountEffect from "../../utils/hooks/useDidMountEffect";
import StompJs from "stompjs";
import SockJs from "sockjs-client";
import {ChatRoomCategory} from "../../utils/enums";

const ChatRoomPage = () => {
    const location = useLocation();
    const data = {...location.state};
    const navigate = useNavigate();
    const [roomId, setRoomId] = useState("");
    const client = useRef();
    const [messageSet, setMessageSet] = useState([]);
    const [partner, setPartner] = useState();
    const [inputMessage, setInputMessage] = useState("");
    const [inputImage, setInputImage] = useState("");
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
    const connect = (event) => {
        client.current = StompJs.over(new SockJs('/ws-stomp'));
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
    };
    const onMessageReceived = (payload) => {
        const data = JSON.parse(payload.body);
        setMessageSet(prev =>[...prev, data]);
    };
    const sendMessage = () => {
        const chatMessage = {
            messageContent: inputMessage,
            senderId: sessionStorage.getItem("user_id"),
            targetId: data.partner,
            chatRoomId: roomId,
            sendTime:  new Date().toJSON()
        };
        client.current.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
        setInputMessage("");

    };
    return(
        <div>
            <h1>{data.category === ChatRoomCategory.Reservation ? "채팅창 > 예약사항" : "채팅창 > 게시판"}</h1>
            <div>
                <button onClick={()=>navigate(-1)}>{"<"}</button>
                {/*Todo 프로필, 찾기, 파일함 기능구현*/}
                <p>상대방 프로필 사진</p>
                <p>{partner}</p>
                <p>프로필 보기</p>
                <p>찾기</p>
                <p>파일함</p>
            </div>
            <div>
                {messageSet ?messageSet.map((message, idx) => (
                    <div key={idx}>
                        {message.senderId === partner ? (
                            <div>
                                <p>상대방 프로필 사진</p>
                                <p>{partner}</p>
                                <p>{message.messageContent}</p>
                            </div>
                        ):(
                            <div>
                                <p>{message.messageContent}</p>
                            </div>
                        )}
                    </div>
                )) :null}
            </div>
            <div>
                <input value={inputMessage} onChange={onChangeMessage}/>
                <button>첨부 파일</button>
                <button onClick={sendMessage}>전송</button>
            </div>

        </div>
    )
};
export default ChatRoomPage;