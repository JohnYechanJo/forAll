import HomeTemplate from "../../components/home/HomeTemplate";
import Sidebar from "../../components/home/Sidebar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ChatRoomCategory} from "../../utils/enums";
import "../../style/ChatRoom.css";
import {TimeUtil} from "../../utils/TimeUtil";
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
            <div className="header" style={{backgroundColor:"white"}}> {/*헤더에 뒤로가기 버튼 집어넣기*/}
                <button className="button">대관하기</button>
                <button className="button">커뮤니티</button>
            </div>
            <Sidebar/>
            <div>
                <div style={{paddingTop:"3.125rem"}}></div>
                <div className={"chat_category"}>예약사항</div>
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
                                            <div className={"chat_room_last_message"}>{chat.lastMessage}</div>
                                        </div>
                                        <div style={{textAlign:"right"}}>
                                            <div className={"chat_room_not_read"}>
                                                <div className={"chat_room_not_read_count"}>{chat.notReadCount}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                ) :null}
            </div>
            <div>
                <div className={"chat_category"}>게시판</div>
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
                                            <div className={"chat_room_last_message"}>{chat.lastMessage}</div>
                                        </div>
                                        <div style={{textAlign:"right"}}>
                                            <div className={"chat_room_not_read"}>
                                                <div className={"chat_room_not_read_count"}>{chat.notReadCount}</div>
                                            </div>
                                        </div>
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