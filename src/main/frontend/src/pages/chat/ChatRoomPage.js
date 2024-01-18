import {useCallback, useState} from "react";

const ChatRoomPage = () => {
    const [messageSet, setMessageSet] = useState([]);
    const [partner, setPartner] = useState({});
    const [inputMessage, setInputMessage] = useState("");
    const [inputImage, setInputImage] = useState("");
    const onChangeMessage = useCallback((e) => {
        setInputMessage(e.target.value);
    }, []);
    return(
        <div>
            <h1>채팅창>예약사항</h1>
            <div>
                <button>{"<"}</button>
                <p>상대방 프로필 사진</p>
                <p>상대방 아이디</p>
                <p>프로필 보기</p>
            </div>
            <div>
                {messageSet ?messageSet.map((message, idx) => (
                    <div key={idx}>
                        {message.userId === "파트너" ? (
                            <div>
                                <p>상대방 프로필 사진</p>
                                <p>상대방 아이디</p>
                                <p>메시지 내용</p>
                            </div>
                        ):(
                            <div>
                                <p>메시지 내용</p>
                            </div>
                        )}
                    </div>
                )) :null}
            </div>
            <div>
                <input val={inputMessage} onChange={onChangeMessage}/>
                <button>첨부 파일</button>
                <button>전송</button>
            </div>

        </div>
    )
};
export default ChatRoomPage;