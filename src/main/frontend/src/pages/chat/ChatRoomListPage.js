import HomeTemplate from "../../components/home/HomeTemplate";
import Sidebar from "../../components/home/Sidebar";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {ChatRoomCategory} from "../../utils/enums";

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
            <HomeTemplate />
            <Sidebar/>
            <div>
                <h1>예약사항</h1>
                {reservation ?(
                    <div>
                        {reservation.map((chat, idx) => {
                            const target = chat.userId1 === userId ? chat.userId2 : chat.userId1;
                            return (
                                <div key={idx} onClick={() => navigate("/chatRoom",{state:{partner: target, category: ChatRoomCategory.Reservation}})}>
                                    <p>{target}</p>
                                    <p>{chat.lastMessage}</p>
                                    <p>{chat.sendTime}</p>
                                    <p>{chat.notReadCount}</p>
                                </div>
                            )
                        })}
                    </div>
                ) :null}
            </div>
            <div>
                <h1>게시판</h1>
                {board ?(
                    <div>
                        {board.map((chat, idx) => {
                            const target = chat.userId1 === userId ? chat.userId2 : chat.userId1;
                            return (
                                <div key={idx} onClick={() => navigate("/chatRoom",{state:{partner: target, category: ChatRoomCategory.Board}})} >
                                    <p>{target}</p>
                                    <p>{chat.lastMessage}</p>
                                    <p>{chat.sendTime}</p>
                                    <p>{chat.notReadCount}</p>
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