import HomeTemplate from "../../components/home/HomeTemplate";
import Sidebar from "../../components/home/Sidebar";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const ChatRoomListPage = () => {
    const navigate = useNavigate();
    const [reservation, setReservation] = useState([]);
    const [board, setBoard] = useState([]);
    const [serviceCenter, setServiceCenter] = useState([]);
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
                        {reservation.map((chat, idx) => (
                                <div key={idx}>
                                    <p>아이디</p>
                                    <p>최근메시지</p>
                                    <p>최근메시지 시간</p>
                                    <p>읽지 않은 메시지 개수</p>
                                </div>
                            )

                        )}
                    </div>
                ) :null}
            </div>
            <div>
                <h1>게시판</h1>
                {board ?(
                    <div>
                        {board.map((chat, idx) => (
                                <div>
                                    <p>아이디</p>
                                    <p>최근메시지</p>
                                    <p>최근메시지 시간</p>
                                    <p>읽지 않은 메시지 개수</p>
                                </div>
                            )

                        )}
                    </div>
                ) :null}
            </div>

        </div>
        )
    
};

export default ChatRoomListPage;