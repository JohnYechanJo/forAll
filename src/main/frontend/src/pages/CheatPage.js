import SockJs from "sockjs-client";
import StompJs from "stompjs";
import {useState} from "react";
import axios from "axios";
const CheatPage = () => {
    const url = new URL(location.href).searchParams;
    const roomId = url.get('roomId');
    const sock = new SockJs('/ws-stomp');
    const stomp = StompJs.over(sock);
    const [chatId, setChatId] = useState(sessionStorage.getItem("user_id"));
    const [message, setMessage] = useState("");
    const connect = (event) => {
        isDuplicatedName();

        stomp.connect({}, onConnected, (err) => {
            console.error(err);
        });
    };
    const onConnected = () => {
        stomp.subscribe("/sub/chat/room"+roomId, onMessageReceived);

        stomp.send("/pub/chat/enterUser", {}, JSON.stringify({
            "roomId": roomId,
            sender: chatId,
            type: 'ENTER'
        }));
    };
    const onMessageReceived = (payload) => {
        console.log(payload);
    };
    const sendMessage = () => {
        const chatMessage = {
            "roomId": roomId,
            sender: chatId,
            message: message
        };
        stomp.send("/pub/chat/sendMessage",{},JSON.stringify(chatMessage));
        setMessage("");
    };
    const isDuplicatedName = () => {
        axios.get("/chat/duplicateName",{
            roomId:roomId,
            username: sessionStorage.getItem("user_id")
        }).then((res) => {
            setChatId(res.data);
        }).catch((err) => console.error(err));
    };

    return(
        <div>
        <input value={message} onChange={(e) => setMessage(e.target.value)}/>
        <button onClick={sendMessage}>전송</button>
    </div>
    )
};

export default CheatPage;