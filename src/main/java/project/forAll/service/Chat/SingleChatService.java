//package project.forAll.service.Chat;
//
//import project.forAll.domain.chat.Message;
//import project.forAll.domain.chat.ChatRoom;
//import project.forAll.domain.member.Member;
//
//import java.util.List;
//import java.util.Map;
//
//
//public interface SingleChatService {
//
//    List<ChatRoom> selectRoomList(int memberNo);
//
//    int checkChattingNo(Map<String, Integer> map);
//
//    int createChattingRoom(Map<String, Integer> map);
//
//    int insertMessage(Message msg);
//
//    int updateReadFlag(Map<String, Object> paramMap);
//
//    List<Message> selectMessageList(Map<String, Object> paramMap);
//
//    /** 채팅 상대 검색
//     * @param map
//     * @return memberList
//     */
//    List<Member> selectTarget(Map<String, Object> map);
//
//}
