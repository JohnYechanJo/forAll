package project.forAll.controller.api.member;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import project.forAll.controller.api.APIController;
import project.forAll.domain.alarm.Alarm;
import project.forAll.domain.alarm.AlarmCategory;
import project.forAll.domain.chat.ChatRoom;
import project.forAll.domain.member.Member;
import project.forAll.form.AlarmForm;
import project.forAll.form.ChatRoomForm;
import project.forAll.repository.chat.MessageRepository;
import project.forAll.service.MemberService;
import project.forAll.service.alarm.AlarmService;

import java.util.ArrayList;
import java.util.List;

// 홈페이지 또는 알림 페이지 안에서 작동
@RestController
@RequiredArgsConstructor
public class APIAlarmController extends APIController {

    private final AlarmService alarmService;
    private final MessageRepository messageRepository;

    @GetMapping("/alarm/list/{id}")
    public ResponseEntity getAlarmList(@PathVariable(value = "id") final String userId) {
        try {
            List<Alarm> alarmList = alarmService.findAlarmByUserId(userId);
            List<AlarmForm> forms = new ArrayList<>(alarmList.stream().map(alarm -> alarmService.of(alarm)).toList());

            if(!messageRepository.findByTargetIdAndReadFlag(userId, false).isEmpty()){
                AlarmForm form = new AlarmForm();
                form.setMemberId(userId);
                form.setCategory(AlarmCategory.CHAT.toString());
                form.setAlarmInfo("새로운 채팅이 도착했어요!");
                forms.add(form);
            }

            return new ResponseEntity(forms, HttpStatus.OK);
        } catch (final Exception e) {
            return new ResponseEntity(errorResponse("Could not get Alarm list : " + e.getMessage()),
                    HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/alarm/check/{id}")
    public void checkAlaram(@PathVariable Long id){
        Alarm alarm = (Alarm) alarmService.findById(id);
        alarm.setUserChecked(true);
        alarmService.save(alarm);
    }
}
