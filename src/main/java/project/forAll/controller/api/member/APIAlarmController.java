package project.forAll.controller.api.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.controller.api.APIController;
import project.forAll.domain.alarm.Alarm;
import project.forAll.domain.chat.ChatRoom;
import project.forAll.domain.member.Member;
import project.forAll.form.ChatRoomForm;
import project.forAll.service.MemberService;
import project.forAll.service.alarm.AlarmService;

import java.util.List;

// 홈페이지 또는 알림 페이지 안에서 작동
@RestController
@RequiredArgsConstructor
public class APIAlarmController extends APIController {

    private final AlarmService alarmService;

    @GetMapping("/alarm/list/{id}")
    public ResponseEntity getAlarmList(@PathVariable(value = "id") final String userId) {
        try {
            List<Alarm> alarmList = alarmService.findAlarmByUserId(userId);
            // 사용자가 알림 목록을 체크하면 그 알림들을 확인했음을 변수로 표현
            for (Alarm alarm: alarmList) {
                alarm.setUserChecked(Boolean.TRUE);
            }

            return new ResponseEntity(alarmList, HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity(errorResponse("Could not get Alarm list : " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }
}
