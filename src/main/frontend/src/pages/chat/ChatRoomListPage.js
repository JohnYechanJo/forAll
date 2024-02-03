import HomeTemplate from "../../components/home/HomeTemplate";
import Sidebar from "../../components/home/Sidebar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ChatRoomCategory} from "../../utils/enums";
import "../../style/ChatRoom.css";
import {TimeUtil} from "../../utils/TimeUtil";
import Header from "../../components/home/Header";
import {StringUtil} from "../../utils/StringUtil";
const ChatRoomListPage = () => {
    const navigate = useNavigate();
    const [reservation, setReservation] = useState([]);
    const [board, setBoard] = useState([]);
    const [serviceCenter, setServiceCenter] = useState([]);
    const userId = sessionStorage.getItem("user_id");
    useEffect(() => {
        axios.get("/api/v1/chat/roomlist/"+userId+"/"+ChatRoomCategory.Reservation)
            .then((res) => setReservation(res.data))
            .catch((err)=>console.error(err));
        axios.get("/api/v1/chat/roomlist/"+userId+"/"+ChatRoomCategory.Board)
            .then((res) => setBoard(res.data))
            .catch((err)=>console.error(err));
    }, []);

    return (
        <div>
            <Header/>
            <Sidebar/>
            <div>
                <div style={{paddingTop:"3.125rem"}}></div>
                <div className={"chat_category"}><p>예약사항</p></div>
                {reservation ?(
                    <div>
                        {reservation.map((chat, idx) => {
                            const target = chat.userId1 === userId ? chat.userId2 : chat.userId1;
                            return (
                                <div className={"chat_room"} key={idx} onClick={() => navigate("/chatRoom",{state:{partner: target, category: ChatRoomCategory.Reservation}})}>
                                    <div style={{display:"flex", justifyContent:"space-between", height:"50%"}}>
                                        <div style={{textAlign:"left"}}>
                                            <div className={"chat_room_partner"}>{target}</div>
                                        </div>
                                        <div style={{textAlign:"right"}}>
                                            <div className={"chat_room_last_message_time"}>{TimeUtil.toChatTime(chat.sendTime)}</div>
                                        </div>
                                    </div>
                                    <div style={{display:"flex", justifyContent:"space-between", height:"50%"}}>
                                        <div style={{textAlign:"left"}}>
                                            <div className={"chat_room_last_message"}>{StringUtil.postPreViewContent(chat.lastMessage)}</div>
                                        </div>
                                        {chat.notReadCount > 0 ? (
                                            <div style={{textAlign:"right"}}>
                                                <div className={"chat_room_not_read"}>
                                                    <div className={"chat_room_not_read_count"}>{chat.notReadCount}</div>
                                                </div>
                                            </div>
                                        ) :null}

                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) :null}
            </div>
            <div>
                <div className={"chat_category"}><p>게시판</p></div>
                {board ?(
                    <div>
                        {board.map((chat, idx) => {
                            const target = chat.userId1 === userId ? chat.userId2 : chat.userId1;
                            return (
                                <div className={"chat_room"} key={idx} onClick={() => navigate("/chatRoom",{state:{partner: target, category: ChatRoomCategory.Board}})} >
                                    <div style={{display:"flex", justifyContent:"space-between", height:"50%"}}>
                                        <div style={{textAlign:"left"}}>
                                            <div className={"chat_room_partner"}>{target}</div>
                                        </div>
                                        <div style={{textAlign:"right"}}>
                                            <div className={"chat_room_last_message_time"}>{TimeUtil.toChatTime(chat.sendTime)}</div>
                                        </div>
                                    </div>
                                    <div style={{display:"flex", justifyContent:"space-between", height:"50%"}}>
                                        <div style={{textAlign:"left"}}>
                                            <div className={"chat_room_last_message"}>{StringUtil.postPreViewContent(chat.lastMessage)}</div>
                                        </div>
                                        {chat.notReadCount > 0 ? (
                                            <div style={{textAlign:"right"}}>
                                                <div className={"chat_room_not_read"}>
                                                    <div className={"chat_room_not_read_count"}>{chat.notReadCount}</div>
                                                </div>
                                            </div>
                                        ) :null}
                                    </div>


                                </div>
                            )
                        }
                        )}
                    </div>
                ) :null}
            </div>

        </div>
        )
    
};

export default ChatRoomListPage;