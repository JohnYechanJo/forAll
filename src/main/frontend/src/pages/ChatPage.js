import SockJs from "sockjs-client";
import StompJs from "stompjs";
import {useState, useCallback, useEffect, useRef} from "react";
import axios from "axios";
import useDidMountEffect from "../utils/hooks/useDidMountEffect";
import {useLocation} from "react-router-dom";
const ChatPage =  () => {
    const location = useLocation();
    const data = {...location.state};
    const [roomId, setRoomId] = useState("");
    const client = useRef();
    const [messageList, setMessageList] = useState([]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        axios.get('/api/v1/chat/join/'+sessionStorage.getItem("user_id")+"/"+data.partner)
            .then((res) => setRoomId(res.data))
            .catch((err) => console.error(err));
    }, []);
    useDidMountEffect(() => {
        axios.get('/api/v1/chat/'+roomId)
            .then((res) => setMessageList(res.data))
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
        client.current.subscribe("/sub/chat/room/1", onMessageReceived);
        // 소켓 입장
        // client.current.send("/pub/chat/enterUser", {}, JSON.stringify({
        //     "roomId": roomId,
        //     sender: chatId,
        //     type: 'ENTER'
        // }));
    };
    const onMessageReceived = (payload) => {
        console.log(payload);
    };
    const sendMessage = () => {
        const chatMessage = {
            messageContent: message,
            senderId: sessionStorage.getItem("user_id"),
            targetId: data.partner,
            chatRoomId: roomId,
            sendTime:  new Date().toJSON()
        };
        client.current.send("/pub/chat/sendMessage", {}, JSON.stringify(chatMessage));
        setMessage("");
    };

    return (
        <div>
            <button onClick={connect}>연결</button>
            <input value={message} onChange={(e) => setMessage(e.target.value)}/>
            <button onClick={sendMessage}>전송</button>
        </div>
    )
};

export default ChatPage;